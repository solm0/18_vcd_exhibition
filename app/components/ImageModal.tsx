'use client'

import Image from "next/image";
import { useCallback, useState } from "react";

export default function ImageModal({
  asset, setModalOpen
}: {
  asset: string | null;
  setModalOpen: (modalOpen: string | null) => void;
}) {
  const [scale, setScale] = useState(0.8);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => {
      let next = prev - e.deltaY * 0.001; // scroll up → zoom in
      if (next < 0.5) next = 0.5; // min zoom
      if (next > 5) next = 5;     // max zoom
      return next;
    });
  }, []);

  return (
    <>
      {asset &&
        <div
          className="fixed inset-0 bg-[#000000db] z-70 p-20 flex items-center justify-center"
          onClick={() => setModalOpen(null)}
          onWheel={handleWheel}
        >
          <p className="absolute top-10 left-1/2 -translate-x-1/2 text-white z-80">
            스크롤하여 확대 / 축소
          </p>
          <div
            className="transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            <Image
              src={asset}
              alt={asset}
              width={1000}
              height={1000}
              className="relative object-contain"
            />
          </div>
        </div>
      }
    </>
  )
}