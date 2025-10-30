import type { Metadata } from "next";
import "./globals.css";
import { gowundodum } from "./lib/fonts";

export const metadata: Metadata = {
  title: "Through X",
  description: "국민대학교 제 18회 조형전 시각디자인학과 기획전시",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-[16px] md:text-[17px] lg:text-[18px]">
      <body
        className={`${gowundodum.className} antialiased overflow-hidden fixed`}
      >
        {children}
      </body>
    </html>
  );
}
