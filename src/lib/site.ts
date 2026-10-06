/** Site-wide details used in legal pages and emails. */
export const SITE = {
  name: "Aviant",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aviant-five.vercel.app",
  /** Public contact for privacy/support requests. Set NEXT_PUBLIC_SUPPORT_EMAIL once you have one. */
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || null,
  legalUpdated: "October 5, 2026",
};
