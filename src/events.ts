import { plunkFetch } from "./fetcher.js";
import type { TrackOptions, TrackResult } from "./types.js";

export class Events {
  constructor(private readonly apiKey: string) {}

  /** Track a custom event for a contact. Creates the contact if it doesn't exist. */
  async track(options: TrackOptions): Promise<TrackResult> {
    return plunkFetch<TrackResult>(this.apiKey, "/v1/track", {
      email: options.email,
      event: options.event,
      subscribed: options.subscribed,
      data: options.data,
    });
  }
}
