import Image from "next/image";
import { useState } from "react";

export default function Book({
  pages,
}: {
  pages: string[];
}) {
  const [page, setPage] = useState(0);

  return (
    <>
      <div className="flex w-[40rem]">
        <div
          className="flex-1 relative h-auto flex items-center justify-center shrink-0"
          onClick={() => page > -1 && setPage(prev => prev-2)}
        >
          {page <= -1 ? (
            <div className="absolute w-full h-full"/>
          ): (
            <>
              <div className="absolute w-full h-full bg-linear-to-r from-transparent to-[#00000050]"/>
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
              <div className="absolute w-full h-full bg-linear-to-r from-transparent to-[#00000050]"/>
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

      <div className="w-full flex justify-between">
        <p className="bg-white">책장을 클릭해 넘기세요</p>
        <p className="bg-white">
          {page <= -1
            ? '앞표지'
            : page+2 >= pages.length
              ? '뒷표지'
              : `${page+1}—${page+2}`
          } / 전체 {pages.length-1}장
        </p>
      </div>
    </>
  )
}