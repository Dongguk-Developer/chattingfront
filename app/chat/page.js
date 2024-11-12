"use client";
import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatBubble from './ChatBubble';

const ChatPage = () => {
    // 초기 상태는 빈 배열
    const [messages, setMessages] = useState([]);
    const [showButtons, setShowButtons] = useState(false);

    // API에서 메시지를 가져오는 함수
    const fetchMessages = async () => {
        try {
            const response = await fetch('http://118.35.67.185:8090/test', { method: 'post' });// FastAPI 서버의 메시지 엔드포인트
            const data = await response.json();
            console.log(data);
            setMessages(data); // API에서 받아온 데이터를 상태에 저장
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    // 컴포넌트가 처음 렌더링될 때 메시지 가져오기
    useEffect(() => {
        fetchMessages();
    }, []);

    const toggleButtons = () => {
        setShowButtons(!showButtons); // 버튼을 토글하는 함수
    };

    return (
        <div className="flex flex-col items-center justify-center  bg-white">
            <div className="  flex flex-col h-full w-full relative">
                {/* Chat Header */}
                <ChatHeader />

                {/* Chat Messages */}
                <div className="chat-container flex-1 overflow-y-auto mt-0 p-4">
                    {messages.map((msg, index) => (
                        <ChatBubble
                            key={index}
                            sender={msg.sender}
                            message={msg.message}
                            time={msg.time}
                            image={msg.image}
                        />
                    ))}
                </div>

                {/* 입력창 영역 */}
                <div className="chat-input flex items-center p-4 bg-white shadow-md">
                    {/* 왼쪽 버튼 (토글) */}
                    <button className="btn btn-square btn-ghost" onClick={toggleButtons}>
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

                    {/* 입력창 */}
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                    />

                    {/* 오른쪽 버튼 */}
                    <button className="btn btn-square btn-ghost ml-2">
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
                </div>

                {/* 토글된 버튼들 */}
                {showButtons && (
                    <div className="flex flex-col items-center space-y-2 p-4">
                        <button className="btn w-full">사진 / 동영상</button>
                        <button className="btn w-full">플래너</button>
                        <button className="btn w-full">캘린더</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
