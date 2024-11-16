import React from 'react';

const ChatBubble = ({ message, sender, time, image, isUser }) => {
  return (
    <div className={`flex items-end mb-4 ${isUser ? 'justify-end' : ''}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="avatar mr-2 self-end">
          <div className="w-10 h-10 rounded-full bg-gray-500"></div> {/* 아바타에 기본 회색 색상 */}
        </div>
      )}

      <div className="flex flex-col">
        {/* 이름과 시간 */}
        <div className="mb-1 flex items-center">
          {!isUser && <span className="font-semibold">{sender}</span>}
          <span className="text-xs text-gray-500 ml-1.5">{time}</span>
        </div>

        {/* 채팅 내용 */}
        <div
          className={`relative p-3 rounded-lg shadow-md max-w-md ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {image ? (
            <img src={image} alt="chat" className="rounded-lg" />
          ) : (
            <p>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;