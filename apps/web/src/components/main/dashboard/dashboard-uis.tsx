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

export function ActiveSessionStatCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-foreground/10 flex grow flex-col items-center justify-center rounded-md px-10 py-4`,
        className,
      )}
      data-slot={`active-session-stat-card`}
      {...props}
    />
  );
}

export function Progress({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(`space-y-2 py-2`, className)}
      data-slot={`progress`}
      {...props}
    />
  );
}

export function ProgressStat({
  className,
  progress,
  ...props
}: ComponentProps<"div"> & { progress: number }) {
  return (
    <div
      className={cn(`flex w-full items-center justify-between`, className)}
      data-slot={`progress-stat`}
      {...props}
    >
      <span className={cn(`text-foreground/50 text-xs`)}>Progress</span>
      <span className={cn(`text-foreground/50 text-xs`)}>{progress} %</span>
    </div>
  );
}

export function ProgressBar({
  className,
  progress,
  ...props
}: ComponentProps<"div"> & { progress: number }) {
  return (
    <div
      className={cn(
        `bg-foreground/10 relative isolate h-1 w-full overflow-clip rounded-full`,
        className,
      )}
      data-slot={`progress-bar`}
      {...props}
    >
      <div
        className={cn(
          `absolute inset-0 h-full w-full rounded-full bg-blue-500`,
        )}
        style={{ left: `-${100 - progress}%` }}
      />
    </div>
  );
}

export function ActiveDenoteBadge() {
  return (
    <div
      className={cn(
        `ml-auto flex max-h-max max-w-max items-center space-x-1 rounded-full border border-green-500/50 bg-green-500/20 px-3 py-1`,
      )}
      data-slot={`active-denote-badge`}
    >
      <span className={cn(`inline-block size-2 rounded-full bg-green-500`)} />
      <span className={cn(`text-xs text-green-500`)}>Active</span>
    </div>
  );
}
