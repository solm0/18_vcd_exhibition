import { DetailData } from "@/app/lib/detail";
import Detail from "@/app/components/2st-layer-pages/Detail";
import { readAssets as readAssetsLocal, readFolders as readFoldersLocal, readAssetsInBook as readAssetsInBookLocal } from "@/app/lib/readAssets";
import { readAssets as readAssetsCloud, readFolders as readFoldersCloud, readAssetsInBook as readAssetsInBookCloud } from "@/app/lib/readAssetsCloudinary";
import { isDev } from "@/app/lib/env";

export async function generateStaticParams() {
  return Object.keys(DetailData).map((key) => ({
    slug: key.toLowerCase(),
  }));
}

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

  // ✅ 환경에 따라 자동 전환
  const readAssets = isDev ? readAssetsLocal : readAssetsCloud;
  const readFolders = isDev ? readFoldersLocal : readFoldersCloud;
  const readAssetsInBook = isDev ? readAssetsInBookLocal : readAssetsInBookCloud;

  const detail = DetailData[matchedKey];
  const assets = await readAssets(matchedKey);
  const bookFolders = await readFolders(matchedKey);
  const books = await Promise.all(bookFolders.map((book) => readAssetsInBook(matchedKey, book)));

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