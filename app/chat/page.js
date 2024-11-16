"use client";
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import URLPreview from "./URLPreview"; // URL 미리보기 컴포넌트 추가

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [showButtons, setShowButtons] = useState(false);
    const [isDateModalOpen, setDateModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [fetchType, setFetchType] = useState(""); // 플래너 또는 캘린더 구분용
    const [previewData, setPreviewData] = useState(null); // URL 미리보기 데이터 저장

    // LinkPreview API를 통해 URL 미리보기 데이터 가져오기
    const fetchPreviewData = async (url) => {
        try {
            const response = await fetch(`https://api.linkpreview.net/?key=f7cef8beb9f03366507f1d93e225ece7&q=${url}`);
            const data = await response.json();
            setPreviewData(data); // 미리보기 데이터 저장
        } catch (error) {
            console.error("Failed to fetch preview data:", error);
        }
    };

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
            const urlMatch = inputMessage.match(/(https?:\/\/[^\s]+)/); // 메시지에서 URL 추출
            setPreviewData(null); // 새로운 메시지 입력 시 이전 미리보기 데이터 초기화

            if (urlMatch) {
                fetchPreviewData(urlMatch[0]); // URL 미리보기 데이터 가져오기
            }
            
            const newMessage = {
                message: inputMessage,
                time: new Date().toLocaleTimeString(),
                isUser: true,
            };
            setMessages([...messages, newMessage]);
            setInputMessage("");
        }
    };

    const openDateModal = (type) => {
        setFetchType(type);
        setDateModalOpen(true);
    };

    const fetchDataByDate = async () => {
        const url = fetchType === "planner"
            ? `http://118.35.67.185:8090/planner?date=${selectedDate}`
            : `http://118.35.67.185:8090/calendar?date=${selectedDate}`;

        try {
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();

            const messageContent =
                fetchType === "planner"
                    ? `플래너 공유 - 날짜: ${data.date}, 제목: ${data.title}, 내용: ${data.content}`
                    : `캘린더 공유 - 날짜: ${data.date}, 제목: ${data.title}, 내용: ${data.content}`;

            setMessages([...messages, { message: messageContent, time: new Date().toLocaleTimeString(), isUser: true }]);
            setDateModalOpen(false); 
            setSelectedDate(""); 
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("http://your-server-url/upload", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const newMessage = {
                        message: `사진/동영상 공유: ${data.fileName}`,
                        time: new Date().toLocaleTimeString(),
                        isUser: true,
                    };
                    setMessages([...messages, newMessage]);
                } else {
                    console.error("Failed to upload file");
                }
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col h-full w-full relative">
                <ChatHeader />

                <div className="chat-container flex-1 overflow-y-auto mt-0 p-4">
                    {messages.map((msg, index) => (
                        <React.Fragment key={index}>
                            <ChatBubble
                                sender={msg.sender}
                                message={msg.message}
                                time={msg.time}
                                isUser={msg.isUser}
                            />
                            {previewData && msg && msg.message && msg.message.includes(previewData.url) && (
    <URLPreview data={previewData} />
)}

                        </React.Fragment>
                    ))}
                </div>

                <div className="chat-input flex items-center p-4 bg-white shadow-md">
                    <button className="btn btn-square btn-ghost" onClick={toggleButtons}>
                        {showButtons ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                </div>

                {showButtons && (
                    <div className="flex flex-col items-center space-y-2 p-4">
                        <button className="btn w-full" onClick={() => openDateModal("planner")}>
                            플래너 공유
                        </button>
                        <button className="btn w-full" onClick={() => openDateModal("calendar")}>
                            캘린더 공유
                        </button>
                        <button className="btn w-full">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                사진 / 동영상
                            </label>
                        </button>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                )}

                {isDateModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-md w-80">
                            <h2 className="text-lg font-bold mb-2">날짜 선택</h2>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="input input-bordered w-full mb-4"
                            />
                            <div className="flex justify-end">
                                <button className="btn mr-2" onClick={() => setDateModalOpen(false)}>
                                    취소
                                </button>
                                <button className="btn btn-primary" onClick={fetchDataByDate}>
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
