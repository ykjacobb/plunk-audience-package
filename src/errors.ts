export type PlunkErrorCode =
  | "UNAUTHORIZED"
  | "INVALID_CREDENTIALS"
  | "MISSING_AUTH"
  | "INVALID_API_KEY"
  | "FORBIDDEN"
  | "PROJECT_ACCESS_DENIED"
  | "PROJECT_DISABLED"
  | "BAD_REQUEST"
  | "INVALID_REQUEST_BODY"
  | "VALIDATION_ERROR"
  | "INVALID_EMAIL"
  | "MISSING_REQUIRED_FIELD"
  | "RESOURCE_NOT_FOUND"
  | "CONTACT_NOT_FOUND"
  | "TEMPLATE_NOT_FOUND"
  | "CAMPAIGN_NOT_FOUND"
  | "WORKFLOW_NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMIT_EXCEEDED"
  | "BILLING_LIMIT_EXCEEDED"
  | "UPGRADE_REQUIRED"
  | "INTERNAL_SERVER_ERROR"
  | string;

export class PlunkError extends Error {
  readonly code: PlunkErrorCode;
  readonly status: number;
  readonly requestId?: string;

  constructor(message: string, code: PlunkErrorCode, status: number, requestId?: string) {
    super(message);
    this.name = "PlunkError";
    this.code = code;
    this.status = status;
    this.requestId = requestId;
  }
}
