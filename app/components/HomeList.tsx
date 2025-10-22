import Image from "next/image";
import type { HomeDataProp } from "../lib/home";
import Link from "next/link";
import ListImages from "./ListImages";

export default function HomeList({
  project,
}: {
  project: HomeDataProp;
}) {
  return (
    <Link
      className='w-auto h-20 flex gap-4 items-start hover:-translate-x-3 transition-transform'
      href={`/${project.id.toLowerCase()}`}
    >
      {/* 제목 */}
      <div className="w-63 break-keep shrink-0 flex justify-end text-right">
        <p>{project.title}</p>
      </div>

      {/* 이미지 */}
      <div className="flex h-20 gap-2">
        {/* 썸네일 */}
        <div className="w-20 shrink-0">
          <Image
            src={`/thumbnails/${project.id}.png`}
            alt={project.title}
            width={300}
            height={300}
            className="object-cover"
          />
        </div>

        {/* 나머지 */}
        <ListImages id={project.id} />
      </div>

    </Link>
  )
}