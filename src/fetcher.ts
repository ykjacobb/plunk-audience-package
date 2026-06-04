import { PlunkError } from "./errors.js";

const BASE_URL = "https://next-api.useplunk.com";

async function request<T>(
  apiKey: string,
  method: string,
  path: string,
  body?: unknown,
  unwrap = true,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({})) as Record<string, unknown>;

  if (!res.ok) {
    const code = (json.code as string) ?? String(res.status);
    const message = (json.message as string) ?? res.statusText;
    const requestId = json.requestId as string | undefined;
    throw new PlunkError(message, code, res.status, requestId);
  }

  // Public API (/v1/*) wraps in { success, data }; dashboard endpoints return directly
  if (unwrap) {
    return (json as { success: boolean; data: T }).data;
  }
  return json as T;
}

export function plunkFetch<T>(apiKey: string, path: string, body: unknown): Promise<T> {
  return request<T>(apiKey, "POST", path, body, true);
}

export function dashboardPost<T>(apiKey: string, path: string, body?: unknown): Promise<T> {
  return request<T>(apiKey, "POST", path, body, false);
}

export function dashboardGet<T>(apiKey: string, path: string): Promise<T> {
  return request<T>(apiKey, "GET", path, undefined, false);
}
