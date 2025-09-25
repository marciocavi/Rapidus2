// Simple in-memory cache and rate limiter for server runtime

type CacheEntry<T> = { value: T; expiresAt: number };

const cacheStore = new Map<string, CacheEntry<unknown>>();
const rateStore = new Map<string, { windowStart: number; count: number }>();

export function cacheGet<T>(key: string): T | null {
  const entry = cacheStore.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cacheStore.delete(key);
    return null;
  }
  return entry.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
  cacheStore.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function buildCacheKey(parts: (string | number | undefined)[]): string {
  return parts.filter((p) => p !== undefined).join('::');
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const cur = rateStore.get(key);
  if (!cur || now - cur.windowStart > windowMs) {
    rateStore.set(key, { windowStart: now, count: 1 });
    return true;
  }
  if (cur.count >= limit) return false;
  cur.count += 1;
  return true;
}



