'use client'

import Image from "next/image";
import { HomeDataProp } from "@/app/lib/home";
import Link from "next/link";
import { useState } from "react";

export default function HomeList({
  project,
}: {
  project: HomeDataProp;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      className='w-auto h-20 xl:h-30 flex gap-4 items-start hover:-translate-x-5 transition-all text-neutral-50 duration-300'
      href={`/${project.id.toLowerCase()}`}
    >
      {/* 제목 */}
      <div className="w-53 break-keep shrink-0 flex justify-end text-right scale-x-95 tracking-normal origin-right">
        <p>{project.title}</p>
      </div>

      <div className="bg-neutral-200 text-neutral-600 w-7 h-7 flex items-center justify-center rounded-full">
        {project.id}
      </div>

      {/* 이미지 */}
      <div
        className="flex h-20 xl:h-30 gap-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* 썸네일 */}
        {hovered ? 
          <div className="absolute w-20 xl:w-30 h-60 xl:h-90 shrink-0 overflow-hidden -rotate-90 origin-top-left translate-y-20">
            <Image
              src={`/thumbnails/${project.id.toLowerCase()}.jpg`}
              alt={project.title}
              width={300}
              height={300}
              className="object-cover h-full"
            />
          </div>
          :
          <div className="absolute w-20 xl:w-30 h-60 xl:h-90 shrink-0 overflow-hidden -rotate-90 origin-top-left translate-y-20">
            <Image
              src={`/thumbnails/effect-${project.id.toLowerCase()}.png`}
              alt={project.title}
              width={300}
              height={300}
              className="object-cover h-full"
            />
          </div>
        }
      </div>

    </Link>
  )
}