import React, { useState } from 'react'
import useSearch from '../hooks/useSearch';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const { results, status, message } = useSearch(query);

  return (
    <div className='mx-auto max-w-md'>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search words...'
        className='w-full rounded-md border border-white/10 bg-[val(--color-surface-raised)] px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500'
      />
      <div
        className='mt-2 min-h-6 text-sm'
      >
        {status === 'loading' && <span className='text-gray-400'>Searching...</span>}
        {status === 'rate-limited' && <span className='text-amber-400'>{message}</span>}
        {status === 'timeout' && <span className='text-red-400'>{message}</span>}
        {status === 'error' && <span className='text-red-400'>{message}</span>}
      </div>
      <ul className='mt-2 space-y-1 pl-1'>
        {results.map(word => (
          <li className='text-gray-200' key={word}>{word}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBox