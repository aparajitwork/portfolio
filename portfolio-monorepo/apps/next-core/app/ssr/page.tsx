
export const instant = false;

export default async function SSRPage() {
  const data = await fetch('https://api.github.com/zen', { cache: "no-store" }).then(r => r.text());

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">SSR</h1>
      <p className="mt-2 text-gray-400">Rendered fresh on every request:</p>
      <p className='mt-1 font-mono'>{data}</p>
    </div>
  )
}