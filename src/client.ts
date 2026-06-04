import { Audience } from "./audience.js";
import { Emails } from "./emails.js";
import { Events } from "./events.js";

export class Plunk {
  readonly audience: Audience;
  readonly emails: Emails;
  readonly events: Events;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("A Plunk API key is required.");
    this.audience = new Audience(apiKey);
    this.emails = new Emails(apiKey);
    this.events = new Events(apiKey);
  }
}
