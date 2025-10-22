import HomeLists from "./components/HomeLists";
import { HomeData } from "./lib/home";

export default function Home() {
  const listAxisDeg = 'rotate-[60deg]'
  const listTop = '-top-50';
  const listLeft = 'left-70';

  return (
    <div className="w-screen h-screen font-sans">
      {/* 리스트 */}
      <div className={`${listAxisDeg} ${listTop} ${listLeft} absolute pt-150 pb-350 h-[190%] w-260 overflow-y-scroll overflow-x-hidden`}>
        <HomeLists HomeData={HomeData} />
      </div>
    </div>
  );
}
