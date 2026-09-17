import { cn } from "@repo/styles/cn";

export function UserGrowthCardLoading() {
  const bars = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div
      className={cn(
        `flex min-h-72 items-end justify-between gap-2`,
        `px-7 pt-8 pb-5`,
      )}
    >
      {bars.map((bar) => (
        <div
          key={bar}
          className={cn(
            `flex h-full flex-1 flex-col items-center justify-end gap-3`,
          )}
        >
          {/* BAR */}
          <div
            className={cn(
              `h-26 w-full max-w-26 animate-pulse rounded-t-lg`,
              `bg-secondary-500/25`,
            )}
          />

          {/* DATE */}
          <div
            className={cn(`h-3 w-12 animate-pulse rounded`, `bg-foreground/10`)}
          />
        </div>
      ))}
    </div>
  );
}

export function UserGrowthCardError() {
  return <>UserGrowthCardError</>;
}

export function ThisMonthStatsCardLoading() {
  return <>ThisMonthStatsCardLoading</>;
}

export function ThisMonthStatsCardError() {
  return (
    <div
      className={cn(
        `relative min-h-52 w-full overflow-hidden rounded-2xl border p-6`,
        `border-secondary-200/30 bg-secondary-50/20`,
      )}
    >
      {/* TOP LINE */}
      <div
        className={cn(
          `absolute top-0 left-0 h-1 w-full`,
          `bg-secondary-500`,
        )}
      />

      {/* HEADER */}
      <div className={cn(`flex items-start justify-between gap-4`)}>
        <p
          className={cn(
            `font-brand-primary text-sm font-medium uppercase`,
            `text-foreground/60`,
          )}
        >
          This Month Stats
        </p>

        <div
          className={cn(
            `flex size-11 items-center justify-center rounded-xl border`,
            `border-secondary-500/30 bg-secondary-500/10`,
          )}
        >
          <span
            className={cn(
              `font-brand-primary text-lg font-bold`,
              `text-secondary-500`,
            )}
          >
            !
          </span>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      <p
        className={cn(
          `mt-7 font-brand-primary text-lg font-bold`,
          `text-primary-500`,
        )}
      >
        Something went wrong !!!
      </p>

      {/* RETRY BUTTON */}
      <button
        type="button"
        className={cn(
          `mt-7 rounded-xl px-4 py-2`,
          `bg-secondary-500`,
          `font-brand-primary text-sm font-semibold`,
          `text-white`,
          `transition-colors hover:bg-secondary-600`,
        )}
      >
        Try again
      </button>
    </div>
  );
}

export function PendingDepositsTableLoading() {
  return <>PendingDepositsTableLoading</>;
}

export function PendingDepositsTableEmpty() {
  return <>PendingDepositsTableEmpty</>;
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
