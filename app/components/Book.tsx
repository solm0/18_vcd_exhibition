import Image from "next/image";
import { useState } from "react";

export default function Book({
  pages,
}: {
  pages: string[];
}) {
  const [page, setPage] = useState(0);
  if (!pages) return;

  return (
    <>
      <div className="flex w-full">
        <div
          className="flex-1 relative h-auto flex items-center justify-center shrink-0"
          onClick={() => page > -1 && setPage(prev => prev-2)}
        >
          {page <= -1 ? (
            <div className="absolute w-full h-full"/>
          ): (
            <>
              <div className="absolute w-full h-full bg-linear-to-r from-transparent to-[#00000050] cursor-w-resize"/>
              <Image
                src={pages[page+1]}
                alt={pages[page+1]}
                width={600}
                height={600}
                className="object-cover"
              />
            </>
          )}
        </div>

        <div
          className="flex-1 relative h-auto flex items-center justify-center shrink-0"
          onClick={() => page+2 < pages.length && setPage(prev => prev+2)}
        >
          {page+2 >= pages.length ? (
            <div className="absolute w-full h-full shrink-0"/>
          ): (
            <>
              <div className="absolute w-full h-full bg-linear-to-r from-transparent to-[#00000050] cursor-e-resize"/>
              <Image
                src={pages[page+2]}
                alt={pages[page+2]}
                width={600}
                height={600}
                className="object-cover"
              />
            </>
          )}
        </div>
      </div>

      <div className="w-full flex justify-between text-neutral-50 text-sm opacity-80 pr-4">
        <p className="animate-pulse">책장을 클릭해 넘겨 보세요</p>
        <div className="flex gap-2">
          <p>전체 {pages.length-1}장 중</p>
          <p>
            {page <= -1
              ? '앞표지'
              : page+2 >= pages.length
                ? '뒷표지'
                : `${page+1}/${page+2}`
            }
          </p>
        </div>
      </div>
    </>
  )
}