const createSlidingWindowRateLimiter = (maxRequests: number, windowMs: number) => {
  let timestamps = [];

  return {
    tryAcquire(): boolean {
      const now = Date.now();
      timestamps = timestamps.filter(t => now - t < windowMs);
      if (timestamps.length >= maxRequests) return false;

      timestamps.push(now);
      return true;
    },
    getRetryAfterMs(): number {
      if (timestamps.length === 0) return 0;
      return Math.max(0, windowMs - (Date.now() - timestamps[0]));
    }
  }
}

export default createSlidingWindowRateLimiter;