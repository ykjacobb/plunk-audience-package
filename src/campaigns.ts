import { dashboardGet, dashboardPost } from "./fetcher.js";
import type {
  Campaign,
  CampaignStats,
  CreateCampaignOptions,
} from "./types.js";

export class Campaigns {
  constructor(private readonly apiKey: string) {}

  /** Create a campaign. */
  async create(options: CreateCampaignOptions): Promise<Campaign> {
    return dashboardPost<Campaign>(this.apiKey, "/campaigns", {
      ...options,
      type: options.type ?? "MARKETING",
      audienceType: options.audienceType ?? "ALL",
    });
  }

  /** Send a campaign immediately. */
  async send(id: string): Promise<Campaign> {
    return dashboardPost<Campaign>(this.apiKey, `/campaigns/${id}/send`);
  }

  /** Cancel a scheduled or in-progress campaign. */
  async cancel(id: string): Promise<Campaign> {
    return dashboardPost<Campaign>(this.apiKey, `/campaigns/${id}/cancel`);
  }

  /** Send a test email to verify how the campaign looks. */
  async test(id: string, email: string): Promise<void> {
    await dashboardPost(this.apiKey, `/campaigns/${id}/test`, { email });
  }

  /** Duplicate a sent/cancelled campaign into a new editable draft. */
  async duplicate(id: string): Promise<Campaign> {
    return dashboardPost<Campaign>(this.apiKey, `/campaigns/${id}/duplicate`);
  }

  /** Get a campaign by ID. */
  async get(id: string): Promise<Campaign> {
    return dashboardGet<Campaign>(this.apiKey, `/campaigns/${id}`);
  }

  /** Get send stats for a campaign. */
  async stats(id: string): Promise<CampaignStats> {
    return dashboardGet<CampaignStats>(this.apiKey, `/campaigns/${id}/stats`);
  }

  /**
   * Create a campaign and immediately send it.
   * Convenience wrapper around create() + send().
   */
  async createAndSend(options: CreateCampaignOptions): Promise<Campaign> {
    const campaign = await this.create(options);
    return this.send(campaign.id);
  }
}
