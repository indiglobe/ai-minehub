import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import {
  Users,
  DollarSign,
  Clock,
  Layers,
  TrendingUp,
  Calendar,
  ArrowDownRight,
  ArrowUpRight,
  UserPlus,
  ArrowDownLeft,
  ImageIcon,
  Check,
  X,
} from "lucide-react";
import {
  StatCard,
  StatCardHeader,
  StatCardHeadingText,
  StatCardHeadingIcon,
  StatCardData,
  StatCardFooter,
} from "@/components/main/dashboard-groups/admin-dashboard/dashboard/page-ui";
import { Fragment, useState } from "react";
import { Button } from "@repo/ui/button";
import {
  PendingDepositsTableEmpty,
  PendingDepositsTableError,
  PendingDepositsTableLoading,
  PendingWithdrawalsTableError,
  PendingWithdrawalsTableLoading,
  ThisMonthStatsCardError,
  ThisMonthStatsCardLoading,
  UserGrowthCardError,
  UserGrowthCardLoading,
} from "@/components/main/dashboard-groups/admin-dashboard/dashboard/boundary-comps";
import {} from "@/integrations/tanstack/react-querry/dashboard/admin.rq";
import {
  useReadUserCount,
  useReadUserMonthlyStats,
} from "@/integrations/tanstack/react-querry/user/admin.rq";
import {
  useReadPendingTradingWalletDeposit,
  useReadPendingTradingWalletDepositStats,
  useReadProcessedTradingWalletDepositStats,
  useReadTradingWalletMonthlyDepositStats,
  useUpdateTradingWalletDeposit,
} from "@/integrations/tanstack/react-querry/trading-wallet-deposits/admin.rq";
import {
  useReadMiningWalletMonthlyDepositStats,
  useReadPendingMiningWalletDeposit,
  useReadPendingMiningWalletDepositStats,
  useReadProcessedMiningWalletDepositStats,
  useUpdateMiningWalletDeposit,
} from "@/integrations/tanstack/react-querry/mining-wallet-deposits/admin.rq";
import {
  useReadPendingTradingWalletWithdrawlsStats,
  useReadTradingWalletMonthlyWithdrawStats,
  useReadPendingTradingWalletWithdraw,
  useUpdateTradingWalletWithdraw,
} from "@/integrations/tanstack/react-querry/trading-wallet-withdraw/admin.rq";
import {
  useReadMiningWalletMonthlyWithdrawStats,
  useReadPendingMiningWalletWithdrawlsStats,
  useReadPendingMiningWalletWithdraw,
  useUpdateMiningWalletWithdraw,
} from "@/integrations/tanstack/react-querry/mining-wallet-withdraw/admin.rq";
import {
  useReadActiveMiningOrders,
  useReadAllMiningOrders,
} from "@/integrations/tanstack/react-querry/mining-order/admin.rq";
import {
  useAddMiningWalletBalance,
  useDeductMiningWalletBalance,
} from "@/integrations/tanstack/react-querry/mining-wallet/admin.rq";
import {
  useAddTradingWalletBalance,
  useDeductTradingWalletBalance,
} from "@/integrations/tanstack/react-querry/trading-wallet/admin.rq";

export default function AdminDashboard() {
  return (
    <>
      <AdminStatsSection />
      <AdminOverviewDashboard />
      <PendingTransactionsSection />
    </>
  );
}

export function AdminStatsSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding @container grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4`,
        className,
      )}
      {...props}
    >
      <TotalUsersStat />
      <TotalDepositsStat />
      <PendingDepositsStat />
      <PendingWithdrawalsStat />
    </section>
  );
}

export function TotalUsersStat({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const {
    data: userCountData,
    isLoading: userCountLoading,
    isError: userCountError,
  } = useReadUserCount();

  return (
    <StatCard
      className={cn(
        `border-t-secondary-500 relative overflow-hidden border-t-4`,
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>Total Users</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-secondary-500`)}>
          <Users />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {userCountData && (
        <>
          <StatCardData className={cn(`text-foreground`)}>
            {userCountData.count}
          </StatCardData>
          <StatCardFooter>Total registered users</StatCardFooter>
        </>
      )}

      {userCountError && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 font-bold text-red-500`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size={"sm"}
            variant={"destructive"}
            className={cn(`mt-3`)}
          >
            Try again
          </Button>
        </>
      )}

      {userCountLoading && (
        <div className={cn(`animate-pulse space-y-4`)}>
          <div className={cn(`bg-foreground/10 mt-5 h-8 w-36 rounded-md`)} />
          <div className={cn(`bg-foreground/10 mt-2 h-4 w-32 rounded-md`)} />
        </div>
      )}
    </StatCard>
  );
}

export function TotalDepositsStat({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const {
    data: processedTradingDepositStat,
    isLoading: processedTradingDepositStatLoading,
    isError: processedTradingDepositStatError,
  } = useReadProcessedTradingWalletDepositStats();
  const {
    data: processedMiningDepositStat,
    isLoading: processedMiningDepositStatLoading,
    isError: processedMiningDepositStatError,
  } = useReadProcessedMiningWalletDepositStats();

  return (
    <StatCard
      className={cn(
        `border-t-accent-500 relative overflow-hidden border-t-4`,
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>Total Deposits</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-accent-500`)}>
          <DollarSign />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {processedMiningDepositStat && processedTradingDepositStat && (
        <>
          <StatCardData className={cn(`text-foreground`)}>
            {processedTradingDepositStat.count +
              processedMiningDepositStat.count}
          </StatCardData>
          <StatCardFooter>Cumulative deposits</StatCardFooter>
        </>
      )}

      {(processedTradingDepositStatError ||
        processedMiningDepositStatError) && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 font-bold text-red-500`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size={"sm"}
            variant={"destructive"}
            className={cn(`mt-3`)}
          >
            Try again
          </Button>
        </>
      )}

      {(processedTradingDepositStatLoading ||
        processedMiningDepositStatLoading) && (
        <div className={cn(`animate-pulse space-y-4`)}>
          <div className={cn(`bg-foreground/10 mt-5 h-8 w-36 rounded-md`)} />
          <div className={cn(`bg-foreground/10 mt-2 h-4 w-32 rounded-md`)} />
        </div>
      )}
    </StatCard>
  );
}

export function PendingDepositsStat({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const {
    data: pendingTradingDepositStat,
    isLoading: pendingTradingDepositStatLoading,
    isError: pendingTradingDepositStatError,
  } = useReadPendingTradingWalletDepositStats();
  const {
    data: pendingMiningDepositStat,
    isLoading: pendingMiningDepositStatLoading,
    isError: pendingMiningDepositStatError,
  } = useReadPendingMiningWalletDepositStats();

  return (
    <StatCard
      className={cn(
        `border-t-primary-500 relative overflow-hidden border-t-4`,
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>Pending Deposits</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-primary-500`)}>
          <Clock />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {pendingTradingDepositStat && pendingMiningDepositStat && (
        <>
          <StatCardData className={cn(`text-foreground`)}>
            {pendingMiningDepositStat.count + pendingTradingDepositStat.count}
          </StatCardData>

          <StatCardFooter>Awaiting confirmation</StatCardFooter>
        </>
      )}

      {(pendingTradingDepositStatError || pendingMiningDepositStatError) && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 font-bold text-red-500`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size={"sm"}
            variant={"destructive"}
            className={cn(`mt-3`)}
          >
            Try again
          </Button>
        </>
      )}

      {(pendingTradingDepositStatLoading ||
        pendingMiningDepositStatLoading) && (
        <div className={cn(`animate-pulse space-y-4`)}>
          <div className={cn(`bg-foreground/10 mt-5 h-8 w-36 rounded-md`)} />
          <div className={cn(`bg-foreground/10 mt-2 h-4 w-32 rounded-md`)} />
        </div>
      )}
    </StatCard>
  );
}

export function PendingWithdrawalsStat({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const {
    data: pendingTradingWithdrawlStat,
    isLoading: pendingTradingWithdrawlStatLoading,
    isError: pendingTradingWithdrawlStatError,
  } = useReadPendingTradingWalletWithdrawlsStats();
  const {
    data: pendingMiningWithdrawlStat,
    isLoading: pendingMiningWithdrawlStatLoading,
    isError: pendingMiningWithdrawlStatError,
  } = useReadPendingMiningWalletWithdrawlsStats();

  return (
    <StatCard
      className={cn(
        `border-t-primary-600 relative overflow-hidden border-t-4`,
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>Pending Withdrawals</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-primary-600`)}>
          <ArrowUpRight />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {pendingTradingWithdrawlStat && pendingMiningWithdrawlStat && (
        <>
          <StatCardData className={cn(`text-foreground`)}>
            {pendingMiningWithdrawlStat.count +
              pendingTradingWithdrawlStat.count}
          </StatCardData>

          <StatCardFooter>Awaiting processing</StatCardFooter>
        </>
      )}

      {(pendingTradingWithdrawlStatError ||
        pendingMiningWithdrawlStatError) && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 font-bold text-red-500`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size={"sm"}
            variant={"destructive"}
            className={cn(`mt-3`)}
          >
            Try again
          </Button>
        </>
      )}

      {(pendingTradingWithdrawlStatLoading ||
        pendingMiningWithdrawlStatLoading) && (
        <div className={cn(`animate-pulse space-y-4`)}>
          <div className={cn(`bg-foreground/10 mt-5 h-8 w-36 rounded-md`)} />
          <div className={cn(`bg-foreground/10 mt-2 h-4 w-32 rounded-md`)} />
        </div>
      )}
    </StatCard>
  );
}

export function AdminOverviewDashboard() {
  return (
    <div
      className={cn(
        `default-padding @container grid grid-cols-1 gap-4 py-10 lg:grid-cols-2`,
      )}
    >
      <div className={cn(`space-y-4`)}>
        <div className={cn(`grid grid-cols-1 gap-4 @xs:grid-cols-2`)}>
          <TotalMiningInvestedCard />
          <ActiveMiningSessionsCard />
        </div>
        <UserGrowthCard />
      </div>

      <div className={cn(`space-y-4`)}>
        <ThisMonthStatsCard />
      </div>
    </div>
  );
}

export function TotalMiningInvestedCard({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const {
    data: allMiningOrder,
    isLoading: isAllMiningOrderLoading,
    isError: isAllMiningOrderError,
  } = useReadAllMiningOrders();

  return (
    <StatCard
      className={cn(
        `border-t-secondary-500 relative overflow-hidden border-t-4`,
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>Total Mining Invested</StatCardHeadingText>
        <StatCardHeadingIcon className={cn(`text-secondary-500`)}>
          <Layers />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {allMiningOrder && (
        <>
          <StatCardData className={cn(`text-foreground`)}>
            ${" "}
            {allMiningOrder
              .reduce((p, n) => p + n.amountInvested, 0)
              .toLocaleString("en-IN")}
          </StatCardData>
          <StatCardFooter>Total mining active pool</StatCardFooter>
        </>
      )}

      {isAllMiningOrderError && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 font-bold text-red-500`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size={"sm"}
            variant={"destructive"}
            className={cn(`mt-3`)}
          >
            Try again
          </Button>
        </>
      )}

      {isAllMiningOrderLoading && (
        <div className={cn(`animate-pulse space-y-4`)}>
          <div className={cn(`bg-foreground/10 mt-5 h-8 w-36 rounded-md`)} />
          <div className={cn(`bg-foreground/10 mt-2 h-4 w-32 rounded-md`)} />
        </div>
      )}
    </StatCard>
  );
}

export function ActiveMiningSessionsCard({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const {
    data: activeMiningSession,
    isLoading: isActiveMiningSessionLoading,
    isError: isActiveMiningSessionError,
  } = useReadActiveMiningOrders();

  return (
    <>
      <StatCard
        className={cn(
          `border-t-secondary-500 relative overflow-hidden border-t-4`,
          className,
        )}
        {...props}
      >
        <StatCardHeader>
          <StatCardHeadingText>Active Mining Sessions</StatCardHeadingText>
          <StatCardHeadingIcon className={cn(`text-secondary-500`)}>
            <Layers />
          </StatCardHeadingIcon>
        </StatCardHeader>

        {activeMiningSession && (
          <>
            <StatCardData className={cn(`text-foreground`)}>
              {activeMiningSession.length}
            </StatCardData>
            <StatCardFooter>Live mining instances</StatCardFooter>
          </>
        )}

        {isActiveMiningSessionError && (
          <>
            <p
              className={cn(
                `font-brand-primary text-2 mt-5 font-bold text-red-600`,
              )}
            >
              Something went wrong !!!
            </p>

            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              className={cn(`mt-3`)}
            >
              Try again
            </Button>
          </>
        )}

        {isActiveMiningSessionLoading && (
          <div className={cn(`animate-pulse space-y-4`)}>
            <div className={cn(`bg-foreground/10 mt-5 h-8 w-36 rounded-md`)} />
            <div className={cn(`bg-foreground/10 mt-2 h-4 w-32 rounded-md`)} />
          </div>
        )}
      </StatCard>
    </>
  );
}

export function UserGrowthCard({
  className,
  ...props
}: ComponentProps<"section">) {
  const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

  const chartDays = [
    { date: "Sep 08", height: "h-2" },
    { date: "Sep 09", height: "h-2" },
    { date: "Sep 10", height: "h-2" },
    { date: "Sep 11", height: "h-2" },
    { date: "Sep 12", height: "h-2" },
    { date: "Sep 13", height: "h-2" },
    { date: "Sep 14", height: "h-2" },
  ];

  return (
    <>
      <section className={cn(`@container`, className)} {...props}>
        <div
          className={cn(
            `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border py-4`,
          )}
        >
          <div className={cn(`flex w-full items-center justify-between`)}>
            <div className={cn(`flex items-center gap-2`)}>
              <TrendingUp className={cn(`text-secondary-500 ml-5 size-4`)} />
              <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
                User Growth (Last 7 Days)
              </h2>
            </div>
          </div>

          <hr className={cn(`border-foreground/20 my-5`)} />

          {state === "error" && <UserGrowthCardError />}
          {state === "loading" && <UserGrowthCardLoading />}
          {state === "data" && (
            <div className={cn(`flex flex-col justify-end pt-8 pb-2`)}>
              <div
                className={cn(
                  `flex h-40 w-full items-end justify-between gap-2`,
                )}
              >
                {chartDays.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      `flex h-full flex-1 flex-col items-center justify-end gap-2`,
                    )}
                  >
                    <div
                      className={cn(
                        `bg-secondary-500 w-full rounded-t-sm transition-all`,
                        item.height,
                      )}
                    />
                    <span className={cn(`text-foreground/50 text-2.5`)}>
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ThisMonthStatsCard({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: miningWalletMonthlyDepositStats,
    isError: isMiningWalletMonthlyDepositStatsError,
    isLoading: isMiningWalletMonthlyDepositStatsLoading,
  } = useReadMiningWalletMonthlyDepositStats();
  const {
    data: tradingWalletMonthlyDepositStats,
    isError: isTradingWalletMonthlyDepositStatsError,
    isLoading: isTradingWalletMonthlyDepositStatsLoading,
  } = useReadTradingWalletMonthlyDepositStats();
  const {
    data: miningWalletMonthlyWithdrawStats,
    isError: isMiningWalletMonthlyWithdrawStatsError,
    isLoading: isMiningWalletMonthlyWithdrawStatsLoading,
  } = useReadMiningWalletMonthlyWithdrawStats();
  const {
    data: tradingWalletMonthlyWithdrawStats,
    isError: isTradingWalletMonthlyWithdrawStatsError,
    isLoading: isTradingWalletMonthlyWithdrawStatsLoading,
  } = useReadTradingWalletMonthlyWithdrawStats();
  const {
    data: userMonthlyStats,
    isError: isUserMonthlyStatsError,
    isLoading: isUserMonthlyStatsLoading,
  } = useReadUserMonthlyStats();

  return (
    <section className={cn(`@container`, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div className={cn(`flex w-full items-center justify-between`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <Calendar className={cn(`text-secondary-500 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              This Month Stats
            </h2>
          </div>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

        {(isMiningWalletMonthlyDepositStatsError ||
          isTradingWalletMonthlyDepositStatsError ||
          isMiningWalletMonthlyWithdrawStatsError ||
          isTradingWalletMonthlyWithdrawStatsError ||
          isUserMonthlyStatsError) && <ThisMonthStatsCardError />}

        {(isMiningWalletMonthlyDepositStatsLoading ||
          isTradingWalletMonthlyDepositStatsLoading ||
          isMiningWalletMonthlyWithdrawStatsLoading ||
          isTradingWalletMonthlyWithdrawStatsLoading ||
          isUserMonthlyStatsLoading) && <ThisMonthStatsCardLoading />}

        {miningWalletMonthlyDepositStats &&
          tradingWalletMonthlyDepositStats &&
          miningWalletMonthlyWithdrawStats &&
          tradingWalletMonthlyWithdrawStats &&
          userMonthlyStats && (
            <div className={cn(`space-y-4`)}>
              <Fragment>
                <div className={cn(`flex w-full items-center justify-between`)}>
                  <div className={cn(`flex flex-col gap-y-1`)}>
                    <span className={cn(`text-foreground/50 text-xs`)}>
                      Monthly Deposits
                    </span>
                    <span
                      className={cn(`text-lg font-semibold text-green-500`)}
                    >
                      ${" "}
                      {(
                        miningWalletMonthlyDepositStats[0].totalAmount +
                        tradingWalletMonthlyDepositStats[0].totalAmount
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div
                    className={cn(
                      `bg-foreground/5 border-foreground/10 flex size-10 items-center justify-center rounded-lg border`,
                    )}
                  >
                    <ArrowDownRight className={cn(`size-5 text-green-500`)} />
                  </div>
                </div>
                <hr className={cn(`border-foreground/10 -mx-6 my-4`)} />
              </Fragment>

              <Fragment>
                <div className={cn(`flex w-full items-center justify-between`)}>
                  <div className={cn(`flex flex-col gap-y-1`)}>
                    <span className={cn(`text-foreground/50 text-xs`)}>
                      Monthly Withdrawls
                    </span>
                    <span className={cn(`text-lg font-semibold text-red-500`)}>
                      ${" "}
                      {(
                        miningWalletMonthlyWithdrawStats[0].totalAmount +
                        tradingWalletMonthlyWithdrawStats[0].totalAmount
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div
                    className={cn(
                      `bg-foreground/5 border-foreground/10 flex size-10 items-center justify-center rounded-lg border`,
                    )}
                  >
                    <ArrowUpRight className={cn(`size-5 text-red-500`)} />
                  </div>
                </div>
                <hr className={cn(`border-foreground/10 -mx-6 my-4`)} />
              </Fragment>

              <Fragment>
                <div className={cn(`flex w-full items-center justify-between`)}>
                  <div className={cn(`flex flex-col gap-y-1`)}>
                    <span className={cn(`text-foreground/50 text-xs`)}>
                      Monthly Users
                    </span>
                    <span
                      className={cn(`text-secondary-500 text-lg font-semibold`)}
                    >
                      {userMonthlyStats[0].totalUsers.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div
                    className={cn(
                      `bg-foreground/5 border-foreground/10 flex size-10 items-center justify-center rounded-lg border`,
                    )}
                  >
                    <UserPlus className={cn(`text-secondary-500 size-5`)} />
                  </div>
                </div>
              </Fragment>
            </div>
          )}
      </div>
    </section>
  );
}

export function PendingTransactionsSection() {
  return (
    <div className={cn(`default-padding @container space-y-6 py-10`)}>
      <PendingDepositsTable />
      <PendingWithdrawalsTable />
    </div>
  );
}

export function PendingDepositsTable({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: pendingMiningWalletDeposit,
    isError: isPendingMiningWalletDepositrror,
    isLoading: isPendingMiningWalletDepositLoading,
  } = useReadPendingMiningWalletDeposit();
  const {
    data: pendingTradingWalletDeposit,
    isError: isPendingTradingWalletDepositrror,
    isLoading: isPendingTradingWalletDepositLoading,
  } = useReadPendingTradingWalletDeposit();

  const { mutateAsync: updateMiningWalletDeposit } =
    useUpdateMiningWalletDeposit();
  const { mutateAsync: updateTradingWalletDeposit } =
    useUpdateTradingWalletDeposit();

  const { mutateAsync: addMiningWalletBalance } = useAddMiningWalletBalance();
  const { mutateAsync: addTradingWalletBalance } = useAddTradingWalletBalance();

  return (
    <section className={cn(`@container`, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div className={cn(`flex w-full items-center justify-between`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <ArrowDownLeft className={cn(`text-primary-500 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              Pending Deposits
            </h2>
          </div>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        {(isPendingMiningWalletDepositrror ||
          isPendingTradingWalletDepositrror) && <PendingDepositsTableError />}

        {(isPendingMiningWalletDepositLoading ||
          isPendingTradingWalletDepositLoading) && (
          <PendingDepositsTableLoading />
        )}

        {pendingMiningWalletDeposit && pendingTradingWalletDeposit && (
          <>
            <>
              {[...pendingMiningWalletDeposit, ...pendingTradingWalletDeposit]
                .length === 0 ? (
                <PendingDepositsTableEmpty />
              ) : (
                <div className={cn(`overflow-x-auto`)}>
                  <table className={cn(`w-full border-collapse text-left`)}>
                    <thead>
                      <tr
                        className={cn(
                          `text-foreground/50 text-2.75 tracking-wider uppercase`,
                        )}
                      >
                        <th className={cn(`py-3 font-medium`)}>User</th>
                        <th className={cn(`py-3 font-medium`)}>Amount</th>
                        <th className={cn(`py-3 font-medium`)}>Method</th>
                        <th className={cn(`py-3 font-medium`)}>Proof</th>
                        <th className={cn(`py-3 font-medium`)}>Date</th>
                        <th className={cn(`py-3 font-medium`)}>Wallet Type </th>
                        <th className={cn(`py-3 text-right font-medium`)}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={cn(`divide-foreground/10 divide-y text-sm`)}
                    >
                      {[
                        ...pendingMiningWalletDeposit.map((e) => ({
                          ...e,
                          type: "mining-wallet" as const,
                        })),
                        ...pendingTradingWalletDeposit.map((e) => ({
                          ...e,
                          type: "trading-wallet" as const,
                        })),
                      ]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
                        )
                        .map((item) => (
                          <tr
                            key={item.id}
                            className={cn(`group`)}
                            data-db-record-id={item.id}
                          >
                            <td className={cn(`py-4 pr-4`)}>
                              <div className={cn(`flex items-center gap-3`)}>
                                <div
                                  className={cn(
                                    `bg-secondary-500 text-secondary-50 flex size-10 shrink-0 items-center justify-center rounded-full font-semibold`,
                                  )}
                                >
                                  {item.associatedUserDetail.fullName[0]}
                                </div>
                                <div className={cn(`flex flex-col`)}>
                                  <span className={cn(`font-medium`)}>
                                    {item.associatedUserDetail.fullName}
                                  </span>
                                  <span
                                    className={cn(`text-foreground/50 text-xs`)}
                                  >
                                    {item.associatedUserDetail.email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td
                              className={cn(
                                `py-4 pr-4 font-semibold text-green-500`,
                              )}
                            >
                              {item.amount}
                            </td>
                            <td className={cn(`text-foreground/80 py-4 pr-4`)}>
                              {item.depositMethod}
                            </td>
                            <td className={cn(`py-4 pr-4`)}>
                              <a
                                href={item.depositProof}
                                className={cn(
                                  `border-foreground/20 bg-foreground/5 text-foreground hover:bg-foreground/10 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium`,
                                )}
                              >
                                <ImageIcon className={cn(`size-3.5`)} />
                                View
                              </a>
                            </td>
                            <td
                              className={cn(
                                `text-foreground/60 py-4 pr-4 text-xs`,
                              )}
                            >
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }).format(new Date(item.createdAt))}
                            </td>
                            <td className={cn(`py-4 pr-4`)}>
                              <span
                                className={cn(
                                  `inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500`,
                                )}
                              >
                                {item.type.replace("-", " ").toUpperCase()}
                              </span>
                            </td>
                            <td className={cn(`py-4 text-right`)}>
                              <div
                                className={cn(
                                  `flex items-center justify-end gap-2`,
                                )}
                              >
                                <Button
                                  size="xs"
                                  variant={"success"}
                                  className={cn(`rounded-sm`)}
                                  onClick={async () => {
                                    if (item.type === "mining-wallet") {
                                      await updateMiningWalletDeposit({
                                        data: {
                                          dataToInsert: { status: "PROCESSED" },
                                          identifier: { walletId: item.id },
                                        },
                                      });
                                      await addMiningWalletBalance({
                                        data: {
                                          dataToUpdate: {
                                            balance: item.amount,
                                          },
                                          identifier: {
                                            associatedUserId: item.orderedBy,
                                          },
                                        },
                                      });
                                    }
                                    if (item.type === "trading-wallet") {
                                      await updateTradingWalletDeposit({
                                        data: {
                                          dataToInsert: { status: "PROCESSED" },
                                          identifier: { walletId: item.id },
                                        },
                                      });
                                      await addTradingWalletBalance({
                                        data: {
                                          dataToUpdate: {
                                            balance: item.amount,
                                          },
                                          identifier: {
                                            associatedUserId: item.orderedBy,
                                          },
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <Check className={cn(`size-3.5`)} />
                                  Approve
                                </Button>
                                <Button
                                  size="xs"
                                  variant={"destructive"}
                                  className={cn(`rounded-sm`)}
                                  onClick={async () => {
                                    if (item.type === "mining-wallet") {
                                      await updateMiningWalletDeposit({
                                        data: {
                                          dataToInsert: { status: "REJECTED" },
                                          identifier: { walletId: item.id },
                                        },
                                      });
                                    }
                                    if (item.type === "trading-wallet") {
                                      await updateTradingWalletDeposit({
                                        data: {
                                          dataToInsert: { status: "REJECTED" },
                                          identifier: { walletId: item.id },
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <X className={cn(`size-3.5`)} />
                                  Reject
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          </>
        )}
      </div>
    </section>
  );
}

export function PendingWithdrawalsTable({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: pendingMiningWalletWithdraw,
    isError: isPendingMiningWalletWithdrawlsError,
    isLoading: isPendingMiningWalletWithdrawlsLoading,
  } = useReadPendingMiningWalletWithdraw();
  const {
    data: pendingTradingWalletWithdraw,
    isError: isPendingTradingWalletWithdrawlsError,
    isLoading: isPendingTradingWalletWithdrawlsLoading,
  } = useReadPendingTradingWalletWithdraw();

  const { mutateAsync: deductMiningWalletBalance } =
    useDeductMiningWalletBalance();
  const { mutateAsync: deductTradingWalletBalance } =
    useDeductTradingWalletBalance();

  const { mutateAsync: updateMiningWalletWithdraw } =
    useUpdateMiningWalletWithdraw();
  const { mutateAsync: updateTradingWalletWithdraw } =
    useUpdateTradingWalletWithdraw();

  return (
    <section className={cn(`@container`, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div className={cn(`flex w-full items-center justify-between`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <ArrowUpRight className={cn(`text-primary-600 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              Pending Withdrawals
            </h2>
          </div>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        {(isPendingMiningWalletWithdrawlsError ||
          isPendingTradingWalletWithdrawlsError) && (
          <PendingWithdrawalsTableError />
        )}
        {(isPendingMiningWalletWithdrawlsLoading ||
          isPendingTradingWalletWithdrawlsLoading) && (
          <PendingWithdrawalsTableLoading />
        )}
        {pendingMiningWalletWithdraw && pendingTradingWalletWithdraw && (
          <>
            {[...pendingMiningWalletWithdraw, ...pendingTradingWalletWithdraw]
              .length === 0 ? (
              <div
                className={cn(
                  `flex flex-col items-center justify-center py-12 text-center`,
                )}
              >
                <div
                  className={cn(
                    `mb-3 flex size-12 items-center justify-center rounded-full border border-green-500/40 bg-green-500/20 text-green-500`,
                  )}
                >
                  <Check className={cn(`size-6`)} />
                </div>
                <p className={cn(`text-foreground/60 text-sm`)}>
                  No pending withdrawals
                </p>
              </div>
            ) : (
              <div className={cn(`overflow-x-auto`)}>
                <table className={cn(`w-full border-collapse text-left`)}>
                  <thead>
                    <tr
                      className={cn(
                        `text-foreground/50 text-2.75 tracking-wider uppercase`,
                      )}
                    >
                      <th className={cn(`py-3 font-medium`)}>User</th>
                      <th className={cn(`py-3 font-medium`)}>Amount</th>
                      <th className={cn(`py-3 font-medium`)}>Method</th>
                      <th className={cn(`py-3 font-medium`)}>Date</th>
                      <th className={cn(`py-3 font-medium`)}>Wallet Type</th>
                      <th className={cn(`py-3 text-right font-medium`)}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={cn(`divide-foreground/10 divide-y text-sm`)}
                  >
                    {[
                      ...pendingMiningWalletWithdraw.map((e) => ({
                        ...e,
                        type: "mining-wallet" as const,
                      })),
                      ...pendingTradingWalletWithdraw.map((e) => ({
                        ...e,
                        type: "trading-wallet" as const,
                      })),
                    ]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )
                      .map((item) => (
                        <tr key={item.id} className={cn(`group`)}>
                          <td className={cn(`py-4 pr-4`)}>
                            <div className={cn(`flex items-center gap-3`)}>
                              <div
                                className={cn(
                                  `bg-secondary-500 text-secondary-50 flex size-10 shrink-0 items-center justify-center rounded-full font-semibold`,
                                )}
                              >
                                {item.associatedUserDetail.fullName[0]}
                              </div>
                              <div className={cn(`flex flex-col`)}>
                                <span className={cn(`font-medium`)}>
                                  {item.associatedUserDetail.fullName}
                                </span>
                                <span
                                  className={cn(`text-foreground/50 text-xs`)}
                                >
                                  {item.associatedUserDetail.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td
                            className={cn(
                              `py-4 pr-4 font-semibold text-red-500`,
                            )}
                          >
                            {item.amount}
                          </td>
                          <td className={cn(`text-foreground/80 py-4 pr-4`)}>
                            {item.withdrawlMethod}
                          </td>
                          <td
                            className={cn(
                              `text-foreground/60 py-4 pr-4 text-xs`,
                            )}
                          >
                            {new Intl.DateTimeFormat("en-US", {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }).format(new Date(item.createdAt))}
                          </td>
                          <td className={cn(`py-4 pr-4`)}>
                            <span
                              className={cn(
                                `inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500`,
                              )}
                            >
                              {item.type.replace("-", " ").toUpperCase()}
                            </span>
                          </td>
                          <td className={cn(`py-4 text-right`)}>
                            <div
                              className={cn(
                                `flex items-center justify-end gap-2`,
                              )}
                            >
                              <Button
                                size="xs"
                                variant={"success"}
                                className={cn(`rounded-sm`)}
                                onClick={async () => {
                                  if (item.type === "mining-wallet") {
                                    await updateMiningWalletWithdraw({
                                      data: {
                                        dataToInsert: { status: "PROCESSED" },
                                        identifier: { walletId: item.id },
                                      },
                                    });
                                    await deductMiningWalletBalance({
                                      data: {
                                        dataToUpdate: {
                                          balance: item.amount,
                                        },
                                        identifier: {
                                          associatedUserId: item.orderedBy,
                                        },
                                      },
                                    });
                                  }
                                  if (item.type === "trading-wallet") {
                                    await updateTradingWalletWithdraw({
                                      data: {
                                        dataToInsert: { status: "PROCESSED" },
                                        identifier: { walletId: item.id },
                                      },
                                    });
                                    await deductTradingWalletBalance({
                                      data: {
                                        dataToUpdate: {
                                          balance: item.amount,
                                        },
                                        identifier: {
                                          associatedUserId: item.orderedBy,
                                        },
                                      },
                                    });
                                  }
                                }}
                              >
                                <Check className={cn(`size-3.5`)} />
                                Approve
                              </Button>
                              <Button
                                size="xs"
                                variant={"destructive"}
                                className={cn(`rounded-sm`)}
                                onClick={async () => {
                                  if (item.type === "mining-wallet") {
                                    await updateMiningWalletWithdraw({
                                      data: {
                                        dataToInsert: { status: "REJECTED" },
                                        identifier: { walletId: item.id },
                                      },
                                    });
                                  }
                                  if (item.type === "trading-wallet") {
                                    await updateTradingWalletWithdraw({
                                      data: {
                                        dataToInsert: { status: "REJECTED" },
                                        identifier: { walletId: item.id },
                                      },
                                    });
                                  }
                                }}
                              >
                                <X className={cn(`size-3.5`)} />
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
