'use client'

import { useState } from "react";
import { DetailDataProp } from "../../lib/detail";
import Content from "../Content";
import ImageModal from "../ImageModal";
import { detailAxisDeg, detailTop, detailTransX } from "../../lib/pageLayout";

export default function Detail({
  content, assets, books, id,
}: {
  content: DetailDataProp;
  assets: string[];
  books: string[][];
  id: string;
}) {
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  
  return (
    <>
      <div
        className={`
          ${detailAxisDeg} ${detailTop} ${detailTransX}
          absolute pt-80 pb-40 h-[120%] overflow-y-scroll overflow-x-hidden
          pointer-events-none z-20
          custom-scrollbar
          custom-scrollbar
          w-[22rem] md:w-[40rem] lg:w-[45rem] 2xl:w-[48rem]
        `}
      >
        <Content
          project={content}
          assets={assets}
          books={books}
          id={id}
          setModalOpen={setModalOpen}
        />
      </div>

      {/* 이미지 모달 */}
      <ImageModal
        asset={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}