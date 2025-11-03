import Image from "next/image";
import { useState, useEffect } from "react";

export default function Assets({
  assets, setModalOpen,
}: {
  assets: string[];
  setModalOpen: (modalOpen: string | null) => void;
}) {
  return (
    <>
      {assets.map((asset, i) => {
        const ext = asset.split('.')[1].toLowerCase();
        if (!ext) return null;

        const [ratio, setRatio] = useState<number | null>(null);
        const maxHeight = 800;
        
        useEffect(() => {
          const img = new window.Image();
          img.src = asset;
          img.onload = () => {
            const r = img.height / img.width;
            setRatio(r);
          };
        }, [asset]);

        if (!ratio) return null;
        
        // 이미지
        if (['png','jpg','jpeg','gif','webp','avif'].includes(ext)) {
          return (
            <div
              key={i}
              className="relative overflow-hidden flex items-start justify-center hover:cursor-zoom-in w-full max-w-[800px]"
              style={{
                maxHeight: maxHeight,
                aspectRatio: `${1 / ratio}`,
              }}
              onClick={() => setModalOpen(asset)}
            >
              <Image
                src={asset}
                alt={asset}
                fill
                className="object-contain object-left-top"
              />
            </div>
          )
        }

        // 비디오
        if (['mp4', 'webm', 'mov', 'm4v'].includes(ext)) {
          return (
            <video key={i} controls className="w-full max-w-[800px] rounded-lg">
              <source src={asset} type={`video/${ext}`} />
              Your browser does not support the video tag.
            </video>
          );
        }

        // 오디오
        if (['mp3', 'wav', 'ogg'].includes(ext)) {
          return (
            <audio key={i} controls className="w-full">
              <source src={asset} type={`audio/${ext}`} />
              Your browser does not support the audio tag.
            </audio>
          );
        }
      })}
    </>
  )
}