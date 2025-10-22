import { DetailData } from "../lib/detail";
import { detailAxisDeg, detailLeft, detailTop } from "../lib/pageLayout";
import { PeopleData } from "../lib/people";

export default function People() {
  return (
    <div
      className={`
        ${detailAxisDeg} ${detailTop} ${detailLeft}
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
            <h3 className="bg-white font-bold">{key}팀</h3>
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