import People from "@/app/components/2st-layer-pages/People";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "참여한 사람",
  description: "국민대학교 제 18회 조형전 시각디자인학과 기획전시",
};

export default function Credit() {
  return <People />
}