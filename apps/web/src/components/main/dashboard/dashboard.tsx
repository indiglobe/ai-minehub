import type { ComponentProps } from "react";
import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import {
  StatCard,
  StatCardData,
  StatCardFooter,
  StatCardHeader,
  StatCardHeadingIcon,
  StatCardHeadingText,
} from "./dashboard-uis";
import { Building2, CircleDollarSign, TrendingUp, Zap } from "lucide-react";
import { useRouteContext } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import {
  useCreateMiningWallet,
  useFetchMiningWallet,
} from "@/hooks/dashboard/use-miningwallet";
import {
  useCreateTradingWallet,
  useFetchTradingWallet,
} from "@/hooks/dashboard/use-tradingwallet";
import { useInvestmentData } from "@/hooks/dashboard/use-investment";

export function Dashboard({
  className,
  ...props
}: ComponentProps<typeof Main>) {
  return (
    <Main className={cn(``, className)} {...props}>
      <GreetSection />

      <StatSection />
    </Main>
  );
}

export function GreetSection({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    userDetailsFromCookie: { fullName },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return (
    <section className={cn(`default-padding`, `py-10`, className)} {...props}>
      <h1
        className={cn(`font-brand-secondary text-2xl md:text-3xl lg:text-4xl`)}
      >
        <span>Good day, </span>
        <span
          className={cn(
            `from-accent-500 to-secondary-500 bg-linear-to-r bg-clip-text font-semibold text-transparent`,
          )}
        >
          {fullName}
        </span>
        <span> 👋</span>
      </h1>

      <p className={cn(`text-foreground/50 pt-4`)}>
        Your portfolio is running smoothly. Here's your overview.
      </p>
    </section>
  );
}

export function StatSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding`,
        `grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`,

        className,
      )}
      {...props}
    >
      <MiningWallet />

      <TradingWallet />

      <InvestedAmount />

      <GainedAmount />

      <ActiveInvestment />
    </section>
  );
}

export function MiningWallet() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  const { mutate } = useCreateMiningWallet();
  const { data: userDetails, error, isLoading } = useFetchMiningWallet();

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Mining Wallet</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-secondary-500`)}>
          <CircleDollarSign />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {error && <div>Error</div>}

      {isLoading && <div>Loading</div>}

      {userDetails && !userDetails.miningWallet && (
        <Button
          variant="secondary"
          className={cn("mx-auto mt-10 flex w-full max-w-max rounded-md")}
          onClick={() =>
            mutate({
              data: {
                associatedUser: userDetailsFromCookie.userId,
              },
            })
          }
        >
          Create mining wallet
        </Button>
      )}

      {userDetails && userDetails.miningWallet && (
        <>
          <StatCardData className={cn("text-secondary-500")}>
            ₹ {userDetails.miningWallet.balance}
          </StatCardData>

          <StatCardFooter>Ready to mine</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}

export function TradingWallet() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  const { mutate } = useCreateTradingWallet();
  const { data: userDetails, error, isLoading } = useFetchTradingWallet();

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Trading Wallet</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-accent-500`)}>
          <CircleDollarSign />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {error && <div>Error</div>}

      {isLoading && <div>Loading</div>}

      {userDetails && !userDetails.tradingWallet && (
        <Button
          variant="accent"
          className={cn("mx-auto mt-10 flex w-full max-w-max rounded-md")}
          onClick={() =>
            mutate({
              data: {
                associatedUser: userDetailsFromCookie.userId,
              },
            })
          }
        >
          Create trading wallet
        </Button>
      )}

      {userDetails && userDetails.tradingWallet && (
        <>
          <StatCardData className={cn("text-accent-500")}>
            ₹ {userDetails.tradingWallet.balance}
          </StatCardData>

          <StatCardFooter>Trading fund</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}

export function InvestedAmount() {
  const { data: investment, error, isLoading } = useInvestmentData();

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Invested</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-red-500`)}>
          <Building2 />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {error && <div>Error</div>}

      {isLoading && <div>Loading</div>}

      {investment && (
        <>
          <StatCardData className={cn("text-red-500")}>
            ₹ {investment.investedAmount}
          </StatCardData>

          <StatCardFooter>Amount invested</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}

export function GainedAmount() {
  const { data: investment, error, isLoading } = useInvestmentData();

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Total Gained</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-green-500`)}>
          <TrendingUp />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {error && <div>Error</div>}

      {isLoading && <div>Loading</div>}

      {investment && (
        <>
          <StatCardData className={cn("text-green-500")}>
            ₹ {investment.profitAmount}
          </StatCardData>

          <StatCardFooter>Amount profit</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}

export function ActiveInvestment() {
  const { data: investment, error, isLoading } = useInvestmentData();

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Investment Live</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-green-500`)}>
          <Zap />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {error && <div>Error</div>}

      {isLoading && <div>Loading</div>}

      {investment && (
        <>
          <StatCardData className={cn("text-green-500")}>
            {investment.activeInvestmentsCount}
          </StatCardData>

          <StatCardFooter>Active sessions</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}
