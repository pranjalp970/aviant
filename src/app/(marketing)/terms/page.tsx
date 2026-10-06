import type { Metadata } from "next";
import Link from "next/link";
import { ContactLine, LegalPage } from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using Aviant, including its limits as a study aid.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms cover your use of Aviant. The short version: Aviant is a study aid, not flight instruction or an FAA examination. Always verify what you learn against official FAA sources and your instructor."
    >
      <section>
        <h2>1. A study aid, not instruction</h2>
        <p>
          Aviant provides practice questions, study material, and an AI-powered practice instructor and examiner to help you prepare for FAA knowledge and
          practical tests. <strong>Aviant is not affiliated with or approved by the FAA</strong>, is not a flight school, and does not provide flight
          instruction, logbook endorsements, or any official test or checkride.
        </p>
        <p className="mt-4">
          AI-generated responses and practice material can be incomplete or wrong. Before relying on anything for flight, verify it against current 14 CFR,
          the Aeronautical Information Manual, the Airman Certification Standards, your aircraft&rsquo;s documentation, and your authorized flight
          instructor. <strong>You are solely responsible for the safe operation of any aircraft.</strong> Aviant&rsquo;s practice scores do not predict or
          guarantee results on any FAA test.
        </p>
      </section>

      <section>
        <h2>2. Your account</h2>
        <ul>
          <li>You must be at least 13 years old. If you&rsquo;re under 18, you need a parent&rsquo;s or guardian&rsquo;s permission.</li>
          <li>Give accurate information and keep your password secure. You&rsquo;re responsible for activity on your account.</li>
          <li>
            You can delete your account at any time in <Link href="/portal/settings">Settings</Link>.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Acceptable use</h2>
        <p>Please don&rsquo;t:</p>
        <ul>
          <li>misuse the service, try to break its security, or get around usage limits;</li>
          <li>scrape, copy, or resell Aviant&rsquo;s content or question bank;</li>
          <li>upload material you don&rsquo;t have the right to share, or anything unlawful;</li>
          <li>use Aviant to harass others or for anything other than personal study.</li>
        </ul>
        <p className="mt-4">We may suspend accounts that break these rules.</p>
      </section>

      <section>
        <h2>4. Your content</h2>
        <p>
          You keep ownership of what you upload and write. You give us permission to store and process it, including sending it to our AI and voice
          providers, only to provide the service to you. See our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>5. Beta, pricing, and changes</h2>
        <p>
          Aviant is currently a free beta. Features, daily usage limits, and availability may change, and the service may occasionally be unavailable. If we
          introduce paid plans, we&rsquo;ll tell you before anything is charged.
        </p>
      </section>

      <section>
        <h2>6. Disclaimers and limitation of liability</h2>
        <p>
          Aviant is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, including accuracy, fitness for a
          particular purpose, or non-infringement. To the fullest extent allowed by law, Aviant and its operators are not liable for any indirect,
          incidental, special, or consequential damages, or for any loss arising from your use of, or reliance on, the service. Our total liability for any
          claim is limited to the amount you paid us in the 12 months before the claim (which, during the free beta, is zero).
        </p>
      </section>

      <section>
        <h2>7. Changes to these terms</h2>
        <p>
          We may update these terms. We&rsquo;ll change the date above, and for significant changes we&rsquo;ll let you know in the app. Continuing to use
          Aviant after an update means you accept the new terms.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          Questions about these terms? <ContactLine />.
        </p>
      </section>
    </LegalPage>
  );
}
