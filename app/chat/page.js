"use client";
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [showButtons, setShowButtons] = useState(false);

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://118.35.67.185:8090/test", { method: "post" });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

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
            setMessages([...messages, newMessage]);
            setInputMessage("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col h-full w-full relative">
                <ChatHeader />

                <div className="chat-container flex-1 overflow-y-auto mt-0 p-4">
                    {messages.map((msg, index) => (
                        <ChatBubble
                            key={index}
                            sender={msg.sender}
                            message={msg.message}
                            time={msg.time}
                            isUser={msg.isUser}
                        />
                    ))}
                </div>

                <div className="chat-input flex items-center p-4 bg-white shadow-md">
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

                    <input
                        type="text"
                        placeholder="Type here"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage();
                        }}
                        className="input input-bordered w-full"
                    />

                    <button className="btn btn-square btn-ghost ml-2" onClick={handleSendMessage}>
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
