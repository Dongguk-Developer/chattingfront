"use client";
import LoginChecker from "../LoginChecker";
import { useState,useEffect,useRef } from "react";
import {CURRENT_BACKEND} from "../res/path.js";

const DropDown = (props) => {
  const name = props.name;
  const state = props.state;
  const setState = props.setState;
  const Set_is_open = props.Set_is_open;
  const is_open = props.is_open;
  const values = props.values;


  return (
  <div className="dropdown w-full">
  <div
    role="button"
    tabIndex="0"
    className="btn m-1 w-full ml-0 justify-start"
    onClick={() => {Set_is_open((prev) => !prev);}}>
    {state!==""?state:name}
    <svg
        width={8}
        height={6}
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 1.75L4 4.75L1 1.75H7Z"
          fill="black"
          stroke="black"
          style={{
            fill: "black",
            fillOpacity: 1,
            stroke: "black",
            strokeOpacity: 1,
            justifyContent: "right",
          }}
          strokeWidth={2}
          strokeLinejoin="round"/>
    </svg>
  </div>
  {is_open && (
    <ul
      tabIndex="0"
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
    >
      {values.map((text,index) => (
              <li key={index}>
                <a onClick={(e)=>{setState(text);Set_is_open(false);}}>{text}</a>
              </li>
            )
      )}
    </ul>
  )}
</div>)
}


function Edit_profile_Page ({user,setUserData}) {
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [user_name, set_user_name] = useState(null);
  const [user_age, set_user_age] = useState(null);

  const [is_open_mbti,Set_is_open_mbti] = useState(false);
  const [is_open_job,Set_is_open_job] = useState(false);
  const [is_open_study,Set_is_open_study] = useState(false);

  const [mbti,Set_mbti] = useState("");
  const [job,Set_job] = useState("");
  const [study,Set_study] = useState("");

  const [alert, setAlert] = useState(null); // 알림


  const update_user = async() => {
    console.log(JSON.stringify({
      name: user_name,
      age: user_age,
      mbti:mbti,
      job:job,
      studyfield:study
    }));
    const res = await fetch(CURRENT_BACKEND+"/profile/update", {
      method: "POST",
      body: JSON.stringify({
        name: user_name,
        age: user_age,
        mbti:mbti,
        job:job,
        studyfield:study,
        profile_image:profilePicture
      }),
      credentials: "include",  // 쿠키를 포함하여 요청
    })
    .then(async(response) => {
        if(response.status!=200){
            // location.href = "/login?redirect_url="+location.pathname;
            setAlert({
              type: "error",
              message: "실패",
            });
        }
        else{
          setAlert({
            type: "success",
            message: "성공",
          });

        }
    })
    .then((data) => console.log("Get Cookie Response:", data))
    .catch((error) => console.error("Error getting cookie:", error));
  }
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
useEffect(()=>{
  if(user&&user.profile_image.profile_image_url!==null){
    setProfilePicture(user.profile_image.profile_image_url)
  }
},[user])


  // 배경 클릭 시 드롭다운이 닫히도록 설정
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        Set_is_open_mbti(false);
        Set_is_open_job(false);
        Set_is_open_study(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    if (user) { // user가 null이 아닐 때만 실행
      console.log(user.user.user_mbti);
      Set_mbti(user.user.user_mbti || "");
      Set_job(user.user.user_job || "");
      Set_study(user.user.user_study_field || "");
      set_user_name(user.user.user_nickname);
      set_user_age(user.user.user_age);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);


  return (
    <>
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
    <div className="h-screen flex flex-col">
      
        {/* 헤더 */}
        <header className="flex justify-between items-center px-4 py-4">
  
          <div className="font-black flex items-center">
            <button onClick={function(){location.href="/"}}>
                <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{marginRight:"10px"}}
                    >
                    <path
                    d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z"
                    fill="black"
                    />
                </svg>
            </button>
          <div>
              <p style={{width:"fit-content", display:"inline",fontSize:"small",color:"rgb(128,128,128)"}}>나의 프로필</p><br/>
              <span style={{fontSize:"medium"}}>프로필 편집</span>
          </div>
        </div>

        </header>

        {/* 나의 채팅방 섹션 */}
        <section className="px-4 py-2 flex-grow overflow-y-auto">
            <div className="flex flex-col items-start">
              <div className="w-full">
              <div className="flex flex-row justify-center mb-6">
                <div id="profile-picture"
                    className="mask mask-circle cursor-pointer bg-base-300 relative" // 색상 변경
                    style={{ width: '192px', height: '192px', objectFit: 'cover' }}
                    onClick={handleProfilePictureClick}>
                    {profilePicture ? (
                      <img 
                      src={profilePicture} 
                      alt="프로필 사진" 
                      className="mask mask-circle" 
                      style={{ width: '192px', height: '192px', objectFit: 'cover' }} 
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

                <div className="mb-8">
                  <div className="flex flex-col space-y-3 bg-[rgb(237,237,237)] p-2 rounded-lg shadow-md">
                  <input type="text" placeholder="이름" className="input w-full rounded-lg bg-[rgb(217,217,217)]" onChange={(event) => {set_user_name(event.target.value);}} value={user_name?user_name:""}/>
                  <input type="text" placeholder="나이" className="input w-full rounded-lg bg-[rgb(217,217,217)]" onChange={(event) => {set_user_age(event.target.value);}} value={user_age?user_age:""}/>
                  <div className="dropdown-container relative">
                  <DropDown name="MBTI" state={mbti} setState={Set_mbti} Set_is_open={Set_is_open_mbti} is_open={is_open_mbti} 
                  values={["E", "I"].flatMap((mbti1) =>
                  ["N", "S"].flatMap((mbti2) =>
                  ["T", "F"].flatMap((mbti3) =>
                  ["P", "J"].map((mbti4) => mbti1 + mbti2 + mbti3 + mbti4)
                  )
                  )
                  )}/>
                  <DropDown name="직업" state={job} setState={Set_job} Set_is_open={Set_is_open_job} is_open={is_open_job} 
                  values={["프론트엔드 개발자","백엔드 개발자"]}/>
                  <DropDown name="공부분야" state={study} setState={Set_study} Set_is_open={Set_is_open_study} is_open={is_open_study} 
                  values={["프론트엔드","백엔드","DB","수학","알고리즘","AI"]}/>
                  <button className="btn btn-block btn-info text-white" onClick={update_user}>입력완료</button>
                  </div>

                  
    
  </div>
</div>
                </div>

                
                
            </div>
        </section>


        
        </div>
    </>
  );}

    export default function Page() {
      const [userData, setUserData] = useState(null);
      return (
        <LoginChecker setUserData={setUserData}>
        {!userData?<div className="absolute h-screen w-screen z-50 bg-white bg-opacity-50">
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col h-screen justify-center">
            <div className="text-4xl font-extrabold text-blue-600 tracking-wide">
              Loading...
            </div>
          </div>
        </div>
      </div>:<Edit_profile_Page user={userData} setUserData={setUserData} />
      }
      </LoginChecker>

      );}