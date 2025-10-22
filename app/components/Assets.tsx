import Image from "next/image";

export default function Assets({
  assets
}: {
  assets: string[];
}) {
  return (
    <>
      {assets.map((asset, i) => {
        const ext = asset.split('.')[1];
        if (!ext) return null;
        
        // 이미지
        if (['png','jpg','jpeg','gif','webp','avif'].includes(ext)) {
          return (
            <div key={i} className="max-w-200 overflow-hidden">
              <Image
                src={asset}
                alt={asset}
                width={1000}
                height={1000}
                className="object-left-top"
              />
            </div>
          );
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