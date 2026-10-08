import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function DashboardStatsLoading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4`,
        className,
      )}
      {...props}
    >
      {/* TOTAL USERS */}
      <div
        className={cn(
          `relative min-h-43 overflow-hidden rounded-2xl border border-secondary-200/30 bg-secondary-50/20 p-6`,
        )}
      >
        <div
          className={cn(
            `absolute top-0 left-0 h-0.5 w-fulld bg-secondary-500`,
          )}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`size-12 rounded-xl`, `bg-secondary-500/15`)} />

          <div className={cn(`mt-6 h-8 w-14 rounded-md`, `bg-foreground/10`)} />

          <div className={cn(`mt-2 h-4 w-24 rounded-md`, `bg-foreground/10`)} />
        </div>
      </div>

      {/* TOTAL DEPOSITS */}
      <div
        className={cn(
          `relative min-h-43 overflow-hidden rounded-2xl border border-secondary-200/30 bg-secondary-50/20 p-6`,
        )}
      >
        <div
          className={cn(`absolute top-0 left-0 h-0.5 w-full`, `bg-accent-500`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`size-12 rounded-xl`, `bg-accent-500/15`)} />

          <div className={cn(`mt-6 h-8 w-24 rounded-md`, `bg-foreground/10`)} />

          <div className={cn(`mt-2 h-4 w-28 rounded-md`, `bg-foreground/10`)} />
        </div>
      </div>

      {/* PENDING DEPOSITS */}
      <div
        className={cn(
          `relative min-h-43 overflow-hidden rounded-2xl border border-secondary-200/30 bg-secondary-50/20 p-6`,
        )}
      >
        <div
          className={cn(`absolute top-0 left-0 h-0.5 w-full`, `bg-primary-400`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`size-12 rounded-xl`, `bg-primary-500/15`)} />

          <div className={cn(`mt-6 h-8 w-10 rounded-md`, `bg-foreground/10`)} />

          <div className={cn(`mt-2 h-4 w-30 rounded-md`, `bg-foreground/10`)} />
        </div>
      </div>

      {/* PENDING WITHDRAWALS */}
      <div
        className={cn(
          `relative min-h-43 overflow-hidden rounded-2xl border border-secondary-200/30 bg-secondary-50/20 p-6`,
        )}
      >
        <div
          className={cn(`absolute top-0 left-0 h-0.5 w-full`, `bg-primary-600`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`size-12 rounded-xl`, `bg-primary-600/15`)} />

          <div className={cn(`mt-6 h-8 w-10 rounded-md`, `bg-foreground/10`)} />

          <div className={cn(`mt-2 h-4 w-34 rounded-md`, `bg-foreground/10`)} />
        </div>
      </div>   
    </section>
  );
}
export function MiningStatsLoading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `relative min-h-43 w-full overflow-hidden rounded-2xl border border-secondary-200/30 bg-secondary-50/20 p-6`,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          `absolute top-0 left-0 h-0.5 w-full bg-secondary-500`,
        )}
      />

      <div className={cn(`animate-pulse`)}>
        <div
          className={cn(
            `size-12 rounded-xld bg-secondary-500/15`,
          )}
        />

        <div
          className={cn(
            `mt-6 h-8 w-40 rounded-mdd bg-foreground/10`,
          )}
        />

        <div
          className={cn(
            `mt-2 h-4 w-32 rounded-mdd bg-foreground/10`,
          )}
        />
      </div>
    </section>
  );
}