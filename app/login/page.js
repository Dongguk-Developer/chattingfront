"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react"; 
import Link from "next/link";

export default function Login() {
    const [alert, setAlert] = useState(null); // 알림
    const [isFirstMember, setIsFirstMember] = useState(true); // 첫 사용자

    const handleKakaoLogin = async () => {
        // OAuth

        // 로그인 성공
        setAlert({
            type: "success",
            message: "로그인 성공. 페이지 이동 중..",
        });

        // 첫 사용자일 때 초기 설정 페이지로 이동
        if (isFirstMember) {
            setTimeout(() => {
                window.location.href = "firstpage"; // 초기 설정 페이지
            }, 2000);
        } else {
            // 첫 사용자가 아닌 경우 메인 페이지로 이동
            setTimeout(() => {
                window.location.href = "/page"; // 메인 페이지 
            }, 2000);
        }

        // 알림 1초 후 사라짐
        setTimeout(() => {
            setAlert(null);
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen base-100 relative">
            {alert && (
    <div 
        role="alert" 
        className={`alert ${alert.type === "success" ? "bg-success text-success-content" : "bg-error text-error-content"} absolute top-0 left-1/2 transform -translate-x-1/2`} 
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
        <span className="ml-2">{alert.message}</span>
    </div>
)}



            <div className="flex-grow flex flex-col items-center justify-center pt-16">
                <img
                 srcSet="/logo.svg"
                 sizes="(max-width: 600px) 480px, 800px"
                 src="/logo.svg"
                 alt="StudyHero img" 
                 className="w-48 h-auto" // 로고 크기 조정
                />
                <h1 className="mt-2 text-3xl font-sans font-bold text-primary">STUDY HERO</h1> {/*font-sans*/}
            </div>

            <div className="flex justify-center mb-10">
                <button className="btn btn-wide btn-lg" style={{ backgroundColor: '#FEE500' }} onClick={handleKakaoLogin}>
                    <img 
                        src="/kakaologo.svg"  // SVG 파일 경로
                        alt="Kakao Logo" 
                        className="h-6 w-6"  // 필요한 경우 크기 조정
                    />
                    <span className="font-sans">카카오 로그인</span> {/*font-sans*/}
                </button>
            </div>

        </div>
    );
}
