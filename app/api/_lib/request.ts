export function hasTrustedOrigin(req: Request): boolean {
  const fetchSite = req.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin') return false;

  const origin = req.headers.get('origin');
  if (!origin) return process.env.NODE_ENV !== 'production';

  try {
    const originUrl = new URL(origin);
    const forwardedHost = req.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    const host = forwardedHost ?? req.headers.get('host');
    return Boolean(host && originUrl.host === host);
  } catch {
    return false;
  }
}

export async function readJsonBody<T>(req: Request, maxBytes: number): Promise<T> {
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error('unsupported-content-type');
  }

  const declaredLength = Number(req.headers.get('content-length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new Error('body-too-large');
  }

  const raw = await req.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    throw new Error('body-too-large');
  }

  return JSON.parse(raw) as T;
}

export function cleanSubject(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}
