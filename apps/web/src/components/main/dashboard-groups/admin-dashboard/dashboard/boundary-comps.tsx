import { cn } from "@repo/styles/cn";

export function UserGrowthCardLoading() {
  const bars = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div
      className={cn(
        `flex min-h-72 items-end justify-between gap-2 px-7 pt-8 pb-5`,
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
              `bg-secondary-500/25 h-26 w-full max-w-26 animate-pulse rounded-t-lg`,
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
  return (
    <div
      className={cn(
        `flex min-h-72 w-full flex-col items-center justify-center`,
        `px-7 py-8 text-center`,
      )}
    >
      {/* ERROR MESSAGE */}
      <p className={cn(`font-brand-primary text-2 font-bold`, `text-red-600`)}>
        Something went wrong !!!
      </p>

      <p
        className={cn(`font-brand-primary mt-2 text-sm`, `text-foreground/50`)}
      >
        Unable to load user growth
      </p>

      {/* RETRY */}
      <button
        type="button"
        className={cn(
          `mt-5 rounded-xl px-5 py-2`,
          `bg-secondary-500`,
          `font-brand-primary text-sm font-semibold text-white`,
          `hover:bg-secondary-600 transition-colors`,
        )}
      >
        Try again
      </button>
    </div>
  );
}

export function ThisMonthStatsCardLoading() {
  return (
    <div className={cn(`w-full animate-pulse`)}>
      {/* MONTHLY DEPOSITS */}
      <div
        className={cn(
          `flex min-h-25 items-center justify-between px-5`,
          `border-secondary-200/20 border-b`,
        )}
      >
        <div>
          <div className={cn(`h-4 w-28 rounded-md`, `bg-foreground/10`)} />

          <div className={cn(`mt-3 h-6 w-16 rounded-md`, `bg-accent-500/15`)} />
        </div>

        <div
          className={cn(
            `size-12 rounded-xl border`,
            `border-secondary-200/20 bg-foreground/5`,
          )}
        />
      </div>

      {/* MONTHLY WITHDRAWALS */}
      <div
        className={cn(
          `flex min-h-25 items-center justify-between px-5`,
          `border-secondary-200/20 border-b`,
        )}
      >
        <div>
          <div className={cn(`h-4 w-32 rounded-md`, `bg-foreground/10`)} />

          <div
            className={cn(`mt-3 h-6 w-16 rounded-md`, `bg-primary-500/15`)}
          />
        </div>

        <div
          className={cn(
            `size-12 rounded-xl border`,
            `border-secondary-200/20 bg-foreground/5`,
          )}
        />
      </div>

      {/* NEW USERS */}
      <div
        className={cn(
          `flex min-h-25 items-center justify-between px-5`,
          `border-secondary-200/20 border-b`,
        )}
      >
        <div>
          <div className={cn(`h-4 w-20 rounded-md`, `bg-foreground/10`)} />

          <div
            className={cn(`mt-3 h-6 w-8 rounded-md`, `bg-secondary-500/15`)}
          />
        </div>

        <div
          className={cn(
            `size-12 rounded-xl border`,
            `border-secondary-200/20 bg-foreground/5`,
          )}
        />
      </div>

      {/* MINING INVESTED */}
      <div className={cn(`flex min-h-25 items-center justify-between px-5`)}>
        <div>
          <div className={cn(`h-4 w-28 rounded-md`, `bg-foreground/10`)} />

          <div
            className={cn(`mt-3 h-6 w-16 rounded-md`, `bg-primary-500/15`)}
          />
        </div>

        <div
          className={cn(
            `size-12 rounded-xl border`,
            `border-secondary-200/20 bg-foreground/5`,
          )}
        />
      </div>
    </div>
  );
}

export function ThisMonthStatsCardError() {
  return (
    <div
      className={cn(
        `flex min-h-80 w-full flex-col items-center justify-center`,
        `px-6 py-8 text-center`,
      )}
    >
      <p className={cn(`font-brand-primary text-2 font-bold`, `text-red-600`)}>
        Something went wrong !!!
      </p>

      <button
        type="button"
        className={cn(
          `mt-6 rounded-xl px-5 py-2.5`,
          `bg-secondary-500`,
          `font-brand-primary text-sm font-semibold text-white`,
          `hover:bg-secondary-600 transition-colors`,
        )}
      >
        Try again
      </button>
    </div>
  );
}

export function PendingDepositsTableLoading() {
  return (
    <div
      className={cn(
        `w-full min-w-0 overflow-hidden rounded-2xl border`,
        `border-secondary-200/30 bg-secondary-50/20`,
      )}
    >
      

      {/* LOADING CONTENT */}
      <div
        className={cn(
          `flex flex-col gap-6 px-5 py-7`,
          `sm:px-7`,
        )}
      >
        {/* USER */}
        <div className={cn(`flex items-center gap-4`)}>
          <div
            className={cn(
              `size-12 shrink-0 animate-pulse rounded-full`,
              `bg-secondary-500/20`,
            )}
          />

          <div className={cn(`flex min-w-0 flex-col gap-2`)}>
            <div
              className={cn(
                `h-4 w-32 animate-pulse rounded-md`,
                `bg-foreground/10`,
              )}
            />

            <div
              className={cn(
                `h-3 w-48 max-w-full animate-pulse rounded-md`,
                `bg-foreground/10`,
              )}
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className={cn(`flex flex-wrap items-center gap-5`)}>
          <div
            className={cn(
              `h-4 w-20 animate-pulse rounded-md`,
              `bg-accent-500/15`,
            )}
          />

          <div
            className={cn(
              `h-4 w-24 animate-pulse rounded-md`,
              `bg-foreground/10`,
            )}
          />

          <div
            className={cn(
              `h-4 w-28 animate-pulse rounded-md`,
              `bg-foreground/10`,
            )}
          />

          <div
            className={cn(
              `h-7 w-20 animate-pulse rounded-full`,
              `bg-primary-500/15`,
            )}
          />
        </div>
      </div>
    </div>
  );
}

export function PendingDepositsTableEmpty() {
  return <>PendingDepositsTableEmpty</>;
}

export function PendingDepositsTableError() {
  return (
    <div>
      {/* ERROR AREA */}
      <div
        className={cn(
          `flex min-h-45 flex-col items-center justify-center px-6 py-8 text-center`,
        )}
      >
        <p className={cn(`font-brand-primary text-2 font-bold text-red-600`)}>
          Something went wrong !!!
        </p>

        <p className={cn(`font-brand-primary text-foreground/50 mt-2 text-sm`)}>
          Unable to load pending deposits
        </p>

        <button
          type="button"
          className={cn(
            `bg-secondary-500 font-brand-primary hover:bg-secondary-600 mt-5 rounded-xl px-5 py-2 text-sm font-semibold text-white transition-colors`,
          )}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function PendingWithdrawalsTableLoading() {
  return (
    <div>
      {/* LOADING AREA */}
      <div
        className={cn(`flex min-h-64 items-center justify-center px-6 py-8`)}
      >
        <div className={cn(`flex flex-col items-center`)}>
          <div
            className={cn(
              `bg-accent-500/15 size-15 animate-pulse rounded-full`,
            )}
          />

          <div
            className={cn(
              `bg-foreground/10 mt-5 h-5 w-44 animate-pulse rounded-md`,
            )}
          />
        </div>
      </div>
    </div>
  );
}

export function PendingWithdrawalsTableError() {
  return (
    <div>
      {/* ERROR AREA */}
      <div
        className={cn(
          `flex flex-col items-center justify-center px-6 py-8 text-center`,
        )}
      >
        <div></div>

        <p className={cn(`font-brand-primary text-2 font-bold text-red-600`)}>
          Something went wrong !!!
        </p>

        <p className={cn(`font-brand-primary text-foreground/50 mt-2 text-sm`)}>
          Unable to load pending withdrawals
        </p>

        <button
          type="button"
          className={cn(
            `bg-secondary-500 font-brand-primary hover:bg-secondary-600 mt-5 rounded-xl px-5 py-2 text-sm font-semibold text-white transition-colors`,
          )}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
