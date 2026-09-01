import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T, delayMs: number): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);

    return () => clearTimeout(timer);
  }, [value, delayMs])

  return debounced;
}

export default useDebounce