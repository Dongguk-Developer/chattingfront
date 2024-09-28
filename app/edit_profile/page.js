"use client";
const HelloUser = ({username})=>{
  return (<header className="flex justify-between items-center px-4 py-4">
  {/* <h1 className="text-l text-gray-500"><span className="font-bold text-black">{username}</span>님</h1>
  <h1>안녕하세요!</h1> */}
  

 
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

</header>);}

const ChatRooms = ()=>{
  return (
    <div className="mb-8">
  <h2 className="text-lg font-semibold mb-2">나의 채팅방</h2>
  <div className="flex flex-col space-y-3 bg-[rgb(237,237,237)] p-2 rounded-lg shadow-md">
    {/* 채팅방 목록 */}
    <div className="flex items-center p-2 rounded-lg bg-[rgb(217,217,217)] shadow">
      <div className="w-8 h-8 bg-red-500 rounded-full mr-4"></div>
      <div className="flex-1">
        <p className="text-sm font-bold">방 제목</p>
        <p className="text-xs text-gray-500">해시태그</p>
      </div>
    </div>
    <div className="flex items-center p-2 rounded-lg bg-[rgb(217,217,217)] shadow">
      <div className="w-8 h-8 bg-green-500 rounded-full mr-4"></div>
      <div className="flex-1">
        <p className="text-sm font-bold">방 제목</p>
        <p className="text-xs text-gray-500">해시태그</p>
      </div>
    </div>
    <div className="flex items-center p-2 rounded-lg bg-[rgb(217,217,217)] shadow">
      <div className="w-8 h-8 bg-blue-500 rounded-full mr-4"></div>
      <div className="flex-1">
        <p className="text-sm font-bold">방 제목</p>
        <p className="text-xs text-gray-500">해시태그</p>
      </div>
    </div>
  </div>
</div>);
}


export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white overflow-y-auto">
      {/* 모바일 화면을 유지하기 위해 max-w-md 적용, 높이 제한 및 상대적 위치 설정 */}
      <div className="artboard phone-1 max-w-md w-full flex flex-col h-full max-h-screen border rounded-lg shadow-lg overflow-y-auto relative">
        {/* 헤더 */}
        <HelloUser username={"익명 3"}/>

        {/* 나의 채팅방 섹션 */}
        <section className="px-4 py-2 flex-grow overflow-y-auto">
            <div className="flex flex-col items-start">
                <div className="w-full">
                    <div className="bg-gray-600 rounded-full w-24 h-24 flex items-center justify-center mb-4" style={{marginLeft:"auto",marginRight:"auto"}}>
                        <span className="text-white text-xl">프사</span>
                    </div>

                    <div className="mb-8">
  <div className="flex flex-col space-y-3 bg-[rgb(237,237,237)] p-2 rounded-lg shadow-md">
    {/* 채팅방 목록 */}

    <input type="text" placeholder="이름" className="input w-full max-w-xs rounded-lg bg-[rgb(217,217,217)]" />
    <input type="text" placeholder="나이" className="input w-full max-w-xs rounded-lg bg-[rgb(217,217,217)]" />


    <details className="dropdown w-full">
        <summary className="btn w-full" style={{marginLeft:"0px",justifyContent:"left"}}>MBTI
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
                justifyContent:"right"
            }}
            strokeWidth={2}
            strokeLinejoin="round"/>
        </svg>
  </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    {["E", "I"].map((mbti1) =>
      ["N", "S"].map((mbti2) =>
        ["T", "F"].map((mbti3) =>
          ["P", "J"].map((mbti4) => (
            <li key={mbti1 + mbti2 + mbti3 + mbti4}>
              <a>{mbti1 + mbti2 + mbti3 + mbti4}</a>
            </li>
          ))
        )
      )
    )}
  </ul>
    </details>
    <details className="dropdown w-full">
        <summary className="btn w-full" style={{marginLeft:"0px",justifyContent:"left"}}>직업
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
                justifyContent:"right"
            }}
            strokeWidth={2}
            strokeLinejoin="round"/>
        </svg>
  </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a>백엔드 개발자</a></li>
            <li><a>프론트엔드 개발자</a></li>
        </ul>
    </details>
    <details className="dropdown w-full">
        <summary className="btn w-full" style={{marginLeft:"0px",justifyContent:"left"}}>공부분야
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
                justifyContent:"right",
                right:"0px"
            }}
            strokeWidth={2}
            strokeLinejoin="round" />
        </svg>
  </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a>DB</a></li>
            <li><a>Frontend</a></li>
            <li><a>Backend</a></li>
        </ul>
    </details>
  </div>
</div>
                </div>

                
                
            </div>
        </section>


        
      </div>
    </div>
  );}