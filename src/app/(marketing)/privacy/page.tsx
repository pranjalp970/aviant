import type { Metadata } from "next";
import Link from "next/link";
import { ContactLine, LegalPage } from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Aviant collects, why, who processes it, and how to delete it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Aviant is a study tool for student pilots. We collect only what we need to run it, we don't sell your data, and you can delete your account and everything in it at any time."
    >
      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Account details:</strong> your name, email address, the rating you&rsquo;re training for, and (optionally) your checkride date.
          </li>
          <li>
            <strong>Study activity:</strong> quiz attempts and answers, which questions you&rsquo;ve reviewed, lessons you&rsquo;ve opened, and your voice-assistant
            conversations (as text transcripts) with their grades.
          </li>
          <li>
            <strong>Files you upload</strong> for a mock checkride, such as a cross-country plan or an aircraft&rsquo;s Pilot&rsquo;s Operating Handbook.
          </li>
          <li>
            <strong>Preferences</strong> such as your chosen assistant voices.
          </li>
          <li>
            <strong>Basic technical data</strong> (for example IP address and browser type) that our hosting provider logs to keep the service secure and
            working.
          </li>
        </ul>
        <p className="mt-4">
          <strong>Voice:</strong> when you speak to the assistant, speech-to-text is handled by your browser (for example Chrome sends audio to Google; Safari
          uses Apple). Aviant receives only the resulting text. We do not record or store your audio.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To run your account and save your progress.</li>
          <li>To generate the AI instructor and examiner&rsquo;s replies, grade your answers, and read them aloud.</li>
          <li>To show your history, readiness, and study recommendations.</li>
          <li>To keep the service secure, prevent abuse, and enforce fair daily usage limits.</li>
        </ul>
        <p className="mt-4">We don&rsquo;t sell your personal information, and we don&rsquo;t use it for advertising.</p>
      </section>

      <section>
        <h2>Who processes it for us</h2>
        <p>We rely on a few service providers, who process data only to provide their service to us:</p>
        <ul>
          <li>
            <strong>Supabase:</strong> account sign-in, database, and file storage.
          </li>
          <li>
            <strong>Vercel:</strong> website hosting.
          </li>
          <li>
            <strong>Anthropic (Claude):</strong> generates the AI instructor and examiner&rsquo;s replies. Your messages, relevant study material, and any
            uploaded checkride files are sent to it to produce a response.
          </li>
          <li>
            <strong>ElevenLabs:</strong> turns the assistant&rsquo;s replies into speech. It receives the text being spoken.
          </li>
        </ul>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          We keep your data while your account is open. When you delete your account, we delete your profile, study history, conversations, and uploaded
          files. Backups held by our providers roll over and expire on their own schedules.
        </p>
      </section>

      <section>
        <h2>Your choices and rights</h2>
        <ul>
          <li>
            <strong>Delete your account</strong> anytime from <Link href="/portal/settings">Settings</Link>. This permanently removes your data.
          </li>
          <li>
            <strong>Access or correct</strong> your information in Settings, or ask us for a copy.
          </li>
          <li>
            Depending on where you live (for example California or the EU), you may have additional rights. To use them, <ContactLine />.
          </li>
        </ul>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Aviant isn&rsquo;t intended for children under 13, and we don&rsquo;t knowingly collect their data. Student pilots under 18 should use Aviant with a
          parent&rsquo;s or guardian&rsquo;s permission.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          Data is encrypted in transit, access to each student&rsquo;s data is restricted to that student at the database level, and secret keys are kept
          server-side. No system is perfectly secure, but we work to protect your information.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          If we change this policy, we&rsquo;ll update the date above and, for significant changes, let you know in the app. Questions? <ContactLine />.
        </p>
      </section>
    </LegalPage>
  );
}
