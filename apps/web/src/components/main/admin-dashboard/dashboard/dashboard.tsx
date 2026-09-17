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
} from "./page-ui";
import { Fragment, useState } from "react";
import { Link } from "@tanstack/react-router";
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
} from "@/components/main/admin-dashboard/dashboard/boundary-comps";

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
  // const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  const [state] = useState<"error" | "loading" | "data">("error");

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

      {state === "data" && (
        <>
          <StatCardData className={cn(`text-foreground`)}>11</StatCardData>
          <StatCardFooter>Total registered users</StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 mb-6 font-bold text-red-600`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button variant={"secondary"} size={"sm"}>
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
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
  const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

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

      {state === "data" && (
        <>
          <StatCardData className={cn(`text-foreground`)}>$0.00</StatCardData>
          <StatCardFooter>Cumulative deposits</StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 mb-6 font-bold text-red-600`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button variant={"secondary"} size={"sm"}>
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
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
  // const [state] = useState<"error" | "loading" | "data">("data");
  const [state] = useState<"error" | "loading" | "data">("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

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

      {state === "data" && (
        <>
          <StatCardData className={cn(`text-foreground`)}>1</StatCardData>

          <StatCardFooter>Awaiting confirmation</StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 mb-6 font-bold text-red-600`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button variant={"secondary"} size={"sm"}>
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
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
  const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

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

      {state === "data" && (
        <>
          <StatCardData className={cn(`text-foreground`)}>0</StatCardData>

          <StatCardFooter>Awaiting processing</StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 mb-6 font-bold text-red-600`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button variant={"secondary"} size={"sm"}>
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
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
  const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

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

      {state === "data" && (
        <>
          <StatCardData className={cn(`text-foreground`)}>
            $5,910.00
          </StatCardData>
          <StatCardFooter>Total mining active pool</StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              `font-brand-primary text-2 mt-5 mb-6 font-bold text-red-600`,
            )}
          >
            Something went wrong !!!
          </p>

          <Button variant={"secondary"} size={"sm"}>
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
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
  // const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  const [state] = useState<"error" | "loading" | "data">("error");

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

        {state === "data" && (
          <>
            <StatCardData className={cn(`text-foreground`)}>10</StatCardData>
            <StatCardFooter>Live mining instances</StatCardFooter>
          </>
        )}

        {state === "error" && (
          <>
            <p
              className={cn(
                `font-brand-primary text-2 mt-5 mb-6 font-bold text-red-600`,
              )}
            >
              Something went wrong !!!
            </p>

            <Button variant={"secondary"} size={"sm"}>
              Try again
            </Button>
          </>
        )}

        {state === "loading" && (
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
  // const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  const [state] = useState<"error" | "loading" | "data">("error");

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
            `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
          )}
        >
          <div className={cn(`flex w-full items-center justify-between`)}>
            <div className={cn(`flex items-center gap-2`)}>
              <TrendingUp className={cn(`text-secondary-500 size-4`)} />
              <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
                User Growth (Last 7 Days)
              </h2>
            </div>
          </div>

          <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

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
  // const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  const [state] = useState<"error" | "loading" | "data">("error");

  const statsList = [
    {
      id: "monthly-deposits",
      label: "Monthly Deposits",
      value: "$0.00",
      color: "text-green-500",
      icon: <ArrowDownRight className={cn(`size-5 text-green-500`)} />,
    },
    {
      id: "monthly-withdrawals",
      label: "Monthly Withdrawals",
      value: "$0.00",
      color: "text-red-500",
      icon: <ArrowUpRight className={cn(`size-5 text-red-500`)} />,
    },
    {
      id: "new-users",
      label: "New Users",
      value: "1",
      color: "text-secondary-500",
      icon: <UserPlus className={cn(`text-secondary-500 size-5`)} />,
    },
    {
      id: "mining-invested",
      label: "Mining Invested",
      value: "$0.00",
      color: "text-primary-500",
      icon: <Layers className={cn(`text-primary-500 size-5`)} />,
    },
  ];

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

        {state === "error" && <ThisMonthStatsCardError />}
        {state === "loading" && <ThisMonthStatsCardLoading />}
        {state === "data" && (
          <div className={cn(`space-y-4`)}>
            {statsList.map((stat, index) => (
              <Fragment key={stat.id}>
                <div className={cn(`flex w-full items-center justify-between`)}>
                  <div className={cn(`flex flex-col gap-y-1`)}>
                    <span className={cn(`text-foreground/50 text-xs`)}>
                      {stat.label}
                    </span>
                    <span className={cn(`text-lg font-semibold`, stat.color)}>
                      {stat.value}
                    </span>
                  </div>
                  <div
                    className={cn(
                      `bg-foreground/5 border-foreground/10 flex size-10 items-center justify-center rounded-lg border`,
                    )}
                  >
                    {stat.icon}
                  </div>
                </div>
                {index < statsList.length - 1 && (
                  <hr className={cn(`border-foreground/10 -mx-6 my-4`)} />
                )}
              </Fragment>
            ))}
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
  // const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  const [state] = useState<"error" | "loading" | "data">("error");

  // const pendingDeposits = [];
  const pendingDeposits = [
    {
      id: "dep-1",
      user: {
        name: "Surajit Sarder",
        email: "surajitsarder2000@gmail.com",
        initial: "S",
      },
      amount: "$1,000.00",
      method: "Bsc_bep20",
      proof: "#",
      date: "Aug 31, 2026 21:45",
      status: "Pending",
    },
  ];

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
          <Link
            to="/"
            className={cn(
              `bg-secondary-500 text-secondary-50 hover:bg-secondary-600 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors`,
            )}
          >
            View All
          </Link>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        {state === "error" && <PendingDepositsTableError />}
        {state === "loading" && <PendingDepositsTableLoading />}
        {state === "data" && (
          <>
            {pendingDeposits.length === 0 ? (
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
                      <th className={cn(`py-3 font-medium`)}>Status</th>
                      <th className={cn(`py-3 text-right font-medium`)}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={cn(`divide-foreground/10 divide-y text-sm`)}
                  >
                    {pendingDeposits.map((item) => (
                      <tr key={item.id} className={cn(`group`)}>
                        <td className={cn(`py-4 pr-4`)}>
                          <div className={cn(`flex items-center gap-3`)}>
                            <div
                              className={cn(
                                `bg-secondary-500 text-secondary-50 flex size-10 shrink-0 items-center justify-center rounded-full font-semibold`,
                              )}
                            >
                              {item.user.initial}
                            </div>
                            <div className={cn(`flex flex-col`)}>
                              <span className={cn(`font-medium`)}>
                                {item.user.name}
                              </span>
                              <span
                                className={cn(`text-foreground/50 text-xs`)}
                              >
                                {item.user.email}
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
                          {item.method}
                        </td>
                        <td className={cn(`py-4 pr-4`)}>
                          <a
                            href={item.proof}
                            className={cn(
                              `border-foreground/20 bg-foreground/5 text-foreground hover:bg-foreground/10 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium`,
                            )}
                          >
                            <ImageIcon className={cn(`size-3.5`)} />
                            View
                          </a>
                        </td>
                        <td
                          className={cn(`text-foreground/60 py-4 pr-4 text-xs`)}
                        >
                          {item.date}
                        </td>
                        <td className={cn(`py-4 pr-4`)}>
                          <span
                            className={cn(
                              `inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500`,
                            )}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className={cn(`py-4 text-right`)}>
                          <div
                            className={cn(
                              `flex items-center justify-end gap-2`,
                            )}
                          >
                            <Button
                              size="sm"
                              className={cn(
                                `h-8 gap-1 rounded-md bg-green-600 px-3 text-xs text-white hover:bg-green-700`,
                              )}
                            >
                              <Check className={cn(`size-3.5`)} />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              className={cn(
                                `h-8 gap-1 rounded-md bg-red-600 px-3 text-xs text-white hover:bg-red-700`,
                              )}
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

export function PendingWithdrawalsTable({
  className,
  ...props
}: ComponentProps<"section">) {
  const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

  const pendingWithdrawls = [] as any[];

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
          <Link
            to="/"
            className={cn(
              `bg-secondary-500 text-secondary-50 hover:bg-secondary-600 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors`,
            )}
          >
            View All
          </Link>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        {state === "error" && <PendingWithdrawalsTableError />}
        {state === "loading" && <PendingWithdrawalsTableLoading />}
        {state === "data" && (
          <>
            {pendingWithdrawls.length === 0 ? (
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
              <></>
            )}
          </>
        )}
      </div>
    </section>
  );
}
