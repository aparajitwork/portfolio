import { useEffect, useRef, useState } from 'react'
import useDebounce from './useDebounce';
import createSlidingWindowRateLimiter from '../utils/rateLimiter';
import fetchWithRetryAndTimeout, { TimeoutError } from '../utils/fetchWithRetryAndTimeout';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'rate-limited' | 'timeout';

type SearchState = {
  results: string[];
  status: Status;
  message?: string
}

const limiter = createSlidingWindowRateLimiter(5, 10_000)

const useSearch = (query: string): SearchState => {
  const debouncedQuery = useDebounce(query, 300);
  const [state, setState] = useState<SearchState>({ results: [], status: 'idle' })
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setState({ results: [], status: 'idle' })
      return;
    }

    if (!limiter.tryAcquire()) {
      const retryAfterSec = Math.ceil(limiter.getRetryAfterMs() / 1000);
      setState({
        results: [],
        status: 'rate-limited',
        message: `Too many searches - try again in ${retryAfterSec}s`
      })
      return;
    }

    const requestId = ++requestIdRef.current;
    setState(prev => ({ ...prev, status: 'loading' }))
    
    fetchWithRetryAndTimeout(
      `https://api.datamuse.com/sug?s=${encodeURIComponent(debouncedQuery)}`,
      { timeoutMs: 4000, retries: 2 }
    ).then(res => res.json())
      .then((data: { word: string }[]) => {
        if (requestId !== requestIdRef.current) return;

        setState({ results: data.map(d => d.word), status: 'success' })
      })
      .catch((err) => {
        if (requestId !== requestIdRef.current) return;

        if (err instanceof TimeoutError) {
          setState({ results: [], status: 'timeout', message: 'Search timed out after retries.'})
        } else {
          setState({ results: [], status: 'error', message: 'Something went wrong.' })
        }
    })
  }, [debouncedQuery])

  return state;
}

export default useSearch