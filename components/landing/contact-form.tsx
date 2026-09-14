"use client";

import { useRef, useState, type InputHTMLAttributes } from "react";
import { ArrowRight, ArrowUp, Check, X } from "lucide-react";
import { ALLOWED_EXTENSIONS, BUDGETS, MAX_FILE_BYTES, ROLES } from "@/lib/contact";

const INPUT =
  "w-full bg-transparent border-0 border-b border-foreground/20 py-3 text-base lg:text-lg placeholder:text-muted-foreground focus:outline-none focus:border-brand transition-colors";

const CHIP =
  "cursor-pointer select-none px-4 py-2 rounded-full border border-foreground/10 bg-foreground/[0.04] text-sm text-muted-foreground transition-colors hover:border-foreground/30 has-[:checked]:bg-brand has-[:checked]:border-brand has-[:checked]:text-black has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/60";

function Field({ label, className = "", ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <input placeholder={label} className={INPUT} {...props} />
    </label>
  );
}

function Chips({
  label,
  name,
  options,
  onChange,
}: {
  label: string;
  name: string;
  options: readonly string[];
  onChange?: (value: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
      <span className="sm:w-28 shrink-0 sm:pt-2">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => (
          <label key={option} className={CHIP}>
            <input
              type="radio"
              name={name}
              value={option}
              defaultChecked={i === 0}
              onChange={() => onChange?.(option)}
              className="sr-only"
            />
            {option === "Others" ? "Others (Please specify)" : option}
          </label>
        ))}
      </div>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [otherRole, setOtherRole] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  function clearFile() {
    if (fileInput.current) fileInput.current.value = "";
    setFile(null);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    if (picked && picked.size > MAX_FILE_BYTES) {
      clearFile();
      setError(`That file is over ${MAX_FILE_BYTES / 1024 / 1024} MB. Please attach a smaller one.`);
      return;
    }
    setError("");
    setFile(picked);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-12">
        <span className="w-12 h-12 rounded-full bg-brand text-black flex items-center justify-center">
          <Check className="w-6 h-6" />
        </span>
        <h3 className="text-3xl font-display">Thanks — we got it.</h3>
        <p className="text-muted-foreground max-w-md">
          We&apos;ll review your project and reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
        <Field label="First Name *" name="firstName" required maxLength={100} autoComplete="given-name" />
        <Field label="Last Name *" name="lastName" required maxLength={100} autoComplete="family-name" />
        <Field label="Company Name (Optional)" name="company" maxLength={200} autoComplete="organization" className="sm:col-span-2" />
        <Field label="Email *" name="email" type="email" required maxLength={254} autoComplete="email" />
        <Field label="Phone Number (Optional)" name="phone" type="tel" maxLength={40} autoComplete="tel" />
      </div>

      <div className="space-y-4">
        <Chips label="I'm a/an" name="role" options={ROLES} onChange={(value) => setOtherRole(value === "Others")} />
        {otherRole && (
          <Field label="Please specify your role *" name="roleOther" required maxLength={100} autoFocus className="sm:ml-34" />
        )}
      </div>

      <div>
        <label className="block">
          <span className="sr-only">Describe your project goal</span>
          <textarea
            name="goal"
            rows={3}
            maxLength={5000}
            placeholder="Describe your project goal in a few sentences"
            className={`${INPUT} resize-y`}
          />
        </label>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground has-[:focus-visible]:text-foreground transition-colors">
            <ArrowUp className="w-4 h-4" />
            Attach Document
            <input
              ref={fileInput}
              type="file"
              name="attachment"
              accept={ALLOWED_EXTENSIONS.join(",")}
              onChange={handleFile}
              className="sr-only"
            />
          </label>
          {file ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/[0.06] text-xs font-mono text-muted-foreground">
              {file.name}
              <button type="button" onClick={clearFile} aria-label="Remove attachment" className="hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : (
            <span className="text-xs text-muted-foreground/70">PDF, Word, PowerPoint, Excel, TXT or image · max 4 MB</span>
          )}
        </div>
      </div>

      <Chips label="My Budget" name="budget" options={BUDGETS} />

      {/* Honeypot: invisible to people, bots fill it in and get silently dropped */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-foreground text-background text-base font-medium hover:bg-foreground/90 disabled:opacity-60 transition-colors"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
