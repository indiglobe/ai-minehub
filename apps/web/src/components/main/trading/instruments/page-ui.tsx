import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function SectionMetadata({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(`flex items-center justify-start gap-4`, className)}
      data-slot={`section-metadata`}
      {...props}
    />
  );
}

export function SectionIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(`*:size-10`, className)}
      data-slot={`section-icon`}
      {...props}
    />
  );
}

export function SectionHeading({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(``, className)}
      data-slot={`section-heading`}
      {...props}
    />
  );
}

export function SectionTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(`fs-5 md:fs-7 font-bold`, className)}
      data-slot={`section-title`}
      {...props}
    />
  );
}

export function SectionDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(`text-foreground/50 text-sm md:text-base`, className)}
      data-slot={`section-description`}
      {...props}
    />
  );
}

export function InstrumentStatCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-foreground/5 flex flex-col items-center justify-center rounded-md border border-slate-400 px-10 py-6 dark:border-slate-700`,
        className,
      )}
      data-slot={`instrument-stat-card`}
      {...props}
    />
  );
}

export function InstrumentStatTitle({
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(`font-brand-secondary text-2xl font-black`, className)}
      data-slot={`instrument-stat-title`}
      {...props}
    />
  );
}

export function InstrumentStatText({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(`text-foreground/40 text-sm`, className)}
      data-slot={`instrument-stat-text`}
      {...props}
    />
  );
}
