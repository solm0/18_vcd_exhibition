'use client'

import { useState } from "react";
import { DetailDataProp } from "../lib/detail";
import Content from "./Content";
import ImageModal from "./ImageModal";
import { detailAxisDeg, detailLeft, detailTop } from "../lib/pageLayout";

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
          ${detailAxisDeg} ${detailTop} ${detailLeft}
          absolute py-80 h-[120%] w-240 overflow-y-scroll overflow-x-hidden
          pointer-events-none z-20
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