"use client"; // 클라이언트 컴포넌트로 지정
import { useEffect, useState } from "react";
import {CURRENT_BACKEND} from "./res/path";
//                                                        3000
const LoginChecker = ({ children, setUserData }) => {
  const [user, setUser] = useState(null);
  const checkLogin = async () => {
    try {
      const response = await fetch(CURRENT_BACKEND+"/profile/get", {
        method: "POST",
        credentials: "include", // 쿠키를 포함해서 요청
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // JSON 형식으로 변환
      setUser(data); // 유저 정보 설정
      setUserData(data); // 부모 컴포넌트에서 받은 setUserData 함수 호출

    
    //   setUser({'username':'test'}); // 유저 정보 설정[테스트용]
    //   setUserData({'username':'test'}); // 부모 컴포넌트에서 받은 setUserData 함수 호출[테스트용]
    } catch (error) {
      // console.error("Error fetching user info:", error);
      location.href = location.origin+"/login?redirect_url="+location.pathname+location.search
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return <div>{children}</div>; // 자식 컴포넌트로 전달
};

export default LoginChecker;
