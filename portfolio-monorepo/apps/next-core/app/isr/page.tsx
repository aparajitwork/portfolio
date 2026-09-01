import { unstable_cacheLife as cacheLife } from 'next/cache';

const Page = async () => {
  "use cache"
  cacheLife({ revalidate: 60 });
  const data = await fetch('https://api.github.com/zen').then(r => r.text());

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>ISR</h1>
      <p className='mt-2 text-gray-400'>Regenerates at most once every 60 seconds:</p>
      <p className='mt-1 font-mono'>{data}</p>
    </div>
  )
}

export default Page