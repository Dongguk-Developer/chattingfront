"use client"; // 클라이언트 컴포넌트로 지정
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {CURRENT_BACKEND} from "../res/path.js";
import arrow_image from "../public/pagenation.png"
import LoginChecker from "../LoginChecker";

export default function FirstPage() {
    const fileInputRef = useRef(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [mbti, setMbti] = useState('');
    const [job, setJob] = useState('');
    const [interest, setInterest] = useState('');
    const [showError, setShowError] = useState(false); // 오류 알림 상태 추가
    const [ageError, setAgeError] = useState(false); // 나이 입력 오류 상태 추가

    const handleProfilePictureClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const router = useRouter();

    const handleBackButtonClick = () => {
        router.push('/login'); // 로그인 페이지 이동
    };

    const handleComplete = () => {
        // 모든 필드가 입력되었는지 확인
        if (!name || !age || !mbti || !job || !interest) {
            setShowError(true); // 오류 알림 표시
            // 1초 후에 오류 알림을 숨김
            setTimeout(() => {
                setShowError(false);
            }, 1000);
            return; // 페이지 이동 중단
        }

        // 나이 입력값이 숫자인지 확인
        if (isNaN(age) || age.trim() === '') {
            setAgeError(true); // 나이 입력 오류 알림
            // 1초 후에 오류 알림을 숨김
            setTimeout(() => {
                setAgeError(false);
            }, 1000);
            return; // 페이지 이동 안됨
        }
        console.log({
            name: name,
            age: age,
            mbti:mbti,
            job:job,
            studyfield:interest
          })
        // fetch("https://api.studyhero.kr/profile/update", {
        fetch(`${CURRENT_BACKEND}/profile/update`, {
            method: "POST",
            body: JSON.stringify({
              name: name,
              age: age,
              mbti:mbti,
              job:job,
              studyfield:interest
            }),
            credentials: "include", // 쿠키를 포함해서 요청

          })
          .then((response) => {response.json();if(response.status==200){router.push('/');}})
          .then((result) => {console.log(result);});
    };
    return (
        <>
        {/* 오류 알림 */}
        {showError && (
                <div role="alert" className="alert alert-error mb-4 bg-error absolute top-0 left-1/2 transform -translate-x-1/2" style={{ zIndex: 100 }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-error-content font-sans">모든 정보를 입력해주세요</span>
                </div>
            )}

            {/* 나이 입력 오류 알림 */}
            {ageError && (
                <div role="alert" className="alert alert-error mb-4 bg-error absolute top-0 left-1/2 transform -translate-x-1/2" style={{ zIndex: 100 }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-error-content font-sans">나이가 잘못 입력되었습니다.</span>
                </div>
            )}
            <div className="inline-flex flex-col justify-start min-h-screen base-100 relative w-full">
                <div className="flex flex-row justify-start ml-4 mt-6">
                    <button onClick={handleBackButtonClick} className="block">
                        <Image src={arrow_image} alt="이전 페이지로 이동" width={30} height={30} />
                    </button>
                    <div className="flex flex-col">
                        <div 
                            className="text-xs font-sans font-medium" 
                            style={{ color: "base-content", marginLeft: '16px', fontSize: '0.75rem' }}
                        >로그인</div>
                        <div 
                            className="text-xs font-sans font-medium"
                            style={{ color: "base-content", marginLeft: '16px', fontSize: '0.85rem' }} >초기설정</div>
                    </div>
                    <div className="flex flex-col"></div>
                </div>
                <div className="flex flex-row justify-center mt-12">
                    <div id="profile-picture"
                    className="mask mask-circle cursor-pointer bg-base-300 relative" // 색상 변경
                    style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                    onClick={handleProfilePictureClick}>
                    {profilePicture ? (
                        <img 
                            src={profilePicture} 
                            alt="프로필 사진" 
                            className="mask mask-circle" 
                            style={{ width: '130px', height: '130px', objectFit: 'cover' }} 
                        />) : (
                        <div className="absolute inset-0 flex items-center justify-center text-base-content text-xs bg-base-300">
                            추가
                        </div>)}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"/>
                </div>

                    <div className="flex flex-col justify-center">
                        <div className="mx-3.5 mt-20 flex items-center justify-center h-auto"> {/* 색상 변경 */}
                            {/* 카드 상단에 텍스트 박스 */}
                            <div className="card bg-base-200 rounded-box border-opacity-50 flex flex-col space-y-4 p-4 min-w-96">
                                <input  
                                    type="text"
                                    placeholder="이름"
                                    className="input input-sm bg-base-300 text-base-content font-sans text-[0.85rem] my-1" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="나이"
                                    className="input input-sm w-full bg-base-300 text-base-content font-sans text-[0.85rem] my-1" 
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                {/* MBTI 선택 */}
                                <select 
                                    className="select select-sm w-full mb-4 bg-base-300 text-base-content font-sans text-[0.85rem] my-1" 
                                    value={mbti}
                                    onChange={(e) => setMbti(e.target.value)}
                                >
                                    <option disabled value="">MBTI</option>
                                    <option value="ENFP">ENFP</option>
                                    <option value="ENTP">ENTP</option>
                                    <option value="ESTJ">ESTJ</option>
                                    <option value="ESFJ">ESFJ</option>
                                    <option value="ENFJ">ENFJ</option>
                                    <option value="ENTJ">ENTJ</option>
                                    <option value="ESTP">ESTP</option>
                                    <option value="ESFP">ESFP</option>
                                    <option value="ISTJ">ISTJ</option>
                                    <option value="ISFJ">ISFJ</option>
                                    <option value="INFJ">INFJ</option>
                                    <option value="INTJ">INTJ</option>
                                    <option value="ISTP">ISTP</option>
                                    <option value="ISFP">ISFP</option>
                                    <option value="INFP">INFP</option>
                                    <option value="INTP">INTP</option>
                                </select>
                                {/* 직업 선택 */}
                                <select
                                    className="select select-sm w-full mb-4 bg-base-300 text-base-content font-sans text-[0.85rem] my-1" 
                                    value={job}
                                    onChange={(e) => setJob(e.target.value)}
                                >
                                    <option disabled value="">직업</option>
                                    <option value="학생">학생</option>
                                    <option value="직장인">직장인</option>
                                    <option value="프리랜서">프리랜서</option>
                                </select>
                                {/* 관심 분야 선택 */}
                                <select 
                                    className="select select-sm w-full mb-4 bg-base-300 text-base-content font-sans text-[0.85rem] my-1" 
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                >
                                    <option disabled value="">관심 분야</option>
                                    <option value="프로그래밍">프로그래밍</option>
                                    <option value="디자인">디자인</option>
                                    <option value="게임 개발">게임 개발</option>
                                </select>

                            </div>
                        </div>
                    </div>
                <div className="flex flex-row justify-center">
                    <button className="btn btn-wide mt-12 bg-primary text-primary-content font-sans font-extrabold" onClick={handleComplete}>
                    입력 완료
                    </button>
                </div>
            </div>
        </>
    )
    
}
