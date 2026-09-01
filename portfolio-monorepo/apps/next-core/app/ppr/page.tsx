import { Suspense } from 'react'

const DynamicWidget = async () => {
  const data = await fetch('https://api.github.com/zen', { cache: "no-store" }).then(r => r.text());
  return <p className='mt-1 font-mono'>{data}</p>
}

const PPRPage = () => {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>Partial Prerendering</h1>
      <p className='mt-2 text-gray-400'>This paragraph is part of the static shell.</p>
      <Suspense fallback={<p className='mt-1 text-gray-500'>Loading dynamic part...</p>}>
        <DynamicWidget />
      </Suspense>
    </div>
  )
}

export default PPRPage