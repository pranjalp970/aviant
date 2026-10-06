# Aviant auth emails

Paste each template into **Supabase → Authentication → Emails → Templates**
(switch the editor to HTML/Source), with this subject line:

| Supabase template | File | Subject |
|---|---|---|
| Confirm sign up | `confirm-signup.html` | Confirm your Aviant account |
| Reset password | `reset-password.html` | Reset your Aviant password |
| Magic link | `magic-link.html` | Your Aviant sign-in link |
| Change email address | `change-email.html` | Confirm your new email for Aviant |

To change the wording or colors, edit `build.py` and run `python3 supabase/email-templates/build.py`.

Links use `{{ .SiteURL }}/auth/confirm?token_hash=…`, so **Site URL** under
Authentication → URL Configuration must be your site (`http://localhost:3000` locally,
your real domain once deployed).

## Sending from Aviant instead of Supabase

Templates change how the email *looks*. To change who it's *from*, connect your own
email sender (needs a domain you own):

1. Sign up at resend.com (free: 3,000 emails/month) → **Domains → Add domain** → add
   the DNS records it shows at your domain registrar → wait until it says *Verified*.
2. Resend → **API Keys → Create** (permission: Sending access).
3. Supabase → **Authentication → Emails → SMTP Settings → Enable custom SMTP**:
   - Sender email: `hello@yourdomain.com` (or `no-reply@…`)
   - Sender name: `Aviant`
   - Host `smtp.resend.com` · Port `465` · Username `resend` · Password: the Resend API key
4. Raise the email rate limit under **Authentication → Rate Limits** if needed.
