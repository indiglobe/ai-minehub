import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";

export function AllDepositsLoading() {
  return (
    <div>
      {/* TABLE */}
      <div className={cn(`w-full overflow-x-auto`)}>
        <div className={cn(`min-w-300`)}>
          {/* TABLE HEADER */}
          <div
            className={cn(
              `grid grid-cols-[2.4fr_0.8fr_0.7fr_0.8fr_1.8fr_1.3fr_0.8fr_1.2fr_0.7fr] items-center gap-5 px-7 py-5`,
            )}
          >
            <div
              className={cn(`bg-foreground/10 h-4 w-12 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-4 w-16 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-4 w-14 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-4 w-16 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-4 w-28 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-4 w-24 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-4 w-14 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-4 w-12 animate-pulse rounded`)}
            />

            <div
              className={cn(
                `bg-foreground/10 ml-auto h-4 w-16 animate-pulse rounded`,
              )}
            />
          </div>

          {/* TABLE ROW */}
          <div
            className={cn(
              `grid grid-cols-[2.4fr_0.8fr_0.7fr_0.8fr_1.8fr_1.3fr_0.8fr_1.2fr_0.7fr] items-center gap-5 px-7 pt-3 pb-8`,
            )}
          >
            {/* USER */}
            <div className={cn(`flex items-center gap-4`)}>
              <div
                className={cn(
                  `bg-accent-500/20 size-12 shrink-0 animate-pulse rounded-full`,
                )}
              />

              <div>
                <div
                  className={cn(
                    `bg-foreground/10 h-4 w-28 animate-pulse rounded-md`,
                  )}
                />

                <div
                  className={cn(
                    `bg-foreground/10 mt-2 h-3 w-44 animate-pulse rounded-md`,
                  )}
                />
              </div>
            </div>

            {/* AMOUNT */}
            <div
              className={cn(
                `bg-accent-500/15 h-5 w-20 animate-pulse rounded-md`,
              )}
            />

            {/* WALLET */}
            <div
              className={cn(
                `bg-secondary-500/15 h-7 w-18 animate-pulse rounded-lg`,
              )}
            />

            {/* METHOD */}
            <div
              className={cn(
                `bg-foreground/10 h-4 w-20 animate-pulse rounded-md`,
              )}
            />

            {/* TRANSACTION ID */}
            <div
              className={cn(
                `bg-foreground/10 h-4 w-36 animate-pulse rounded-md`,
              )}
            />

            {/* DESCRIPTION */}
            <div
              className={cn(
                `bg-foreground/10 h-4 w-28 animate-pulse rounded-md`,
              )}
            />

            {/* STATUS */}
            <div
              className={cn(
                `bg-primary-500/15 h-7 w-20 animate-pulse rounded-full`,
              )}
            />

            {/* DATE */}
            <div
              className={cn(
                `bg-foreground/10 h-4 w-28 animate-pulse rounded-md`,
              )}
            />

            {/* ACTIONS */}
            <div className={cn(`ml-auto flex items-center gap-2`)}>
              <div
                className={cn(
                  `bg-accent-500/15 size-9 animate-pulse rounded-xl`,
                )}
              />

              <div
                className={cn(
                  `bg-primary-500/15 size-9 animate-pulse rounded-xl`,
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AllDepositsError() {
  return (
    <div>
      {/* ERROR AREA */}
      <div
        className={cn(
          `flex min-h-48 w-full flex-col items-center justify-center px-6 py-10 text-center`,
        )}
      >
        <p className={cn(`font-brand-primary text-2 font-bold text-red-600`)}>
          Something went wrong !!!
        </p>

        <p className={cn(`font-brand-primary text-foreground/50 mt-2 text-sm`)}>
          Unable to load deposits
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
