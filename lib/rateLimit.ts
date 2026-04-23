// Simple in-memory rate limiter using a sliding window
const rateLimitMap = new Map();

/**
 * Rate limiter - checks if a given key has exceeded the limit
 * @param {string} key - Unique identifier (e.g., IP address)
 * @param {number} limit - Max requests per window
 * @param {number} windowMs - Window duration in milliseconds
 * @returns {{ success: boolean, remaining: number }} Whether the request is allowed
 */
export function rateLimit(key: string, limit = 5, windowMs = 60 * 1000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Get or create entry
  let entry = rateLimitMap.get(key);
  if (!entry) {
    entry = [];
    rateLimitMap.set(key, entry);
  }

  // Remove old entries outside the window
  const filtered = entry.filter((timestamp: number) => timestamp > windowStart);
  rateLimitMap.set(key, filtered);

  if (filtered.length >= limit) {
    return { success: false, remaining: 0 };
  }

  filtered.push(now);
  return { success: true, remaining: limit - filtered.length };
}

// Periodic cleanup to prevent memory leaks (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of rateLimitMap.entries()) {
      const filtered = timestamps.filter((t: number) => t > now - 5 * 60 * 1000);
      if (filtered.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, filtered);
      }
    }
  }, 5 * 60 * 1000);
}
