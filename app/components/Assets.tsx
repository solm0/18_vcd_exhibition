import Image from "next/image";
import { useState, useEffect } from "react";

function AssetItem({
  asset, setModalOpen
}: {
  asset: string;
  setModalOpen: (modalOpen: string | null) => void;
}) {
  const ext = asset.split('.')[1].toLowerCase();
  const [ratio, setRatio] = useState<number | null>(null);
  const maxHeight = 800;

  useEffect(() => {
    const img = new window.Image();
    img.src = asset;
    img.onload = () => {
      const r = img.height / img.width;
      setRatio(r);
    };
  }, [asset, ext]);

  if (['png','jpg','jpeg','gif','webp','avif'].includes(ext)) {
    if (!ratio) return null;
    return (
      <div
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

  if (['mp4', 'webm', 'mov', 'm4v'].includes(ext)) {
    return (
      <video controls className="w-full max-w-[800px] rounded-lg">
        <source src={asset} type={`video/${ext}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (['mp3', 'wav', 'ogg'].includes(ext)) {
    return (
      <audio controls className="w-full">
        <source src={asset} type={`audio/${ext}`} />
        Your browser does not support the audio tag.
      </audio>
    );
  }

  return null;
}

export default function Assets({
  assets, setModalOpen,
}: {
  assets: string[];
  setModalOpen: (modalOpen: string | null) => void;
}) {
  return (
    <>
      {assets.map((asset, i) => <AssetItem key={i} asset={asset} setModalOpen={setModalOpen} />)}
    </>
  )
}