import { DetailData } from "@/app/lib/detail";
import { detailAxisDeg, detailTop, detailTransX, } from "@/app/lib/pageLayout";
import { PeopleData } from "@/app/lib/people";
import Link from "next/link";

export default function People() {
  return (
    <div
      className={`
        ${detailAxisDeg} ${detailTop} ${detailTransX}
        absolute pt-80 pb-40  h-[120%] overflow-y-scroll overflow-x-hidden
        pointer-events-none z-20
        text-neutral-50
        custom-scrollbar
        w-[22rem] md:w-[40rem] lg:w-[45rem]
      `}
    >
      <div className="flex flex-col items-center gap-30 w-auto max-w-[40rem] pointer-events-auto">
        <div className="flex flex-col gap-12 items-center">
          <h2 className="text-5xl scale-x-95 tracking-normal origin-left text-center break-keep leading-[1.5em]">조형전 운영 위원회</h2>
          <div className="flex flex-col gap-7">
            {PeopleData.map((role, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <h3 className="text-lg font-bold">{role.role}</h3>
                <div className="flex gap-2 ">
                  {role.names.map((name, idx) => (
                    <p key={idx}>
                      {name}
                      {idx+1 !== role.names.length && ','}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 items-center">
          <h2 className="text-5xl scale-x-95 tracking-normal origin-left">기획전 출품 팀</h2>
          <div className="flex flex-col gap-7">
            {Object.keys(DetailData).map(key => (
              <div key={key} className="flex flex-col items-center gap-2">
                <Link
                  className="bg-neutral-200 text-neutral-600 w-7 h-7 flex items-center justify-center rounded-full hover:opacity-50"
                  href={`/${key.toLowerCase()}`}
                >
                    {key}
                </Link>
                <div className="flex gap-x-2 flex-wrap w-3/4 justify-center">
                  {DetailData[key].people.map((name, idx) => (
                    <p key={idx}>
                      {name}
                      {idx+1 !== DetailData[key].people.length && ','}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}