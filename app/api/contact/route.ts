import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Let's Talk form submissions, sent to Paul through Resend.
 *
 * RESEND_API_KEY      Resend key with sending access to pauletherealtor.com.
 * CONTACT_TO_EMAIL    Inbox that receives inquiries (defaults to the site email).
 * CONTACT_FROM_EMAIL  Sender on the verified domain.
 */
const toEmail = process.env.CONTACT_TO_EMAIL || site.email;
const fromEmail = process.env.CONTACT_FROM_EMAIL || `${site.wordmark} Website <website@pauletherealtor.com>`;

const limits = { firstName: 80, lastName: 80, email: 200, phone: 40, interest: 80, message: 5000 } as const;
type Field = keyof typeof limits;

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

  const name = `${data.firstName} ${data.lastName}`;
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Interested in", data.interest],
    ["Message", data.message || "(no message)"],
  ];

  const { error } = await new Resend(apiKey).emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject: `New inquiry from ${name}: ${data.interest}`,
    text: `New inquiry from ${site.domain}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nReply to this email to respond directly.`,
    html: emailHtml(rows),
  });

  if (error) {
    console.error("[contact] Resend error:", error.name, error.message);
    return NextResponse.json({ ok: false, error: "Message could not be sent." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function emailHtml(rows: [string, string][]) {
  const cells = rows
    .map(([k, v]) => `<tr><td style="padding:8px 16px 8px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:8px 0;color:#0c2243;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join("");
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#a8772d">New website inquiry</p>
<p style="margin:0 0 16px;color:#0c2243">Someone filled out the Let&rsquo;s Talk form on ${site.domain}.</p>
<table style="border-collapse:collapse">${cells}</table>
<p style="margin:20px 0 0;color:#6b7280;font-size:13px">Reply to this email to respond directly.</p>
</div>`;
}
