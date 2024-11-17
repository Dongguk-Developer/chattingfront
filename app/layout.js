import localFont from "next/font/local";
import "./globals.css";
import {Suspense} from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "스터디히어로",
  description: "스터디 그룹 매칭",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Suspense fallback={<>Loading...</>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
