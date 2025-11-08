import { DetailData } from "@/app/lib/detail";
import Detail from "@/app/components/2st-layer-pages/Detail";
// import { readAssets, readFolders, readAssetsInBook } from "@/app/lib/readAssets";
import { readAssets, readAssetsInBook, readFolders } from "@/app/lib/readAssetsCloudinary";

interface DetailPageProps {
  params: Promise<{ slug: string }>;
  assets: string[];
  books: string[][];
  bookFolders: string[];
  detail: any;
}

export async function generateStaticParams() {
  // 모든 slug를 빌드 시점에 가져와 static 페이지 생성
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

  const detail = matchedKey ? DetailData[matchedKey] : null;
  // const assets = readAssets(matchedKey);
  // const bookFolders = readFolders(matchedKey);
  // const books = bookFolders.map((book) => readAssetsInBook(matchedKey, book))

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