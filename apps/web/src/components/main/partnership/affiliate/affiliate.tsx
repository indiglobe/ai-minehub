import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import type { ComponentProps } from "react";
import Main from "@/components/main/main";
import { Axis3D, Filter } from "lucide-react";
import { FaCashRegister } from "react-icons/fa";

export default function Affiliate({
  className,
  ...props
}: ComponentProps<typeof Main>) {
  return (
    <Main className={cn(``, className)} {...props}>
      <PageHero />

      <AffiliateAdvantage />
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
          <span>Global </span>
          <span className={cn(`text-accent-500`)}>Affiliate Program </span>
        </h1>

        <p
          className={cn(
            `text-foreground/70 mx-auto max-w-160 text-base lg:text-lg xl:text-xl`,
          )}
        >
          Turn your web traffic into revenue. Utilize cutting-edge marketing
          materials and customized links to maximize your conversions through
          CPA and Revenue Share models.
        </p>

        <div
          className={cn(
            `flex w-full flex-wrap items-center justify-center gap-4`,
          )}
        >
          <Button
            variant={"accent"}
            className={cn(
              `flex h-14 items-center gap-2 rounded-md px-10 text-2xl`,
            )}
          >
            <span>Join Affiliate Network</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AffiliateAdvantage({
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
        Affiliate Advantages
      </h2>

      <AffiliateCardHolder>
        <AffiliateCard>
          <AffiliateCardIcon>
            <Filter />
          </AffiliateCardIcon>
          <AffiliateCardHeading>High Conversion Rates</AffiliateCardHeading>
          <AffiliateCardSubHeading>
            Promoting a reputable, award-winning broker makes client engagement
            and acquisition exceptionally easy.
          </AffiliateCardSubHeading>
        </AffiliateCard>

        <AffiliateCard>
          <AffiliateCardIcon>
            <FaCashRegister />
          </AffiliateCardIcon>
          <AffiliateCardHeading>Generous CPA</AffiliateCardHeading>
          <AffiliateCardSubHeading>
            Receive highly competitive Cost Per Acquisition payouts when your
            referrals register and fulfill funding deposits.
          </AffiliateCardSubHeading>
        </AffiliateCard>

        <AffiliateCard>
          <AffiliateCardIcon>
            <Axis3D />
          </AffiliateCardIcon>
          <AffiliateCardHeading>Marketing Tools</AffiliateCardHeading>
          <AffiliateCardSubHeading>
            Access a suite of pre-designed banners, landing pages, and tracking
            links available in multiple languages.
          </AffiliateCardSubHeading>
        </AffiliateCard>
      </AffiliateCardHolder>
    </section>
  );
}

export function AffiliateCardHolder({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`,
        className,
      )}
      data-slot={`affiliate-card-holder`}
      {...props}
    />
  );
}

export function AffiliateCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `space-y-4 rounded-xl border border-indigo-500/20 bg-slate-600/10 px-8 py-10 text-center`,
        className,
      )}
      data-slot={`affiliate-card`}
      {...props}
    />
  );
}

export function AffiliateCardIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `text-accent-500 flex items-center justify-center *:size-12`,
        className,
      )}
      data-slot={`affiliate-card-icon`}
      {...props}
    />
  );
}

export function AffiliateCardHeading({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(`text-lg font-semibold md:text-xl`, className)}
      data-slot={`affiliate-card-heading`}
      {...props}
    />
  );
}

export function AffiliateCardSubHeading({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(`text-foreground/50`, className)}
      data-slot={`affiliate-card-sub-heading`}
      {...props}
    />
  );
}
