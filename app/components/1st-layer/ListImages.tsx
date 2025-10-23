import Image from "next/image";
import { readImages } from "../../lib/readAssets";

export default function ListImages({ id }: { id: string }) {
  const images = readImages(id);

  if (images.length === 0) {
    return <p className="text-gray-500">/public/{id}에 이미지 없음</p>;
  }

  return (
    <div className="w-auto flex gap-2">
      {images.map((src) => (
        <div key={src} className="w-20 shrink-0">
          <Image
            src={src}
            alt={src}
            width={300}
            height={300}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}