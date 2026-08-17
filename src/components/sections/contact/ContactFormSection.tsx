"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { CheckCircle2, Loader2, Paperclip, Send, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactForm } from "@/data/contact";
import { trackEvent } from "@/lib/track";
import {
  CONTACT_BG_WHITE,
  CONTACT_BTN_MOBILE,
  CONTACT_CARD,
  CONTACT_FOCUS_RING,
  CONTACT_INNER,
  CONTACT_INPUT,
  CONTACT_LABEL,
  CONTACT_SECTION_PAD,
} from "./constants";

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  department: string;
  message: string;
  interests: string[];
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  country: "Bangladesh",
  subject: "Project Inquiry",
  department: "General Inquiry",
  message: "",
  interests: [],
};

export default function ContactFormSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleInterest = (id: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFileError("");
    if (!selected) {
      setFile(null);
      return;
    }
    const maxBytes = 5 * 1024 * 1024;
    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (selected.size > maxBytes) {
      setFileError("File must be under 5MB.");
      setFile(null);
      return;
    }
    if (!allowed.includes(selected.type)) {
      setFileError("Allowed types: PDF, JPG, PNG, DOC, DOCX.");
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Valid email required";
    }
    if (!form.message.trim() || form.message.trim().length < 20) {
      next.message = "Please provide at least 20 characters";
    }
    if (form.interests.length === 0) next.interests = "Select at least one interest";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    const payload = {
      ...form,
      attachmentName: file?.name ?? null,
      submittedAt: new Date().toISOString(),
    };
    // Ready for future API: await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) })
    await new Promise((r) => setTimeout(r, 1200));
    void trackEvent("generate_lead", {
      form_name: "contact",
      subject: payload.subject,
      department: payload.department,
    });
    void payload;
    setStatus("success");
  };

  const resetForm = () => {
    setForm(initialState);
    setFile(null);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section
      id="contact-form"
      className={`relative scroll-mt-[calc(var(--header-height)+1rem)] overflow-hidden ${CONTACT_BG_WHITE} ${CONTACT_SECTION_PAD}`}
      aria-label="Contact form"
    >
      <div className={CONTACT_INNER}>
        <SectionHeading
          label={contactForm.label}
          title={contactForm.title}
          description={contactForm.subtitle}
          align="center"
        />

        <div className={`mx-auto max-w-4xl p-6 sm:p-8 lg:p-10 ${CONTACT_CARD}`}>
          {status === "success" ? (
            <div className="flex flex-col items-center py-10 text-center" role="status" aria-live="polite">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-engineering/10 text-engineering">
                <CheckCircle2 className="h-8 w-8" aria-hidden />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#1a2b4a] dark:text-foreground">
                {contactForm.successTitle}
              </h3>
              <p className="mb-8 max-w-md text-sm leading-[1.9] text-[#5a6478] dark:text-foreground-muted">
                {contactForm.successDescription}
              </p>
              <button type="button" onClick={resetForm} className={`btn-secondary ${CONTACT_FOCUS_RING}`}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="First Name"
                  error={errors.firstName}
                  required
                >
                  <input
                    className={CONTACT_INPUT}
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    autoComplete="given-name"
                    aria-invalid={!!errors.firstName}
                  />
                </Field>
                <Field label="Last Name" error={errors.lastName} required>
                  <input
                    className={CONTACT_INPUT}
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    autoComplete="family-name"
                    aria-invalid={!!errors.lastName}
                  />
                </Field>
                <Field label="Company Name">
                  <input
                    className={CONTACT_INPUT}
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    autoComplete="organization"
                  />
                </Field>
                <Field label="Email" error={errors.email} required>
                  <input
                    type="email"
                    className={CONTACT_INPUT}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    className={CONTACT_INPUT}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Country">
                  <select
                    className={CONTACT_INPUT}
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                  >
                    {contactForm.countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Subject">
                  <select
                    className={CONTACT_INPUT}
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                  >
                    {contactForm.subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Department">
                  <select
                    className={CONTACT_INPUT}
                    value={form.department}
                    onChange={(e) => update("department", e.target.value)}
                  >
                    {contactForm.departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Message" error={errors.message} required>
                <textarea
                  rows={5}
                  className={`${CONTACT_INPUT} resize-y`}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={!!errors.message}
                />
              </Field>

              <div>
                <p className={CONTACT_LABEL}>
                  I&apos;m interested in
                  {errors.interests && (
                    <span className="ml-2 font-medium normal-case tracking-normal text-red-500">
                      {errors.interests}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Areas of interest">
                  {contactForm.interests.map((item) => {
                    const selected = form.interests.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleInterest(item.id)}
                        aria-pressed={selected}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-[400ms] ${CONTACT_FOCUS_RING} ${
                          selected
                            ? "border-engineering bg-engineering text-white"
                            : "border-[#e8edf2] bg-[#fafbfd] text-[#5a6478] hover:border-engineering/40 dark:border-border dark:bg-surface"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className={CONTACT_LABEL}>Attachment (optional)</p>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-[16px] border border-dashed border-[#e8edf2] bg-[#fafbfd] px-4 py-4 text-sm text-[#5a6478] transition-colors hover:border-engineering/40 dark:border-border dark:bg-surface ${CONTACT_FOCUS_RING}`}
                >
                  <Paperclip className="h-4 w-4 text-engineering" aria-hidden />
                  <span>{file ? file.name : "Upload PDF, DOC, or image (max 5MB)"}</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={onFileChange}
                  />
                </label>
                {file && (
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-[#94a3b8] hover:text-engineering"
                  >
                    <X className="h-3 w-3" /> Remove file
                  </button>
                )}
                {fileError && <p className="mt-2 text-xs text-red-500">{fileError}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={`btn-primary group inline-flex w-full items-center justify-center disabled:opacity-70 sm:w-auto ${CONTACT_BTN_MOBILE} ${CONTACT_FOCUS_RING}`}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <Send className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={CONTACT_LABEL}>
        {label}
        {required && <span className="text-engineering"> *</span>}
        {error && (
          <span className="ml-2 font-medium normal-case tracking-normal text-red-500">{error}</span>
        )}
      </label>
      {children}
    </div>
  );
}
