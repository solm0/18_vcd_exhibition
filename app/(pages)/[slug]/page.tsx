import { DetailData } from "@/app/lib/detail";
import Detail from "@/app/components/2st-layer-pages/Detail";
import { readAssets, readFolders, readAssetsInBook } from "@/app/lib/readAssets";

// ✅ 빌드 타임에 모든 슬러그 생성
export async function generateStaticParams() {
  const teamNames = Object.keys(DetailData);
  return teamNames.map((slug) => ({
    slug: slug.toLowerCase(),
  }));
}

// ✅ SSG 전용으로 설정 (SSR 비활성화)
export const dynamic = "error";

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
  const bookFolders = readFolders(matchedKey);
  const books = bookFolders.map((book) => readAssetsInBook(matchedKey, book))

  if (!detail) {
    return (
      <div className="p-10 text-center text-red-500">
        <b>{slugLowerCase}</b>에 대한 정보 없음
      </div>
    );
  }
  
  return (
    <Detail
      content={detail}
      assets={assets}
      id={matchedKey}
      books={books}
    />
  );
}