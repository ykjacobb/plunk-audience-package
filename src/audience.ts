import { plunkFetch } from "./fetcher.js";
import type { SubscribeOptions, SubscribeResult, UnsubscribeOptions } from "./types.js";

export class Audience {
  constructor(private readonly apiKey: string) {}

  /**
   * Add a contact to your audience (or update an existing one).
   * Sets subscribed = true.
   */
  async subscribe(options: SubscribeOptions): Promise<SubscribeResult> {
    return plunkFetch<SubscribeResult>(this.apiKey, "/v1/track", {
      email: options.email,
      event: "subscribe",
      subscribed: true,
      data: options.data,
    });
  }

  /**
   * Unsubscribe a contact from your audience.
   * The contact record is retained; only their subscription state changes.
   */
  async unsubscribe(options: UnsubscribeOptions): Promise<SubscribeResult> {
    return plunkFetch<SubscribeResult>(this.apiKey, "/v1/track", {
      email: options.email,
      event: "unsubscribe",
      subscribed: false,
    });
  }
}
