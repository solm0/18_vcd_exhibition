import { DetailData } from "@/app/lib/detail";
import Detail from "@/app/components/2st-layer-pages/Detail";

// ✅ 빌드 타임에 모든 슬러그 생성
export async function generateStaticParams() {
  const teamNames = Object.keys(DetailData);
  return teamNames.map((slug) => ({
    slug: slug.toLowerCase(),
  }));
}

// ✅ SSG 전용으로 설정 (SSR 비활성화)
export const dynamic = "force-static";

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
  const { readAssets, readFolders, readAssetsInBook } = await import('@/app/lib/server/readAssetsCloudinary');

  const detail = matchedKey ? DetailData[matchedKey] : null;
  const assets = await readAssets(matchedKey);
  const bookFolders = await readFolders(matchedKey);
  const books = await Promise.all(
    bookFolders.map((book) => readAssetsInBook(matchedKey, book))
  );

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