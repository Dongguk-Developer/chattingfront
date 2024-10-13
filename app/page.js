import Link from "next/link";

export default function Page() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="p-4">
        <h1>스터디히어로 - 메인 페이지</h1>
        {/* 채팅 페이지로 이동하는 버튼 */}
        <Link href="/chat">
          <button className="btn btn-primary">Go to Chat</button>
        </Link>
      </div>
    </div>
  );
}
