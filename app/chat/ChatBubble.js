import React from 'react';

const ChatBubble = ({ message, sender, time, image }) => {
  // sender에 따라 avatar 색상 변경
  const getAvatarColor = (sender) => {
    switch (sender) {
      case '익명1':
        return 'bg-red-500'; // 익명1은 빨간색
      case '익명2':
        return 'bg-blue-500'; // 익명2는 파란색
      default:
        return 'bg-gray-500'; // 기본 색상
    }
  };

  return (
    <div className={`flex items-end mb-4 ${sender === '익명3' ? 'flex-row-reverse' : ''}`}>
      {/* Avatar (익명3은 숨김) */}
      {sender !== '익명3' && (
        <div className="avatar mr-2 self-end">
          <div className={`w-10 h-10 rounded-full ${getAvatarColor(sender)}`}></div>
        </div>
      )}

      <div className="flex flex-col">
        {/* 이름과 시간 */}
        <div className="mb-1 flex items-center">
          <span className="font-semibold">{sender === '익명3' ? '' : sender}</span>
          <span className="text-xs text-gray-500 ml-1.5">{time}</span> {/* 이름과 시간 사이의 간격 5px */}
        </div>

        {/* 채팅 내용 */}
        <div className={`relative p-3 rounded-lg shadow-md max-w-md ${sender === '익명3' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
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
