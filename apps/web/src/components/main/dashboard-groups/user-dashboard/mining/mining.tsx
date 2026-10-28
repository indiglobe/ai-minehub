import { useReadMiningWallet } from "@/integrations/tanstack/react-querry/dashboard/user.rq";
import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { ActiveMiningSession } from "../dashboard/dashboard";
import {
  PassiveIncome,
  PassiveIncomeCTA,
  PassiveIncomeDescription,
  PassiveIncomeDescriptionItem,
  PassiveIncomeIcon,
  PassiveIncomeReturn,
  PassiveIncomeTitle,
} from "./page-ui";
import { ErrorBoundary } from "react-error-boundary";
import {
  Await,
  Link,
  useLoaderData,
  useRouteContext,
} from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";

export function Mining() {
  return (
    <>
      <MiningHeading />
      <MiningBalance />

      <div className={cn(`default-padding`)}>
        <AvailableMiningOptions />
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
  } = useReadMiningWallet();

  return (
    <section className={cn(`default-padding`, className)} {...props}>
      {isMiningWalletError && (
        <div className="flex min-h-38 w-full items-center justify-between gap-4 rounded-2xl border border-red-500/20 bg-[#111118] px-6 py-7 md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
              <AlertCircle className="size-6 text-red-400" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-white">Balance unavailable</h3>
              <p className="text-foreground/60 text-sm">
                We couldn't load your mining balance.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="shrink-0 rounded-xl border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 size-4" />
            Retry
          </Button>
        </div>
      )}

      {isMiningWalletLoading && (
        <div className="relative flex min-h-38 w-full items-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-[#111118] px-6 py-7 md:px-8">
          <div className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-[#626ee7] to-[#7849b7]" />

          <div className="relative flex size-12 shrink-0 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-xl bg-[#6268ff]/10" />
            <div className="relative flex size-12 items-center justify-center rounded-xl border border-[#6268ff]/20 bg-[#6268ff]/10">
              <LoaderCircle className="size-6 animate-spin text-[#8187ff]" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <p className="text-foreground/70 text-sm font-medium">
              Mining Balance
            </p>

            <div className="h-8 w-36 animate-pulse rounded-lg bg-white/10" />

            <p className="text-foreground/40 text-xs">
              Syncing your wallet balance...
            </p>
          </div>

          <div className="hidden rounded-xl border border-white/5 bg-white/3 px-4 py-3 sm:block">
            <div className="mb-2 h-2 w-16 animate-pulse rounded bg-white/10" />
            <div className="h-2 w-10 animate-pulse rounded bg-white/6" />
          </div>
        </div>
      )}

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

          <Button
            asChild
            className={cn(
              `flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#626ee7] to-[#7849b7] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 md:px-7 md:text-base`,
            )}
          >
            <Link to="/wallet">
              <span className={cn(`text-2xl leading-none font-light`)}>+</span>

              <span>Deposit</span>
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}

export function AvailableMiningOptions({
  className,
  ...props
}: ComponentProps<"section">) {
  const { allMiningProfiles: allMiningProfilesProm } = useLoaderData({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/mining/",
  });

  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/mining/",
  });

  return (
    <section className={cn(`py-20`, className)} {...props}>
      <ErrorBoundary fallback={<div>Error...</div>}>
        <Await promise={allMiningProfilesProm} fallback={<div>Loading...</div>}>
          {(allMiningProfiles) => (
            <div
              className={cn(
                `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`,
              )}
            >
              {allMiningProfiles.map(
                ({
                  id,
                  category,
                  minimumAllowedAmount,
                  maximumAllowedAmount,
                  dailyReturn,
                  lockinPeriod,
                  isPopular,
                }) => (
                  <PassiveIncome
                    key={id}
                    className={cn(`min-w-60`)}
                    popular={isPopular}
                  >
                    <PassiveIncomeIcon
                      className={cn(`bg-secondary-500/20 rounded-2xl`)}
                    >
                      ⛏️
                    </PassiveIncomeIcon>

                    <PassiveIncomeTitle>{category}</PassiveIncomeTitle>

                    <PassiveIncomeReturn>
                      +
                      {new Intl.NumberFormat("en-IN", {
                        minimumFractionDigits: 0,
                      }).format(lockinPeriod * dailyReturn)}
                      %
                    </PassiveIncomeReturn>

                    <PassiveIncomeDescription>
                      <PassiveIncomeDescriptionItem>
                        Min: ${minimumAllowedAmount}
                      </PassiveIncomeDescriptionItem>

                      <PassiveIncomeDescriptionItem>
                        Max: ${maximumAllowedAmount}
                      </PassiveIncomeDescriptionItem>

                      <PassiveIncomeDescriptionItem>
                        {dailyReturn}% Daily
                      </PassiveIncomeDescriptionItem>

                      <PassiveIncomeDescriptionItem>
                        {lockinPeriod} Days Lock
                      </PassiveIncomeDescriptionItem>
                    </PassiveIncomeDescription>

                    <PassiveIncomeCTA miningProfilesUsed={id} userId={userId} />
                  </PassiveIncome>
                ),
              )}
            </div>
          )}
        </Await>
      </ErrorBoundary>
    </section>
  );
}
