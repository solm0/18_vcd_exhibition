import Link from "next/link";
import HomeLists from "./components/HomeLists";
import { HomeData } from "./lib/home";
import { listAxisDeg, listLeft, listTop } from "./lib/pageLayout";
import Guestbook from "./components/Guestbook";

export default function Home() {
  return (
    <div className="w-screen h-screen font-sans">

      {/* 리스트 */}
      <div className={`${listAxisDeg} ${listTop} ${listLeft} absolute pt-150 pb-350 h-[190%] w-260 overflow-y-scroll z-0`}>
        <HomeLists HomeData={HomeData} />
      </div>

      {/* 메뉴 */}
      <div className={`${listAxisDeg} ${listTop} ${listLeft} absolute pt-150 pb-350 h-[190%] w-260 pointer-events-none`}>
        <div className="w-30 h-auto relative -translate-x-54 translate-y-38 flex flex-col leading-7 pointer-events-auto">
          <Link href={'/about'}>
            <p className="underline underline-offset-4 decoration-1 hover:opacity-50">대주제</p>
          </Link>
          <Link href={'/credit'}>
            <p className="underline underline-offset-4 decoration-1 hover:opacity-50">참여한 사람</p>
          </Link>
          <Link href={'/archive'}>
            <p className="underline underline-offset-4 decoration-1 hover:opacity-50">기록</p>
          </Link>
        </div>
      </div>

      <div className="-rotate-30 w-auto h-auto relative translate-x-0 -translate-y-30 flex flex-col leading-7 pointer-events-auto">
        <Guestbook />
      </div>
    </div>
  );
}
