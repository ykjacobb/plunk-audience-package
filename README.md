# plunk-audience

Audience management, marketing emails, and event tracking for [Plunk](https://next-app.useplunk.com). Zero dependencies, full TypeScript support, ESM + CJS.

## Installation

```bash
npm install plunk-audience
```

## Setup

```typescript
import { Plunk } from "plunk-audience";

const plunk = new Plunk("sk_your_secret_key");
```

---

## `plunk.audience`

Everything to do with your subscribers and marketing emails.

### Subscribe / Unsubscribe

```typescript
// Add someone to your audience
await plunk.audience.subscribe({
  email: "jacob@example.com",
  data: { name: "Jacob", plan: "pro" }, // optional contact attributes
});

// Unsubscribe (keeps the contact, just marks them unsubscribed)
await plunk.audience.unsubscribe({
  email: "jacob@example.com",
});
```

### Send a marketing email

Only reaches subscribed contacts. Automatically includes an unsubscribe link.

```typescript
// With raw HTML body
await plunk.audience.send({
  to: "jacob@example.com",
  from: "hello@yourapp.com",
  subject: "New drop this week",
  body: "<p>Check out what we just launched.</p>",
});

// With a Plunk template
await plunk.audience.send({
  to: "jacob@example.com",
  from: "hello@yourapp.com",
  templateId: "tmpl_abc123",
  data: { first_name: "Jacob" },
});

// Blast to multiple subscribers
await plunk.audience.send({
  to: ["jacob@example.com", "other@example.com"],
  from: "hello@yourapp.com",
  subject: "Big announcement",
  body: "<p>...</p>",
});
```

### Campaigns

Send a one-time broadcast to your audience or a segment.

```typescript
// Create and send immediately
await plunk.audience.campaigns.createAndSend({
  name: "Summer Sale",
  subject: "50% off this weekend",
  body: "<h1>Big sale!</h1><p>Use code SUMMER50.</p>",
  from: "hello@yourapp.com",
});

// Using a template
await plunk.audience.campaigns.createAndSend({
  name: "Product Launch",
  subject: "Introducing our new feature",
  from: "hello@yourapp.com",
  templateId: "tmpl_abc123",
});

// Send to a specific segment
await plunk.audience.campaigns.createAndSend({
  name: "Pro user announcement",
  subject: "New feature for pro users",
  body: "<p>Hey pro user...</p>",
  from: "hello@yourapp.com",
  audienceType: "SEGMENT",
  segmentId: "seg_abc123",
});

// Schedule for later
await plunk.audience.campaigns.create({
  name: "Black Friday",
  subject: "Deals drop at midnight",
  body: "<p>...</p>",
  from: "hello@yourapp.com",
  scheduledFor: "2026-11-28T00:00:00Z",
});

// Do it in steps
const campaign = await plunk.audience.campaigns.create({ ... });
await plunk.audience.campaigns.test(campaign.id, "jacob@example.com"); // preview it
await plunk.audience.campaigns.send(campaign.id);                       // blast it

// Check performance
const stats = await plunk.audience.campaigns.stats(campaign.id);
// { sent, delivered, opened, clicked, unsubscribed, bounced }

// Other helpers
await plunk.audience.campaigns.cancel(campaign.id);
await plunk.audience.campaigns.duplicate(campaign.id);
await plunk.audience.campaigns.get(campaign.id);
```

---

## `plunk.emails`

One-off transactional emails — receipts, password resets, notifications, etc.

```typescript
// Send with raw body
await plunk.emails.send({
  to: "jacob@example.com",
  from: "hello@yourapp.com",
  subject: "Your receipt",
  body: "<p>Thanks for your purchase.</p>",
  type: "TRANSACTIONAL",
});

// Send with a template
await plunk.emails.send({
  to: { name: "Jacob", email: "jacob@example.com" },
  from: { name: "Your App", email: "hello@yourapp.com" },
  template: "tmpl_abc123",
  data: { order_id: "ORD-123" },
});

// Verify an email address before sending
const result = await plunk.emails.verify({ email: "jacob@example.com" });
// result.valid → true / false
```

### Email types

| Type | Who receives it | Footer |
|---|---|---|
| `MARKETING` | Subscribed contacts only | Includes unsubscribe link |
| `TRANSACTIONAL` | All contacts | None |
| `HEADLESS` | Subscribed contacts only | None |

---

## `plunk.events`

Track custom events to trigger Plunk workflows and automations. Automatically creates the contact if they don't exist yet.

```typescript
await plunk.events.track({
  email: "jacob@example.com",
  event: "trial_started",
  data: { plan: "pro", source: "homepage" },
});

// Control subscription state while tracking
await plunk.events.track({
  email: "jacob@example.com",
  event: "checkout_completed",
  subscribed: true,
});

// Pass a one-time variable (not stored on the contact)
await plunk.events.track({
  email: "jacob@example.com",
  event: "password_reset_requested",
  data: {
    reset_link: { value: "https://...", persistent: false },
  },
});
```

---

## Error handling

```typescript
import { Plunk, PlunkError } from "plunk-audience";

try {
  await plunk.audience.send({ ... });
} catch (e) {
  if (e instanceof PlunkError) {
    console.log(e.code);      // "INVALID_API_KEY", "RATE_LIMIT_EXCEEDED", etc.
    console.log(e.status);    // HTTP status code
    console.log(e.message);   // Human-readable message
    console.log(e.requestId); // Plunk support request ID
  }
}
```
