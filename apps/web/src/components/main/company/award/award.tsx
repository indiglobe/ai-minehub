import type { ComponentProps } from "react";
import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { ShieldCheckIcon, Star, Trophy } from "lucide-react";

export default function Award() {
  return (
    <Main>
      <Pageheading />
      <AwardList />
    </Main>
  );
}

export function Pageheading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`default-padding relative py-10 text-center`, className)}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          `absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--color-secondary-500)_20%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-primary-500)_20%,transparent)_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] bg-size-[56px_56px]`,
        )}
      />

      <h1
        className={cn(
          `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
        )}
      >
        <span>Industry </span>
        <span className={cn(`text-yellow-500`)}>Awards</span>
      </h1>

      <p
        className={cn(
          `text-foreground/70 m-auto max-w-160 text-base lg:text-lg xl:text-xl`,
        )}
      >
        Recognized by peer organizations and top critics globally for excellence
        in brokerage services and robust execution systems.
      </p>
    </section>
  );
}

export function AwardList({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "default-padding grid grid-cols-1 gap-4 bg-slate-300 py-10 lg:grid-cols-3 lg:py-16 dark:bg-slate-900",
        className,
      )}
      {...props}
    >
      <AwardCard>
        <AwardIcon>
          <Trophy />
        </AwardIcon>
        <AwardHeading>Best Crypto Broker 2025</AwardHeading>
        <AwardDescription>Global Trading Expo</AwardDescription>
      </AwardCard>
      <AwardCard>
        <AwardIcon>
          <Star />
        </AwardIcon>
        <AwardHeading>Most Transparent Execution</AwardHeading>
        <AwardDescription>Finance Weekly Awards</AwardDescription>
      </AwardCard>
      <AwardCard>
        <AwardIcon>
          <ShieldCheckIcon />
        </AwardIcon>
        <AwardHeading>Excellence in Security</AwardHeading>
        <AwardDescription>Fintech Security Summit</AwardDescription>
      </AwardCard>
    </section>
  );
}

export function AwardCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`award-card`}
      className={cn(
        `flex flex-col items-center justify-start gap-4 rounded-2xl border border-yellow-500/50 bg-black/5 px-6 py-4 dark:bg-white/3`,
        className,
      )}
      {...props}
    />
  );
}

export function AwardIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`award-icon`}
      className={cn(`*:size-14 *:fill-yellow-500 *:text-yellow-500`, className)}
      {...props}
    />
  );
}

export function AwardHeading({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      data-slot={`award-heading`}
      className={cn(`text-center text-xl font-bold`, className)}
      {...props}
    />
  );
}

export function AwardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot={`award-description`}
      className={cn(`text-foreground/50 text-center text-sm`, className)}
      {...props}
    />
  );
}
