/**
 * Rate-limit som delas mellan alla serverless-instanser.
 *
 * Med Upstash Redis / Vercel KV konfigurerat (KV_REST_API_URL + KV_REST_API_TOKEN
 * eller UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) räknas träffarna
 * i Redis via REST-API:t — inget extra beroende behövs. Saknas variablerna,
 * eller svarar Redis inte, faller vi tillbaka på en räknare i minnet per
 * instans (best effort, men stoppar fortfarande burst-spam).
 */

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const memoryHits = new Map<string, number[]>();

function isMemoryLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (memoryHits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    memoryHits.set(key, recent);
    return true;
  }
  recent.push(now);
  memoryHits.set(key, recent);
  // Håll kartan liten på en långlivad instans.
  if (memoryHits.size > 5000) {
    for (const [k, times] of memoryHits) {
      if (times.every((t) => now - t >= windowMs)) memoryHits.delete(k);
    }
  }
  return false;
}

/** Fast fönster i Redis: INCR på en nyckel per fönster, som sedan får löpa ut. */
async function redisCount(key: string, windowMs: number): Promise<number | null> {
  if (!redisUrl || !redisToken) return null;
  const bucketKey = `rl:${key}:${Math.floor(Date.now() / windowMs)}`;
  try {
    const res = await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', bucketKey],
        ['PEXPIRE', bucketKey, String(windowMs)],
      ]),
      cache: 'no-store',
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const [incr] = (await res.json()) as { result?: unknown }[];
    return typeof incr?.result === 'number' ? incr.result : null;
  } catch {
    return null;
  }
}

/** true om `id` har gjort fler än `limit` anrop mot `name` inom `windowMs`. */
export async function isRateLimited(
  name: string,
  id: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const key = `${name}:${id}`;
  const count = await redisCount(key, windowMs);
  if (count !== null) return count > limit;
  return isMemoryLimited(key, limit, windowMs);
}

export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}
