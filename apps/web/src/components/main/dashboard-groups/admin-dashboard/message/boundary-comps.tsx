import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";

export function ConversationsLoading() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      {/* TABLE */}
      <div className={cn(`w-full overflow-x-auto`)}>
        <div className={cn(`min-w-250 px-5`)}>
          {/* TABLE HEADER */}
          <div
            className={cn(
              `grid grid-cols-[2fr_0.9fr_2fr_1fr_0.6fr] items-center gap-6 py-5`,
            )}
          >
            <div
              className={cn(`bg-foreground/10 h-3 w-12 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-16 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-24 animate-pulse rounded`)}
            />

            <div
              className={cn(`bg-foreground/10 h-3 w-16 animate-pulse rounded`)}
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
                `border-secondary-200/15 grid grid-cols-[2fr_0.9fr_2fr_1fr_0.6fr] items-center gap-6 border-t py-4`,
              )}
            >
              {/* USER */}
              <div className={cn(`min-w-0`)}>
                <div
                  className={cn(
                    `bg-foreground/10 h-4 w-32 animate-pulse rounded-md`,
                  )}
                />

                <div
                  className={cn(
                    `bg-foreground/10 mt-2 h-3 w-44 animate-pulse rounded-md`,
                  )}
                />
              </div>

              {/* TRADER ID */}
              <div
                className={cn(
                  `bg-foreground/10 h-3 w-22 animate-pulse rounded-md`,
                )}
              />

              {/* LAST MESSAGE */}
              <div
                className={cn(
                  `bg-foreground/10 h-3 w-40 animate-pulse rounded-md`,
                )}
              />

              {/* UPDATED */}
              <div
                className={cn(
                  `bg-foreground/10 h-3 w-20 animate-pulse rounded-md`,
                )}
              />

              {/* ACTION */}
              <div
                className={cn(
                  `bg-secondary-500/20 ml-auto h-8 w-16 animate-pulse rounded-xl`,
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConversationsError() {
  return (
    <div>
      {/* ERROR AREA */}
      <div
        className={cn(
          `flex min-h-80 w-full flex-col items-center justify-center px-6 py-10 text-center`,
        )}
      >
        <p className={cn(`font-brand-primary text-2 font-bold text-red-600`)}>
          Something went wrong !!!
        </p>

        <p className={cn(`font-brand-primary text-foreground/50 mt-2 text-sm`)}>
          Unable to load conversations
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
