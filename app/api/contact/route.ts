import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { buildContactEmail } from "@/lib/email/contact-email";

/**
 * Let's Talk form submissions, sent to Paul through Resend.
 *
 * RESEND_API_KEY      Resend key with sending access to pauletherealtor.com.
 * CONTACT_TO_EMAIL    Inbox that receives inquiries (defaults to the site email).
 * CONTACT_FROM_EMAIL  Sender on the verified domain.
 *
 * The email's logo loads from the production deployment, which Vercel exposes
 * as VERCEL_PROJECT_PRODUCTION_URL.
 */
const toEmail = process.env.CONTACT_TO_EMAIL || site.email;
const fromEmail = process.env.CONTACT_FROM_EMAIL || `${site.wordmark} Website <website@pauletherealtor.com>`;

const limits = { firstName: 80, lastName: 80, email: 200, phone: 40, interest: 80, message: 5000 } as const;
type Field = keyof typeof limits;

const siteOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots tick the hidden checkbox. Pretend success so they don't retry.
  if (body.botcheck) return NextResponse.json({ ok: true });

  const data = {} as Record<Field, string>;
  for (const key of Object.keys(limits) as Field[]) {
    data[key] = typeof body[key] === "string" ? (body[key] as string).trim().slice(0, limits[key]) : "";
  }

  const missing = (["firstName", "lastName", "email", "phone", "interest"] as const).filter((k) => !data[k]);
  if (missing.length || !emailPattern.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Please complete all required fields with a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "Email is not configured." }, { status: 500 });
  }

  const { subject, html, text } = buildContactEmail(data, siteOrigin);
  const { error } = await new Resend(apiKey).emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("[contact] Resend error:", error.name, error.message);
    return NextResponse.json({ ok: false, error: "Message could not be sent." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

