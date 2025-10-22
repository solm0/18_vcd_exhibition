import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./lib/fonts";

export const metadata: Metadata = {
  title: "Real × Fiction",
  description: "국민대학교 제 18회 조형전 시각디자인학과 기획전시",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.className} antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
