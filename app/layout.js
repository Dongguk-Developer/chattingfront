import "./globals.css";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata = {
  title: "스터디히어로",
  description: "스터디 그룹 매칭",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );
}
