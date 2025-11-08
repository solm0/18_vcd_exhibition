'use client'

import Link from "next/link";
import { detailAxisDeg } from "../lib/pageLayout";
import { usePathname } from "next/navigation";

function getNextAlphabet(char: string, right:boolean) {
  const charCode = char.charCodeAt(0);
  if (right) {
    if (charCode === 97) {
      return 'p';
    } else if (charCode > 97 && charCode <= 112) {
      return String.fromCharCode(charCode - 1);
    } else {
      return char;
    }
  } else {
    if (charCode === 112) {
      return 'a';
    } else if (charCode >= 97 && charCode < 112) {
      return String.fromCharCode(charCode + 1);
    } else {
      return char;
    }
  }
}

export default function Back() {
  const pathname = usePathname().slice(1);
  const left = getNextAlphabet(pathname, false);
  const right = getNextAlphabet(pathname, true);

  return (
    <div className={`${detailAxisDeg} fixed right-8 top-8 z-60 flex flex-col gap-4 items-end`}>
      <Link
        href={'/'}
        className={`scale-x-95 tracking-normal origin-left bg-neutral-200 text-neutral-600 px-3 py-1 hover:opacity-50`}
      >
        뒤로
      </Link>
      {pathname.length === 1 &&
        <div className="flex gap-2">
          <Link
            href={`/${left}`}
            className={`bg-neutral-200 text-neutral-600 w-7 h-7 flex items-center justify-center rounded-full shrink-0 scale-x-95 tracking-normal origin-left hover:opacity-50`}
          >
            {`<`}
          </Link>
          <Link
            href={`/${right}`}
            className={`bg-neutral-200 text-neutral-600 w-7 h-7 flex items-center justify-center rounded-full shrink-0 scale-x-95 tracking-normal origin-left hover:opacity-50`}
          >
            {`>`}
          </Link>
        </div>
      }
    </div>
  )
}