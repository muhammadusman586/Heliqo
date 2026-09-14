export const ROLES = [
  "Owner/Founder",
  "CEO",
  "Marketer",
  "Product Manager",
  "Operations Manager",
  "Sales Manager",
  "Others",
] as const;

export const BUDGETS = ["Under 10K", "10k - 50k", "50k - 200k", "200k - 500k", "More than 500k"] as const;

export const MAX_FILE_BYTES = 4 * 1024 * 1024;

export const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".txt", ".png", ".jpg", ".jpeg"];

// Your Calendly scheduling page, e.g. https://calendly.com/heliqo/30min — empty shows an email fallback.
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
