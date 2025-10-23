import DetailBackground from "@/app/components/DetailBackground";
import HomeLists from "@/app/components/HomeLists";
import People from "@/app/components/People";
import { HomeData } from "@/app/lib/home";
import { Metadata } from "next";
import { listAxisDeg, listRight, listTop } from "../lib/pageLayout";

export const metadata: Metadata = {
  title: "참여한 사람",
  description: "국민대학교 제 18회 조형전 시각디자인학과 기획전시",
};

export default function Credit() {
  return (
    <DetailBackground>

      {/* 리스트 */}
      <div className={`${listAxisDeg} ${listTop} ${listRight} absolute pt-150 pb-350 h-[190%] w-260 overflow-y-scroll z-0`}>
        <HomeLists HomeData={HomeData} />
      </div>

      <div className="absolute w-full h-full pointer-events-none bg-[#e0e0e090] z-10" />

      <People />
    </DetailBackground>
  );
}