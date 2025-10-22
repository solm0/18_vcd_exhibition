import HomeLists from "../components/HomeLists";
import { DetailData } from "../lib/detail";
import { HomeData } from "../lib/home";
import Detail from "../components/Detail";
import { readAssets } from "../lib/readAssets";
import DetailBackground from "../components/DetailBackground";
import { listAxisDeg, listLeft, listTop } from "../lib/pageLayout";

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
  const assets = readAssets(matchedKey);

  if (!detail) {
    return (
      <div className="p-10 text-center text-red-500">
        <b>{slugLowerCase}</b>에 대한 정보 없음
      </div>
    );
  }
  
  return (
    <DetailBackground>

      {/* 리스트 */}
      <div className={`${listAxisDeg} ${listTop} ${listLeft} absolute pt-150 pb-350 h-[190%] w-260 overflow-y-scroll z-0`}>
        <HomeLists HomeData={HomeData} />
      </div>

      <div className="absolute w-full h-full pointer-events-none bg-[#e0e0e090] z-10" />

      {/* 상세 */}
      <Detail
        content={detail}
        assets={assets}
        id={matchedKey}
      />
    </DetailBackground>
  );
}