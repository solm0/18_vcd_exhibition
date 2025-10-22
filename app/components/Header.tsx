import Link from "next/link";

export default function Header() {
  return (
    <header className="w-96 grid grid-cols-6 gap-4">

      {/* 로고 또는 기획전 제목 */}
      <h1 className="col-span-1 font-bold">
        <p>Real<br/>×<br/>Fiction</p>
      </h1>

      {/* 기획전 정보 */}
      <Link className="col-span-3" href={'/'}>
        <p className="underline underline-offset-4 decoration-1 hover:opacity-50">
          국민대학교 제 18회 조형전<br/>시각디자인학과 기획전시
        </p>
      </Link>

      {/* 날짜, 장소 */}
      <div className="col-span-2">
        <p>2025.11.6—<br/>2025.11.15<br/>조형관 418호</p>
      </div>
    </header>
  )
}