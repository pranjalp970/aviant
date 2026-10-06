# Aviant — web

AI CFI/DPE study app for student pilots. Next.js 16 + Tailwind v4.

```bash
npm run dev   # http://localhost:3000
```

## What's real vs. placeholder (phase 1)

| Area | Status | Where to swap it |
|---|---|---|
| Practice content (questions, lessons, quizzes) | **Sample** — written to exercise the UI | `src/content/*` — keep the types in `src/content/types.ts`, replace the arrays with verified FAA material |
| AI examiner / tutor | **Claude Opus 5.5** when `ANTHROPIC_API_KEY` is set (structured reply + grade, bank as cached grounding); keyword sample engine otherwise and for the home-page demo | `src/lib/ai/claude-provider.ts`, `src/app/api/assistant/route.ts` |
| Voice | Browser Web Speech API (Chrome/Edge/Safari) | `src/components/portal/VoiceAssistant.tsx` |
| Auth | **Supabase Auth** (email + password, confirmation + reset emails) | `src/lib/auth/`, `src/lib/supabase/`, `src/app/auth/confirm` |
| Progress, history, voice choices | **Supabase** tables with row-level security | Schema: `supabase/schema.sql` · reads `src/lib/data/queries.ts` · writes `src/lib/data/actions.ts` |
| Natural voice | ElevenLabs (or OpenAI) via `/api/tts` | `src/app/api/tts/route.ts`, voice list in `src/lib/tts/voices.ts` |

## Structure

- `src/app/(marketing)` — public home page
- `src/app/(auth)` — login, signup, forgot password
- `src/app/portal` — dashboard, voice assistant, question bank, quizzes, study guides, settings
- `src/components/brand` — logo + traced plane mark (also used for the 3D hero)
- `src/app/globals.css` — design tokens (brand: #000000, #87DA81, #E5FFBB; Tenor Sans + Afacad Flux)

## Setup

1. `cp .env.example .env.local` and fill in Supabase URL + publishable key and a voice provider key.
2. In Supabase → SQL Editor, run `supabase/schema.sql` once.
3. In Supabase → Authentication → URL Configuration, set Site URL to your site and add `<site>/auth/confirm` to Redirect URLs.
