import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function Wallet({ className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn(``, className)} {...props}>
      <WalletHeading />
      <WalletBalance />
    </section>
  );
}

export function WalletHeading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `flex w-full items-center justify-center bg-background px-4 py-10 3xs:px-5 3xs:py-12 sm:px-8 sm:py-14 md:min-h-53 md:px-10 md:py-16`,
        className,
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <h1
          className={cn(
            `flex flex-col items-center justify-center gap-3 font-brand-primary text-2xl leading-tight font-bold tracking-tight text-foreground 3xs:text-3xl sm:flex-row sm:gap-4 sm:text-4xl md:text-10.5 md:leading-none`,
          )}
        >
          <span
            className={cn(
              `text-3xl leading-none 3xs:text-4xl sm:text-10.5 md:text-11.5`,
            )}
          >
            💰
          </span>

          <span>Deposit &amp; Withdraw</span>
        </h1>

        <p
          className={cn(
            `mt-4 max-w-180 px-2 font-brand-primary text-sm leading-6 font-medium text-foreground/50 3xs:text-3.75 sm:mt-5 sm:text-base md:mt-6 md:text-4.75`,
          )}
        >
          Manage your funds securely with instant cryptocurrency deposits
        </p>
      </div>
    </section>
  );
}

export function WalletBalance({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `w-full bg-background px-4 pb-10 3xs:px-5 sm:px-8 md:px-10 md:pb-14`,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          `mx-auto grid w-full max-w-280 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6`,
        )}
      >
        <div
          className={cn(
            `flex min-h-45 flex-col justify-center rounded-4xl border border-[#1c2d4a] bg-[#0d1729] px-6 py-8 3xs:px-7 sm:min-h-48 sm:px-8 md:min-h-50 md:px-10`,
          )}
        >
          <p
            className={cn(
              `font-brand-primary text-sm font-semibold tracking-wide text-foreground/50 uppercase sm:text-base`,
            )}
          >
            Mining Wallet
          </p>

          <h2
            className={cn(
              `mt-6 font-brand-primary text-4xl leading-none font-semibold tracking-tight text-secondary-500 3xs:text-4.5xl sm:text-5xl`,
            )}
          >
            $987.00
          </h2>
        </div>

        <div
          className={cn(
            `flex min-h-45 flex-col justify-center rounded-4xl border border-[#1c2d4a] bg-[#0d1729] px-6 py-8 3xs:px-7 sm:min-h-48 sm:px-8 md:min-h-50 md:px-10`,
          )}
        >
          <p
            className={cn(
              `font-brand-primary text-sm font-semibold tracking-wide text-foreground/50 uppercase sm:text-base`,
            )}
          >
            Trading Wallet
          </p>

          <h2
            className={cn(
              `mt-6 font-brand-primary text-4xl leading-none font-semibold tracking-tight text-[#9b63ff] 3xs:text-4.5xl sm:text-5xl`,
            )}
          >
            $0.00
          </h2>
        </div>
      </div>
    </section>
  );
}