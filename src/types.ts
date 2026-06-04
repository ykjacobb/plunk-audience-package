export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

// ── Contacts ─────────────────────────────────────────────────────────────────

export type ContactData = Record<string, string | number | boolean | null | { value: unknown; persistent: false }>;

export type SubscribeOptions = {
  email: string;
  data?: ContactData;
};

export type UnsubscribeOptions = {
  email: string;
};

export type SubscribeResult = {
  contact: string;
  event: string;
  timestamp: string;
};

// ── Events ────────────────────────────────────────────────────────────────────

export type TrackOptions = {
  email: string;
  event: string;
  subscribed?: boolean;
  data?: ContactData;
};

export type TrackResult = {
  contact: string;
  event: string;
  timestamp: string;
};

// ── Emails ────────────────────────────────────────────────────────────────────

export type Recipient =
  | string
  | { name: string; email: string }
  | Array<string | { name: string; email: string }>;

export type Attachment = {
  filename: string;
  content: string;
};

export type SendOptions = {
  to: Recipient;
  subject?: string;
  body?: string;
  template?: string;
  from?: string | { name: string; email: string };
  reply?: string;
  subscribed?: boolean;
  data?: ContactData;
  headers?: Record<string, string>;
  attachments?: Attachment[];
};

export type SentEmail = {
  contact: { id: string; email: string };
  email: string;
};

export type SendResult = {
  emails: SentEmail[];
  timestamp: string;
};

export type VerifyOptions = {
  email: string;
};

export type VerifyResult = {
  valid: boolean;
  email: string;
};
