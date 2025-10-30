import Link from "next/link";
import { detailAxisDeg } from "../lib/pageLayout";

export default function Back() {
  return (
    <Link
      href={'/'}
      className={`${detailAxisDeg} fixed right-8 top-8 scale-x-95 tracking-normal origin-left bg-neutral-200 text-neutral-600 px-3 py-1 hover:opacity-50 z-80`}
    >
      뒤로
    </Link>
  )
}