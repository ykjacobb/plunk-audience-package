import { plunkFetch } from "./fetcher.js";
import type { SendOptions, SendResult, VerifyOptions, VerifyResult } from "./types.js";

export class Emails {
  constructor(private readonly apiKey: string) {}

  /** Send a transactional email to one or more recipients. */
  async send(options: SendOptions): Promise<SendResult> {
    return plunkFetch<SendResult>(this.apiKey, "/v1/send", options);
  }

  /** Check whether an email address is valid and deliverable. */
  async verify(options: VerifyOptions): Promise<VerifyResult> {
    return plunkFetch<VerifyResult>(this.apiKey, "/v1/verify", options);
  }
}
