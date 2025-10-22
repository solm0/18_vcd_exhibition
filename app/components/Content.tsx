import { DetailDataProp } from "../lib/detail";
import { HomeData } from "../lib/home";
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
    <div className="flex flex-col items-start gap-7 w-auto max-w-[40rem] pointer-events-auto">

      {/* 제목 */}
      <h2 className="font-bold text-3xl bg-white">
        {metadata?.title}
      </h2>

      {/* 태그 */}
      <div className="flex gap-2 bg-white">
        {metadata?.tag.map((tag, i) => (
          <p key={i} className="bg-gray-200 px-2">
            {tag}
          </p>
        ))}
      </div>

      {/* 팀 */}
      <p className="bg-white">{metadata?.id}팀</p>

      {/* 웹사이트 */}
      {project.websites &&
        <div className="flex flex-col gap-2 bg-white">
          {project.websites.map((website, i) => (
            <Link key={i} href={website.link} className="underline underline-offset-4 decoration-1 hover:opacity-50 flex items-center">
              {website.title}↗
            </Link>
          ))}
        </div>
      }

      {/* 참여자 */}
      <div className="flex gap-2 bg-white">
        {project.people.map((person, i) => (
          <p key={i}>
            {person}
            {i+1 !== project.people.length && ','}
          </p>
        ))}
      </div>

      {/* 본문 */}
      {/*
        - 단락구분: 한 줄 비우기
        - 글줄길이: 34자
        - 행송: 1.75rem
      */}
      <div className="flex flex-col gap-7 w-[34rem] bg-white">
        {project.description.map((p, i) => (
          <p key={i} className="break-keep leading-7 text-left">
            {p}
          </p>
        ))}
      </div>

      {/* 에셋 - 책 */}
      <div className="flex flex-col gap-4 items-start">
        <h3 className="bg-white">책</h3>
        {books.map((pages, i) => (
          <Book key={i} pages={pages} />
        ))}
      </div>

      {/* 에셋 - 작품 */}
      <div className="flex flex-col gap-4 items-start">
        <h3 className="bg-white">작품 사진</h3>
        <Assets
          assets={work}
          setModalOpen={setModalOpen}
        />
      </div>

      {/* 에셋 - 전시 */}
      <div className="flex flex-col gap-4 items-start">
        <h3 className="bg-white">전시 사진</h3>
        <Assets
          assets={dp}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  )
}