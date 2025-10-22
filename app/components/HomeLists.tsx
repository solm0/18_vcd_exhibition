import { HomeDataProp } from "../lib/home";
import Header from "./Header";
import HomeList from "./HomeList";

export default function HomeLists({
  HomeData,
}: {
  HomeData: HomeDataProp[];
}) {
  return (
    <div className="w-auto h-auto text-zinc-900 flex flex-col gap-20">
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