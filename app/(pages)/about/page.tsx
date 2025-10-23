import About from "@/app/components/2st-layer-pages/About";
import { readAssets } from "@/app/lib/readAssets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "대주제",
  description: "국민대학교 제 18회 조형전 시각디자인학과 기획전시",
};

const assets = readAssets('about');

export default function AboutPage() {
  return <About assets={assets} />
}