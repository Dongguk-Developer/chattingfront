"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Cookies } from "react-cookie";
import Alert from "../components/alert";
import logo from "../public/logo.png";
import kakaologin from "../public/kakaologin.png";
import { CURRENT_BACKEND } from "../res/path.js";
import "../login/login.css";

export default function Login() {
    const router = useRouter();
    const [alert, setAlert] = useState(null);
    const [url, setURL] = useState(CURRENT_BACKEND);
    const cookies = new Cookies();
    const [redirect_url,setRedirectURL] = useState(null);
    useEffect(()=>{
        if(router.query){
            if(router.query.redirect_url){
                setRedirectURL(router.query.redirect_url);
            }
        }
    },[router.query])
    

    const handleKakaoLogin = async () => {
        const popup = window.open(`${url}/auth/kakao`);
        const checkWindowClosed = setInterval(async () => {
            if (popup.closed) {
                try {
                    const res = await fetch(`${url}/profile/get`, {
                        method: "POST",
                        credentials: "include",
                    });

                    if (res.status !== 200) {
                        setAlert({ type: "error", message: "로그인 실패" });
                    } else {
                        const { user } = await res.json();
                        if (!user.user_job || !user.user_mbti || !user.user_nickname) {
                            window.location.href = "/firstpage";
                        } else {
                            window.location.href = redirect_url || "/";
                        }
                    }
                } catch (error) {
                    console.error("Login Error:", error);
                }
                clearInterval(checkWindowClosed);
            }
        }, 500);
    };

    return (
        <>
            <Alert state={alert} />
            <div className="flex-grow flex flex-col items-center justify-center" style={{ height: "100vh" }}>
                <div className="flex flex-row items-center">
                    <Image src={logo} alt="StudyHero" width={252} height={390} unoptimized={true} />
                    <h1 className="mt-5 text-4xl font-bold studytitle mb-5">STUDY HERO</h1>
                    <button onClick={handleKakaoLogin} className="block">
                        <Image src={kakaologin} alt="카카오로 로그인" width={400} height={100} unoptimized={true} />
                    </button>
                </div>
            </div>
        </>
    );
}
