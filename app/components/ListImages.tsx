import fs from "fs";
import path from "path";
import Image from "next/image";

export default function ListImages({ id }: { id: string }) {
  const dir = path.join(process.cwd(), "public", id);

  let images: string[] = [];
  if (fs.existsSync(dir)) {
    images = fs
      .readdirSync(dir)
      .filter((file) => /\.(png|jpg|jpeg|gif|webp|avif)$/i.test(file))
      .map((file) => `/${id}/${file}`)
      .slice(0, 7)
  }

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