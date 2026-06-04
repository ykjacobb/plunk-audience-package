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

export type EmailType = "MARKETING" | "TRANSACTIONAL" | "HEADLESS";

type SendBase = {
  to: Recipient;
  from?: string | { name: string; email: string };
  reply?: string;
  subscribed?: boolean;
  data?: ContactData;
  headers?: Record<string, string>;
  attachments?: Attachment[];
};

export type SendOptions = SendBase & {
  /** How the email is treated — subscription check, unsubscribe footer, etc. */
  type?: EmailType;
} & (
  | { subject: string; body: string; template?: never }
  | { template: string; subject?: string; body?: never }
);

export type SendMarketingOptions = SendBase & (
  | { subject: string; body: string; templateId?: never }
  | { templateId: string; subject?: string; body?: never }
);

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

// ── Campaigns ─────────────────────────────────────────────────────────────────

export type CampaignType = "MARKETING" | "TRANSACTIONAL" | "HEADLESS";
export type CampaignAudienceType = "ALL" | "SEGMENT" | "FILTERED";
export type CampaignStatus = "DRAFT" | "SCHEDULED" | "SENDING" | "SENT" | "CANCELLED";

type CampaignBase = {
  name: string;
  subject: string;
  from: string;
  fromName?: string;
  replyTo?: string;
  type?: CampaignType;
  audienceType?: CampaignAudienceType;
  /** Required when audienceType is "SEGMENT" */
  segmentId?: string;
  /** Inline filter conditions when audienceType is "FILTERED" */
  audienceCondition?: Record<string, unknown>;
  /** ISO 8601 — schedule for later instead of sending immediately */
  scheduledFor?: string;
  description?: string;
};

export type CreateCampaignOptions =
  | (CampaignBase & { body: string; templateId?: never })
  | (CampaignBase & { templateId: string; body?: never });

export type Campaign = {
  id: string;
  name: string;
  subject: string;
  body: string;
  from: string;
  fromName?: string;
  replyTo?: string;
  type: CampaignType;
  audienceType: CampaignAudienceType;
  segmentId?: string;
  status: CampaignStatus;
  scheduledFor?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type CampaignStats = {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  bounced: number;
};
