import { HomeDataProp } from "../../lib/home";
import Header from "./Header";
import HomeList from "./HomeList";

export default function HomeLists({
  HomeData,
}: {
  HomeData: HomeDataProp[];
}) {
  return (
    <div className="w-auto h-auto text-zinc-900 flex flex-col gap-20 pl-4">
      {/* 기준선 */}
      <div className="absolute left-0 h-[200%] top-0 border-l border-neutral-300"/>

      {/* 헤더 */}
      <Header />

      {/* 프로젝트들 */}
      <div className="flex flex-col gap-2">
        {HomeData.map((project) => (
          <HomeList key={project.id} project={project}/>
        ))}
      </div>
    </div>
  )
}