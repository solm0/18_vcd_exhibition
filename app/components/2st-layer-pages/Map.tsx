import { detailAxisDeg, detailTop, detailTransX, } from "@/app/lib/pageLayout";
import Image from "next/image";

export default function Map() {
  return (
    <div
      className={`
        ${detailAxisDeg} flex items-center justify-center
        absolute overflow-hidden
        pointer-events-none z-20
        text-neutral-50
        w-screen h-screen 
      `}
    >
      <div className="w-full h-full flex items-center justify-center">
        <Image src={'/map/map.svg'} alt="전시장 지도" width={1500} height={1500} objectFit="contain" />
      </div>
    </div>  
  )
}