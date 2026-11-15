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
} from "@/components/main/dashboard-groups/user-dashboard/dashboard/page-ui";
import {
  useCreateMiningWallet,
  useReadOneMiningWallet,
} from "@/integrations/tanstack/react-querry/mining-wallet/basic.rq";
import {
  useCreateTradingWallet,
  useReadOneTradingWallet,
} from "@/integrations/tanstack/react-querry/trading-wallet/basic.rq";
import { useReadAllMiningOrders } from "@/integrations/tanstack/react-querry/mining-order/basic.rq";

export function MiningWallet() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  const { mutateAsync: createMiningWallet } = useCreateMiningWallet();
  const {
    data: miningWallet,
    isError: isMiningWalletError,
    isLoading: isMiningWalletLoading,
  } = useReadOneMiningWallet({
    associatedUserId: userDetailsFromCookie.userId,
  });

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Mining Wallet</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-secondary-500`)}>
          <CircleDollarSign />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {isMiningWalletError && (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive font-medium">
              Unable to load mining wallet
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Please try again later.
            </p>
          </div>
        </div>
      )}

      {isMiningWalletLoading && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="border-secondary-200 border-t-secondary-500 h-8 w-8 animate-spin rounded-full border-4" />
            <p className="text-muted-foreground text-sm">
              Mining Loading wallet...
            </p>
          </div>
        </div>
      )}

      {!isMiningWalletError && !isMiningWalletLoading && !miningWallet && (
        <Button
          variant="secondary"
          className={cn("mx-auto mt-10 flex w-full max-w-max rounded-md")}
          onClick={async () =>
            await createMiningWallet({
              data: {
                dataToInsert: {
                  associatedUser: userDetailsFromCookie.userId,
                },
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
            $ {miningWallet.balance}
          </StatCardData>

          <StatCardFooter>Ready to mine</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}

export function TradingWallet() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  const { mutate: createTradingWallet } = useCreateTradingWallet();
  const {
    data: tradingwallet,
    isError: isTradingWalletError,
    isLoading: isTradingWalletLoading,
  } = useReadOneTradingWallet({
    associatedUserId: userDetailsFromCookie.userId,
  });

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Trading Wallet</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-accent-500`)}>
          <CircleDollarSign />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {isTradingWalletError && (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive font-medium">
              Unable to load trading wallet
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Please try again later.
            </p>
          </div>
        </div>
      )}

      {isTradingWalletLoading && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="border-accent-200 border-t-accent-500 h-8 w-8 animate-spin rounded-full border-4" />
            <p className="text-muted-foreground text-sm">
              Loading Trading Wallet...
            </p>
          </div>
        </div>
      )}

      {!isTradingWalletError && !isTradingWalletLoading && !tradingwallet && (
        <Button
          variant="accent"
          className={cn("mx-auto mt-10 flex w-full max-w-max rounded-md")}
          onClick={() =>
            createTradingWallet({
              data: {
                dataToInsert: {
                  associatedUser: userDetailsFromCookie.userId,
                },
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
            $ {tradingwallet.balance}
          </StatCardData>

          <StatCardFooter>Trading fund</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}

export function InvestedAmount() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  const {
    data: allMiningOrders,
    isError: isAllMiningOrdersError,
    isLoading: isAllMiningOrdersLoading,
  } = useReadAllMiningOrders({
    userId: userDetailsFromCookie.userId,
    miningStatus: ["ACTIVE", "COMPLETED"],
  });

  const isError = isAllMiningOrdersError;
  const isLoading = isAllMiningOrdersLoading;
  const investedAmount =
    allMiningOrders?.reduce((p, n) => (p = p + n.amountInvested), 0) ?? 0;

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Invested</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-red-500`)}>
          <Building2 />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {isError && (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-destructive font-medium">
            Unable to load investment
          </p>

          <p className="text-muted-foreground mt-1 text-sm">
            Please try again later.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-200 border-t-red-500" />
            <p className="text-muted-foreground text-sm">
              Loading investment...
            </p>
          </div>
        </div>
      )}

      {!isError && !isLoading && (allMiningOrders || investedAmount === 0) && (
        <>
          <StatCardData className={cn("text-red-500")}>
            $ {investedAmount}
          </StatCardData>

          <StatCardFooter>Amount invested</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}

export function GainedAmount() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  const { data: allMiningOrders, status: allMiningOrdersFetchingStatus } =
    useReadAllMiningOrders({ userId: userDetailsFromCookie.userId });

  const gainedAmount =
    allMiningOrders?.reduce((p, n) => {
      if (n.miningStatus === "COMPLETED") {
        p = p + (!n.amountReceived ? 0 : n.amountReceived - n.amountInvested);
      }

      return p;
    }, 0) ?? 0;

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Total Gained</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-green-500`)}>
          <TrendingUp />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {allMiningOrdersFetchingStatus === "error" && (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-destructive font-medium">Unable to load profit</p>

          <p className="text-muted-foreground mt-1 text-sm">
            Please try again later.
          </p>
        </div>
      )}

      {allMiningOrdersFetchingStatus === "pending" && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-500" />
            <p className="text-muted-foreground text-sm">Loading profit...</p>
          </div>
        </div>
      )}

      {allMiningOrdersFetchingStatus === "success" && (
        <>
          <StatCardData className={cn("text-green-500")}>
            $ {gainedAmount}
          </StatCardData>

          <StatCardFooter>Amount profit</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}

export function ActiveInvestment() {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  const { data: allMiningOrders, status: allMiningOrdersFetchingStatus } =
    useReadAllMiningOrders({ userId: userDetailsFromCookie.userId });

  const activeInvestCount =
    allMiningOrders?.reduce((p, n) => {
      if (n.miningStatus === "ACTIVE") {
        p = p + 1;
      }

      return p;
    }, 0) ?? 0;

  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Investment Live</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-green-500`)}>
          <Zap />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {allMiningOrdersFetchingStatus === "error" && (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-destructive font-medium">
            Unable to load investment
          </p>

          <p className="text-muted-foreground mt-1 text-sm">
            Please try again later.
          </p>
        </div>
      )}

      {allMiningOrdersFetchingStatus === "pending" && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-500" />
            <p className="text-muted-foreground text-sm">
              Loading investment...
            </p>
          </div>
        </div>
      )}

      {allMiningOrdersFetchingStatus === "success" && (
        <>
          <StatCardData className={cn("text-green-500")}>
            {activeInvestCount}
          </StatCardData>

          <StatCardFooter>Active sessions</StatCardFooter>
        </>
      )}
    </StatCard>
  );
}
