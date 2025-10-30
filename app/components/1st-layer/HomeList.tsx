import Image from "next/image";
import { HomeDataProp } from "@/app/lib/home";
import Link from "next/link";

export default function HomeList({
  project,
}: {
  project: HomeDataProp;
}) {
  return (
    <Link
      className='w-auto h-20 flex gap-4 items-start hover:-translate-x-3 transition-transform text-neutral-50'
      href={`/${project.id.toLowerCase()}`}
    >
      {/* 제목 */}
      <div className="w-63 break-keep shrink-0 flex justify-end text-right scale-x-95 tracking-normal origin-right">
        <p>{project.title}</p>
      </div>

      {/* 이미지 */}
      <div className="flex h-20 gap-2">
        {/* 썸네일 */}
        <div className="w-50 h-20 shrink-0 overflow-hidden">
          <Image
            src={`/thumbnails/${project.id.toLowerCase()}.png`}
            alt={project.title}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* 나머지 */}
        {/* <ListImages id={project.id} /> */}
      </div>

    </Link>
  )
}