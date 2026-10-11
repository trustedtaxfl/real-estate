"use client";

import { Suspense, useEffect, useState } from "react";
import { Controller, useForm, type UseFormSetValue } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pathways } from "@/lib/pathways";
import { trackEvent } from "@/components/site/AnalyticsEvents";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  botcheck: boolean;
}

const interests = [...pathways.map((p) => p.interest), "Something Else"];

/**
 * Contact form per the Let's Talk copy: First Name, Last Name, Email, Phone,
 * "I'm interested in" and Message. Submits to /api/contact, which emails
 * Paul through Resend.
 *
 * Reads ?interest= and ?about= so pathway and community links arrive with
 * the form pre-filled.
 */
export function ContactForm({ variant = "default" }: { variant?: "default" | "reference" } = {}) {
  const compact = variant === "reference";
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { interest: "", message: "" },
  });

  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (data: FormData) => {
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Contact request failed: ${res.status}`);
      trackEvent("contact-form-submitted");
      setStatus({ ok: true, text: "Thank you. Your message is on its way and I'll be in touch soon." });
      reset({ interest: "", message: "" });
    } catch {
      setStatus({
        ok: false,
        text: `Something went wrong sending your message. Please call or text ${site.phone} instead.`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => submit(data))}
      noValidate
      className={compact ? "space-y-3" : "space-y-5"}
      aria-describedby={status ? "form-status" : undefined}
    >
      <Suspense fallback={null}>
        <PrefillFromQuery setValue={setValue} />
      </Suspense>
      {status && (
        <div
          id="form-status"
          role="status"
          className={cn(
            "flex items-start gap-3 border p-4 text-sm",
            status.ok
              ? "border-green-200 bg-green-50 text-green-900"
              : "border-red-200 bg-red-50 text-red-900"
          )}
        >
          {status.ok ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          )}
          <p>{status.text}</p>
        </div>
      )}

      <div className={cn("grid sm:grid-cols-2", compact ? "gap-3" : "gap-5")}>
        <Field compact={compact} id="firstName" label="First Name" error={errors.firstName?.message}>
          <Input
            id="firstName"
          placeholder={compact ? "First Name *" : undefined}
            autoComplete="given-name"
            className="h-12 bg-card"
            aria-invalid={!!errors.firstName}
            {...register("firstName", { required: "First name is required" })}
          />
        </Field>
        <Field compact={compact} id="lastName" label="Last Name" error={errors.lastName?.message}>
          <Input
            id="lastName"
          placeholder={compact ? "Last Name *" : undefined}
            autoComplete="family-name"
            className="h-12 bg-card"
            aria-invalid={!!errors.lastName}
            {...register("lastName", { required: "Last name is required" })}
          />
        </Field>
      </div>

      <Field compact={compact} id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          placeholder={compact ? "Email *" : undefined}
          type="email"
          autoComplete="email"
          inputMode="email"
          className="h-12 bg-card"
          aria-invalid={!!errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
          })}
        />
      </Field>

      <Field compact={compact} id="phone" label="Phone Number" error={errors.phone?.message}>
        <Input
          id="phone"
          placeholder={compact ? "Phone Number *" : undefined}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className="h-12 bg-card"
          aria-invalid={!!errors.phone}
          {...register("phone", { required: "Phone number is required" })}
        />
      </Field>

      <Field compact={compact} id="interest" label="I'm interested in…" error={errors.interest?.message}>
        <Controller
          control={control}
          name="interest"
          rules={{ required: "Choose what you're interested in" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} name={field.name}>
              <SelectTrigger
                id="interest"
                className="w-full bg-card data-[size=default]:h-12"
                aria-invalid={!!errors.interest}
              >
                <SelectValue placeholder={compact ? "I’m interested in… *" : "Select one"} />
              </SelectTrigger>
              <SelectContent>
                {interests.map((i) => (
                  <SelectItem key={i} value={i}>
                    {i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field compact={compact} id="message" label="Your Message" optional>
        <Textarea
          id="message"
          rows={5}
          placeholder={compact ? "Your Message" : undefined}
          className="resize-none bg-card"
          {...register("message")}
        />
      </Field>

      {/* Honeypot */}
      <input
        type="checkbox"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("botcheck")}
      />

      <Button type="submit" size="cta" disabled={isSubmitting} className={cn("w-full sm:w-auto", compact && "rounded-[3px] px-9 uppercase tracking-[0.06em]")} data-analytics="contact-submit">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send Message
            <ArrowRight aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}

/**
 * Applies ?interest= and ?about= from pathway and community links. Lives in
 * its own Suspense boundary so the form itself is server-rendered.
 */
function PrefillFromQuery({ setValue }: { setValue: UseFormSetValue<FormData> }) {
  const params = useSearchParams();
  const presetInterest = params.get("interest") ?? "";
  const about = params.get("about");
  useEffect(() => {
    if (interests.includes(presetInterest)) setValue("interest", presetInterest);
    if (about) setValue("message", `I'd like to learn more about ${about}.`);
  }, [presetInterest, about, setValue]);
  return null;
}

function Field({
  id,
  label,
  error,
  optional,
  compact,
  children,
}: {
  compact?: boolean;
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <Label htmlFor={id} className={cn("text-sm font-medium text-navy", compact && "sr-only")}>
        {label}
        {!optional && (
          <span className="text-gold-ink" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
