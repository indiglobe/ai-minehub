import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        `fs-3.5 md:fs-4.5 max-w-140 text-center text-foreground/50`,
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
        `bg-secondary-500/20 dark:bg-secondary-500/10 dark:border-secondary-500/15 group border-secondary-500/50 hover:border-secondary-500 dark:hover:border-secondary-500/30 relative space-y-3 overflow-clip rounded-2xl border p-10 transition-transform duration-500 hover:-translate-y-1`,
        `gsap-section-sub-heading relative opacity-0 top-10`,
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
      className={cn(`text-sm text-foreground/50`, className)}
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
        `bg-secondary-500/10 border-secondary-500/50 overflow-clip rounded-2xl border px-6 py-8 transition-transform hover:-translate-y-1`,
        `relative opacity-0 top-10 gsap-account-type`,
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
      className={cn(`text-sm text-foreground/50 uppercase`, className)}
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
