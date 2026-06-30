import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function AccountsCards({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `relative space-y-2 rounded-4xl border border-slate-700/50 bg-slate-700/10 p-10 md:space-y-3`,
        `border-slate-600 shadow-2xl transition-[translate,box-shadow] duration-300 hover:-translate-y-2`,
        `hover:shadow-primary-500/10`,
        className,
      )}
      {...props}
    />
  );
}

export function AccountsCardsIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-primary-500/20 m-auto mb-6 max-w-max rounded-2xl p-4 md:p-6`,
        `*:text-red-400`,
        className,
      )}
      {...props}
    />
  );
}

export function AccountsCardsHeading({
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        `font-brand-secondary text-center text-xl font-semibold md:text-2xl`,
        className,
      )}
      {...props}
    />
  );
}

export function AccountsCardsSubHeading({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(`text-foreground/60 text-center text-sm`, className)}
      {...props}
    />
  );
}

export function AccountsCardsOfferingList({
  className,
  ...props
}: ComponentProps<"ul">) {
  return <ul className={cn(`flex w-full flex-col`, className)} {...props} />;
}

export function AccountsCardsOfferingItem({
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      className={cn(
        `border-b-foreground/10 flex items-center justify-between border-b py-3 last:border-b-0`,
        className,
      )}
      {...props}
    />
  );
}

export function AccountsCardsPopulerBadge({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        `bg-secondary-400 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1 text-xs font-semibold`,
        className,
      )}
      {...props}
    >
      ⭐ Most Popular
    </span>
  );
}
