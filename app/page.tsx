import HomeLists from "./components/1st-layer/HomeLists";
import { HomeData } from "./lib/home";
import { listAxisDeg, listRight, listTop } from "./lib/pageLayout";
import Guestbook from "./components/1st-layer/Guestbook";

export default function Home() {
  return (
    <div className="relative w-screen h-screen font-sans bg-neutral-500 text-neutral-50">

      {/* 리스트 */}
      <div className={`fixed ${listAxisDeg} ${listRight} ${listTop} pt-150 pb-350 h-[190%] w-260 overflow-y-scroll overflow-x-visible z-0`}>
        <HomeLists HomeData={HomeData} />
      </div>

      {/* 방명록 */}
      <div className={`fixed ${listAxisDeg} -top-50 left-0 pt-150 pb-350 h-[190%] w-260 pointer-events-none`}>
        <div className="-rotate-90 w-auto h-auto relative -translate-x-160 -translate-y-40 flex flex-col leading-7 pointer-events-none">
          <Guestbook />
        </div>
      </div>
    </div>
  );
}
