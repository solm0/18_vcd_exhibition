import Detail from "../components/Detail";
import HomeLists from "../components/HomeLists";
import { DetailData } from "../lib/detail";
import { HomeData } from "../lib/home";

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const slugLowerCase = slug.toLowerCase();

  const matchedKey = Object.keys(DetailData).find(
    (key) => key.toLowerCase() === slugLowerCase
  );

  if (!matchedKey) return (
    <div className="p-10 text-center text-red-500">
      팀 정보 없음
    </div>
  );

  const detail = matchedKey ? DetailData[matchedKey] : null;

  if (!detail) {
    return (
      <div className="p-10 text-center text-red-500">
        <b>{slugLowerCase}</b>에 대한 정보 없음
      </div>
    );
  }

  const listAxisDeg = 'rotate-[60deg]'
  const listTop = '-top-50';
  const listLeft = 'left-70';
  const detailAxisDeg = '-rotate-[10deg]';
  const detailTop = '-top-25';
  const detailLeft = 'left-80'

  return (
    <div className="w-screen h-screen font-sans">

      {/* 리스트 */}
      <div
        className={`
          ${listAxisDeg} ${listTop} ${listLeft} absolute pt-150 pb-350 h-[190%] w-260 overflow-y-scroll overflow-x-hidden
          z-0
        `}
      >
        <HomeLists HomeData={HomeData} />
      </div>

      <div className="absolute w-full h-full pointer-events-none bg-[#e0e0e090] z-10"></div>

      {/* 상세 */}
      <div
        className={`
          ${detailAxisDeg} ${detailTop} ${detailLeft}
          absolute py-80 h-[120%] w-240 overflow-y-scroll overflow-x-hidden
          pointer-events-none z-20
        `}
      >
        <Detail project={detail} id={matchedKey} />
      </div>
    </div>
  );
}