import { Campaigns } from "./campaigns.js";
import { plunkFetch } from "./fetcher.js";
import type {
  SendMarketingOptions,
  SendResult,
  SubscribeOptions,
  SubscribeResult,
  UnsubscribeOptions,
} from "./types.js";

export class Audience {
  readonly campaigns: Campaigns;

  constructor(private readonly apiKey: string) {
    this.campaigns = new Campaigns(apiKey);
  }

  /** Add a contact to your audience (or update an existing one). Sets subscribed = true. */
  async subscribe(options: SubscribeOptions): Promise<SubscribeResult> {
    return plunkFetch<SubscribeResult>(this.apiKey, "/v1/track", {
      email: options.email,
      event: "subscribe",
      subscribed: true,
      data: options.data,
    });
  }

  /** Unsubscribe a contact. The contact record is kept; only their subscription state changes. */
  async unsubscribe(options: UnsubscribeOptions): Promise<SubscribeResult> {
    return plunkFetch<SubscribeResult>(this.apiKey, "/v1/track", {
      email: options.email,
      event: "unsubscribe",
      subscribed: false,
    });
  }

  /** Send a marketing email to one or more subscribers. Only reaches subscribed contacts. */
  async send(options: SendMarketingOptions): Promise<SendResult> {
    const { templateId, ...rest } = options as SendMarketingOptions & { templateId?: string };
    return plunkFetch<SendResult>(this.apiKey, "/v1/send", {
      ...rest,
      ...(templateId ? { template: templateId } : {}),
      type: "MARKETING",
    });
  }
}
