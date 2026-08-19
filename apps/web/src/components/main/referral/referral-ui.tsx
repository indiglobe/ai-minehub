import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function ReferralStatCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `flex w-full flex-col items-center justify-center space-y-2 rounded-3xl border border-slate-500/50 bg-slate-200 py-6 dark:border-slate-700/50 dark:bg-slate-900`,
        className,
      )}
      data-slot={`referral-stat-card`}
      {...props}
    />
  );
}

export function ReferralStatIcon({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        `from-secondary-500/20 to-primary-500/20 border-accent-500/20 flex h-20 w-20 items-center justify-center rounded-2xl border bg-linear-to-br text-4xl`,
        className,
      )}
      data-slot={`referral-stat-icon`}
      {...props}
    />
  );
}

export function ReferralStatHeading({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(`text-2xl font-bold`, className)}
      data-slot={`referral-stat-heading`}
      {...props}
    />
  );
}

export function ReferralStatDescription({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(`text-foreground/50 text-sm`, className)}
      data-slot={`referral-stat-description`}
      {...props}
    />
  );
}
