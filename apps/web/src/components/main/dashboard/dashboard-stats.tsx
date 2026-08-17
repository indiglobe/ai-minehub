import {
  useCreateTradingWallet,
  useFetchTradingWallet,
  useCreateMiningWallet,
  useFetchMiningWallet,
  useInvestmentData,
} from "@/integrations/tanstack/react-querry/dashboard/user-dashboard";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { useRouteContext } from "@tanstack/react-router";
import { CircleDollarSign, Building2, TrendingUp, Zap } from "lucide-react";
import {
  StatCard,
  StatCardHeader,
  StatCardHeadingText,
  StatCardHeadingIcon,
  StatCardData,
  StatCardFooter,
} from "./dashboard-uis";

export function MiningWallet() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  const { mutate } = useCreateMiningWallet();
  const { data: miningWallet, error, isLoading } = useFetchMiningWallet();

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

      {!miningWallet && (
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

      {miningWallet && (
        <>
          <StatCardData className={cn("text-secondary-500")}>
            ₹ {miningWallet.balance}
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
  const { data: tradingwallet, error, isLoading } = useFetchTradingWallet();

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

      {!tradingwallet && (
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

      {tradingwallet && (
        <>
          <StatCardData className={cn("text-accent-500")}>
            ₹ {tradingwallet.balance}
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
