"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react"; 
import Image from "next/image";
import Link from "next/link";
import '../login/login.css';

export default function Login() {
    const [alert, setAlert] = useState(null); // 알림
    const [isFirstMember, setIsFirstMember] = useState(true); // 첫 사용자

    const handleKakaoLogin = async () => {
        // OAuth 

        // 로그인성공
        setAlert({
            type: "success",
            message: "로그인 성공. 페이지 이동 중..",
        });

        // 첫사용자 이동
        if (isFirstMember) {
            // 초기 설정 페이지로 이동
            setTimeout(() => {
                window.location.href = "firstpage"; // 초기 설정 페이지
            }, 2000);
        } else {
            // 첫 사용자가 아닌 경우 메인 페이지로 이동
            setTimeout(() => {
                window.location.href = "/page"; // 메인 페이지 
            }, 2000);
        }

        // 로그인 실패
        // setAlert({
        //     type: "error",
        //     message: "로그인 실패.",
        // });

        // 알림 1초
        setTimeout(() => {
            setAlert(null);
        }, 1000);
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="artboard phone-1 flex flex-col h-full relative">
                {alert && (
                    <div 
                        role="alert" 
                        className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"} absolute top-0 left-1/2 transform -translate-x-1/2 text-white text-xs max-w-xs`} 
                        style={{ fontFamily: 'NotoSansKR-Regular', padding: '4px 8px', marginTop: '20px', display: 'flex', alignItems: 'center' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            {alert.type === "success" ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            )}
                        </svg>
                        <span style={{ marginLeft: '8px' }}>{alert.message}</span>
                    </div>
                )}

                <div className="flex-grow flex flex-col items-center justify-center pt-16">
                    <Image src="/logo.png" alt="StudyHero" width={126} height={195} />
                    <h1 className="mt-2 text-2xl font-bold studytitle">STUDY HERO</h1>
                </div>

                <div className="flex justify-center mb-10">
                    <button onClick={handleKakaoLogin} className="block">
                        <Image src="/kakaologin.png" alt="카카오로 로그인" width={200} height={50} />
                    </button>
                </div>
            </div>
        </div>
    );
}
