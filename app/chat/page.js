"use client";
import React, { useState, useEffect,useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import LoginChecker from "../LoginChecker";
import io from "socket.io-client";
import { Cookies } from 'react-cookie';
import {CURRENT_BACKEND} from "../res/path.js";
import { useSearchParams } from 'next/navigation';
import { FileMessageBox } from './FileMessageBox.js';


const ChatPage = ({user,setUserData}) => {
    const searchParams = useSearchParams();

    const scrollContainerRef = useRef(null);

    const [preloaded_messages,setPreloadedMessages] = useState([]);

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [showButtons, setShowButtons] = useState(false);

    const cookies = new Cookies();
    const [message,setMessage] = useState("");
    const [messageList,setMessageList] = useState([]);
    const [room,setRoom] = useState({});    
    const socketRef = useRef(null);
    const [file,setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // 파일 선택
    };
    useEffect(() => {
        const response = fetch(`${CURRENT_BACKEND}/chatroom/get`, {
            method: "POST",
            body: JSON.stringify({
                room_id: searchParams.get("room_code")
            }),
            credentials: "include"
          }).then(async(res)=>{
            let response = await res.json();
            console.log(response)
            setRoom(response)
            // console.log(res.status);
          })
        // /chat/get
        const chat_response = fetch(`${CURRENT_BACKEND}/chat/get`, {
            method: "POST",
            body: JSON.stringify({
                room_id: searchParams.get("room_code")
            }),
            credentials: "include"
          }).then(async(res)=>{
            let response = await res.json();
            setPreloadedMessages(response)
          })
    },[searchParams])
    useEffect(() => {
        if (!socketRef.current) {
            // 처음 렌더링될 때만 소켓을 초기화
            socketRef.current = io(CURRENT_BACKEND, {
              auth: {
                room: searchParams.get("room_code"),
              },
              cors: {
                origin: "*",
                methods: ["GET", "POST"],
              },
              transports: ["websocket", "polling"],
              secure: false,
              withCredentials: true,
            });
      
        const socket = socketRef.current;

        // 'redirect' 이벤트 핸들러
        socket.on("redirect", (destination) => {
            console.log("redirect")
            window.location.href = destination.url + "?redirect_url=" + window.location.pathname + window.location.search;
        });

        // 'connect_success' 이벤트 핸들러
        socket.on("connect_success", (res) => {
            console.log("Connected successfully:", res);
        });

        // 'receive_message' 이벤트 핸들러
        socket.on("receive_message", (received_message) => {
            // console.log("User data:", user.current);
            console.log("Message:",received_message);
            // setMessages((prev)=>prev.concat(received_message))

            if(user!=null){
                // console.log(message.user_id)
                console.log("New message received:", received_message);
                console.log("Me", user.user.user_id);
                console.log("Me2", user);
                console.log("New message received From", received_message.user_id);
                if(user.user.user_id!=received_message.user_id){
                    setMessages((prev)=>prev.concat(received_message))
                    try{
                        let chat = document.getElementsByClassName('chat-container');
                        if(chat){
                          setTimeout(function(){
                            document.getElementsByClassName('chat-container')[0].scrollTop = document.getElementsByClassName('chat-container')[0].scrollHeight;
                          },1)
                        }
                      }
                      catch(err){
                        console.log(err);
                      }
                }
            }
        });

        // 'refresh' 이벤트 핸들러
        socket.on("refresh", () => {
            location.reload(true);
        });
    }
    }, [user,searchParams]);//종속성 배열
    
    const onSendMessage = (event) => {
        event.preventDefault();
        if(inputMessage!=""||file!=null){
            if(file){
                const reader = new FileReader();
                reader.readAsArrayBuffer(file); // 이진 데이터로 읽기
                reader.onload = () => {
                    const fileData = reader.result; // 파일 데이터 (ArrayBuffer)
                    socketRef.current.emit("message",{"room_code":searchParams.get("room_code"),"user":user,"message":inputMessage,"sessionid": cookies.get("sessionid"),"file":file,"filedata":fileData,"fileName": file.name});            
                };
            }
            else{
                socketRef.current.emit("message",{"room_code":searchParams.get("room_code"),"user":user,"message":inputMessage,"sessionid": cookies.get("sessionid"),"file":file});            

            }
            setInputMessage('')
            setFile(null)
            event.target[0].value = '';
        }
    }

    const toggleButtons = () => {
        setShowButtons(!showButtons);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage = {
                message: inputMessage,
                time: new Date().toLocaleTimeString(),
                isUser: true, // 사용자 메시지임을 나타내는 속성 추가
            };
            
            // setMessages([...messages, newMessage]);
            setInputMessage("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col h-full w-full relative" style={{height:"100vh"}}>
                <ChatHeader data={room?room:""}/>
                <div className={showButtons?"chat-container flex-1 overflow-auto mt-0 p-4 mb-72":"chat-container flex-1 overflow-auto mt-0 p-4 mb-20"} ref={scrollContainerRef}>
                    {preloaded_messages.map((msg,index)=>{
                        const isCurrentUser = msg.user.user_id === user.user.user_id;
                        let profileImage = isCurrentUser
                            ? user.profile_image.profile_image_url
                            : msg.profile_image?.profile_image_url;
                        if(index!==0&&preloaded_messages[index-1].user.user_id==msg.user.user_id){
                            profileImage = null
                            msg.user.user_nickname = null
                        }
                        // 메시지가 없는 경우 파일 확인
                        if (!msg.message) {
                            if (msg.file) {
                                return (
                                    <div key={index} className={`message ${isCurrentUser ? "me" : ""}`}>
                                        <FileMessageBox file={msg.file} uid={msg.user.uid} isCurrentUser={isCurrentUser}/>
                                    </div>
                                );
                            }
                        } else {
                            // 메시지가 있고 파일도 있는 경우
                            if (msg.file) {
                                return (
                                    <div key={index} className={`message ${isCurrentUser ? "me" : ""}`}>
                                        <FileMessageBox file={msg.file} uid={msg.user.uid} isCurrentUser={isCurrentUser}/>
                                        <span className="message-content">{msg.message}</span>
                                    </div>
                                );
                            }
                            // 메시지만 있는 경우
                            return (
                                <ChatBubble
                                    key={index}
                                    profile={profileImage}
                                    sender={msg.user.user_nickname}
                                    message={msg.message}
                                    time={msg.time}
                                    isUser={isCurrentUser}
                                />
                            );
                        }
                    })}

                    {messages.map((msg, index) => {
                        // 사용자 확인
                        const isCurrentUser = msg.user.user_id === user.user.user_id;

                        // 프로필 이미지 확인
                        let profileImage = isCurrentUser
                            ? user.profile_image.profile_image_url
                            : msg.profile_image?.profile_image_url;
                        if(index!==0&&messages[index-1].user.user_id==msg.user.user_id){
                            profileImage = null
                            msg.user.user_nickname = null
                        }
                        // 메시지가 없는 경우 파일 확인
                        if (!msg.message) {
                            if (msg.file) {
                                return (
                                    <div key={index} className={`message ${isCurrentUser ? "me" : ""}`}>
                                        <FileMessageBox file={msg.file} uid={msg.user.uid} isCurrentUser={isCurrentUser}/>
                                    </div>
                                );
                            }
                        } else {
                            // 메시지가 있고 파일도 있는 경우
                            if (msg.file) {
                                return (
                                    <div key={index} className={`message ${isCurrentUser ? "me" : ""}`}>
                                        <FileMessageBox file={msg.file} uid={msg.user.uid} isCurrentUser={isCurrentUser}/>
                                        <span className="message-content">{msg.message}</span>
                                    </div>
                                );
                            }
                            // 메시지만 있는 경우
                            return (
                                <ChatBubble
                                    key={index}
                                    profile={profileImage}
                                    sender={msg.user.user_nickname}
                                    message={msg.message}
                                    time={msg.time}
                                    isUser={isCurrentUser}
                                />
                            );
                        }
                    })}

                        
                </div>

                <div className="chat-input flex items-center p-4 bg-white shadow-md" style={{position:"fixed",width:"100%",bottom:showButtons ? "192px" : "0px",}}>
                    <button className="btn btn-square btn-ghost mr-2" onClick={toggleButtons}>
                        {showButtons ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-plus"
                            >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        )}
                    </button>
                    <form onSubmit={onSendMessage} className="w-full flex">

                        <input
                            type="text"
                            placeholder="Type here"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="input input-bordered w-full"
                        />

                        
                    <button className="btn btn-square btn-ghost ml-2" type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-chevron-up"
                            >
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </button>
                    </form>
                </div>

                {showButtons && (
                    <div className="flex flex-col items-center space-y-2 y-8 p-4 gap-1 bg-[#FFF]" style={{position:"fixed",width:"100%",bottom:"0px"}}>
                        <input type="file" className="hidden" id="file" onChange={handleFileChange}></input>
                        <div className="h-4"></div>
                        <div className="h-4"></div>
                        {/* {file?file.split("\\")[file.split("\\").length-1]: */}
                        <label htmlFor="file" className="btn w-44 py-4 inline-block whitespace-nowrap overflow-hidden text-ellipsis">"사진 / 동영상"</label>
                        <div className="h-4"></div>
                        <div className="h-4"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
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
  </div>:<ChatPage user={userData} setUserData={setUserData} />
  
  }
  </LoginChecker>

  );
}
