'use client'

import { useState } from "react";
import ImageModal from "../ImageModal";
import Assets from "../Assets";
import { ArchiveData } from "../../lib/archive";
import { detailAxisDeg, detailTop, detailTransX } from "../../lib/pageLayout";

export default function Archive({
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
          absolute pt-80 pb-40  h-[120%] overflow-y-scroll overflow-x-hidden
          pointer-events-none z-20
          text-neutral-50
          custom-scrollbar
          w-[22rem] md:w-[40rem] lg:w-[45rem]
        `}
      >
        <div className="flex flex-col items-start gap-7 w-auto max-w-[40rem] pointer-events-auto">
          <h2 className="text-5xl w-auto scale-x-95 tracking-normal origin-left">
            기록
          </h2>

          {ArchiveData.subject.map((sub, i) => {
            const foundAssets = assets.filter(asset => asset.split('/')[2].split('_')[0] === sub.id);
            console.log(sub.id, foundAssets)
            
            return (
              <div key={i} className="flex flex-col gap-4 items-start py-8">
                <h3 className="scale-x-95 tracking-normal origin-left text-3xl">{sub.title}</h3>
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