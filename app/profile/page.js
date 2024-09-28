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
      <p style={{width:"fit-content", display:"inline",fontSize:"small",color:"rgb(128,128,128)"}}>홈</p><br/>
      <span style={{fontSize:"medium"}}>나의 프로필</span>
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


                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">익명 3</h1>
                        <p className="text-gray-500">#나의 #MBTI #직업 #공부분야</p>
                    </div>
                </div>

                
                <div className="divider w-full my-4"></div>
                <button className="text-left font-bold text-black text-lg py-2 mb-2" onClick={function(){location.href="/edit_profile"}}>프로필 편집</button>
                <button className="text-left font-bold text-black text-lg py-2 mb-2">프로필 뱃지 설정</button>
                <button className="text-left font-bold text-black text-lg py-2 mb-2">알림 설정</button>
                <button className="text-left font-bold text-black text-lg py-2 mb-2">시스템 테마</button>
                <button className="text-left font-bold text-black text-lg py-2 mb-2" style={{color:"red"}} onClick={()=>document.getElementById('my_modal_1').showModal()}>회원 탈퇴</button>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-72">
                    <h3 className="font-bold text-lg">회원 탈퇴하기</h3>
                    <p className="py-4">스터디히어로를 탈퇴하실건가요?</p>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn bg-[rgb(229,229,229)] mr-2">취소</button>
                        <button className="btn btn-error">탈퇴하기</button>
                    </form>
                    </div>
                </div>
                </dialog>
            </div>
        </section>


        
      </div>
    </div>
  );}