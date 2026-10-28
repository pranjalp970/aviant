/** Site-wide details used in legal pages and emails. */
export const SITE = {
  name: "Aviant",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aviantapp.com",
  /** Public contact for privacy/support requests (NEXT_PUBLIC_SUPPORT_EMAIL overrides). */
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "aviantsupport@aviantapp.com",
  legalUpdated: "October 5, 2026",
};
