"""
Builds the Aviant auth email templates for Supabase.
Run:  python3 supabase/email-templates/build.py
Then paste each .html into Supabase → Authentication → Emails → Templates
(the subject line for each is in README.md).

Links point at our own /auth/confirm route using {{ .TokenHash }}, so emails
never show a supabase.co URL. Email clients need tables + inline styles.
"""
from pathlib import Path

BLACK, CARD, BORDER = "#000000", "#0b0d0b", "#1f241f"
FG, MUTED, SUBTLE = "#f4f7f2", "#a3aba0", "#7b8478"
GREEN, LIME, ON_ACCENT = "#87DA81", "#E5FFBB", "#051204"
FONT = "'Afacad Flux', 'Helvetica Neue', Helvetica, Arial, sans-serif"
DISPLAY = "'Tenor Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"

GREETING = "{{ if .Data.name }}Hi {{ .Data.name }},{{ else }}Hi there,{{ end }}"


def layout(*, preheader: str, heading: str, body_html: str, button_label: str, link: str, footnote: str) -> str:
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>{heading}</title>
<link href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@400;500&family=Tenor+Sans&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:{BLACK};">
<!-- inbox preview text -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">{preheader}&#8202;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:{BLACK};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
        <!-- wordmark -->
        <tr>
          <td style="padding:0 8px 28px 8px;font-family:{FONT};">
            <span style="font-size:26px;line-height:1;color:{GREEN};font-weight:300;letter-spacing:0.5px;">aviant</span>
          </td>
        </tr>
        <!-- card -->
        <tr>
          <td style="background:{CARD};border:1px solid {BORDER};border-radius:24px;padding:40px 36px;">
            <h1 style="margin:0 0 20px 0;font-family:{DISPLAY};font-weight:400;font-size:30px;line-height:1.2;color:{FG};">{heading}</h1>
            <p style="margin:0 0 16px 0;font-family:{FONT};font-size:17px;line-height:1.6;color:{FG};">{GREETING}</p>
            {body_html}
            <!-- button -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px 0;">
              <tr>
                <td align="center" bgcolor="{LIME}" style="border-radius:999px;">
                  <a href="{link}" target="_blank" style="display:inline-block;padding:15px 32px;font-family:{FONT};font-size:16px;font-weight:500;color:{ON_ACCENT};text-decoration:none;border-radius:999px;">{button_label}</a>
                </td>
              </tr>
            </table>
            <p style="margin:24px 0 0 0;font-family:{FONT};font-size:14px;line-height:1.6;color:{SUBTLE};">
              Button not working? Paste this link into your browser:<br>
              <a href="{link}" style="color:{GREEN};word-break:break-all;">{link}</a>
            </p>
          </td>
        </tr>
        <!-- footer -->
        <tr>
          <td style="padding:28px 8px 0 8px;font-family:{FONT};font-size:13px;line-height:1.6;color:{SUBTLE};">
            {footnote}<br><br>
            <span style="color:{MUTED};">Train smarter. Fly better.</span><br>
            Aviant: your AI flight instructor and examiner.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
"""


def p(text: str) -> str:
    return f'<p style="margin:0 0 16px 0;font-family:{FONT};font-size:17px;line-height:1.6;color:{MUTED};">{text}</p>'


CONFIRM = "{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/portal"
TEMPLATES = {
    "confirm-signup.html": dict(
        preheader="One tap to activate your Aviant account and start training.",
        heading="Confirm your email",
        body_html=p("Welcome aboard. Confirm your email address to activate your Aviant account. Then you can start drilling questions and practicing your oral with your AI examiner."),
        button_label="Confirm my email",
        link=CONFIRM,
        footnote="You're receiving this because someone signed up for Aviant with this address. If that wasn't you, you can ignore this email and no account will be created.",
    ),
    "reset-password.html": dict(
        preheader="Use this link to choose a new Aviant password.",
        heading="Reset your password",
        body_html=p("We got a request to reset the password for your Aviant account. Tap below to choose a new one. The link expires in 1 hour."),
        button_label="Choose a new password",
        link="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password",
        footnote="Didn't ask for this? You can safely ignore this email. Your password won't change.",
    ),
    "magic-link.html": dict(
        preheader="Your one-time link to sign in to Aviant.",
        heading="Your sign-in link",
        body_html=p("Tap below to sign in to Aviant. This link works once and expires in 1 hour."),
        button_label="Sign in to Aviant",
        link=CONFIRM,
        footnote="If you didn't try to sign in, you can ignore this email.",
    ),
    "change-email.html": dict(
        preheader="Confirm the new email address for your Aviant account.",
        heading="Confirm your new email",
        body_html=p("You asked to change your Aviant account email from <span style=\"color:#f4f7f2;\">{{ .Email }}</span> to <span style=\"color:#f4f7f2;\">{{ .NewEmail }}</span>. Confirm below to finish the change."),
        button_label="Confirm new email",
        link="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email_change&next=/portal/settings",
        footnote="If you didn't request this change, ignore this email and your account email stays the same.",
    ),
}

out = Path(__file__).parent
for name, t in TEMPLATES.items():
    (out / name).write_text(layout(**t))
    print("wrote", name)
