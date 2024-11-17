"use client";
import Image from "next/image";
import Link from "next/link";
import LoginChecker from "./LoginChecker";
import { useState,useRef,useEffect } from "react";
import { CURRENT_BACKEND } from "./res/path.js";
import {CalendarIcon,HomeIcon,PlannerIcon} from "./components/icons.js"
const HelloUser = ({user})=>{
  const userRef = useRef(user); 
  const [profilePicture, setProfilePicture] = useState(null);
  const [title,set_title] = useState("");
  const [hashtag,set_hashtag] = useState("");

  const CreateChatRoom = () => {document.getElementById("create").showModal()};
  const Create_And_Join = () => {
    
    const response = fetch(`${CURRENT_BACKEND}/chatroom/create`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        hashtag: hashtag
      }),
      credentials: "include"
    }).then(async(res)=>{
      let response = await res.json();
      console.log(response)
      console.log(res.status);
      if(res.status==200){
        location.href="/chat?room_code="+response['room_id'];
      }
    })
  }


  useEffect(() => {
    userRef.current = user; // user가 변경될 때마다 userRef를 업데이트
  }, [user]);
  useEffect(()=>{
    console.log(user);
    if(user&&user.profile_image.profile_image_url!==null){
      setProfilePicture(user.profile_image.profile_image_url)
    }
  },[user])

  return (
  <header className="flex justify-between items-center px-4 py-4">
    <div className="font-black">
      <span className="text-xs"><p className="inline">{user ? `${user.user.user_nickname}` : "Loading..."}</p><p className="text-[rgb(128,128,128)]" style={{display:"inline",margin:"0"}}>님</p></span>
      <p>안녕하세요!</p>
    </div>
    <div className="flex items-center">

    
    
    <dialog id="create" className="modal">
        <div className="modal-box w-72">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg">채팅방 생성하기</h3>
            <div className="py-0 my-0 px-0">
              <form method="dialog">
                <div className="flex flex-col gap-2">
                  <input className="bg-[rgb(229,229,229)] mr-2 rounded-md p-2" placeholder="채팅방 제목을 입력해주세요" onChange={(event) => {set_title(event.target.value);}} value={title}/>
                  <input className="bg-[rgb(229,229,229)] mr-2 rounded-md p-2" placeholder="해시태그를 입력해주세요" onChange={(event) => {set_hashtag(event.target.value);}} value={hashtag}/>
                  <div className="flex flex-row gap-2">
                    <button className="btn bg-[rgb(59,130,246)] text-white" onClick={Create_And_Join}>생성 및 입장하기</button>
                    <button className="btn bg-[rgb(229,229,229)] px-7">취소</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </dialog>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{marginRight:"3px",marginLeft:"3px"}}
      onClick={CreateChatRoom}
    >
      <path
        d="M12.0303 5L12.012 19"
        stroke="black"
        style={{
          stroke: "black",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12H19"
        stroke="black"
        style={{
          stroke: "black",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <button onClick={function(){location.href="/profile"}}>
      <div className="w-12 h-12 rounded-full">
      {profilePicture ? (
                        <img 
                            src={profilePicture} 
                            alt="프로필 사진" 
                            className="mask mask-circle" 
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                        />) : (
                        <></>)}
</div>
          
  </button>
    </div>
  </header>);}



  
  const ChatRooms = ()=>{
    const [ChatRoom_list,Set_ChatRoom_list] = useState([]);
    
    const get_chatrooms = async () => {
      try {
        const response = await fetch(`${CURRENT_BACKEND}/chatroom/get/all`, {
          method: "POST",
          credentials: "include", // 쿠키를 포함해서 요청
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const data = await response.json(); // JSON 형식으로 변환
        console.log(data)
        Set_ChatRoom_list(data)
      
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    useEffect(()=>{
      get_chatrooms();
    },[])
    return (
      <div className="mb-8">
    <h2 className="text-lg font-semibold mb-2">나의 채팅방</h2>
    <div className="flex flex-col space-y-3 bg-[rgb(237,237,237)] p-2 rounded-lg shadow-md">
      {/* 채팅방 목록 */}
      {ChatRoom_list.length==0?<div className="flex justify-center py-6"><div>
        현재 채팅방이 없습니다 새로 만들거나 참여해보세요</div></div>:ChatRoom_list.map((chatroom,index)=>{
          return (<div key={index}><div className="flex items-center p-2 rounded-lg bg-[rgb(217,217,217)] shadow" onClick={()=>document.getElementById(chatroom.room_id).showModal()}>
          <div className="w-8 h-8 bg-red-500 rounded-full mr-4"></div>
          <div className="flex-1">
            <p className="text-sm font-bold">{chatroom.title}</p>
            {chatroom.hashtags.map((tag, index2) => (
              <p className="text-xs text-gray-500 inline" key={index2}>{tag} </p>
            ))}
          </div>
        </div>
        <dialog id={chatroom.room_id} className="modal">
            <div className="modal-box w-72">
                <h3 className="font-bold text-lg">채팅방 입장하기</h3>
                <p className="py-4">{chatroom.title} 방에 입장하시겠어요?</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn bg-[rgb(229,229,229)] mr-2">취소</button>
                    <button className="btn bg-[rgb(59,130,246)] text-white" onClick={()=>{location.href=`/chat?room_code=${chatroom.room_id}`}}>입장하기</button>
                </form>
                </div>
            </div>
        </dialog></div>);
      })}
      

    </div>
  </div>);
}
const ChatRoomRanking = ()=>{
  const [ChatRoom_Ranking_list,Set_ChatRoom_Ranking_list] = useState([]);
  const get_chatrooms = async () => {
    try {
      const response = await fetch(`${CURRENT_BACKEND}/ranking/get`, {
        method: "POST",
        credentials: "include", // 쿠키를 포함해서 요청
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json(); // JSON 형식으로 변환
      console.log(data);
      Set_ChatRoom_Ranking_list(data)
    
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  useEffect(()=>{
    get_chatrooms();
  },[])
  return (<div className="mb-8">
  <h2 className="text-lg font-semibold mb-2">오늘의 채팅방 랭킹</h2>
  <div className="flex flex-col space-y-3 bg-[rgb(237,237,237)] p-2 rounded-lg shadow-md">
  {ChatRoom_Ranking_list.length==0?<div className="flex justify-center py-6"><div>
        채팅방 랭킹 정보가 없습니다</div></div>:ChatRoom_Ranking_list.map((chatroom,index)=>{
        return (<div key={index}><div className="flex items-center p-2 rounded-lg bg-[rgb(217,217,217)] shadow" onClick={()=>document.getElementById(chatroom.room_id).showModal()}>
        <div className="w-8 h-8 bg-red-500 rounded-full mr-4"></div>
        <div className="flex-1">
          <p className="text-sm font-bold">{chatroom.room_name}</p>
          <p className="text-xs text-gray-900 inline mr-1 font-bold">#{chatroom.total_xp}<p className="text-xs text-gray-900 inline font-bold">xp</p></p>
          {chatroom.hashtags.map((tag, index2) => (
            <p className="text-xs text-gray-500 inline font-bold" key={index2}>#{tag} </p>
          ))}
        </div>
      </div>
      <dialog id={chatroom.room_id} className="modal">
            <div className="modal-box w-72">
                <h3 className="font-bold text-lg">채팅방 입장하기</h3>
                <p className="py-4">{chatroom.title} 방에 입장하시겠어요?</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn bg-[rgb(229,229,229)] mr-2">취소</button>
                    <button className="btn bg-[rgb(59,130,246)] text-white" onClick={()=>{location.href=`/chat?room_code=${chatroom.room_id}`}}>입장하기</button>
                </form>
                </div>
            </div>
        </dialog></div>);
    })}
  </div>
</div>)
}

const MainPage = ({user,setUserData}) => {
  if(user){
    return (

        <div className={`${user ? "display" : "hidden"} h-screen flex flex-col w-full`}>
    
          {/* 헤더 */}
          <HelloUser user={user}/>
    
          {/* 나의 채팅방 섹션 */}
          <section className="px-4 py-2 flex-grow overflow-y-auto">
          <ChatRooms/>
          <ChatRoomRanking/>
          </section>
    
    
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t w-full h-30">
            <div className="flex justify-around py-4">
              <button className="flex flex-col items-center" onClick={()=>{location.href="/"}}>
                <HomeIcon/>
                <span className="text-sm text-blue-500">홈</span>
              </button>
              <button className="flex flex-col items-center" onClick={()=>{location.href="/calendar"}}>
                <CalendarIcon/>
                <span className="text-sm text-blue-500">캘린더</span>
              </button>
              <button className="flex flex-col items-center" onClick={()=>{location.href="/studyplanner"}}>
                <PlannerIcon/>
                <span className="text-sm text-blue-500">플래너</span>
              </button>
            </div>
          </nav>
        </div>
    )
  }
  else{
    return (<div className="flex flex-col">
      <div className="flex align-middle">
        <div>
          loading...
        </div>
      </div>
    </div>)
  }
}
export default function Page() {
  const [userData, setUserData] = useState(null);
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   return localStorage.getItem("isDarkMode") || "Light";
  // });

  // useEffect(() => {
  //   document.documentElement.classList.toggle("dark", isDarkMode === "Dark");
  // }, [isDarkMode]);

  // const toggleTheme = () => {
  //   const newTheme = isDarkMode === "Light" ? "Dark" : "Light";
  //   setIsDarkMode(newTheme);
  //   localStorage.setItem("isDarkMode", newTheme);
  // };

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
      </div>:
      <MainPage user={userData} setUserData={setUserData} />
      }
      </LoginChecker>
  );}