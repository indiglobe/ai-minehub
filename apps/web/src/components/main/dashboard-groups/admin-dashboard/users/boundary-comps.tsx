import { cn } from "@repo/styles/cn";

export function AllUsersLoading() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      {/* TABLE */}
      <div className={cn(`w-full overflow-x-auto`)}>
        <div className={cn(`min-w-330 px-6`)}>
          {/* TABLE HEADER */}
          <div
            className={cn(
              `grid grid-cols-[2fr_1.8fr_0.9fr_1fr_1fr_0.7fr_0.9fr_0.8fr_0.8fr] items-center gap-6 py-5`,
            )}
          >
            <div className={cn(`h-3 w-12 animate-pulse rounded bg-foreground/10`)} />

            <div className={cn(`h-3 w-14 animate-pulse rounded bg-foreground/10`)} />

            <div className={cn(`h-3 w-24 animate-pulse rounded bg-foreground/10`)} />

            <div className={cn(`h-3 w-24 animate-pulse rounded bg-foreground/10`)} />

            <div className={cn(`h-3 w-20 animate-pulse rounded bg-foreground/10`)} />

            <div className={cn(`h-3 w-20 animate-pulse rounded bg-foreground/10`)} />

            <div className={cn(`h-3 w-14 animate-pulse rounded bg-foreground/10`)} />

            <div className={cn(`h-3 w-14 animate-pulse rounded bg-foreground/10`)} />

            <div
              className={cn(
                `ml-auto h-3 w-16 animate-pulse rounded bg-foreground/10`,
              )}
            />
          </div>

          {/* ROWS */}
          {rows.map((row) => (
            <div
              key={row}
              className={cn(
                `grid grid-cols-[2fr_1.8fr_0.9fr_1fr_1fr_0.7fr_0.9fr_0.8fr_0.8fr] items-center gap-6 border-t py-4 border-secondary-200/15`,
              )}
            >
              {/* USER */}
              <div className={cn(`flex min-w-0 items-center gap-3`)}>
                <div
                  className={cn(
                    `size-10 shrink-0 animate-pulse rounded-full bg-secondary-500/20`,
                  )}
                />

                <div
                  className={cn(
                    `h-4 w-28 animate-pulse rounded-md bg-foreground/10`,
                  )}
                />
              </div>

              {/* EMAIL */}
              <div
                className={cn(
                  `h-3 w-40 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* REFERRAL CODE */}
              <div
                className={cn(
                  `h-6 w-18 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* MINING INVESTED */}
              <div
                className={cn(
                  `h-4 w-18 animate-pulse rounded-md bg-primary-500/15`,
                )}
              />

              {/* MINING PROFIT */}
              <div
                className={cn(
                  `h-4 w-18 animate-pulse rounded-md bg-accent-500/15`,
                )}
              />

              {/* TRANSACTIONS */}
              <div
                className={cn(
                  `h-4 w-8 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* JOINED */}
              <div
                className={cn(
                  `h-3 w-20 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* STATUS */}
              <div
                className={cn(
                  `h-4 w-14 animate-pulse rounded-md bg-accent-500/15`,
                )}
              />

              {/* ACTIONS */}
              <div className={cn(`ml-auto flex items-center gap-2`)}>
                <div
                  className={cn(
                    `size-7 animate-pulse rounded-lg bg-secondary-500/20`,
                  )}
                />

                <div
                  className={cn(
                    `size-7 animate-pulse rounded-lg bg-accent-500/20`,
                  )}
                />

                <div
                  className={cn(
                    `size-7 animate-pulse rounded-lg bg-primary-500/20`,
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AllUsersError() {
  return (
    <div>
      {/* ERROR AREA */}
      <div
        className={cn(
          `flex min-h-120 w-full flex-col items-center justify-center px-6 py-10 text-center`,
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
          Unable to load users
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