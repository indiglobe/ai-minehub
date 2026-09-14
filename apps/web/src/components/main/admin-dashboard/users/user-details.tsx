import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import {
  Link,
  useRouter,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  Wallet,
  MessageSquare,
  User,
  BarChart3,
  ArrowRightLeft,
  Zap,
  ArrowDownRight,
  ArrowUpRight,
  Receipt,
  Layers,
} from "lucide-react";
import { Button } from "@repo/ui/button";

export function UserDetailsFromDashboard() {
  const router = useRouter();

  return (
    <div className={cn(`default-padding @container space-y-6 py-10`)}>
      {/* Top Action Buttons */}
      <div className={cn(`flex flex-wrap items-center gap-3`)}>
        <Button corner='rounded' variant={'ghost'}  onClick={() => router.history.back()}>
          <ArrowLeft className={cn(`size-4`)} />
          Back to Users
        </Button>

        <Button
          asChild
          size="sm"
          className={cn(
            `h-9 gap-2 rounded-lg bg-green-600 px-4 text-xs text-white hover:bg-green-700`,
          )}
        >
          <Link to="/users/$userId/wallet" params={{ userId: "u-1" }}>
            <Wallet className={cn(`size-4`)} />
            Manage Wallet
          </Link>
        </Button>

        <Button
          size="sm"
          className={cn(
            `h-9 gap-2 rounded-lg bg-blue-600 px-4 text-xs text-white hover:bg-blue-700`,
          )}
        >
          <MessageSquare className={cn(`size-4`)} />
          Support chat
        </Button>
      </div>

      {/* Grid: User Information & Statistics */}
      <div className={cn(`grid grid-cols-1 gap-6 lg:grid-cols-2`)}>
        <UserInformationCard />
        <StatisticsCard />
      </div>

      {/* Recent Transactions */}
      <RecentTransactionsCard />

      {/* Mining Sessions */}
      <MiningSessionsCard />
    </div>
  );
}

export function UserInformationCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 @container rounded-2xl border px-6 py-6`,
        className,
      )}
      {...props}
    >
      <div className={cn(`flex items-center gap-2`)}>
        <User className={cn(`text-secondary-500 size-4`)} />
        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          User Information
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      {/* Avatar & Name */}
      <div className={cn(`flex flex-col items-center pb-6 text-center`)}>
        <div
          className={cn(
            `bg-secondary-500 mb-3 flex size-16 items-center justify-center rounded-full text-xl font-bold text-white`,
          )}
        >
          D
        </div>
        <h3 className={cn(`font-brand-secondary text-lg font-semibold`)}>
          dsfsd dsfsf
        </h3>
        <p className={cn(`text-foreground/50 mt-0.5 text-xs`)}>
          birthday@yzcalo.com
        </p>
      </div>

      <hr className={cn(`border-foreground/10 -mx-6 mb-6`)} />

      {/* Details Grid */}
      <div className={cn(`grid grid-cols-2 gap-y-6 text-sm`)}>
        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>
            Referral Code
          </span>
          <span className={cn(`font-mono text-xs font-semibold`)}>
            QFL6D2HG
          </span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>Referred By</span>
          <span className={cn(`text-foreground/80 font-medium`)}>N/A</span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>Phone</span>
          <span className={cn(`text-foreground/80 font-medium`)}>N/A</span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>Status</span>
          <div>
            <span
              className={cn(
                `inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500`,
              )}
            >
              Inactive
            </span>
          </div>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>Joined</span>
          <span className={cn(`text-foreground/80 text-xs font-medium`)}>
            Sep 07, 2026 05:35
          </span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>
            Mining Wallet
          </span>
          <span className={cn(`text-secondary-500 font-semibold`)}>$0.00</span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>
            Trading Wallet
          </span>
          <span className={cn(`text-accent-500 font-semibold`)}>$0.00</span>
        </div>
      </div>
    </div>
  );
}

export function StatisticsCard({ className, ...props }: ComponentProps<"div">) {
  const stats = [
    {
      label: "Total Transactions",
      value: "0",
      icon: <ArrowRightLeft className={cn(`size-4 text-blue-500`)} />,
    },
    {
      label: "Active Mining",
      value: "0",
      icon: <Zap className={cn(`text-primary-500 size-4`)} />,
    },
    {
      label: "Total Deposits",
      value: "$0.00",
      icon: <ArrowDownRight className={cn(`size-4 text-green-500`)} />,
      valueColor: "text-green-500",
    },
    {
      label: "Total Withdrawals",
      value: "$0.00",
      icon: <ArrowUpRight className={cn(`size-4 text-red-500`)} />,
      valueColor: "text-red-500",
    },
  ];

  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 @container rounded-2xl border px-6 py-6`,
        className,
      )}
      {...props}
    >
      <div className={cn(`flex items-center gap-2`)}>
        <BarChart3 className={cn(`text-secondary-500 size-4`)} />
        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          Statistics
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      <div className={cn(`space-y-6`)}>
        {stats.map((stat, index) => (
          <div key={index} className={cn(`flex flex-col gap-1`)}>
            <div className={cn(`flex items-center justify-between`)}>
              <span className={cn(`text-foreground/50 text-xs`)}>
                {stat.label}
              </span>
              <div
                className={cn(
                  `bg-foreground/5 border-foreground/10 flex size-8 items-center justify-center rounded-md border`,
                )}
              >
                {stat.icon}
              </div>
            </div>
            <span
              className={cn(
                `text-xl font-semibold`,
                stat.valueColor || `text-foreground`,
              )}
            >
              {stat.value}
            </span>
            {index < stats.length - 1 && (
              <hr className={cn(`border-foreground/10 -mx-6 mt-5`)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentTransactionsCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 @container rounded-2xl border px-6 py-6`,
        className,
      )}
      {...props}
    >
      <div className={cn(`flex items-center gap-2`)}>
        <Receipt className={cn(`text-secondary-500 size-4`)} />
        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          Recent Transactions
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      <div
        className={cn(
          `flex flex-col items-center justify-center py-12 text-center`,
        )}
      >
        <div
          className={cn(
            `bg-foreground/5 border-foreground/10 text-foreground/40 mb-3 flex size-14 items-center justify-center rounded-full border text-2xl`,
          )}
        >
          📄
        </div>
        <p className={cn(`text-foreground/50 text-sm`)}>No transactions yet</p>
      </div>
    </div>
  );
}

export function MiningSessionsCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 @container rounded-2xl border px-6 py-6`,
        className,
      )}
      {...props}
    >
      <div className={cn(`flex items-center gap-2`)}>
        <Layers className={cn(`text-secondary-500 size-4`)} />
        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          Mining Sessions
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      <div
        className={cn(
          `flex flex-col items-center justify-center py-12 text-center`,
        )}
      >
        <div
          className={cn(
            `bg-foreground/5 border-foreground/10 text-foreground/40 mb-3 flex size-14 items-center justify-center rounded-full border text-2xl`,
          )}
        >
          🥞
        </div>
        <p className={cn(`text-foreground/50 text-sm`)}>No mining sessions</p>
      </div>
    </div>
  );
}
