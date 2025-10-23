import Image from "next/image";
import DetailBackground from "../components/DetailBackground";
import HomeLists from "../components/HomeLists";
import { HomeData } from "../lib/home";
import About from "../components/About";
import { readAssets } from "../lib/readAssets";
import { Metadata } from "next";
import { listAxisDeg, listRight, listTop } from "../lib/pageLayout";

export const metadata: Metadata = {
  title: "대주제",
  description: "국민대학교 제 18회 조형전 시각디자인학과 기획전시",
};

const assets = readAssets('about');

export default function AboutPage() {
  return (
    <DetailBackground>

      {/* 리스트 */}
      <div className={`${listAxisDeg} ${listTop} ${listRight} absolute pt-150 pb-350 h-[190%] w-260 overflow-y-scroll z-0`}>
        <HomeLists HomeData={HomeData} />
      </div>

      <div className="absolute w-full h-full pointer-events-none bg-[#e0e0e090] z-10" />

      {/* 대주제에 대한 설명 */}
      <About assets={assets} />
    </DetailBackground>
  );
}