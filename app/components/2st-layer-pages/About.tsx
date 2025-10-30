'use client'

import { useState } from "react";
import ImageModal from "../ImageModal";
import Image from "next/image";
import { AboutData } from "../../lib/about";
import Assets from "../Assets";
import { detailAxisDeg, detailTop, detailTransX } from "../../lib/pageLayout";
import { throughx } from "@/app/lib/fonts";

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
          absolute py-80 h-[120%] overflow-y-scroll overflow-x-hidden
          pointer-events-none z-20
          text-neutral-50
          custom-scrollbar
          w-[22rem] md:w-[40rem] lg:w-[45rem]
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

          <div className={`${throughx.className} w-full text-center flex flex-col pb-20`}>
            <h2 className="text-8xl md:text-[10rem] pb-4 md:pb-6 lg:pb-10 duration-300">throughX</h2>
            <div className="w-full flex justify-between text-4xl md:text-5xl">
              <p>2025.11.06-15</p>
              10:00-19:00
            </div>
          </div>


          <div className="w-full flex justify-between text-base md:text-2xl leading-[1.4em] gap-4">
            <div className="flex-1 ">
              <p className="scale-x-95 tracking-normal origin-left">국민대학교<br/>제 18회 조형전<br/>시각디자인학과 기획전시</p>
            </div>
            
            <div className="flex-1 ">
              <div className="scale-x-95 tracking-normal origin-left">
                <p>조형관 1층, 4층 일대</p>
                <p>Kookmin University<br/>College of Design 1F, 4F</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7 w-[22rem] md:w-[32rem] scale-x-95 tracking-normal origin-left">
            {AboutData.description.map((p, i) => (
              <p key={i} className="break-keep leading-7 text-left">
                {p}
              </p>
            ))}
          </div>

          {AboutData.subject.map((sub, i) => {
            const foundAssets = assets.filter(asset => asset.split('/')[2].split('_')[0] === sub.id);
            
            return (
              <div key={i} className="flex flex-col gap-4 items-start">
                <h3 className="scale-x-95 tracking-normal origin-left">
                  {sub.title}
                </h3>
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