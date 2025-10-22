import { DetailData } from "../lib/detail";

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const slugLowerCase = slug.toLowerCase();

  const matchedKey = Object.keys(DetailData).find(
    (key) => key.toLowerCase() === slugLowerCase
  );

  const detail = matchedKey ? DetailData[matchedKey] : null;

  if (!detail) {
    return (
      <div className="p-10 text-center text-red-500">
        <b>{slugLowerCase}</b>에 대한 정보 없음
      </div>
    );
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold uppercase">{matchedKey}</h1>
      <p className="text-gray-700">{detail.description || "No description yet."}</p>

      <section>
        <h2 className="font-semibold text-lg mb-2">People</h2>
        <ul className="list-disc ml-6">
          {detail.people.map((name: string) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-2">Assets</h2>
        <ul className="list-disc ml-6">
          {detail.assets.map((asset: string, i: number) => (
            <li key={i}>{asset}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}