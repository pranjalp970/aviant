import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

export function Field({ label, name, error, hint, className, ...rest }: FieldProps) {
  const id = `f-${name}`;
  const describedBy = [error && `${id}-err`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm text-fg-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={clsx(
          "h-12 w-full rounded-xl border bg-inset px-4 text-base text-fg placeholder:text-fg-subtle transition-colors focus:outline-none",
          error ? "border-danger/70 focus:border-danger" : "border-border-strong focus:border-green",
        )}
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-fg-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
