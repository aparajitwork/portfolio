import React from 'react'

const ServerFetchedList = async () => {
  const data = await fetch("https://api.github.com/zen", { cache: 'no-store' }).then(r => r.text());
  return <p className='font-mono'>{data}</p>
}

const RSCPage = () => {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>React Server Components</h1>
      <p className="mt-2 text-gray-400">
        This entire page is a Server Component - the fetch above runs on the server and zero extra client JS ships for it
      </p>
      <ServerFetchedList />
    </div>
  )
}

export default RSCPage