import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { useState } from "react";
import { DepositForm } from "./deposit-form";
import { WithdrawForm } from "./withdraw-form";
import {
  useFetchMiningWallet,
  useFetchTradingWallet,
} from "../../../../../integrations/tanstack/react-querry/dashboard/user-dashboard";

export function Wallet({ className, ...props }: ComponentProps<"section">) {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  return (
    <section className={cn(``, className)} {...props}>
      <WalletHeading />
      <WalletBalance />

      <section
        className={cn(
          `bg-background 3xs:px-5 w-full px-4 pb-20 sm:px-8 md:px-10`,
        )}
      >
        <div className={cn(`mx-auto w-full max-w-200`)}>
          <div
            className={cn(
              `border-secondary-200/20 bg-secondary-50/30 dark:border-secondary-200/30 dark:bg-secondary-50/20 grid w-full grid-cols-2 gap-1 rounded-xl border p-1`,
            )}
          >
            <button
              type="button"
              onClick={() => setActiveTab("deposit")}
              className={cn(
                `font-brand-primary flex h-12 items-center justify-center gap-2.5 rounded-lg text-sm font-semibold transition-all duration-300`,
                activeTab === "deposit"
                  ? `bg-primary-600 text-white shadow-[0_0_50px_var]`
                  : `text-100/50 hover:bg-secondary-50/20`,
              )}
            >
              <span className="text-base">💎</span>
              <span>Deposit</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("withdraw")}
              className={cn(
                `font-brand-primary flex h-12 items-center justify-center gap-2.5 rounded-lg text-sm font-semibold transition-all duration-300`,
                activeTab === "withdraw"
                  ? `bg-primary-600 text-white shadow-[0_0_50px_var]`
                  : `text-/50 hover:bg-secondary-50/20`,
              )}
            >
              <span className="text-base">📤</span>
              <span>Withdraw</span>
            </button>
          </div>

          <div className={cn(`mt-4`)}>
            {activeTab === "deposit" && <DepositForm />}

            {activeTab === "withdraw" && <WithdrawForm />}
          </div>
        </div>
      </section>
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
        `bg-background 3xs:px-5 3xs:py-12 flex w-full items-center justify-center px-4 py-10 sm:px-8 sm:py-14 md:min-h-53 md:px-10 md:py-16`,
        className,
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <h1
          className={cn(
            `font-brand-primary text-foreground 3xs:text-3xl md:text-10.5 flex flex-col items-center justify-center gap-3 text-2xl leading-tight font-bold tracking-tight sm:flex-row sm:gap-4 sm:text-4xl md:leading-none`,
          )}
        >
          <span
            className={cn(
              `3xs:text-4xl sm:text-10.5 md:text-11.5 text-3xl leading-none`,
            )}
          >
            💰
          </span>

          <span>Deposit &amp; Withdraw</span>
        </h1>

        <p
          className={cn(
            `font-brand-primary text-foreground/50 3xs:text-3.75 md:text-4.75 mt-4 max-w-180 px-2 text-sm leading-6 font-medium sm:mt-5 sm:text-base md:mt-6`,
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
  const {
    data: miningWalletData,
    isLoading: isMiningWalletLoading,
    isError: isMiningWalletError,
  } = useFetchMiningWallet();
  const {
    data: tradingWalletData,
    isLoading: isTradingWalletLoading,
    isError: isTradingWalletError,
  } = useFetchTradingWallet();

  return (
    <section
      className={cn(
        `bg-background 3xs:px-5 w-full px-4 pb-10 sm:px-8 md:px-10 md:pb-14`,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          `mx-auto grid w-full max-w-200 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6`,
        )}
      >
        <div
          className={cn(
            `border-secondary-200/20 bg-secondary-50/30 3xs:px-7 dark:border-secondary-200/30 dark:bg-secondary-50/25 flex min-h-45 flex-col justify-center rounded-4xl border px-6 py-8 pt-2 sm:min-h-48 sm:px-8 md:min-h-50 md:px-10`,
          )}
        >
          <p
            className={cn(
              `font-brand-primary text-foreground/50 text-sm font-semibold tracking-wide uppercase sm:text-base`,
            )}
          >
            Mining Wallet
          </p>

          <h2
            className={cn(
              `font-brand-primary text-secondary-500 3xs:text-4.5xl mt-6 text-4xl leading-none font-semibold tracking-tight sm:text-5xl`,
            )}
          >
            {isMiningWalletError && <span>Error...</span>}
            {isMiningWalletLoading && <span>Loading...</span>}
            {miningWalletData && <>${miningWalletData.balance}</>}
          </h2>
        </div>

        <div
          className={cn(
            `border-secondary-200/20 bg-secondary-50/30 3xs:px-7 dark:border-secondary-200/30 dark:bg-secondary-50/25 flex min-h-45 flex-col justify-center rounded-4xl border px-6 py-8 pt-2 sm:min-h-48 sm:px-8 md:min-h-50 md:px-10`,
          )}
        >
          <p
            className={cn(
              `font-brand-primary text-foreground/50 text-sm font-semibold tracking-wide uppercase sm:text-base`,
            )}
          >
            Trading Wallet
          </p>

          <h2
            className={cn(
              `font-brand-primary text-primary-500 3xs:text-4.5xl mt-6 text-4xl leading-none font-semibold tracking-tight sm:text-5xl`,
            )}
          >
            {isTradingWalletError && <span>Error...</span>}
            {isTradingWalletLoading && <span>Loading...</span>}
            {tradingWalletData && <>${tradingWalletData.balance}</>}
          </h2>
        </div>
      </div>
    </section>
  );
}
