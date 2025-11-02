import { throughx } from "@/app/lib/fonts";
import Menu from "./Menu";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-96 flex flex-col gap-24 text-neutral-50">

      {/* 2층 */}
      <div className={`${throughx.className} flex flex-col w-96 md:w-md lg:w-xl`}>
        {/* 기획전 제목 */}
        <h1 className="text-8xl md:text-9xl lg:text-[10rem] origin-left pb-4 md:pb-6 lg:pb-10 duration-300">
          throughX
        </h1>

        {/* 날짜 */}
        <div className="w-full flex justify-between text-4xl md:text-4xl lg:text-5xl">
          <p>2025.11.06-15</p>
          <p>10:00-19:00</p>
        </div>

      </div>

      {/* 1층 */}
      <div className="relative w-full grid grid-cols-6 gap-4 overflow-visible">
        {/* 기획전 정보 */}
        <div className="col-span-2">
          <p className="scale-x-95 tracking-normal origin-left text-[14px] leading-4">
            국민대학교<br/>제 18회 조형전<br/>시각디자인학과<br/>기획전시
          </p>
        </div>

        {/* 메뉴 */}
        <div className="col-span-3">
          <Menu />
        </div>

        {/* 장소 */}
        <div className="absolute left-[calc(2/3*100%+1rem)] w-2/3 scale-x-95 tracking-normal origin-left">
          <p>조형관 1층, 4층 일대<br/>Kookmin University<br/>College of Design 1F, 4F</p>
        </div>

        {/* 로고 */}
        <div className="absolute left-[calc(100%+1/6*100%+3rem)] flex gap-4 h-auto w-auto">
          <Image src={'/logo.svg'} alt="logo" width={100} height={100} />
        </div>
      </div>
    </header>
  )
}