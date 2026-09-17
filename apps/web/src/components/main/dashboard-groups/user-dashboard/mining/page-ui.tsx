import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check } from "lucide-react";
import { Button } from "@repo/ui/button";

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
