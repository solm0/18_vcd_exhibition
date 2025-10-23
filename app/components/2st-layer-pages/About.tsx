'use client'

import { useState } from "react";
import ImageModal from "../ImageModal";
import Image from "next/image";
import { AboutData } from "../../lib/about";
import Assets from "../Assets";
import { detailAxisDeg, detailTop, detailTransX } from "../../lib/pageLayout";

export default function About({
  assets
}:{
  assets: string[];
}) {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  return (
    <>
      <div
        className={`
          ${detailAxisDeg} ${detailTop} ${detailTransX}
          absolute py-80 h-[120%] w-240 overflow-y-scroll overflow-x-hidden
          pointer-events-none z-20
        `}
      >
        <div className="flex flex-col items-start gap-7 w-auto max-w-[40rem] pointer-events-auto">
          <div
            className="w-full"
            onClick={() => setModalOpen(AboutData.poster)}
          >
            <Image
              src={AboutData.poster}
              alt="기획전 포스터"
              width={1000}
              height={1000}
              className="object-cover"
            />
          </div>

          <h2 className="text-8xl w-full text-center bg-white">
            Real<br/>×<br/>Fiction
          </h2>

          <div className="w-full flex justify-between text-2xl leading-[1.4em] gap-4">
            <div className="flex-1 bg-white">
              <p>국민대학교<br/>제 18회 조형전<br/>시각디자인학과 기획전시</p>
            </div>
            <div className="flex-1 bg-white">
            <p>2025.11.6—<br/>2025.11.15<br/>조형관 418호</p>
            </div>
          </div>

          <div className="flex flex-col gap-7 w-[34rem] bg-white">
            {AboutData.description.map((p, i) => (
              <p key={i} className="break-keep leading-7 text-left">
                {p}
              </p>
            ))}
          </div>

          {AboutData.subject.map((sub, i) => {
            const foundAssets = assets.filter(asset => asset.split('/')[2].split('_')[0] === sub.id);
            console.log(sub, foundAssets)
            
            return (
              <div key={i} className="flex flex-col gap-4 items-start">
                <h3 className="bg-white">{sub.title}</h3>
                <Assets assets={foundAssets} setModalOpen={setModalOpen} />
              </div>
            )
          })}

        </div>
      </div>

      {/* 이미지 모달 */}
      <ImageModal
        asset={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}