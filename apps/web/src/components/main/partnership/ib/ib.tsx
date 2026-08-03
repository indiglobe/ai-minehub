import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import type { ComponentProps } from "react";
import Main from "../../main";
import { ChartLine, UserRound, Wallet } from "lucide-react";

export default function IB({
  className,
  ...props
}: ComponentProps<typeof Main>) {
  return (
    <Main className={cn(``, className)} {...props}>
      <PageHero />

      <WhyChoseIBProgram />
    </Main>
  );
}

export function PageHero({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding relative space-y-6 py-20 text-center`,
        className,
      )}
      data-slot={`page-hero`}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          `absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--color-secondary-500)_20%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-primary-500)_20%,transparent)_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] bg-size-[56px_56px]`,
        )}
      />

      <div className={cn(`space-y-6`)}>
        <h1
          className={cn(
            `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
          )}
        >
          <span>Introducing </span>
          <span className={cn(`text-indigo-500`)}>Broker Program </span>
        </h1>

        <p
          className={cn(
            `text-foreground/70 mx-auto max-w-160 text-base lg:text-lg xl:text-xl`,
          )}
        >
          Partner with a globally recognized broker and build a sustainable
          business. Earn competitive rebates for every trade your referred
          clients make.
        </p>

        <div
          className={cn(
            `flex w-full flex-wrap items-center justify-center gap-4`,
          )}
        >
          <Button
            variant={"secondary"}
            className={cn(
              `flex h-14 items-center gap-2 rounded-md px-10 text-2xl`,
            )}
          >
            <span>Become an IB</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function WhyChoseIBProgram({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`default-padding bg-indigo-500/5 pt-20 pb-30`, className)}
      {...props}
    >
      <h2
        className={cn(`pb-10 text-center text-2xl font-semibold md:text-4xl`)}
      >
        Why Choose Our IB Program?
      </h2>

      <WhyChoseCardHolder>
        <WhyChoseCard>
          <WhyChoseCardIcon>
            <ChartLine />
          </WhyChoseCardIcon>
          <WhyChoseCardHeading>High Rebates</WhyChoseCardHeading>
          <WhyChoseCardSubHeading>
            Earn some of the highest volume-based rebates in the industry. The
            more your network trades, the more you earn.
          </WhyChoseCardSubHeading>
        </WhyChoseCard>

        <WhyChoseCard>
          <WhyChoseCardIcon>
            <Wallet />
          </WhyChoseCardIcon>
          <WhyChoseCardHeading>Daily Payouts</WhyChoseCardHeading>
          <WhyChoseCardSubHeading>
            Get your commissions transferred directly to your secure partner
            wallet with no hidden processing delays.
          </WhyChoseCardSubHeading>
        </WhyChoseCard>

        <WhyChoseCard>
          <WhyChoseCardIcon>
            <UserRound />
          </WhyChoseCardIcon>
          <WhyChoseCardHeading>Dedicated Manager</WhyChoseCardHeading>
          <WhyChoseCardSubHeading>
            Work with a personal account manager assigned to assist you with
            onboarding clients and expanding your strategy.
          </WhyChoseCardSubHeading>
        </WhyChoseCard>
      </WhyChoseCardHolder>
    </section>
  );
}

export function WhyChoseCardHolder({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`,
        className,
      )}
      data-slot={`why-chose-card-holder`}
      {...props}
    />
  );
}

export function WhyChoseCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `space-y-4 rounded-xl border border-indigo-500/20 bg-slate-600/10 px-8 py-10 text-center`,
        className,
      )}
      data-slot={`why-chose-card`}
      {...props}
    />
  );
}

export function WhyChoseCardIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `text-secondary-500 flex items-center justify-center *:size-12`,
        className,
      )}
      data-slot={`why-chose-card-icon`}
      {...props}
    />
  );
}

export function WhyChoseCardHeading({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(`text-lg font-semibold md:text-xl`, className)}
      data-slot={`why-chose-card-heading`}
      {...props}
    />
  );
}

export function WhyChoseCardSubHeading({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(`text-foreground/50`, className)}
      data-slot={`why-chose-card-sub-heading`}
      {...props}
    />
  );
}
