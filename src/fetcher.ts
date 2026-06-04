import { PlunkError } from "./errors.js";

const BASE_URL = "https://next-api.useplunk.com";

export async function plunkFetch<T>(
  apiKey: string,
  path: string,
  body: unknown,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({})) as Record<string, unknown>;

  if (!res.ok) {
    const code = (json.code as string) ?? String(res.status);
    const message = (json.message as string) ?? res.statusText;
    const requestId = json.requestId as string | undefined;
    throw new PlunkError(message, code, res.status, requestId);
  }

  const envelope = json as { success: boolean; data: T };
  return envelope.data;
}
