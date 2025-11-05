import Map from "@/app/components/2st-layer-pages/Map";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "전시장 지도",
  description: "국민대학교 제 18회 조형전 시각디자인학과 기획전시",
};

export default function MapPage() {
  return <Map />
}