import React from 'react'

const page = async () => {
  "use cache"
  const data = await fetch("https://api.github.com/zen").then(r => r.text());

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>SSG</h1>
      <p className='mt-2 text-gray-400'>Cached once, served statiscally:</p>
      <p className='mt-1 font-mono'>{data}</p>
    </div>
  )
}

export default page