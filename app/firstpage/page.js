"use client"; // 클라이언트 컴포넌트로 지정
import Image from "next/image";
import Link from "next/link";
import '../firstpage/firstpage.css';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FirstPage() {
    const fileInputRef = useRef(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [mbti, setMbti] = useState('');
    const [job, setJob] = useState('');
    const [interest, setInterest] = useState('');

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
        // 입력 완료 클릭시 MainPage 이동
        router.push('/MainPage');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="artboard phone-1 flex flex-col h-full relative">
                {/* 이전페이지이동 */}
                <div className="absolute top-1 left-1 mt-6 p-4 z-10"> 
                    <button onClick={handleBackButtonClick} className="block">
                        <Image src="/pagenation.png" alt="이전 페이지로 이동" width={30} height={30} />
                    </button>
                </div>

                {/* 텍스트그룹 */}
                <div className="absolute top-0 left-4 mt-6 p-4 flex flex-col items-start">
                    <div 
                        className="text-xs font-medium" 
                        style={{ fontFamily: 'NotoSansKR-Regular', color: '#6B7280', fontSize: '0.75rem' }}
                    >
                        로그인
                    </div>
                    <div className="text-xs font-medium" style={{ fontFamily: 'NotoSansKR-SemiBold', marginLeft: '16px', fontSize: '0.85rem' }}>
                        초기설정
                    </div>
                </div>

                {/* 프로필사진 추가 */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 mt-8">
                    <div
                        id="profile-picture"
                        className="mask mask-circle cursor-pointer bg-gray-300 relative" // relative
                        style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                        onClick={handleProfilePictureClick}
                    >
                        {profilePicture ? (
                            <img 
                                src={profilePicture} 
                                alt="프로필 사진" 
                                className="mask mask-circle" 
                                style={{ width: '90px', height: '90px', objectFit: 'cover' }} 
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white text-xs" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                추가
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/*프로필 사진 아래 카드 박스*/}
                <div className="flex w-full flex-col border-opacity-50 mt-12">
                    <div className="card bg-[#EDEDED] rounded-box w-4/5 mx-auto mt-20 flex items-center justify-center h-auto">
                        {/*카드 상단에 텍스트 박스*/}
                        <div className="flex flex-col space-y-4 p-4">
                            <input
                                type="text"
                                placeholder="이름"
                                className="input input-sm w-full"
                                style={{ backgroundColor: '#D2D2D2', color: '#333333', fontFamily: 'NotoSansKR-SemiBold', fontSize: '0.65rem' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="나이"
                                className="input input-sm w-full"
                                style={{ backgroundColor: '#D2D2D2', color: '#333333', fontFamily: 'NotoSansKR-SemiBold', fontSize: '0.65rem' }}
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            {/* MBTI 선택 */}
                            <select 
                                className="select select-bordered select-sm w-full mb-4"
                                value={mbti}
                                onChange={(e) => setMbti(e.target.value)}
                                style={{ fontFamily: 'NotoSansKR-SemiBold', fontSize: '0.65rem', color: '#333333' }}
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
                                className="select select-bordered select-sm w-full mb-4"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                                style={{ fontFamily: 'NotoSansKR-SemiBold', fontSize: '0.65rem', color: '#333333' }}
                            >
                                <option disabled value="">직업</option>
                                <option value="학생">학생</option>
                                <option value="직장인">직장인</option>
                                <option value="취업준비">취업준비</option>
                                <option value="편입">편입</option>
                                <option value="기타">기타</option>
                            </select>
                            {/* 관심 분야 선택 */}
                            <select
                                className="select select-bordered select-sm w-full mb-4"
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                                style={{ fontFamily: 'NotoSansKR-SemiBold', fontSize: '0.65rem', color: '#333333' }}
                            >
                                <option disabled value="">공부 분야</option>
                                <option value="토익">토익</option>
                                <option value="토플">토플</option>
                                <option value="토익스피킹/오픽">토익스피킹/오픽</option>
                                <option value="텝스">텝스</option>
                                <option value="G-TELP">G-TELP</option>
                                <option value="편입영어">편입영어</option>
                                <option value="중국어/일본어">중국어/일본어</option>
                                <option value="제2외국어">제2외국어</option>
                                <option value="편입">편입</option>
                                <option value="자격증">자격증</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/*입력 완료 버튼*/}
                <div className="absolute bottom-8 left-0 w-full flex justify-center">
                    <button 
                        className="btn btn-sm w-4/5 max-w-xs mx-auto" 
                        style={{ backgroundColor: '#3B82F6', fontFamily: 'Pretendard-ExtraBold', color: 'white' }} 
                        onClick={handleComplete}
                    >
                        입력 완료
                    </button>
                </div>
            </div>
        </div>
    );
}
