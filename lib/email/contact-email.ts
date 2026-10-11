import { site } from "@/lib/site";

export interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

/*
 * Branded "new inquiry" email for Paul, styled like the website: cream page,
 * white card, navy and gold, serif headings. Email clients only render
 * table layouts with inline styles and system fonts, so Georgia stands in
 * for the site's Libre Caslon and Arial for Inter.
 */
const c = {
  navy: "#0c2243",
  gold: "#a8772d",
  goldButton: "#b0843a",
  cream: "#f7f4ef",
  line: "#e6dcc8",
  text: "#2c3a4f",
  muted: "#6b7280",
};
const serif = "Georgia, 'Times New Roman', Times, serif";
const sans = "Arial, Helvetica, sans-serif";

export function buildContactEmail(s: ContactSubmission, siteOrigin: string) {
  const name = `${s.firstName} ${s.lastName}`;
  const subject = `New inquiry from ${name}: ${s.interest}`;
  const phoneHref = `tel:${s.phone.replace(/[^\d+]/g, "")}`;
  const replyHref = `mailto:${s.email}?subject=${encodeURIComponent(`Re: Your inquiry on ${site.domain}`)}`;
  const logo = `${siteOrigin}/home-reference/logo-horizontal.png`;

  const detail = (label: string, value: string, href?: string) => `
              <tr>
                <td style="padding:12px 14px 12px 0;border-bottom:1px solid ${c.line};width:118px;white-space:nowrap;vertical-align:top;font-family:${sans};font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:${c.gold};">${label}</td>
                <td style="padding:12px 0;border-bottom:1px solid ${c.line};vertical-align:top;font-family:${sans};font-size:15px;color:${c.navy};">${href ? `<a href="${escape(href)}" style="color:${c.navy};text-decoration:none;">${escape(value)}</a>` : escape(value)}</td>
              </tr>`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(subject)}</title></head>
<body style="margin:0;padding:0;background:${c.cream};">
  <div style="display:none;max-height:0;overflow:hidden;">${escape(name)} is interested in ${escape(s.interest)}. Reply to this email to respond directly.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.cream};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${c.line};">
          <tr>
            <td style="padding:26px 32px 22px;border-bottom:3px solid ${c.goldButton};">
              <img src="${logo}" width="220" alt="PaulEtheRealtor. Real Estate. Real Expertise. Real Results." style="display:block;width:220px;max-width:100%;height:auto;border:0;font-family:${serif};font-size:22px;color:${c.navy};">
            </td>
          </tr>
          <tr>
            <td style="padding:30px 32px 6px;">
              <p style="margin:0 0 10px;font-family:${sans};font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:${c.gold};">New Website Inquiry</p>
              <h1 style="margin:0;font-family:${serif};font-size:30px;font-weight:normal;line-height:1.15;color:${c.navy};">${escape(name)}</h1>
              <p style="margin:8px 0 0;font-family:${serif};font-size:20px;line-height:1.3;color:${c.gold};">${escape(s.interest)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detail("Email", s.email, `mailto:${s.email}`)}${detail("Phone", s.phone, phoneHref)}${detail("Interested in", s.interest)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px 6px;">
              <p style="margin:0 0 10px;font-family:${sans};font-size:11px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:${c.gold};">Message</p>
              <div style="padding:16px 18px;background:${c.cream};border-left:3px solid ${c.goldButton};font-family:${sans};font-size:15px;line-height:1.6;color:${c.text};white-space:pre-wrap;">${s.message ? escape(s.message) : `<span style="color:${c.muted};font-style:italic;">No message was included.</span>`}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${c.goldButton};border:1px solid #9c793c;"><a href="${escape(replyHref)}" style="display:inline-block;padding:13px 20px;white-space:nowrap;font-family:${sans};font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to ${escape(s.firstName)}</a></td>
                  <td style="width:10px;min-width:10px;font-size:0;line-height:0;">&nbsp;</td>
                  <td style="border:1px solid ${c.goldButton};"><a href="${escape(phoneHref)}" style="display:inline-block;padding:12px 18px;white-space:nowrap;font-family:${sans};font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${c.gold};text-decoration:none;">Call ${escape(s.firstName)}</a></td>
                </tr>
              </table>
              <p style="margin:16px 0 0;font-family:${sans};font-size:13px;line-height:1.5;color:${c.muted};">You can also just hit Reply. It goes straight to ${escape(s.firstName)}.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px;background:${c.navy};">
              <p style="margin:0;font-family:${serif};font-size:17px;color:#ffffff;">Let&rsquo;s Talk About Your Goals.</p>
              <p style="margin:6px 0 0;font-family:${sans};font-size:12px;line-height:1.5;color:#c9d2de;">Sent from the Let&rsquo;s Talk form on ${site.domain} &middot; ${site.brokerage}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `New website inquiry from ${site.domain}`,
    "",
    `Name: ${name}`,
    `Email: ${s.email}`,
    `Phone: ${s.phone}`,
    `Interested in: ${s.interest}`,
    "",
    "Message:",
    s.message || "(no message)",
    "",
    "Reply to this email to respond directly.",
  ].join("\n");

  return { subject, html, text };
}

function escape(value: string) {
  return value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}
