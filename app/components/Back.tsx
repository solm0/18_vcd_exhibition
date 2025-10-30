'use client'

import Link from "next/link";
import { detailAxisDeg } from "../lib/pageLayout";
import { usePathname } from "next/navigation";

function getNextAlphabet(char: string) {
  const charCode = char.charCodeAt(0);
  if (charCode === 112) {
    return 'a';
  } else if (charCode >= 97 && charCode < 112) {
    return String.fromCharCode(charCode + 1);
  } else {
    return char;
  }
}

export default function Back() {
  const pathname = usePathname().slice(1);
  const next = getNextAlphabet(pathname);

  return (
    <div className={`${detailAxisDeg} fixed right-8 top-8 z-60 flex flex-col gap-2 items-end`}>
      <Link
        href={'/'}
        className={`scale-x-95 tracking-normal origin-left bg-neutral-200 text-neutral-600 px-3 py-1 hover:opacity-50`}
      >
        뒤로
      </Link>
      {pathname.length === 1 &&
        <Link
          href={`/${next}`}
          className={`scale-x-95 tracking-normal origin-left bg-neutral-200 text-neutral-600 px-3 py-1 hover:opacity-50`}
        >
          다음 프로젝트
        </Link>
      }
    </div>
  )
}