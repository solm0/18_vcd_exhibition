import { throughx } from "@/app/lib/fonts";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="w-96 flex flex-col gap-24 text-neutral-50">

      {/* 2층 */}
      <div className={`${throughx.className} flex flex-col w-xl`}>
        {/* 기획전 제목 */}
        <h1 className="text-[10rem] origin-left">
          throughX
        </h1>

        {/* 날짜 */}
        <div className="w-full flex justify-between text-5xl">
          <p>2025.11.06-15</p>
          10:00-19:00
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
        <div className="absolute left-[calc(100%+1/6*100%+3rem)] flex gap-4">
          <div className="w-16">KMU DESIGN</div>
          <div className="w-16">국민대<br />로고</div>
        </div>
      </div>
    </header>
  )
}