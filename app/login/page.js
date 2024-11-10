"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react"; 
import Image from "next/image";
import Link from "next/link";
import '../login/login.css';
import {Cookies} from 'react-cookie';
import { useSearchParams } from "next/navigation";
import logo from "../public/logo.png";
import kakaologin from "../public/kakaologin.png";
import {CURRENT_BACKEND} from "../res/path.js";

export default function Login() {
    const [url, setURL] = useState(CURRENT_BACKEND); // 알림 
    console.log("url:",url);
    const searchParams = useSearchParams();
    let redirect_url = searchParams.get("redirect_url");
    const cookies = new Cookies();

    const getCookie = (name) => {
      return cookies.get(name); 
    }
    const [alert, setAlert] = useState(null); // 알림
    const [isFirstMember, setIsFirstMember] = useState(true); // 첫 사용자

    const handleKakaoLogin = async () => {
        // OAuth 
        const popup = window.open(url+"/auth/kakao");
        // 주기적으로 창이 닫혔는지 확인합니다.
        const checkWindowClosed = setInterval(async function() {
          // 창이 닫혔는지 확인
          if (popup.closed) {
              console.log("새 창이 닫혔습니다.");
              console.log(getCookie("code"));
              // 로그인성공
              const response = await fetch(url+"/profile/get", {
                method: "POST",
                credentials: "include",  // 쿠키를 포함하여 요청
              })
              .then(async(response) => {
                  if(response.status!=200){
                      // location.href = "/login?redirect_url="+location.pathname;
                      setAlert({
                        type: "error",
                        message: "로그인 실패",
                      });
                  }
                  else{
                    console.log(49,await response.json())
                    let user_data = response.json();

                    setIsFirstMember(user_data.user_job==null||
                        user_data.user_mbti==null||
                        user_data.user_nickname==null||
                        user_data.user_study_field==null)
                    setAlert({
                      type: "success",
                      message: "로그인 성공. 페이지 이동 중..",
                    });
                    setTimeout(() => {
                        // 첫사용자 이동
                        if (isFirstMember) {
                            // 초기 설정 페이지로 이동
                            setTimeout(() => {
                                window.location.href = "/firstpage"; // 초기 설정 페이지
                            }, 2000);
                        } else {
                            // 첫 사용자가 아닌 경우 메인 페이지로 이동
                            setTimeout(() => {
                                window.location.href = redirect_url; // 메인 페이지 
                            }, 2000);
                        }
                  }, 2000);
                  }
              })
              .then((data) => console.log("Get Cookie Response:", data))
              .catch((error) => console.error("Error getting cookie:", error));
              
              clearInterval(checkWindowClosed);  // 더 이상 체크하지 않도록 setInterval을 중지
          }
        }, 500); // 500ms(0.5초)마다 확인
        

        

        // 로그인 실패
        // setAlert({
        //     type: "error",
        //     message: "로그인 실패.",
        // });

        // 알림 2초
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    return (
      <div>
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
                    <Image src={logo} alt="StudyHero" width={126*2} height={195*2} unoptimized={true}/>
                    <h1 className="mt-5 text-4xl font-bold studytitle mb-5">STUDY HERO</h1>
                </div>

                <div className="flex justify-center mb-10">
                    <button onClick={handleKakaoLogin} className="block">
                        <Image src={kakaologin} alt="카카오로 로그인" width={200*2} height={50*2} unoptimized={true}/>
                    </button>
                </div>
            </div>
    );
}