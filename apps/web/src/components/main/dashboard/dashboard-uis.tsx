import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function StatCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        className,
      )}
      data-slot={`stat-card`}
      {...props}
    />
  );
}

export function StatCardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `flex w-full items-center justify-between gap-4 uppercase`,
        className,
      )}
      data-slot={`stat-card-header`}
      {...props}
    />
  );
}

export function StatCardHeadingText({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(`text-foreground/50 text-sm`, className)}
      data-slot={`stat-card-heading-text`}
      {...props}
    />
  );
}

export function StatCardHeadingIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `rounded-md border border-current/20 bg-current/10 p-2 *:size-4`,
        className,
      )}
      data-slot={`stat-card-heading-icon`}
      {...props}
    />
  );
}

export function StatCardData({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `font-brand-secondary mt-6 mb-2 text-2xl font-semibold`,
        className,
      )}
      data-slot={`stat-card-data`}
      {...props}
    />
  );
}

export function StatCardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(`text-foreground/50 text-xs`, className)}
      data-slot={`stat-card-footer`}
      {...props}
    />
  );
}
