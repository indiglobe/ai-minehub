import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Globe } from "lucide-react";
import { Button } from "@repo/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function SectionIdentifier({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`section identifier`}
      className={cn(
        `border-secondary-500/40 bg-secondary-500/20 text-secondary-500 mx-auto inline-block rounded-full border px-4 py-2 text-center text-xs font-semibold uppercase`,
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeading({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      data-slot={`section-heading`}
      className={cn(
        `fs-8 md:fs-10 font-brand-secondary text-center font-bold`,
        className,
      )}
      {...props}
    />
  );
}

export function SectionSubHeading({
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        `fs-3.5 md:fs-4.5 text-foreground/50 max-w-140 text-center`,
        className,
      )}
      {...props}
    />
  );
}

export function WhyChooseCards({ className, ...props }: ComponentProps<"div">) {
  useGSAP(() => {
    gsap.to(".gsap-section-sub-heading", {
      opacity: 1,
      top: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".gsap-section-sub-heading",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <div
      data-slot={`section-sub-heading`}
      className={cn(
        `bg-secondary-500/20 dark:bg-secondary-500/10 dark:border-secondary-500/15 group border-secondary-500/50 hover:border-secondary-500 dark:hover:border-secondary-500/30 relative space-y-3 overflow-clip rounded-2xl border p-6 transition-transform duration-500 hover:-translate-y-1 md:p-10`,
        `gsap-section-sub-heading relative top-10 opacity-0`,
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          `from-primary-500 to-secondary-500 absolute top-0 left-0 h-2 w-full -translate-x-full -translate-y-1 bg-linear-to-r from-0% to-100% transition-transform duration-500 group-hover:translate-x-0`,
        )}
      />
      {props.children}
    </div>
  );
}

export function WhyChooseCardIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`why-choose-card-icon`}
      className={cn(
        `inline-block rounded-xl border p-4`,
        `border-secondary-500/60 text-secondary-500 bg-secondary-500/20`,
        className,
      )}
      {...props}
    />
  );
}

export function WhyChooseCardHeading({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      data-slot={`why-choose-card-heading`}
      className={cn(
        `font-brand-secondary text-xl font-semibold tracking-tighter`,
        className,
      )}
      {...props}
    />
  );
}

export function WhyChooseCardDetails({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      data-slot={`why-choose-card-details`}
      className={cn(`text-foreground/50 text-sm`, className)}
      {...props}
    />
  );
}

export function RatingError({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`rating-error`}
      className={cn(
        `max-w-max rounded-full border border-red-500/30 bg-red-500/20 px-6 py-2 text-red-400`,
        className,
      )}
      {...props}
    >
      Uh-uh!!! Some error happened while loading rating.
    </div>
  );
}

export function RatingLoading({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`rating-loading`}
      className={cn(
        `max-w-max rounded-full border border-yellow-500/30 bg-yellow-500/20 px-6 py-2 text-yellow-400`,
        className,
      )}
      {...props}
    >
      Hold on!!! Ratings are on the way.
    </div>
  );
}

export function AccountType({ className, ...props }: ComponentProps<"div">) {
  useGSAP(() => {
    gsap.to(".gsap-account-type", {
      opacity: 1,
      top: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".gsap-account-type",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <div
      data-slot={`account-type`}
      className={cn(
        `bg-secondary-500/10 border-secondary-500/50 overflow-clip rounded-2xl border px-3 py-4 transition-transform hover:-translate-y-1 md:px-6 md:py-8`,
        `gsap-account-type relative top-10 opacity-0`,
        className,
      )}
      {...props}
    />
  );
}

export function AccountTypeHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`account-type-header`}
      className={cn(`relative isolate flex items-start gap-x-2`, className)}
      {...props}
    >
      {props.children}
      <div
        aria-hidden
        className={cn(
          `absolute inset-0 -z-1 -mx-6 -mt-8 -mb-4 bg-linear-to-r`,
          `from-secondary-500/10 to-accent-500/10`,
        )}
      />
    </div>
  );
}

export function AccountTypeIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`account-type-icon`}
      className={cn(
        `bg-background flex size-10 shrink-0 items-center justify-center rounded-sm border border-[color-mix(in_srgb,currentColor_30%,transparent)]`,
        className,
      )}
      {...props}
    />
  );
}

export function AccountTypeHeading({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`account-type-heading`}
      className={cn(``, className)}
      {...props}
    />
  );
}

export function AccountTypeTitle({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`account-type-title`}
      className={cn(`font-brand-secondary text-2xl font-bold`, className)}
      {...props}
    />
  );
}

export function AccountTypeDescription({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`account-type-description`}
      className={cn(`text-foreground/50 text-sm uppercase`, className)}
      {...props}
    />
  );
}

export function PopularAccountType({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`popular-account-type`}
      className={cn(
        `bg-secondary-500 absolute top-0 right-0 max-w-max rounded-full px-3 py-0.5 text-xs font-bold text-white uppercase`,
        className,
      )}
      {...props}
    >
      Most Popular
    </div>
  );
}

export function AccountTypeCardOfferingList({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot={`account-type-card-offering-list`}
      className={cn(`py-5`, className)}
      {...props}
    />
  );
}

export function AccountTypeCardOfferingItem({
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      data-slot={`account-type-card-offering-item`}
      className={cn(
        `flex w-full items-center justify-between border-b border-b-white/5 py-3 last:border-0`,
        className,
      )}
      {...props}
    />
  );
}

export function AccountTypeCardOfferingItemTopic({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot={`account-type-card-offering-item-topic`}
      className={cn(`dark:text-foreground/20 text-foreground/60`, className)}
      {...props}
    />
  );
}

export function AccountTypeCardOfferingItemDetails({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot={`account-type-card-offering-item-details`}
      className={cn(`font-mono font-black`, className)}
      {...props}
    />
  );
}

export function AccountTypeFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`account-type-footer`}
      className={cn(``, className)}
      {...props}
    />
  );
}

export function BouncingBox({ className, ...props }: ComponentProps<"div">) {
  useGSAP(() => {
    const bouncingBox = document.getElementById("gsap-bouncing-box");

    gsap.from(bouncingBox, {
      top: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power4.inOut",
    });
  });
  return (
    <div
      id={`gsap-bouncing-box`}
      className={cn(`relative inline-block`, className)}
      {...props}
    >
      {props.children}
    </div>
  );
}

export function PromotionBonus({
  className,
  offer,
  ...props
}: ComponentProps<"div"> & { offer?: boolean }) {
  useGSAP(() => {
    gsap.to(".gsap-account-type", {
      opacity: 1,
      top: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".gsap-account-type",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <div
      data-slot={`promotion-bonus`}
      className={cn(
        `bg-secondary-500/10 border-secondary-500/50 relative space-y-4 overflow-clip rounded-2xl border px-4 py-6 transition-transform hover:-translate-y-1 md:px-6 md:py-8`,
        `gsap-account-type relative top-10 opacity-0`,
        className,
      )}
      {...props}
    >
      {offer && (
        <span
          className={cn(
            `bg-primary-600 absolute top-4 right-4 rounded-full px-2 py-0.5 text-xs`,
          )}
        >
          🔥 Hot Offer
        </span>
      )}
      {props.children}
    </div>
  );
}

export function PromotionBonusIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`promotion-bonus-icon`}
      className={cn(
        `bg-background flex size-16 shrink-0 items-center justify-center rounded-sm border border-[color-mix(in_srgb,currentColor_30%,transparent)]`,
        className,
      )}
      {...props}
    />
  );
}

export function PromotionBonusTitle({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`promotion-bonus-title`}
      className={cn(`font-brand-secondary text-2xl font-bold`, className)}
      {...props}
    />
  );
}

export function PromotionBonusDescription({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`promotion-bonus-description`}
      className={cn(`text-foreground/50 text-sm`, className)}
      {...props}
    />
  );
}

export function PaymentVisual() {
  return (
    <div
      className={cn(
        `hidden items-center justify-center p-7 md:col-span-5 md:flex`,
      )}
    >
      <div className={cn(`relative w-50`)}>
        {/* Visa Card */}
        <div
          className={cn(
            `w-40 rounded-xl border border-white/10 bg-linear-to-br from-[#1e3a5f] to-[#1a3254] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)]`,
          )}
        >
          <div
            className={`mb-4 h-5 w-7 rounded bg-linear-to-br from-[#d4af37] to-[#f0d060]`}
          />

          <div className={cn(`mb-2 text-sm font-black text-white italic`)}>
            VISA
          </div>

          <div className={cn(`text-2.75 font-mono text-white/50`)}>
            •••• •••• •••• 4242
          </div>
        </div>

        {/* Bitcoin Card */}
        <div
          className={cn(
            `absolute right-0 -bottom-8 w-40 -rotate-6 rounded-xl border border-white/10 bg-linear-to-br from-[#1c3044] to-[#f59e0b22] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)]`,
          )}
        >
          <div
            className={cn(
              `mb-4 h-5 w-7 rounded bg-linear-to-br from-[#d4af37] to-[#f0d060]`,
            )}
          />

          <div className={cn(`mb-2 text-2xl text-amber-400`)}>₿</div>

          <div className={cn(`text-2.75 font-mono text-white/50`)}>Bitcoin</div>
        </div>

        {/* Floating Globe */}
        <div
          className={cn(
            `absolute -top-5 -right-2 flex animate-bounce items-center gap-2 rounded-lg border border-blue-500/20 bg-[#0e1829] px-3 py-2 text-xs font-bold text-blue-400 shadow-lg`,
          )}
        >
          <Globe className={cn(`size-4`)} />

          <span>30+ Methods</span>
        </div>
      </div>
    </div>
  );
}

export function PassiveIncome({
  className,
  popular,
  ...props
}: ComponentProps<"div"> & { popular?: boolean }) {
  useGSAP(() => {
    gsap.to(".gsap-account-type", {
      opacity: 1,
      top: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".gsap-account-type",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <div
      data-slot={`passive-income`}
      data-popular={popular}
      className={cn(
        `group`,
        `bg-secondary-500/10 border-secondary-500/50 relative flex w-full flex-col items-center justify-center space-y-4 overflow-clip rounded-2xl border px-4 py-6 transition-transform hover:-translate-y-1 md:px-6 md:py-8`,
        `gsap-account-type relative top-10 opacity-0`,
        className,
      )}
      {...props}
    >
      {popular && (
        <span
          className={cn(
            `bg-primary-600 absolute top-8 -right-17 rotate-45 rounded-full px-20 py-0.5 text-xs uppercase`,
          )}
        >
          Popular
        </span>
      )}
      {props.children}
    </div>
  );
}

export function PassiveIncomeIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`passive-income-icon`}
      className={cn(
        `flex size-16 shrink-0 items-center justify-center rounded-sm text-2xl`,
        className,
      )}
      {...props}
    />
  );
}

export function PassiveIncomeTitle({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      data-slot={`passive-income-title`}
      className={cn(`font-brand-secondary text-2xl font-bold`, className)}
      {...props}
    />
  );
}

export function PassiveIncomeReturn({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`passive-income-return`}
      className={cn(
        `font-brand-secondary bg-accent-500/20 flex w-full flex-col items-center justify-center rounded-2xl p-8 font-bold`,
        className,
      )}
      {...props}
    >
      <div className={cn(`text-accent-500 text-2xl lg:text-3xl`)}>
        {props.children}
      </div>
      <div className={cn(`text-foreground/50 text-sm font-normal`)}>
        Total retun
      </div>
    </div>
  );
}

export function PassiveIncomeDescription({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot={`passive-income-description`}
      className={cn(`text-foreground/50 w-full space-y-4 text-sm`, className)}
      {...props}
    />
  );
}

export function PassiveIncomeDescriptionItem({
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      data-slot={`passive-income-description-item`}
      className={cn(`text-foreground/50 space-x-4 text-sm`, className)}
      {...props}
    >
      <Check
        className={cn(
          `bg-accent-500 inline-block size-4 rounded-full px-px text-white`,
        )}
      />
      <span>{props.children}</span>
    </li>
  );
}

export function PassiveIncomeCTA({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        `group/btn border-accent-500 group-data-[popular=true]:hover:shadow-accent-500/30 relative h-12 w-full overflow-hidden rounded-xl border bg-transparent transition-shadow hover:bg-transparent group-data-[popular=true]:hover:shadow-xl md:h-16`,
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          `from-secondary-500 to-accent-500 absolute inset-0 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 group-data-[popular=true]:opacity-100`,
        )}
      />

      <span className={cn(`relative z-10`)}>Start Mining</span>
    </Button>
  );
}
