import { cn } from "@repo/styles/cn";
import { CircleDollarSign, Clock3, TrendingUp, Users } from "lucide-react";

export function TotalUsersLoading() {
  return (
    <>
      {/* TOTAL USERS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(`bg-secondary-500 absolute top-0 left-0 h-0.5 w-full`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`bg-secondary-500/15 size-12 rounded-xl`)} />

          <div className={cn(`bg-foreground/10 mt-6 h-8 w-14 rounded-md`)} />

          <div className={cn(`bg-foreground/10 mt-2 h-4 w-24 rounded-md`)} />
        </div>
      </div>

      {/* TOTAL DEPOSITS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(`bg-accent-500 absolute top-0 left-0 h-0.5 w-full`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`bg-accent-500/15 size-12 rounded-xl`)} />

          <div className={cn(`bg-foreground/10 mt-6 h-8 w-24 rounded-md`)} />

          <div className={cn(`bg-foreground/10 mt-2 h-4 w-28 rounded-md`)} />
        </div>
      </div>

      {/* PENDING DEPOSITS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(`bg-primary-400 absolute top-0 left-0 h-0.5 w-full`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`bg-primary-500/15 size-12 rounded-xl`)} />

          <div className={cn(`bg-foreground/10 mt-6 h-8 w-10 rounded-md`)} />

          <div className={cn(`bg-foreground/10 mt-2 h-4 w-30 rounded-md`)} />
        </div>
      </div>

      {/* PENDING WITHDRAWALS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(`bg-primary-600 absolute top-0 left-0 h-0.5 w-full`)}
        />

        <div className={cn(`animate-pulse`)}>
          <div className={cn(`bg-primary-600/15 size-12 rounded-xl`)} />

          <div className={cn(`bg-foreground/10 mt-6 h-8 w-10 rounded-md`)} />

          <div className={cn(`bg-foreground/10 mt-2 h-4 w-34 rounded-md`)} />
        </div>
      </div>
    </>
  );
}

export function TotalUsersError() {
  return (
    <>
      {/* TOTAL USERS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(
            `bg-secondary-500 absolute top-0 left-0 h-0.5 w-full`,
          )}
        />

        <div
          className={cn(
            `bg-secondary-500/15 flex size-12 items-center justify-center rounded-xl`,
          )}
        >
          <Users className={cn(`size-6 text-secondary-500`)} />
        </div>

        <p
          className={cn(
            `mt-5 font-brand-primary text-2 font-bold text-foreground/40 text-red-600`,
          )}
        >
          Something went wrong !!!
        </p>

        <p
          className={cn(
            `mt-1 font-brand-primary text-sm text-foreground/60`,
          )}
        >
          Total Users
        </p>
      </div>

      {/* TOTAL DEPOSITS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(
            `bg-accent-500 absolute top-0 left-0 h-0.5 w-full`,
          )}
        />

        <div
          className={cn(
            `bg-accent-500/15 flex size-12 items-center justify-center rounded-xl`,
          )}
        >
          <CircleDollarSign className={cn(`size-6 text-accent-500`)} />
        </div>

        <p
          className={cn(
            `mt-5 font-brand-primary text-2 font-bold text-red-600`,
          )}
        >
          Something went wrong !!!
        </p>

        <p
          className={cn(
            `mt-1 font-brand-primary text-sm text-foreground/60`,
          )}
        >
          Total Deposits
        </p>
      </div>

      {/* PENDING DEPOSITS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(
            `bg-primary-400 absolute top-0 left-0 h-0.5 w-full`,
          )}
        />

        <div
          className={cn(
            `bg-primary-500/15 flex size-12 items-center justify-center rounded-xl`,
          )}
        >
          <Clock3 className={cn(`size-6 text-primary-400`)} />
        </div>

        <p
          className={cn(
            `mt-5 font-brand-primary text-2 font-bold text-red-600`,
          )}
        >
          Something went wrong !!!
        </p>

        <p
          className={cn(
            `mt-1 font-brand-primary text-sm text-foreground/60`,
          )}
        >
          Pending Deposits
        </p>
      </div>

      {/* PENDING WITHDRAWALS */}
      <div
        className={cn(
          `border-secondary-200/30 bg-secondary-50/20 relative min-h-43 overflow-hidden rounded-2xl border p-6`,
        )}
      >
        <div
          className={cn(
            `bg-primary-600 absolute top-0 left-0 h-0.5 w-full`,
          )}
        />

        <div
          className={cn(
            `bg-primary-600/15 flex size-12 items-center justify-center rounded-xl`,
          )}
        >
          <TrendingUp className={cn(`size-6 text-primary-600`)} />
        </div>

        <p
          className={cn(
            `mt-5 font-brand-primary text-2 font-bold text-red-600`,
          )}
        >
          Something went wrong !!!
        </p>

        <p
          className={cn(
            `mt-1 font-brand-primary text-sm text-foreground/60`,
          )}
        >
          Pending Withdrawals
        </p>
      </div>
    </>
  );
}

export function TotalMiningInvestedCardLoading() {
  return (
    <div
      className={cn(
        `relative min-h-43 w-full overflow-hidden rounded-2xl border p-6`,
        `border-secondary-200/30 bg-secondary-50/20`,
      )}
    >
      {/* TOP LINE */}
      <div
        className={cn(
          `absolute top-0 left-0 h-0.5 w-full`,
          `bg-secondary-500`,
        )}
      />

      {/* LOADING */}
      <div className={cn(`animate-pulse`)}>
        {/* ICON */}
        <div
          className={cn(
            `size-12 rounded-xl`,
            `bg-secondary-500/15`,
          )}
        />

        {/* AMOUNT */}
        <div
          className={cn(
            `mt-5 h-8 w-36 rounded-md`,
            `bg-foreground/10`,
          )}
        />

        {/* LABEL */}
        <div
          className={cn(
            `mt-2 h-4 w-32 rounded-md`,
            `bg-foreground/10`,
          )}
        />
      </div>
    </div>
  );
}

export function TotalMiningInvestedCardError() {
  return (
    <div
      className={cn(
        `relative min-h-43 w-full overflow-hidden rounded-2xl border p-6`,
        `border-secondary-200/30 bg-secondary-50/20`,
      )}
    >
      {/* TOP LINE */}
      <div
        className={cn(
          `absolute top-0 left-0 h-0.5 w-full`,
          `bg-secondary-500`,
        )}
      />

      {/* ICON */}
      <div
        className={cn(
          `flex size-12 items-center justify-center rounded-xl`,
          `bg-secondary-500/15`,
        )}
      >
        <span
          className={cn(
            `font-brand-primary text-lg font-bold`,
            `text-secondary-500`,
          )}
        >
          !
        </span>
      </div>

      {/* ERROR VALUE */}
      <p
        className={cn(
          `mt-5 font-brand-primary text-2 font-bold`,
          `text-red-600`,
        )}
      >
        Something went wrong !!!
      </p>

      {/* LABEL */}
      <p
        className={cn(
          `mt-1 font-brand-primary text-sm`,
          `text-foreground/60`,
        )}
      >
        Total Mining Invested
      </p>
    </div>
  );
}

export function ActiveMiningSessionsCardLoading() {
  return (
    <div
      className={cn(
        `relative min-h-43 w-full overflow-hidden rounded-2xl border p-6`,
        `border-secondary-200/30 bg-secondary-50/20`,
      )}
    >
      {/* TOP LINE */}
      <div
        className={cn(
          `absolute top-0 left-0 h-0.5 w-full`,
          `bg-accent-500`,
        )}
      />

      <div className={cn(`animate-pulse`)}>
        {/* ICON */}
        <div
          className={cn(
            `size-12 rounded-xl`,
            `bg-accent-500/15`,
          )}
        />

        {/* VALUE */}
        <div
          className={cn(
            `mt-5 h-8 w-10 rounded-md`,
            `bg-foreground/10`,
          )}
        />

        {/* LABEL */}
        <div
          className={cn(
            `mt-2 h-4 w-40 rounded-md`,
            `bg-foreground/10`,
          )}
        />
      </div>
    </div>
  );
}

export function ActiveMiningSessionsCardError() {
  return (
    <div
      className={cn(
        `relative min-h-43 w-full overflow-hidden rounded-2xl border p-6`,
        `border-secondary-200/30 bg-secondary-50/20`,
      )}
    >
      {/* TOP LINE */}
      <div
        className={cn(
          `absolute top-0 left-0 h-0.5 w-full`,
          `bg-accent-500`,
        )}
      />

      {/* ICON */}
      <div
        className={cn(
          `flex size-12 items-center justify-center rounded-xl`,
          `bg-accent-500/15`,
        )}
      >
        <span
          className={cn(
            `font-brand-primary text-lg font-bold`,
            `text-accent-500`,
          )}
        >
          !
        </span>
      </div>

      {/* ERROR VALUE */}
      <p
        className={cn(
          `mt-5 font-brand-primary text-2 font-bold`,
          `text-red-600`,
        )}
      >
        Something went wrong !!!
      </p>

      {/* LABEL */}
      <p
        className={cn(
          `mt-1 font-brand-primary text-sm`,
          `text-foreground/60`,
        )}
      >
        Active Mining Sessions
      </p>
    </div>
  );
}

export function UserGrowthCardLoading() {
  return <>UserGrowthCardLoading</>;
}

export function UserGrowthCardError() {
  return <>UserGrowthCardError</>;
}

export function ThisMonthStatsCardLoading() {
  return <>ThisMonthStatsCardLoading</>;
}

export function ThisMonthStatsCardError() {
  return <>ThisMonthStatsCardError</>;
}

export function PendingDepositsTableLoading() {
  return <>PendingDepositsTableLoading</>;
}

export function PendingDepositsTableError() {
  return <>PendingDepositsTableError</>;
}

export function PendingWithdrawalsTableLoading() {
  return <>PendingWithdrawalsTableLoading</>;
}

export function PendingWithdrawalsTableError() {
  return <>PendingWithdrawalsTableError</>;
}
