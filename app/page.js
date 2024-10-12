"use client";
import Image from "next/image";
import Link from "next/link";
import OpenModal from "./client.js";
// import './main.css'; // 로그인 스타일 가져오기
const HelloUser = ({ username }) => {
  return (
    <header className="flex justify-between items-center px-4 py-4">
      {/* <h1 className="text-l text-gray-500"><span className="font-bold text-black">{username}</span>님</h1>
  <h1>안녕하세요!</h1> */}
      <div className="font-black">
        <span className="text-xs">
          <p style={{ display: "inline" }}>{username}</p>
          <p
            className="text-[rgb(128,128,128)]"
            style={{ display: "inline", margin: "0" }}
          >
            님
          </p>
        </span>
        <p>안녕하세요!</p>
      </div>
      <div className="flex items-center">
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "3px", marginLeft: "3px" }}
        >
          <path
            d="M10.5 19C15.1944 19 19 15.1944 19 10.5C19 5.8056 15.1944 2 10.5 2C5.8056 2 2 5.8056 2 10.5C2 15.1944 5.8056 19 10.5 19Z"
            fill="black"
            stroke="black"
            style={{
              fill: "black",
              fillOpacity: 1,
              stroke: "black",
              strokeOpacity: 1,
            }}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M13.3285 7.17155C12.6046 6.4477 11.6046 6 10.5 6C9.39548 6 8.39548 6.4477 7.67163 7.17155"
            stroke="white"
            style={{
              stroke: "white",
              strokeOpacity: 1,
            }}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6108 16.6108L20.8535 20.8535"
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

        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "3px", marginLeft: "3px" }}
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
        <button
          onClick={function () {
            location.href = "/profile";
          }}
        >
          <div className="w-12 h-12 rounded-full bg-purple-500"></div>
        </button>
      </div>
    </header>
  );
};

const ChatRoom_list = [
  { title: "방 제목 1", hashtags: ["1", "2", "3"], room_code: "1a4ebc32d" },
  { title: "방 제목 2", hashtags: ["2", "3", "4"], room_code: "caddbc32d" },
  { title: "방 제목 3", hashtags: ["3", "4", "5"], room_code: "1dffeac2d" },
  { title: "방 제목 4", hashtags: ["4", "5", "6"], room_code: "1deedbc3d" },
  { title: "방 제목 5", hashtags: ["5", "6", "7"], room_code: "a4effc32d" },
];
const ChatRoom_Ranking_list = [
  { title: "방 제목 1", hashtags: ["1", "2", "3"], room_code: "1a4ebc32d" },
  { title: "방 제목 2", hashtags: ["2", "3", "4"], room_code: "caddbc32d" },
  { title: "방 제목 3", hashtags: ["3", "4", "5"], room_code: "1dffeac2d" },
];
const ChatRooms = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">나의 채팅방</h2>
      <div className="flex flex-col space-y-3 bg-[rgb(237,237,237)] p-2 rounded-lg shadow-md">
        {/* 채팅방 목록 */}

        {ChatRoom_list.map((chatroom, index) => {
          return (
            <>
              <div
                className="flex items-center p-2 rounded-lg bg-[rgb(217,217,217)] shadow"
                onClick={() =>
                  document.getElementById(chatroom.room_code).showModal()
                }
              >
                <div className="w-8 h-8 bg-red-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{chatroom.title}</p>
                  {chatroom.hashtags.map((tag, index) => (
                    <p
                      className="text-xs text-gray-500"
                      style={{ display: "inline" }}
                    >
                      {tag}{" "}
                    </p>
                  ))}
                </div>
              </div>
              <dialog id={chatroom.room_code} className="modal">
                <div className="modal-box w-72">
                  <h3 className="font-bold text-lg">채팅방 입장하기</h3>
                  <p className="py-4">{chatroom.title} 방에 입장하시겠어요?</p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn bg-[rgb(229,229,229)] mr-2">
                        취소
                      </button>
                      <button className="btn bg-[rgb(59,130,246)] text-white">
                        입장하기
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          );
        })}
      </div>
    </div>
  );
};
const ChatRoomRanking = () => {
  return (
    <div className="mb-24">
      <h2 className="text-lg font-semibold mb-2">오늘의 채팅방 랭킹</h2>
      <div className="flex flex-col space-y-3 bg-[rgb(237,237,237)] p-2 rounded-lg shadow-md">
        {ChatRoom_Ranking_list.map((chatroom, index) => {
          return (
            <>
              <div
                className="flex items-center p-2 rounded-lg bg-[rgb(217,217,217)] shadow"
                onClick={() =>
                  document.getElementById(chatroom.room_code).showModal()
                }
              >
                <div className="w-8 h-8 bg-red-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{chatroom.title}</p>
                  {chatroom.hashtags.map((tag, index) => (
                    <p
                      className="text-xs text-gray-500"
                      style={{ display: "inline" }}
                    >
                      {tag}{" "}
                    </p>
                  ))}
                </div>
              </div>
              <dialog id={chatroom.room_code} className="modal">
                <div className="modal-box w-72">
                  <h3 className="font-bold text-lg">채팅방 입장하기</h3>
                  <p className="py-4">{chatroom.title} 방에 입장하시겠어요?</p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn bg-[rgb(229,229,229)] mr-2">
                        취소
                      </button>
                      <button className="btn bg-[rgb(59,130,246)] text-white">
                        입장하기
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          );
        })}
      </div>
    </div>
  );
};
const PlannerIcon = () => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66663 17.5H18.3333"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
      />
      <path
        d="M1.66663 17.5H18.3333"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83337 11.6666H3.33337V17.5H5.83337V11.6666Z"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M11.25 7.5H8.75V17.5H11.25V7.5Z"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M16.6666 2.5H14.1666V17.5H16.6666V2.5Z"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
};
const HomeIcon = () => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 7.5V17.5H16.25V7.5L10 2.5L3.75 7.5Z"
        fill="#3B82F6"
        stroke="#3B82F6"
        style={{
          fill: "#3B82F6",
          fill: "color(display-p3 0.2314 0.5098 0.9647)",
          fillOpacity: 1,
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.91663 12.0834V17.5H12.0833V12.0834H7.91663Z"
        fill="white"
        stroke="white"
        style={{
          fill: "white",
          fillOpacity: 1,
          stroke: "white",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M3.75 17.5H16.25"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};
const CalendarIcon = () => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.25 2.5H3.75C3.05964 2.5 2.5 3.05964 2.5 3.75V16.25C2.5 16.9404 3.05964 17.5 3.75 17.5H16.25C16.9404 17.5 17.5 16.9404 17.5 16.25V3.75C17.5 3.05964 16.9404 2.5 16.25 2.5Z"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="bevel"
      />
      <path
        d="M2.5 9.16663H17.5"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="bevel"
      />
      <path
        d="M12.0834 9.16667V2.5"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="bevel"
      />
      <path
        d="M10.8334 2.5H13.3334"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="bevel"
      />
      <path
        d="M2.5 7.91663V10.4166"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="bevel"
      />
      <path
        d="M17.5 7.91663V10.4166"
        stroke="#3B82F6"
        style={{
          stroke: "#3B82F6",
          stroke: "color(display-p3 0.2314 0.5098 0.9647)",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinejoin="bevel"
      />
    </svg>
  );
};
export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white overflow-y-auto">
      {/* 모바일 화면을 유지하기 위해 max-w-md 적용, 높이 제한 및 상대적 위치 설정 */}
      <div className="artboard phone-1 max-w-md w-full flex flex-col h-full max-h-screen border rounded-lg shadow-lg overflow-y-auto relative">
        {/* 헤더 */}
        <HelloUser username={"익명 3"} />

        {/* 나의 채팅방 섹션 */}
        <section className="px-4 py-2 flex-grow overflow-y-auto">
          <ChatRooms />
          <ChatRoomRanking />
        </section>

        {/* 하단 네비게이션 고정 (artboard 내에 고정) */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t w-full">
          <div className="flex justify-around py-4">
            <button className="flex flex-col items-center">
              <HomeIcon />
              <span className="text-sm text-blue-500">홈</span>
            </button>
            <button className="flex flex-col items-center">
              <CalendarIcon />
              <span className="text-sm text-blue-500">캘린더</span>
            </button>
            <button className="flex flex-col items-center">
              <PlannerIcon />
              <span className="text-sm text-blue-500">플래너</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
