import { cn } from "@repo/styles/cn";

export function AllWithdrawalsLoading() {
  return (
    <div>
      {/* TABLE */}
      <div className={cn(`w-full overflow-x-auto`)}>
        <div className={cn(`min-w-300 px-6`)}>
          {/* TABLE HEADER */}
          <div
            className={cn(
              `grid grid-cols-[2fr_0.8fr_0.7fr_1.5fr_1fr_1.3fr_0.9fr_1fr_0.6fr] items-center gap-6 py-5`,
            )}
          >
            <div className={cn(`h-4 w-12 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-16 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-14 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-28 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-24 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-24 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-14 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-12 animate-pulse rounded bg-foreground/10`)} />
            <div
              className={cn(
                `ml-auto h-4 w-16 animate-pulse rounded bg-foreground/10`,
              )}
            />
          </div>

          {/* TABLE ROW */}
          <div
            className={cn(
              `grid grid-cols-[2fr_0.8fr_0.7fr_1.5fr_1fr_1.3fr_0.9fr_1fr_0.6fr] items-center gap-6 pt-3 pb-8`,
            )}
          >
            {/* USER */}
            <div className={cn(`flex min-w-0 items-center gap-4`)}>
              <div
                className={cn(
                  `size-12 shrink-0 animate-pulse rounded-full bg-secondary-500/20`,
                )}
              />

              <div className={cn(`min-w-0`)}>
                <div
                  className={cn(
                    `h-4 w-28 animate-pulse rounded-md bg-foreground/10`,
                  )}
                />

                <div
                  className={cn(
                    `mt-2 h-3 w-36 animate-pulse rounded-md bg-foreground/10`,
                  )}
                />
              </div>
            </div>

            {/* AMOUNT */}
            <div
              className={cn(
                `h-5 w-16 animate-pulse rounded-md bg-primary-500/15`,
              )}
            />

            {/* WALLET */}
            <div
              className={cn(
                `h-7 w-18 animate-pulse rounded-lg bg-secondary-500/15`,
              )}
            />

            {/* WALLET ADDRESS */}
            <div
              className={cn(
                `h-4 w-32 animate-pulse rounded-md bg-foreground/10`,
              )}
            />

            {/* TRANSACTION ID */}
            <div
              className={cn(
                `h-4 w-20 animate-pulse rounded-md bg-foreground/10`,
              )}
            />

            {/* DESCRIPTION */}
            <div
              className={cn(
                `h-4 w-28 animate-pulse rounded-md bg-foreground/10`,
              )}
            />

            {/* STATUS */}
            <div
              className={cn(
                `h-7 w-24 animate-pulse rounded-full bg-accent-500/15`,
              )}
            />

            {/* DATE */}
            <div
              className={cn(
                `h-4 w-24 animate-pulse rounded-md bg-foreground/10`,
              )}
            />

            {/* ACTIONS */}
            <div
              className={cn(
                `ml-auto h-4 w-8 animate-pulse rounded-md bg-foreground/10`,
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AllWithdrawalsError() {
  return (
    <div>
      {/* ERROR AREA */}
      <div
        className={cn(
          `flex min-h-48 w-full flex-col items-center justify-center px-6 py-10 text-center`,
        )}
      >
        <p
          className={cn(
            `font-brand-primary text-2 font-bold text-red-600`,
          )}
        >
          Something went wrong !!!
        </p>

        <p
          className={cn(
            `mt-2 font-brand-primary text-sm text-foreground/50`,
          )}
        >
          Unable to load withdrawals
        </p>

        <button
          type="button"
          className={cn(
            `mt-5 rounded-xl px-5 py-2.5 bg-secondary-500 font-brand-primary text-sm font-semibold text-white transition-colors hover:bg-secondary-600`,
          )}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
