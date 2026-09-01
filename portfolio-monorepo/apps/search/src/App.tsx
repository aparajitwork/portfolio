import SearchBox from './components/SearchBox'

function App() {
  return (
    <div className='min-h-screen bg-[var(--color-surface)] p-8 text-white'>
      <h1 className='mb-6 text-2xl font-bold'>Pure CSR: debounced, rate-limited, retrying search</h1>
      <SearchBox />
    </div>
  )
}

export default App
