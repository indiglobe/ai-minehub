import { cn } from "@repo/styles/cn";

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
              className={cn(
                `h-3 w-12 animate-pulse rounded bg-foreground/10`,
              )}
            />

            <div
              className={cn(
                `h-3 w-16 animate-pulse rounded bg-foreground/10`,
              )}
            />

            <div
              className={cn(
                `h-3 w-24 animate-pulse rounded bg-foreground/10`,
              )}
            />

            <div
              className={cn(
                `h-3 w-16 animate-pulse rounded bg-foreground/10`,
              )}
            />

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
                `grid grid-cols-[2fr_0.9fr_2fr_1fr_0.6fr] items-center gap-6 border-t py-4 border-secondary-200/15`,
              )}
            >
              {/* USER */}
              <div className={cn(`min-w-0`)}>
                <div
                  className={cn(
                    `h-4 w-32 animate-pulse rounded-md bg-foreground/10`,
                  )}
                />

                <div
                  className={cn(
                    `mt-2 h-3 w-44 animate-pulse rounded-md bg-foreground/10`,
                  )}
                />
              </div>

              {/* TRADER ID */}
              <div
                className={cn(
                  `h-3 w-22 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* LAST MESSAGE */}
              <div
                className={cn(
                  `h-3 w-40 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* UPDATED */}
              <div
                className={cn(
                  `h-3 w-20 animate-pulse rounded-md bg-foreground/10`,
                )}
              />

              {/* ACTION */}
              <div
                className={cn(
                  `ml-auto h-8 w-16 animate-pulse rounded-xl bg-secondary-500/20`,
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
          Unable to load conversations
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
