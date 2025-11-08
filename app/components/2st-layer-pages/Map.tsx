'use client'

import { detailAxisDeg, detailTop, detailTransX, } from "@/app/lib/pageLayout";
import { rooms } from "@/app/lib/rooms";
import { useHoveredRoomStore } from "@/app/lib/store/useHoveredRoomStore";
import Image from "next/image";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

export default function Map() {
  const hoveredRoom = useHoveredRoomStore((state) => state.hoveredRoom);
  const setHoveredRoom = useHoveredRoomStore((state) => state.setHoveredRoom);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0});
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const polygon = (room:{id: string; n: string; title: string; d: string; href?: string | undefined}) => {
    return (
      <path
        key={room.id}
        onMouseEnter={() => setHoveredRoom(room.id)}
        onMouseLeave={() => setHoveredRoom(null)}
        fill={ hoveredRoom === room.id ? "#0000ff" : "#ffffff"
        }
        d={room.d}
      >
      </path>
    )
  }

  const content = (room:{id: string; n: string; title: string; d: string; href?: string | undefined}) => {
    return (
      <div
        key={room.id}
        onMouseEnter={() => setHoveredRoom(room.id)}
        onMouseLeave={() => setHoveredRoom(null)}
        className={`
          ${hoveredRoom === room.id ? "bg-[#0000ff]! text-gray-100" : room.href ? "text-[#0000FF] bg-white" : 'text-black bg-white'}
          px-3 py-1 flex items-center justify-center text-sm flex-1 hover:text-background-100
        `}
      >
        {room.title}
        {room.href && <span>*</span>}
      </div>
    )
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`
        ${detailAxisDeg} flex items-center justify-center
        absolute overflow-hidden
        pointer-events-auto z-20
        text-neutral-50
        w-screen h-screen 
      `}
    >
      <div className="relative w-full max-w-[2100px] aspect-2/1">
        {/* 지도 이미지 */}
        <Image
          src="/map/map.svg"
          alt="전시장 지도"
          fill
          style={{ objectFit: 'contain' }}
          className="z-10"
        />

        {/* SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 6600 2200"
          className="absolute inset-0 z-20"
        >
          <g
            transform="
              rotate(180 3300 1100)
              scale(1.16)
              translate(-1450 -610)
            "
          >
            {rooms.map((room) => (
              <Fragment key={room.id}>{polygon(room)}</Fragment>
            ))}
          </g>
        </svg>
      </div>

      {hoveredRoom &&
        <div
          className="fixed z-80 h-auto w-36 flex items-center px-4 py-3 bg-gray-200 text-neutral-900 text-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            position: 'fixed',
            top: mousePos.y,
            left: mousePos.x,
            cursor: "none"
          }}
        >
          {rooms.find(room => room.id === hoveredRoom)?.title}
        </div>
      }
    </div>
  )
}