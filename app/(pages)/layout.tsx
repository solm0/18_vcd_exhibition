import HomeLists from "../components/1st-layer/HomeLists";
import Back from "../components/Back";
import { HomeData } from "../lib/home";
import { listAxisDeg, listRight, listTop } from "../lib/pageLayout";

export default function SecondLayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen h-screen font-sans bg-neutral-500">

      {/* 리스트 */}
      <div className={`fixed ${listAxisDeg} ${listTop} ${listRight} absolute pt-150 pb-350 h-[190%] w-260 overflow-y-scroll overflow-x-visible z-0 opacity-70`}>
        <HomeLists HomeData={HomeData} />
      </div>

      {/* 회색 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none bg-neutral-500 opacity-80 z-10" />

      {children}

      <Back />
    </div>
  )
}