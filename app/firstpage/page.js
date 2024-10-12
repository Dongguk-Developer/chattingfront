"use client"; // 클라이언트 컴포넌트로 지정

import Image from "next/image";
import Link from "next/link";
import '../firstpage/firstpage.css';

export default function FirstPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
            <div className="artboard phone-1 flex flex-col h-full relative">
                {/* 상단 화살표 이미지 */}
                <div className="absolute top-0 left-0 p-4">
                    <Link href="/login">
                        <Image
                            src="/pagenation.png" // pagenation.png 경로를 설정
                            alt="뒤로가기 버튼"
                            width={30} // 이미지 너비
                            height={30} // 이미지 높이
                        />
                    </Link>
                </div>

                {/* 추가적인 내용 */}
            </div>
        </div>
    );
}
