'use client'

import { useRouter } from "next/navigation";

// 클릭하면 뒤로가는 배경
export default function DetailBackground({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      className="w-screen h-screen font-sans -z-10 overflow-hidden"
      onClick={() => router.push('/')}
    >
      <div onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}>
        {children}
      </div>
    </div>
  )
}