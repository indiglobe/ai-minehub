import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function HowSyntxWorksCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `space-y-2 rounded-2xl border border-slate-400/80 bg-slate-400/30 p-8 md:space-y-4 dark:border-slate-700/80 dark:bg-slate-700/30`,
        className,
      )}
      {...props}
      data-slot={`how-syntx-works-card`}
    />
  );
}

export function HowSyntxWorksCardIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `border-secondary-500/60 bg-secondary-500/10 text-secondary-500 flex size-14 items-center justify-center rounded-xl border`,
        className,
      )}
      {...props}
      data-slot={`how-syntx-works-card-icon`}
    />
  );
}

export function HowSyntxWorksCardHeading({
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(`font-brand-secondary text-xl font-bold`, className)}
      {...props}
      data-slot={`how-syntx-works-card-heading`}
    />
  );
}

export function HowSyntxWorksCardDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(`text-foreground/50 text-xs md:text-sm`, className)}
      {...props}
      data-slot={`how-syntx-works-card-description`}
    />
  );
}

export function StatCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `group relative space-y-2 overflow-clip rounded-2xl border border-slate-400/80 bg-slate-400/30 p-8 md:space-y-4 dark:border-slate-700/80 dark:bg-slate-700/30`,
        className,
      )}
      {...props}
      data-slot={`how-syntx-works-card`}
    >
      <div
        className={cn(
          `from-primary-500 to-secondary-500 absolute top-0 left-0 h-1 w-full -translate-x-full bg-linear-to-r transition-transform group-hover:translate-x-0`,
        )}
      />
      {props.children}
    </div>
  );
}

export function StatCardIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `border-secondary-500/60 bg-secondary-500/10 text-secondary-500 flex size-14 items-center justify-center rounded-xl border`,
        className,
      )}
      {...props}
      data-slot={`how-syntx-works-card-icon`}
    />
  );
}

export function StatCardHeading({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(`font-brand-secondary text-xl font-bold`, className)}
      {...props}
      data-slot={`how-syntx-works-card-heading`}
    />
  );
}

export function StatCardDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(`text-foreground/50 text-xs md:text-sm`, className)}
      {...props}
      data-slot={`how-syntx-works-card-description`}
    />
  );
}

export function IndeciesTableTag({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `inline-block rounded-tr-sm rounded-br-sm border border-l-4 border-current bg-current/10 px-2 py-1 text-xs font-semibold md:px-4 md:py-2 md:text-sm`,
        className,
      )}
      data-slot={`indecies-table-tag`}
      {...props}
    />
  );
}
