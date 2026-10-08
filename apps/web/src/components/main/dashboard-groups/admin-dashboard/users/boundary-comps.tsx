import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";

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
            <div
              className={cn(`bg-foreground/10 h-3 w-12 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-14 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-24 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-24 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-20 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-20 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-14 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-14 animate-pulse rounded`)}
            />

            <div
              className={cn(
                `bg-foreground/10 ml-auto h-3 w-16 animate-pulse rounded`,
              )}
            />
          </div>

          {/* ROWS */}
          {rows.map((row) => (
            <div
              key={row}
              className={cn(
                `border-secondary-200/15 grid grid-cols-[2fr_1.8fr_0.9fr_1fr_1fr_0.7fr_0.9fr_0.8fr_0.8fr] items-center gap-6 border-t py-4`,
              )}
            >
              {/* USER */}
              <div className={cn(`flex min-w-0 items-center gap-3`)}>
                <div
                  className={cn(
                    `bg-secondary-500/20 size-10 shrink-0 animate-pulse rounded-full`,
                  )}
                />

                <div
                  className={cn(
                    `bg-foreground/10 h-4 w-28 animate-pulse rounded-md`,
                  )}
                />
              </div>

              {/* EMAIL */}
              <div
                className={cn(
                  `bg-foreground/10 h-3 w-40 animate-pulse rounded-md`,
                )}
              />

              {/* REFERRAL CODE */}
              <div
                className={cn(
                  `bg-foreground/10 h-6 w-18 animate-pulse rounded-md`,
                )}
              />

              {/* MINING INVESTED */}
              <div
                className={cn(
                  `bg-primary-500/15 h-4 w-18 animate-pulse rounded-md`,
                )}
              />

              {/* MINING PROFIT */}
              <div
                className={cn(
                  `bg-accent-500/15 h-4 w-18 animate-pulse rounded-md`,
                )}
              />

              {/* TRANSACTIONS */}
              <div
                className={cn(
                  `bg-foreground/10 h-4 w-8 animate-pulse rounded-md`,
                )}
              />

              {/* JOINED */}
              <div
                className={cn(
                  `bg-foreground/10 h-3 w-20 animate-pulse rounded-md`,
                )}
              />

              {/* STATUS */}
              <div
                className={cn(
                  `bg-accent-500/15 h-4 w-14 animate-pulse rounded-md`,
                )}
              />

              {/* ACTIONS */}
              <div className={cn(`ml-auto flex items-center gap-2`)}>
                <div
                  className={cn(
                    `bg-secondary-500/20 size-7 animate-pulse rounded-lg`,
                  )}
                />

                <div
                  className={cn(
                    `bg-accent-500/20 size-7 animate-pulse rounded-lg`,
                  )}
                />

                <div
                  className={cn(
                    `bg-primary-500/20 size-7 animate-pulse rounded-lg`,
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
        <p className={cn(`font-brand-primary text-2 font-bold text-red-600`)}>
          Something went wrong !!!
        </p>

        <p className={cn(`font-brand-primary text-foreground/50 mt-2 text-sm`)}>
          Unable to load users
        </p>

        <Button
          type="button"
          size={"sm"}
          variant={"destructive"}
          className={cn(`mt-6`)}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
