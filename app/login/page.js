import Image from "next/image";
import Link from "next/link";
import '../login/login.css'; // 로그인 스타일 가져오기

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white"> {/* 배경색을 흰색으로 설정하고 중앙 정렬 */}
            {/* 아트보드 추가 */}
            <div className="artboard phone-1 flex flex-col h-full"> {/* 아트보드 안에서 요소들을 수직으로 정렬 */}
                <div className="flex-grow flex flex-col items-center justify-center"> {/* 중앙 정렬 유지 */}
                    {/* 로고 이미지 */}
                    <Image 
                        src="/logo.png" // 실제 로고 파일 경로
                        alt="StudyHero"
                        width={126} // 길이를 126px로 설정
                        height={195} // 높이를 195px로 설정
                    />
                    {/* STUDYHERO 텍스트 */}
                    <h1 className="mt-2 text-2xl font-bold studytitle"> {/* 마진 값 수정 */}
                        STUDY HERO
                    </h1>
                </div>

                {/* 카카오 로그인 버튼 */}
                <div className="flex justify-center mb-10"> {/* mb-5로 하단 여백 추가 */}
                    <Link href="/auth/kakao"> {/* 클릭 시 이동할 경로 지정 */}
                        <Image 
                            src="/kakaologin.png" // 카카오 로그인 버튼 이미지 경로
                            alt="카카오로 로그인"
                            width={200} // 적당한 사이즈로 설정 가능
                            height={50} // 적당한 사이즈로 설정 가능
                            className="cursor-pointer" // 커서를 포인터로 변경
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
