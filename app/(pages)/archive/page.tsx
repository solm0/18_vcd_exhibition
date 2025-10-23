import Archive from "@/app/components/2st-layer-pages/Archive";
import { readAssets } from "@/app/lib/readAssets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "기록",
  description: "국민대학교 제 18회 조형전 시각디자인학과 기획전시",
};

const assets = readAssets('archive');

export default function ArchivePage() {
  return <Archive assets={assets} />
}