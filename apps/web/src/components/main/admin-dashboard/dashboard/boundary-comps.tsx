import { cn } from "@repo/styles/cn";

export function TotalUsersLoading() {
  return (
    <>
      {/* TOTAL USERS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(`bg-secondary-500 absolute top-0 left-0 h-0.5 w-full`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`bg-secondary-500/15 size-12 rounded-xl`)} />

          <div className={cn(`bg-foreground/10 mt-6 h-8 w-14 rounded-md`)} />

          <div className={cn(`bg-foreground/10 mt-2 h-4 w-24 rounded-md`)} />
        </div>
      </div>

      {/* TOTAL DEPOSITS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(`bg-accent-500 absolute top-0 left-0 h-0.5 w-full`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`bg-accent-500/15 size-12 rounded-xl`)} />

          <div className={cn(`bg-foreground/10 mt-6 h-8 w-24 rounded-md`)} />

          <div className={cn(`bg-foreground/10 mt-2 h-4 w-28 rounded-md`)} />
        </div>
      </div>

      {/* PENDING DEPOSITS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(`bg-primary-400 absolute top-0 left-0 h-0.5 w-full`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`bg-primary-500/15 size-12 rounded-xl`)} />

          <div className={cn(`bg-foreground/10 mt-6 h-8 w-10 rounded-md`)} />

          <div className={cn(`bg-foreground/10 mt-2 h-4 w-30 rounded-md`)} />
        </div>
      </div>

      {/* PENDING WITHDRAWALS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(`bg-primary-600 absolute top-0 left-0 h-0.5 w-full`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`bg-primary-600/15 size-12 rounded-xl`)} />

          <div className={cn(`bg-foreground/10 mt-6 h-8 w-10 rounded-md`)} />

          <div className={cn(`bg-foreground/10 mt-2 h-4 w-34 rounded-md`)} />
        </div>
      </div>
    </>
  );
}

export function TotalUsersError() {
  return <>TotalUsersError</>;
}

export function TotalMiningInvestedCardLoading() {
  return <>TotalMiningInvestedCardLoading</>;
}

export function TotalMiningInvestedCardError() {
  return <>TotalMiningInvestedCardError</>;
}

export function ActiveMiningSessionsCardLoading() {
  return <>ActiveMiningSessionsCardLoading</>;
}

export function ActiveMiningSessionsCardError() {
  return <>ActiveMiningSessionsCardError</>;
}

export function UserGrowthCardLoading() {
  return <>UserGrowthCardLoading</>;
}

export function UserGrowthCardError() {
  return <>UserGrowthCardError</>;
}

export function ThisMonthStatsCardLoading() {
  return <>ThisMonthStatsCardLoading</>;
}

export function ThisMonthStatsCardError() {
  return <>ThisMonthStatsCardError</>;
}

export function PendingDepositsTableLoading() {
  return <>PendingDepositsTableLoading</>;
}

export function PendingDepositsTableError() {
  return <>PendingDepositsTableError</>;
}

export function PendingWithdrawalsTableLoading() {
  return <>PendingWithdrawalsTableLoading</>;
}

export function PendingWithdrawalsTableError() {
  return <>PendingWithdrawalsTableError</>;
}
