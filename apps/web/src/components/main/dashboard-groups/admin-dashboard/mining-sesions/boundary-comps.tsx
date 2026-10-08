import { cn } from "@repo/styles/cn";import { Button } from "@repo/ui/button";

export function MiningSessionsLoading() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      {/* TABLE */}
      <div className={cn(`w-full overflow-x-auto`)}>
        <div className={cn(`min-w-350 px-6`)}>
          {/* TABLE HEADER */}
          <div
            className={cn(
              `grid grid-cols-[2.4fr_1fr_0.9fr_0.9fr_0.9fr_0.7fr_1.4fr_0.8fr_1fr_1fr] items-center gap-6 py-5`,
            )}
          >
            <div className={cn(`h-3 w-12 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-3 w-12 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-3 w-16 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-3 w-14 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-3 w-20 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-3 w-12 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-3 w-18 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-3 w-14 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`h-3 w-14 animate-pulse rounded bg-foreground/10`)} />
            <div className={cn(`ml-auto h-3 w-12 animate-pulse rounded bg-foreground/10`)} />
          </div>

          {/* ROWS */}
          {rows.map((row) => (
            <div
              key={row}
              className={cn(
                `grid grid-cols-[2.4fr_1fr_0.9fr_0.9fr_0.9fr_0.7fr_1.4fr_0.8fr_1fr_1fr] items-center gap-6 border-t py-4 border-secondary-200/15`,
              )}
            >
              {/* USER */}
              <div className={cn(`flex min-w-0 items-center gap-3`)}>
                <div
                  className={cn(
                    `size-10 shrink-0 animate-pulse rounded-full bg-secondary-500/20`,
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
                      `mt-2 h-3 w-40 animate-pulse rounded-md bg-foreground/10`,
                    )}
                  />
                </div>
              </div>

              {/* PLAN */}
              <div
                className={cn(
                  `h-4 w-20 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* INVESTED */}
              <div
                className={cn(
                  `h-4 w-16 animate-pulse rounded-md bg-primary-500/15`,
                )}
              />

              {/* PROFIT */}
              <div
                className={cn(
                  `h-4 w-16 animate-pulse rounded-md bg-accent-500/15`,
                )}
              />

              {/* TOTAL RETURN */}
              <div
                className={cn(
                  `h-4 w-18 animate-pulse rounded-md bg-accent-500/15`,
                )}
              />

              {/* DAILY */}
              <div
                className={cn(
                  `h-4 w-12 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* PROGRESS */}
              <div className={cn(`w-full`)}>
                <div
                  className={cn(
                    `h-2 w-full animate-pulse rounded-full bg-secondary-500/20`,
                  )}
                />

                <div
                  className={cn(
                    `mt-2 ml-auto h-3 w-12 animate-pulse rounded-md bg-foreground/10`,
                  )}
                />
              </div>

              {/* STATUS */}
              <div
                className={cn(
                  `h-6 w-16 animate-pulse rounded-full bg-secondary-500/15`,
                )}
              />

              {/* STARTED */}
              <div
                className={cn(
                  `h-3 w-20 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* ENDS */}
              <div
                className={cn(
                  `ml-auto h-3 w-20 animate-pulse rounded-md bg-foreground/10`,
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MiningSessionsError() {
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
          Unable to load mining sessions
        </p>

      <Button type="button" size={"sm"} variant={'destructive'} className={cn(`mt-6`)}>
        Try again
      </Button>
      </div>
    </div>
  );
}
