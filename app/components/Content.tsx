import { DetailDataProp } from "@/app/lib/detail";
import { HomeData } from "@/app/lib/home";
import Link from "next/link";
import Assets from "./Assets";
import Book from "./Book";

export default function Content({
  project, assets, books, id, setModalOpen
}: {
  project: DetailDataProp;
  assets: string[];
  books: string[][];
  id: string;
  setModalOpen: (modalOpen: string | null) => void;
}) {
  const dp = assets.filter(asset => asset.split('/')[2].split('_')[0] === 'dp');
  const work = assets.filter(asset => asset.split('/')[2].split('_')[0] === 'work');

  const metadata = HomeData.find(project => project.id.toLowerCase() === id.toLowerCase());
  
  return (
    <div className="flex flex-col items-start gap-7 w-full pointer-events-auto">
      {/* 제목 */}
      <h2 className="font-bold text-5xl pb-8 text-neutral-50 scale-x-95 tracking-normal origin-left w-full max-w-[13em] break-keep leading-[1.3em]">
        {metadata?.title}
      </h2>

      {/* 태그 */}
      <div className="flex gap-2 text-sm scale-x-95 tracking-normal origin-left w-full">
        {metadata?.tag.map((tag, i) => (
          <p key={i} className="bg-neutral-200 text-neutral-600 px-3 py-1">
            {tag}
          </p>
        ))}
      </div>

      {/* 팀 */}
      <div className="text-neutral-50 scale-x-95 tracking-normal origin-left w-full flex gap-3 items-start">
        <div className="bg-neutral-200 text-neutral-600 w-7 h-7 flex items-center justify-center rounded-full shrink-0">
          {metadata?.id}
        </div>
        <div className="w-[22rem] md:w-[32rem] flex gap-x-2 break-keep flex-wrap">
          {project.people.map((person, i) => (
            <p key={i}>
              {person}
              {i+1 !== project.people.length && ','}
            </p>
          ))}
        </div>
      </div>

      {/* 웹사이트 */}
      {project.websites &&
        <div className="flex flex-col gap-2 text-neutral-50 w-full animate-bounce items-start">
          {project.websites.map((website, i) => (
            <Link key={i} href={website.link} target="_blank" className="underline underline-offset-4 decoration-1 hover:opacity-50 flex items-center scale-x-95 tracking-normal origin-left">
              {website.title}
            </Link>
          ))}
        </div>
      }

      {/* 본문 */}
      {/*
        - 단락구분: 한 줄 비우기
        - 글줄길이: 34자
        - 행송: 1.75rem
      */}
      <div className="flex flex-col gap-7 w-[22rem] md:w-[32rem] text-neutral-50 scale-x-95 tracking-normal origin-left">
        {project.description.map((p, i) => (
          <p key={i} className="break-keep leading-7 text-left">
            {p}
          </p>
        ))}
      </div>

      {/* 에셋 - 책 */}
      {books.length != 0 &&
        <div className="flex flex-col gap-4 items-start w-full py-8">
          {/* <h3 className=" text-neutral-50 w-full">책</h3> */}
          {books.map((pages, i) => (
            <Book key={i} pages={pages} />
          ))}
        </div>
      }

      {/* 에셋 - 작품 */}
      {work.length != 0 &&
        <div className="flex flex-col gap-4 items-start py-8">
          <h3 className="text-3xl text-neutral-50">상세</h3>
          <Assets
            assets={work}
            setModalOpen={setModalOpen}
          />
        </div>
      }

      {/* 에셋 - 전시 */}
      {dp.length != 0 &&
        <div className="flex flex-col gap-4 items-start py-8">
          <h3 className="text-3xl text-neutral-50">전시 전경</h3>
          <Assets
            assets={dp}
            setModalOpen={setModalOpen}
          />
        </div>
      }
    </div>
  )
}