import React, { useState } from 'react';

const ChatHeader = () => {
  const [isBannerOpen, setBannerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // 상태 관리: 아이콘 변경
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // 나가기 모달

  const toggleBanner = () => {
    setBannerOpen(!isBannerOpen);
  };

  // 아이콘 변경 함수
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // 신고 모달 열기
  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  // 나가기 모달 열기
  const openExitModal = () => {
    setIsExitModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsReportModalOpen(false);
    setIsExitModalOpen(false);
  };

  const closeBanner = () => {
    setBannerOpen(false);
  };

  return (
    <div className="navbar bg-base-100 relative">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={() => window.location.href = '/'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <a className="text-xl font-semibold">채팅방 이름</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={toggleBanner}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {/* 배너가 열렸을 때만 표시 */}
      {isBannerOpen && (
        <div
          className="absolute top-0 right-0 w-64 bg-gray-200 transform transition-transform duration-300 z-50 flex flex-col justify-between"
          style={{ height: 'calc(100vh)' }}
        >
          <div className="flex flex-col items-center p-4 mt-6">
            {/* 프사 */}
            <div className="rounded-full bg-gray-800 text-white flex items-center justify-center w-20 h-20 mb-2">
              <span className="text-lg">프사</span>
            </div>
            <h2 className="text-xl font-semibold mb-1">채팅방 이름</h2>
            <p className="text-sm text-gray-500 mb-4">채팅방 해시태그</p>
            <hr className="w-full border-gray-400 mb-4" />
            <div className="w-full text-left">
              <p className="text-lg font-medium mb-2">참여자</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span> 익명 1
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-blue-500 mr-2"></span> 익명 2
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-purple-500 mr-2"></span> 익명 3 (나)
                </li>
              </ul>
            </div>
          </div>

          {/* 하단 메뉴 버튼들 */}
          <ul className="menu menu-horizontal bg-base-200 rounded-box p-2 flex justify-around absolute bottom-0 left-0 w-full">
            <li>
              <button onClick={toggleMute}>
                {isMuted ? (
                  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_37_2115)">
                      <path d="M12 1.66669C8.77833 1.66669 6.16667 4.27835 6.16667 7.50002V15.8334H17.8333V7.50002C17.8333 4.27835 15.2217 1.66669 12 1.66669Z" fill="white" />
                      <path d="M6.16667 15.8334V7.50002C6.16667 4.27835 8.77833 1.66669 12 1.66669C15.2217 1.66669 17.8333 4.27835 17.8333 7.50002V15.8334M3.66667 15.8334H20.3333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 18.3333C13.1506 18.3333 14.0833 17.4006 14.0833 16.25V15.8333H9.91667V16.25C9.91667 17.4006 10.8494 18.3333 12 18.3333Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <line x1="1.03531" y1="19.2938" x2="21.2938" y2="0.96469" stroke="white" strokeLinecap="round" />
                    <defs>
                      <clipPath id="clip0_37_2115">
                        <rect width="20" height="20" fill="white" transform="translate(2)" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3333 1.66669C7.11167 1.66669 4.5 4.27835 4.5 7.50002V15.8334H16.1667V7.50002C16.1667 4.27835 13.555 1.66669 10.3333 1.66669Z" fill="black" />
                    <path d="M4.5 15.8334V7.50002C4.5 4.27835 7.11167 1.66669 10.3333 1.66669C13.555 1.66669 16.1667 4.27835 16.1667 7.50002V15.8334M2 15.8334H18.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.3333 18.3333C11.4839 18.3333 12.4167 17.4006 12.4167 16.25V15.8333H8.25V16.25C8.25 17.4006 9.18275 18.3333 10.3333 18.3333Z" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>

            {/* 신고 모달 */}
            <li>
              <button onClick={openReportModal}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1_1324)">
                    <path d="M9.99999 18.3334C12.3012 18.3334 14.3845 17.4006 15.8925 15.8926C17.4006 14.3845 18.3333 12.3012 18.3333 10C18.3333 7.69885 17.4006 5.61552 15.8925 4.10746C14.3845 2.59943 12.3012 1.66669 9.99999 1.66669C7.69882 1.66669 5.61549 2.59943 4.10743 4.10746C2.5994 5.61552 1.66666 7.69885 1.66666 10C1.66666 12.3012 2.5994 14.3845 4.10743 15.8926C5.61549 17.4006 7.69882 18.3334 9.99999 18.3334Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 15.4166C10.5753 15.4166 11.0417 14.9503 11.0417 14.375C11.0417 13.7997 10.5753 13.3333 10 13.3333C9.42472 13.3333 8.95834 13.7997 8.95834 14.375C8.95834 14.9503 9.42472 15.4166 10 15.4166Z" fill="#EDEDED" />
                    <path d="M10 5V11.6667" stroke="#EDEDED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1324">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </li>

            {/* 나가기 모달 */}
            <li>
              <button onClick={closeBanner}>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6667 18.3334C15.2691 18.3334 19 14.6024 19 10C19 5.39765 15.2691 1.66669 10.6667 1.66669C6.06432 1.66669 2.33336 5.39765 2.33336 10C2.33336 14.6024 6.06432 18.3334 10.6667 18.3334Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M13.0236 7.64301L8.3096 12.357" stroke="#EDEDED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.30972 7.64301L13.0238 12.357" stroke="#EDEDED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          </ul>

          {/* 모달 창 */}
          {isReportModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md w-80">
                <h2 className="text-lg font-bold mb-2">채팅방 나가기</h2>
                <p className="mb-4">채팅방을 나가시겠습니까?</p>
                <div className="flex justify-end">
                  <button className="btn mr-2" onClick={closeModal}>취소</button>
                  <button className="btn btn-error" onClick={closeModal}>나가기</button>
                </div>
              </div>
            </div>
          )}

          {/* {isExitModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md w-80">
                <h2 className="text-lg font-bold mb-2">채팅방 나가기</h2>
                <p className="mb-4">채팅방을 나가시겠습니까?</p>
                <div className="flex justify-end">
                  <button className="btn mr-2" onClick={closeModal}>취소</button>
                  <button className="btn btn-error" onClick={closeModal}>나가기</button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
