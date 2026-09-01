type FetchOptions = {
  timeoutMs?: number;
  retries?: number;
  backoffBaseMs?: number;
}

export class TimeoutError extends Error {
  constructor() {
    super('Request timed out');
    this.name = 'TimeoutError';
  }
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchWithRetryAndTimeout = async (
  url: string,
  { timeoutMs = 4000, retries = 2, backoffBaseMs = 300 }: FetchOptions = {}
): Promise<Response> => {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok && response.status >= 500 && attempt < retries) {
        lastError = new Error(`Server Error: ${response.status}`);
        await sleep(backoffBaseMs * 2 ** attempt);
        continue;
      }
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = (err as Error).name === 'AbortError' ? new TimeoutError() : err;
      if (attempt < retries) {
        await sleep(backoffBaseMs * 2 ** attempt);
        continue;
      }
    }
  }
  throw lastError;
}

export default fetchWithRetryAndTimeout;