import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import {  useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Plus,
  Minus,
  Bell,
  Wallet,
  BarChart3,
  ArrowUpRight,
  Layers,
  ArrowRightLeft,
  Receipt,
} from "lucide-react";
import { Button } from "@repo/ui/button";

export function WalletManagement() {
  const router = useRouter();
  return (
    <div className={cn(`default-padding @container space-y-6 py-10`)}>
      {/* Top Action Buttons */}
      <div className={cn(`flex flex-wrap items-center gap-3`)}>
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={() => router.history.back()}
        >
          <ArrowLeft className={cn(`size-4`)} />
          Back to Users
        </Button>
        <Button size="sm" variant={"primary"} className={cn(``)}>
          <Plus className={cn(`size-4`)} />
          Add Money
        </Button>

        <Button size="sm" variant={"destructive"} className={cn(``)}>
          <Minus className={cn(`size-4`)} />
          Deduct Money
        </Button>

        <Button size="sm" variant={"warn"} className={cn(``)}>
          <Bell className={cn(`size-4`)} />
          Send Notification
        </Button>
      </div>

      {/* Grid: Wallet Management & Wallet Statistics */}
      <div className={cn(`grid grid-cols-1 gap-6 lg:grid-cols-2`)}>
        <WalletManagementCard />
        <WalletStatisticsCard />
      </div>

      {/* Transaction History */}
      <TransactionHistoryCard />
    </div>
  );
}

export function WalletManagementCard({
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
        <Wallet className={cn(`text-secondary-500 size-4`)} />
        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          User Wallets
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      <div className={cn(`space-y-6`)}>
        <div>
          <h3 className={cn(`font-brand-secondary text-base font-semibold`)}>
            Wallet Management
          </h3>
        </div>

        <div
          className={cn(
            `bg-foreground/5 border-foreground/10 space-y-4 rounded-xl border p-4`,
          )}
        >
          <div className={cn(`text-center font-medium`)}>dsfsd dsfsf</div>

          <div
            className={cn(
              `bg-foreground/5 border-foreground/10 space-y-3 rounded-lg border p-3`,
            )}
          >
            <div className={cn(`text-foreground/70 text-xs font-semibold`)}>
              Quick Info
            </div>
            <div className={cn(`grid grid-cols-2 gap-4 text-xs`)}>
              <div className={cn(`flex flex-col gap-1`)}>
                <span className={cn(`text-foreground/50`)}>Email</span>
                <span className={cn(`font-medium`)}>birthday@yzcalo.com</span>
              </div>
              <div className={cn(`flex flex-col gap-1`)}>
                <span className={cn(`text-foreground/50`)}>Joined</span>
                <span className={cn(`font-medium`)}>Sep 07, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WalletStatisticsCard({
  className,
  ...props
}: ComponentProps<"div">) {
  const stats = [
    {
      label: "Total Withdrawals",
      value: "$0.00",
      icon: <ArrowUpRight className={cn(`size-4 text-red-500`)} />,
      valueColor: "text-red-500",
    },
    {
      label: "Total Mining",
      value: "$0.00",
      icon: <Layers className={cn(`text-primary-500 size-4`)} />,
      valueColor: "text-foreground",
    },
    {
      label: "Total Transactions",
      value: "0",
      icon: <ArrowRightLeft className={cn(`size-4 text-blue-500`)} />,
      valueColor: "text-foreground",
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
          Wallet Statistics
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
            <span className={cn(`text-xl font-semibold`, stat.valueColor)}>
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

export function TransactionHistoryCard({
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
          Transaction History
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
