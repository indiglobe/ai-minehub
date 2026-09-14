import { useFetchMiningWallet } from "@/integrations/tanstack/react-querry/dashboard/user-dashboard";
import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { ActiveMiningSession } from "../dashboard/dashboard";

export function Mining() {
  return (
    <>
      <MiningHeading />
      <MiningBalance />

      <div className={cn(`default-padding`)}>
        <ActiveMiningSession />
      </div>
    </>
  );
}

export function MiningHeading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding space-y-4 text-center md:space-y-6`,
        className,
      )}
      {...props}
    >
      <h1 className={cn(`text-2xl md:text-4xl`)}>
        <span>⛏️ </span>
        <span>Cloud Mining</span>
      </h1>

      <p
        className={cn(
          `text-foreground/50 mx-auto max-w-160 text-sm md:text-base`,
        )}
      >
        Start earning passive income with our automated cloud mining system.
        Choose a plan that fits your investment goals.
      </p>
    </section>
  );
}

export function MiningBalance({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: miningWalletData,
    isError: isMiningWalletError,
    isLoading: isMiningWalletLoading,
  } = useFetchMiningWallet();

  return (
    <section className={cn(`default-padding`, className)} {...props}>
      {isMiningWalletError && <>isMiningWalletError</>}
      {isMiningWalletLoading && <>isMiningWalletLoading</>}

      {!isMiningWalletError && !isMiningWalletLoading && (
        <div
          className={cn(
            `border-foreground/10 3xs:px-6 flex min-h-38 w-full items-center justify-between rounded-2xl border bg-[#111118] px-8 py-7 md:px-8`,
          )}
        >
          <div className={cn(`space-y-3 text-left`)}>
            <p
              className={cn(
                `text-foreground/70 text-sm font-medium md:text-base`,
              )}
            >
              Mining Balance
            </p>

            <h2
              className={cn(
                `font-brand-primary text-3xl font-semibold tracking-wide text-[#6268ff] md:text-4xl`,
              )}
            >
              {miningWalletData && <span>${miningWalletData.balance}</span>}
            </h2>
          </div>

          <button
            type="button"
            className={cn(
              `flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#626ee7] to-[#7849b7] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 md:px-7 md:text-base`,
            )}
          >
            <span className={cn(`text-2xl leading-none font-light`)}>+</span>

            <span>Deposit</span>
          </button>
        </div>
      )}
    </section>
  );
}
