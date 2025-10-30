import Link from "next/link";

export default function Menu() {
  return (
    <div className="w-full h-full flex flex-col">
      <Link href={'/about'}>
        <p className="underline underline-offset-4 decoration-1 hover:opacity-50 scale-x-95 tracking-normal origin-left">
          대주제
        </p>
      </Link>
      <Link href={'/credit'}>
        <p className="underline underline-offset-4 decoration-1 hover:opacity-50 scale-x-95 tracking-normal origin-left">
          참여한 사람
        </p>
      </Link>
      <Link href={'/archive'}>
        <p className="underline underline-offset-4 decoration-1 hover:opacity-50 scale-x-95 tracking-normal origin-left">
          기록
        </p>
      </Link>
    </div>
  )
}