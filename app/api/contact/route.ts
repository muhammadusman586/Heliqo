import { ALLOWED_EXTENSIONS, BUDGETS, MAX_FILE_BYTES, ROLES } from "@/lib/contact";


const clean = (value: FormDataEntryValue | null, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const fail = (message: string, status = 400) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Invalid form submission.");
  }

  if (clean(form.get("website"), 200)) return Response.json({ ok: true });

  const firstName = clean(form.get("firstName"), 100);
  const lastName = clean(form.get("lastName"), 100);
  const company = clean(form.get("company"), 200);
  const email = clean(form.get("email"), 254);
  const phone = clean(form.get("phone"), 40);
  const role = clean(form.get("role"), 50);
  const roleOther = clean(form.get("roleOther"), 100);
  const goal = clean(form.get("goal"), 5000);
  const budget = clean(form.get("budget"), 50);
  const attachment = form.get("attachment");

  if (!firstName || !lastName) return fail("Please enter your first and last name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email address.");
  if (!(ROLES as readonly string[]).includes(role)) return fail("Please choose your role.");
  if (role === "Others" && !roleOther) return fail("Please specify your role.");
  if (!(BUDGETS as readonly string[]).includes(budget)) return fail("Please choose a budget range.");

  const file = attachment instanceof File && attachment.size > 0 ? attachment : null;
  if (file) {
    if (file.size > MAX_FILE_BYTES) return fail("Attachment must be 4 MB or smaller.", 413);
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) return fail("That file type isn't supported.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return fail("The contact form isn't set up yet. Please email us directly.", 503);
  }

  const text = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Company: ${company || "—"}`,
    `Role: ${role === "Others" ? `Other — ${roleOther}` : role}`,
    `Budget: ${budget}`,
    "",
    "Project goal:",
    goal || "—",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Heliqo Website <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New project inquiry: ${firstName} ${lastName}${company ? ` (${company})` : ""}`,
      text,
      attachments: file
        ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") }]
        : undefined,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend error", res.status, await res.text());
    return fail("We couldn't send your message. Please try again or email us directly.", 502);
  }

  return Response.json({ ok: true });
}
