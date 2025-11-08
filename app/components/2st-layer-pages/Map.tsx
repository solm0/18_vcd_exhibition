'use client'

import { detailAxisDeg } from "@/app/lib/pageLayout";
import { Room, rooms } from "@/app/lib/rooms";
import { useHoveredRoomStore } from "@/app/lib/store/useHoveredRoomStore";
import Image from "next/image";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

export default function Map() {
  const hoveredRoom = useHoveredRoomStore((state) => state.hoveredRoom);
  const setHoveredRoom = useHoveredRoomStore((state) => state.setHoveredRoom);
  const [visilbeRooms, setVisibleRooms] = useState<Room[]>([]);

  const roomWPolygon = rooms.filter(room => room.d);
  const roomWoPolygon = rooms.filter(room => !room.d);

  const polygon = (room: Room) => {
    return (
      <path
        key={room.id}
        onMouseEnter={() => setHoveredRoom(room.id)}
        onMouseLeave={() => setHoveredRoom(null)}
        onClick={() => setVisibleRooms(prev => {
          const exists = prev.some(r => r.id === room.id);
          return exists
            ? prev.filter(r => r.id !== room.id)
            : [...prev, room];
        })}
        fill={ hoveredRoom === room.id ? "#fafafa90" : "#d4d4d470"
        }
        d={room.d}
      >
      </path>
    )
  }

  const content = (room:Room) => {
    return (
      <div
        key={room.id}
        onMouseEnter={() => setHoveredRoom(room.id)}
        onMouseLeave={() => setHoveredRoom(null)}
        className={`
          ${hoveredRoom === room.id ? "bg-neutral-400 text-neutral-900 border-neutral-900" : 'text-neutral-200 border-neutral-200 bg-transparent'}
          ${room.desc.length > 12 ? 'w-150' : room.desc.length > 6 ? 'w-100' : 'w-48'} h-45 px-3 py-1 text-xs hover:text-background-100
          flex flex-col shrink-0 grow-0 items-start gap-1
        `}
      >
        <p className="scale-x-95 tracking-normal origin-left text-base h-7 shrink-0 border-b w-full">{room.id}</p>
        <div className={`
          flex flex-col leading-[1.75em] h-[calc(100%-2rem)] w-full items-start justify-start
          ${room.desc.length > 6 ? 'flex-wrap' : ''}
        `}>
          {room.desc.map(p => (
            <p
              key={p}
              className="scale-x-95 tracking-normal origin-left"
            >
                {p}
            </p>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div
      className={`
        ${detailAxisDeg} flex items-center justify-center
        absolute overflow-hidden
        pointer-events-auto z-20
        text-neutral-50
        w-screen h-screen 
      `}
    >
      <div className="relative w-full max-w-[2100px] aspect-2/1 -translate-y-30">
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
              scale(1.165)
              translate(-1480 -620)
            "
          >
            {roomWPolygon.map((room) => (
              <Fragment key={room.id}>{polygon(room)}</Fragment>
            ))}
          </g>
        </svg>

        <div className="absolute z-30 w-full h-full pointer-events-none">
          {roomWoPolygon.map(room => (
            <div
              key={room.id}
              className={`
                ${hoveredRoom === room.id ? "bg-[#fafafa90]" : "bg-[#d4d4d470]"}
                rounded-full absolute w-8 h-8 flex items-center justify-center text-neutral-900
                ${room.pos} pointer-events-auto
              `}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              onClick={() => setVisibleRooms(prev => {
                const exists = prev.some(r => r.id === room.id);
                return exists
                  ? prev.filter(r => r.id !== room.id)
                  : [...prev, room];
              })}
            >
              {room.id.slice(-1)}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute w-3/5 h-2/5 top-1/2 left-[5%] flex flex-wrap gap-2 justify-center overflow-y-scroll custom-scrollbar">
        {visilbeRooms.map((room) => content(room))}
      </div>
    </div>
  )
}