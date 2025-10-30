import { DetailData } from "@/app/lib/detail";
import { detailAxisDeg, detailTop, detailTransX, } from "@/app/lib/pageLayout";
import { PeopleData } from "@/app/lib/people";
import Link from "next/link";

export default function People() {
  return (
    <div
      className={`
        ${detailAxisDeg} ${detailTop} ${detailTransX}
        absolute py-80 h-[120%] w-240 overflow-y-scroll overflow-x-hidden
        pointer-events-none z-20
      `}
    >
      <div className="flex flex-col items-start gap-7 w-auto max-w-[40rem] pointer-events-auto">
          
        <h2 className="text-3xl bg-white">조형전 운영 위원회</h2>
        {PeopleData.map((role, i) => (
          <div key={i}>
            <h3 className="bg-white font-bold">{role.role}</h3>
            <div className="flex gap-2 bg-white">
              {role.names.map((name, idx) => (
                <p key={idx}>
                  {name}
                  {idx+1 !== role.names.length && ','}
                </p>
              ))}
            </div>
          </div>
        ))}

        <h2 className="text-3xl bg-white">기획전 출품 팀</h2>
        {Object.keys(DetailData).map(key => (
          <div key={key}>
            <Link
              className="bg-white font-bold underline underline-offset-4 decoration-1 hover:opacity-50"
              href={`/${key.toLowerCase()}`}
            >
                {key}팀
            </Link>
            <div className="flex gap-2 bg-white">
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
  )
}