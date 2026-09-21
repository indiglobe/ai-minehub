import { cn } from "@repo/styles/cn";

export function MiningPlansLoading() {
  const rows = [1, 2, 3, 4];

  return (
    <div>
      

      {/* TABLE */}
      <div className={cn(`w-full overflow-x-auto`)}>
        <div className={cn(`min-w-300 px-6`)}>
          {/* TABLE HEADER */}
          <div
            className={cn(
              `grid grid-cols-[1.8fr_0.9fr_0.6fr_0.8fr_0.8fr_0.9fr_1fr_1fr_0.7fr] items-center gap-6 py-5`,
            )}
          >
            <div className={cn(`h-4 w-20 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-24 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-16 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-20 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-20 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-22 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-14 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-4 w-20 animate-pulse rounded bg-foreground/10`)} />
            <div
              className={cn(
                `ml-auto h-4 w-16 animate-pulse rounded bg-foreground/10`,
              )}
            />
          </div>

          {/* ROWS */}
          {rows.map((row) => (
            <div
              key={row}
              className={cn(
                `grid grid-cols-[1.8fr_0.9fr_0.6fr_0.8fr_0.8fr_0.9fr_1fr_1fr_0.7fr] items-center gap-6 border-t py-5 border-secondary-200/15`,
              )}
            >
              {/* PLAN NAME */}
              <div
                className={cn(
                  `h-5 w-36 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* DAILY RETURN */}
              <div
                className={cn(
                  `h-5 w-14 animate-pulse rounded-md bg-accent-500/15`,
                )}
              />

              {/* DURATION */}
              <div
                className={cn(
                  `h-4 w-10 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* MIN DEPOSIT */}
              <div
                className={cn(
                  `h-4 w-12 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* MAX DEPOSIT */}
              <div
                className={cn(
                  `h-4 w-12 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* TOTAL RETURN */}
              <div
                className={cn(
                  `h-5 w-10 animate-pulse rounded-md bg-primary-500/15`,
                )}
              />

              {/* STATUS */}
              <div
                className={cn(
                  `h-7 w-28 animate-pulse rounded-full bg-secondary-500/15`,
                )}
              />

              {/* POPULARITY */}
              <div
                className={cn(
                  `h-7 w-24 animate-pulse rounded-full bg-secondary-500/15`,
                )}
              />

              {/* ACTION */}
              <div
                className={cn(
                  `ml-auto h-10 w-20 animate-pulse rounded-xl bg-secondary-500/20`,
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MiningPlansError() {
  return (
    <div>
      {/* ERROR AREA */}
      <div
        className={cn(
          `flex min-h-96 w-full flex-col items-center justify-center px-6 py-10 text-center`,
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
          Unable to load mining plans
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
