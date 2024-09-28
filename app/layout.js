import "./globals.css";

export const metadata = {
  title: "스터디히어로",
  description: "스터디 그룹 매칭",
};

export default function Rootdirectory({ children }) {
  return (
    <html lang="kr">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
