import { cn } from "@repo/styles/cn";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  DollarSign,
  ImageIcon,
  Layers,
  TrendingUp,
  UserPlus,
  Users,
  X,
} from "lucide-react";

import {
  cloneElement,
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";

import { createPortal } from "react-dom";

import { Button } from "@repo/ui/button";

import {
  StatCard,
  StatCardData,
  StatCardFooter,
  StatCardHeader,
  StatCardHeadingIcon,
  StatCardHeadingText,
} from "@/components/main/dashboard-groups/admin-dashboard/dashboard/page-ui";

import {
  PendingDepositsTableEmpty,
  PendingDepositsTableError,
  PendingDepositsTableLoading,
  PendingWithdrawalsTableError,
  PendingWithdrawalsTableLoading,
  ThisMonthStatsCardError,
  ThisMonthStatsCardLoading,
  UserGrowthCardError,
  UserGrowthCardLoading,
} from "@/components/main/dashboard-groups/admin-dashboard/dashboard/boundary-comps";

/* -------------------------------------------------------------------------- */
/*                                   DIALOG                                   */
/* -------------------------------------------------------------------------- */

type DashboardDialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DashboardDialogContext =
  createContext<DashboardDialogContextValue | null>(null);

function Dialog({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DashboardDialogContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </DashboardDialogContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                               DIALOG TRIGGER                               */
/* -------------------------------------------------------------------------- */

function DialogTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: ReactElement<{
    onClick?: (
      event: MouseEvent<HTMLElement>,
    ) => void;
  }>;
}) {
  const context =
    useContext(DashboardDialogContext);

  if (!context) {
    return children;
  }

  if (!asChild) {
    return null;
  }

  const originalOnClick =
    children.props.onClick;

  return cloneElement(children, {
    onClick: (event) => {
      originalOnClick?.(event);

      context.setOpen(true);
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                               DIALOG CONTENT                               */
/* -------------------------------------------------------------------------- */

function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const context =
    useContext(DashboardDialogContext);

  const open = context?.open;
  const setOpen = context?.setOpen;

  /* Close using Escape */

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setOpen?.(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, setOpen]);

  /* Lock page scroll when dialog is open */

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm",
      )}
      onMouseDown={(event) => {
        /*
         * Close only when clicking the backdrop.
         * Clicking inside the dialog will not close it.
         */
        if (
          event.target ===
          event.currentTarget
        ) {
          setOpen?.(false);
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full max-h-[90vh] overflow-y-auto",
          className,
        )}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
        {...props}
      >
        {/* Close Button */}

        <button
          type="button"
          aria-label="Close payment proof"
          onClick={() => {
            setOpen?.(false);
          }}
          className={cn(
            "absolute top-4 right-4 z-20 flex size-8 items-center justify-center rounded-md text-foreground/50 transition hover:bg-foreground/10 hover:text-foreground",
          )}
        >
          <X className={cn("size-4")} />
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}

/* -------------------------------------------------------------------------- */
/*                               DIALOG HEADER                                */
/* -------------------------------------------------------------------------- */

function DialogHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn("", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                               ADMIN DASHBOARD                              */
/* -------------------------------------------------------------------------- */

export default function AdminDashboard() {
  return (
    <>
      <AdminStatsSection />

      <AdminOverviewDashboard />

      <PendingTransactionsSection />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                             ADMIN STATS SECTION                            */
/* -------------------------------------------------------------------------- */

export function AdminStatsSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "default-padding @container grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4",
        className,
      )}
      {...props}
    >
      <TotalUsersStat />

      <TotalDepositsStat />

      <PendingDepositsStat />

      <PendingWithdrawalsStat />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               TOTAL USERS                                  */
/* -------------------------------------------------------------------------- */

export function TotalUsersStat({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  // const [state] = useState<"error" | "loading" | "data">("data");
  const [state] =
    useState<
      "error" | "loading" | "data"
    >("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

  return (
    <StatCard
      className={cn(
        "border-t-secondary-500 relative overflow-hidden border-t-4",
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>
          Total Users
        </StatCardHeadingText>

        <StatCardHeadingIcon
          className={cn(
            "text-secondary-500",
          )}
        >
          <Users />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {state === "data" && (
        <>
          <StatCardData
            className={cn(
              "text-foreground",
            )}
          >
            11
          </StatCardData>

          <StatCardFooter>
            Total registered users
          </StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              "font-brand-primary text-2 mt-5 font-bold text-red-500",
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            className={cn("mt-3")}
          >
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
        <div
          className={cn(
            "animate-pulse space-y-4",
          )}
        >
          <div
            className={cn(
              "bg-foreground/10 mt-5 h-8 w-36 rounded-md",
            )}
          />

          <div
            className={cn(
              "bg-foreground/10 mt-2 h-4 w-32 rounded-md",
            )}
          />
        </div>
      )}
    </StatCard>
  );
}

/* -------------------------------------------------------------------------- */
/*                              TOTAL DEPOSITS                                */
/* -------------------------------------------------------------------------- */

export function TotalDepositsStat({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const [state] =
    useState<
      "error" | "loading" | "data"
    >("loading");

  return (
    <StatCard
      className={cn(
        "border-t-accent-500 relative overflow-hidden border-t-4",
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>
          Total Deposits
        </StatCardHeadingText>

        <StatCardHeadingIcon
          className={cn(
            "text-accent-500",
          )}
        >
          <DollarSign />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {state === "data" && (
        <>
          <StatCardData
            className={cn(
              "text-foreground",
            )}
          >
            $0.00
          </StatCardData>

          <StatCardFooter>
            Cumulative deposits
          </StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              "font-brand-primary text-2 mt-5 font-bold text-red-500",
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            className={cn("mt-3")}
          >
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
        <div
          className={cn(
            "animate-pulse space-y-4",
          )}
        >
          <div
            className={cn(
              "bg-foreground/10 mt-5 h-8 w-36 rounded-md",
            )}
          />

          <div
            className={cn(
              "bg-foreground/10 mt-2 h-4 w-32 rounded-md",
            )}
          />
        </div>
      )}
    </StatCard>
  );
}

/* -------------------------------------------------------------------------- */
/*                            PENDING DEPOSITS STAT                           */
/* -------------------------------------------------------------------------- */

export function PendingDepositsStat({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const [state] =
    useState<
      "error" | "loading" | "data"
    >("loading");

  return (
    <StatCard
      className={cn(
        "border-t-primary-500 relative overflow-hidden border-t-4",
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>
          Pending Deposits
        </StatCardHeadingText>

        <StatCardHeadingIcon
          className={cn(
            "text-primary-500",
          )}
        >
          <Clock />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {state === "data" && (
        <>
          <StatCardData
            className={cn(
              "text-foreground",
            )}
          >
            1
          </StatCardData>

          <StatCardFooter>
            Awaiting confirmation
          </StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              "font-brand-primary text-2 mt-5 font-bold text-red-500",
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            className={cn("mt-3")}
          >
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
        <div
          className={cn(
            "animate-pulse space-y-4",
          )}
        >
          <div
            className={cn(
              "bg-foreground/10 mt-5 h-8 w-36 rounded-md",
            )}
          />

          <div
            className={cn(
              "bg-foreground/10 mt-2 h-4 w-32 rounded-md",
            )}
          />
        </div>
      )}
    </StatCard>
  );
}

/* -------------------------------------------------------------------------- */
/*                           PENDING WITHDRAWALS STAT                         */
/* -------------------------------------------------------------------------- */

export function PendingWithdrawalsStat({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const [state] =
    useState<
      "error" | "loading" | "data"
    >("loading");

  return (
    <StatCard
      className={cn(
        "border-t-primary-600 relative overflow-hidden border-t-4",
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>
          Pending Withdrawals
        </StatCardHeadingText>

        <StatCardHeadingIcon
          className={cn(
            "text-primary-600",
          )}
        >
          <ArrowUpRight />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {state === "data" && (
        <>
          <StatCardData
            className={cn(
              "text-foreground",
            )}
          >
            0
          </StatCardData>

          <StatCardFooter>
            Awaiting processing
          </StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              "font-brand-primary text-2 mt-5 font-bold text-red-500",
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            className={cn("mt-3")}
          >
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
        <div
          className={cn(
            "animate-pulse space-y-4",
          )}
        >
          <div
            className={cn(
              "bg-foreground/10 mt-5 h-8 w-36 rounded-md",
            )}
          />

          <div
            className={cn(
              "bg-foreground/10 mt-2 h-4 w-32 rounded-md",
            )}
          />
        </div>
      )}
    </StatCard>
  );
}

/* -------------------------------------------------------------------------- */
/*                         ADMIN OVERVIEW DASHBOARD                           */
/* -------------------------------------------------------------------------- */

export function AdminOverviewDashboard() {
  return (
    <div
      className={cn(
        "default-padding @container grid grid-cols-1 gap-4 py-10 lg:grid-cols-2",
      )}
    >
      <div className={cn("space-y-4")}>
        <div
          className={cn(
            "grid grid-cols-1 gap-4 @xs:grid-cols-2",
          )}
        >
          <TotalMiningInvestedCard />

          <ActiveMiningSessionsCard />
        </div>

        <UserGrowthCard />
      </div>

      <div className={cn("space-y-4")}>
        <ThisMonthStatsCard />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         TOTAL MINING INVESTED CARD                         */
/* -------------------------------------------------------------------------- */

export function TotalMiningInvestedCard({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const [state] =
    useState<
      "error" | "loading" | "data"
    >("loading");

  return (
    <StatCard
      className={cn(
        "border-t-secondary-500 relative overflow-hidden border-t-4",
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>
          Total Mining Invested
        </StatCardHeadingText>

        <StatCardHeadingIcon
          className={cn(
            "text-secondary-500",
          )}
        >
          <Layers />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {state === "data" && (
        <>
          <StatCardData
            className={cn(
              "text-foreground",
            )}
          >
            $5,910.00
          </StatCardData>

          <StatCardFooter>
            Total mining active pool
          </StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              "font-brand-primary text-2 mt-5 font-bold text-red-500",
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            className={cn("mt-3")}
          >
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
        <div
          className={cn(
            "animate-pulse space-y-4",
          )}
        >
          <div
            className={cn(
              "bg-foreground/10 mt-5 h-8 w-36 rounded-md",
            )}
          />

          <div
            className={cn(
              "bg-foreground/10 mt-2 h-4 w-32 rounded-md",
            )}
          />
        </div>
      )}
    </StatCard>
  );
}

/* -------------------------------------------------------------------------- */
/*                        ACTIVE MINING SESSIONS CARD                         */
/* -------------------------------------------------------------------------- */

export function ActiveMiningSessionsCard({
  className,
  ...props
}: ComponentProps<typeof StatCard>) {
  const [state] =
    useState<
      "error" | "loading" | "data"
    >("loading");

  return (
    <StatCard
      className={cn(
        "border-t-secondary-500 relative overflow-hidden border-t-4",
        className,
      )}
      {...props}
    >
      <StatCardHeader>
        <StatCardHeadingText>
          Active Mining Sessions
        </StatCardHeadingText>

        <StatCardHeadingIcon
          className={cn(
            "text-secondary-500",
          )}
        >
          <Layers />
        </StatCardHeadingIcon>
      </StatCardHeader>

      {state === "data" && (
        <>
          <StatCardData
            className={cn(
              "text-foreground",
            )}
          >
            10
          </StatCardData>

          <StatCardFooter>
            Live mining instances
          </StatCardFooter>
        </>
      )}

      {state === "error" && (
        <>
          <p
            className={cn(
              "font-brand-primary text-2 mt-5 font-bold text-red-600",
            )}
          >
            Something went wrong !!!
          </p>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            className={cn("mt-3")}
          >
            Try again
          </Button>
        </>
      )}

      {state === "loading" && (
        <div
          className={cn(
            "animate-pulse space-y-4",
          )}
        >
          <div
            className={cn(
              "bg-foreground/10 mt-5 h-8 w-36 rounded-md",
            )}
          />

          <div
            className={cn(
              "bg-foreground/10 mt-2 h-4 w-32 rounded-md",
            )}
          />
        </div>
      )}
    </StatCard>
  );
}

/* -------------------------------------------------------------------------- */
/*                              USER GROWTH CARD                              */
/* -------------------------------------------------------------------------- */

export function UserGrowthCard({
  className,
  ...props
}: ComponentProps<"section">) {
  const [state] =
    useState<
      "error" | "loading" | "data"
    >("loading");

  const chartDays = [
    {
      date: "Sep 08",
      height: "h-2",
    },
    {
      date: "Sep 09",
      height: "h-2",
    },
    {
      date: "Sep 10",
      height: "h-2",
    },
    {
      date: "Sep 11",
      height: "h-2",
    },
    {
      date: "Sep 12",
      height: "h-2",
    },
    {
      date: "Sep 13",
      height: "h-2",
    },
    {
      date: "Sep 14",
      height: "h-2",
    },
  ];

  return (
    <section
      className={cn(
        "@container",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "bg-secondary-500/5 border-secondary-500/20 rounded-2xl border py-4",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
            )}
          >
            <TrendingUp
              className={cn(
                "text-secondary-500 ml-5 size-4",
              )}
            />

            <h2
              className={cn(
                "font-brand-secondary text-sm font-semibold",
              )}
            >
              User Growth (Last 7 Days)
            </h2>
          </div>
        </div>

        <hr
          className={cn(
            "border-foreground/20 my-5",
          )}
        />

        {state === "error" && (
          <UserGrowthCardError />
        )}

        {state === "loading" && (
          <UserGrowthCardLoading />
        )}

        {state === "data" && (
          <div
            className={cn(
              "flex flex-col justify-end pt-8 pb-2",
            )}
          >
            <div
              className={cn(
                "flex h-40 w-full items-end justify-between gap-2",
              )}
            >
              {chartDays.map(
                (item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex h-full flex-1 flex-col items-center justify-end gap-2",
                    )}
                  >
                    <div
                      className={cn(
                        "bg-secondary-500 w-full rounded-t-sm transition-all",
                        item.height,
                      )}
                    />

                    <span
                      className={cn(
                        "text-foreground/50 text-2.5",
                      )}
                    >
                      {item.date}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           THIS MONTH STATS CARD                            */
/* -------------------------------------------------------------------------- */

export function ThisMonthStatsCard({
  className,
  ...props
}: ComponentProps<"section">) {
  const [state] =
    useState<
      "error" | "loading" | "data"
    >("loading");

  const statsList = [
    {
      id: "monthly-deposits",
      label: "Monthly Deposits",
      value: "$0.00",
      color: "text-green-500",
      icon: (
        <ArrowDownRight
          className={cn(
            "size-5 text-green-500",
          )}
        />
      ),
    },
    {
      id: "monthly-withdrawals",
      label: "Monthly Withdrawals",
      value: "$0.00",
      color: "text-red-500",
      icon: (
        <ArrowUpRight
          className={cn(
            "size-5 text-red-500",
          )}
        />
      ),
    },
    {
      id: "new-users",
      label: "New Users",
      value: "1",
      color: "text-secondary-500",
      icon: (
        <UserPlus
          className={cn(
            "text-secondary-500 size-5",
          )}
        />
      ),
    },
    {
      id: "mining-invested",
      label: "Mining Invested",
      value: "$0.00",
      color: "text-primary-500",
      icon: (
        <Layers
          className={cn(
            "text-primary-500 size-5",
          )}
        />
      ),
    },
  ];

  return (
    <section
      className={cn(
        "@container",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
            )}
          >
            <Calendar
              className={cn(
                "text-secondary-500 size-4",
              )}
            />

            <h2
              className={cn(
                "font-brand-secondary text-sm font-semibold",
              )}
            >
              This Month Stats
            </h2>
          </div>
        </div>

        <hr
          className={cn(
            "border-foreground/20 -mx-6 my-5",
          )}
        />

        {state === "error" && (
          <ThisMonthStatsCardError />
        )}

        {state === "loading" && (
          <ThisMonthStatsCardLoading />
        )}

        {state === "data" && (
          <div
            className={cn(
              "space-y-4",
            )}
          >
            {statsList.map(
              (stat, index) => (
                <Fragment
                  key={stat.id}
                >
                  <div
                    className={cn(
                      "flex w-full items-center justify-between",
                    )}
                  >
                    <div
                      className={cn(
                        "flex flex-col gap-y-1",
                      )}
                    >
                      <span
                        className={cn(
                          "text-foreground/50 text-xs",
                        )}
                      >
                        {stat.label}
                      </span>

                      <span
                        className={cn(
                          "text-lg font-semibold",
                          stat.color,
                        )}
                      >
                        {stat.value}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "bg-foreground/5 border-foreground/10",
                        "flex size-10 items-center justify-center",
                        "rounded-lg border",
                      )}
                    >
                      {stat.icon}
                    </div>
                  </div>

                  {index <
                    statsList.length -
                      1 && (
                    <hr
                      className={cn(
                        "border-foreground/10 -mx-6 my-4",
                      )}
                    />
                  )}
                </Fragment>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                       PENDING TRANSACTIONS SECTION                         */
/* -------------------------------------------------------------------------- */

export function PendingTransactionsSection() {
  return (
    <div
      className={cn(
        "default-padding @container space-y-6 py-10",
      )}
    >
      <PendingDepositsTable />

      <PendingWithdrawalsTable />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          PENDING DEPOSITS TABLE                            */
/* -------------------------------------------------------------------------- */

export function PendingDepositsTable({
  className,
  ...props
}: ComponentProps<"section">) {
  const [state] =
    useState<
      "error" | "loading" | "empty" | "data"
    >("data");

  const pendingDeposits = [
    {
      id: "dep-1",

      user: {
        name: "Surajit Sarder",
        email:
          "surajitsarder2000@gmail.com",
        initial: "S",
      },

      amount: "$1,000.00",

      method: "Bsc_bep20",

      proof:
        "https://images.pexels.com/photos/4162016/pexels-photo-4162016.jpeg",

      date: "Aug 31, 2026 21:45",

      status: "Pending",
    },
  ];

  return (
    <section
      className={cn(
        "@container",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4",
        )}
      >
        {/* Header */}

        <div
          className={cn(
            "flex w-full items-center justify-between",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
            )}
          >
            <ArrowDownLeft
              className={cn(
                "text-primary-500 size-4",
              )}
            />

            <h2
              className={cn(
                "font-brand-secondary text-sm font-semibold",
              )}
            >
              Pending Deposits
            </h2>
          </div>
        </div>

        <hr
          className={cn(
            "border-foreground/20 -mx-6 my-4",
          )}
        />

        {state === "error" && (
          <PendingDepositsTableError />
        )}

        {state === "loading" && (
          <PendingDepositsTableLoading />
        )}

        {state === "empty" && (
          <PendingDepositsTableEmpty />
        )}

        {state === "data" && (
          <>
            {pendingDeposits.length ===
            0 ? (
              <PendingDepositsTableEmpty />
            ) : (
              <div
                className={cn(
                  "overflow-x-auto",
                )}
              >
                <table
                  className={cn(
                    "w-full border-collapse text-left",
                  )}
                >
                  <thead>
                    <tr
                      className={cn(
                        "text-foreground/50 text-2.75 tracking-wider uppercase",
                      )}
                    >
                      <th
                        className={cn(
                          "py-3 font-medium",
                        )}
                      >
                        User
                      </th>

                      <th
                        className={cn(
                          "py-3 font-medium",
                        )}
                      >
                        Amount
                      </th>

                      <th
                        className={cn(
                          "py-3 font-medium",
                        )}
                      >
                        Method
                      </th>

                      <th
                        className={cn(
                          "py-3 font-medium",
                        )}
                      >
                        Proof
                      </th>

                      <th
                        className={cn(
                          "py-3 font-medium",
                        )}
                      >
                        Date
                      </th>

                      <th
                        className={cn(
                          "py-3 font-medium",
                        )}
                      >
                        Status
                      </th>

                      <th
                        className={cn(
                          "py-3 text-right font-medium",
                        )}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody
                    className={cn(
                      "divide-foreground/10 divide-y text-sm",
                    )}
                  >
                    {pendingDeposits.map(
                      (item) => (
                        <tr
                          key={item.id}
                          className={cn(
                            "group",
                          )}
                        >
                          {/* User */}

                          <td
                            className={cn(
                              "py-4 pr-4",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center gap-3",
                              )}
                            >
                              <div
                                className={cn(
                                  "bg-secondary-500 text-secondary-50 flex size-10 shrink-0 items-center justify-center rounded-full font-semibold",
                                )}
                              >
                                {
                                  item
                                    .user
                                    .initial
                                }
                              </div>

                              <div
                                className={cn(
                                  "flex flex-col",
                                )}
                              >
                                <span
                                  className={cn(
                                    "font-medium",
                                  )}
                                >
                                  {
                                    item
                                      .user
                                      .name
                                  }
                                </span>

                                <span
                                  className={cn(
                                    "text-foreground/50 text-xs",
                                  )}
                                >
                                  {
                                    item
                                      .user
                                      .email
                                  }
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Amount */}

                          <td
                            className={cn(
                              "py-4 pr-4 font-semibold text-green-500",
                            )}
                          >
                            {
                              item.amount
                            }
                          </td>

                          {/* Method */}

                          <td
                            className={cn(
                              "text-foreground/80 py-4 pr-4",
                            )}
                          >
                            {
                              item.method
                            }
                          </td>

                          {/* Proof */}

                          <td
                            className={cn(
                              "py-4 pr-4",
                            )}
                          >
                            <Dialog>
                              <DialogTrigger
                                asChild
                              >
                                <button
                                  type="button"
                                  className={cn(
                                    "border-foreground/20 bg-foreground/5 text-foreground hover:bg-foreground/10 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition",
                                  )}
                                >
                                  <ImageIcon
                                    className={cn(
                                      "size-3.5",
                                    )}
                                  />

                                  View
                                </button>
                              </DialogTrigger>

                              <DialogContent
                                className={cn(
                                  "max-w-3xl border-secondary-500/20 bg-background overflow-hidden rounded-2xl border shadow-2xl",
                                )}
                              >
                                {/* Header */}

                                <DialogHeader
                                  className={cn(
                                    "border-foreground/10 border-b px-6 py-5 pr-14",
                                  )}
                                >
                                  <DialogTitle
                                    className={cn(
                                      "font-brand-secondary text-base font-semibold",
                                    )}
                                  >
                                    Payment
                                    Proof
                                  </DialogTitle>

                                  <DialogDescription
                                    className={cn(
                                      "text-foreground/50 mt-1 text-xs",
                                    )}
                                  >
                                    Payment
                                    screenshot
                                    uploaded
                                    by{" "}
                                    <span
                                      className={cn(
                                        "text-foreground font-medium",
                                      )}
                                    >
                                      {
                                        item
                                          .user
                                          .name
                                      }
                                    </span>
                                  </DialogDescription>
                                </DialogHeader>

                                {/* Screenshot */}

                                <div
                                  className={cn(
                                    "p-6",
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "border-foreground/10 bg-foreground/5 flex min-h-64 items-center justify-center overflow-hidden rounded-xl border",
                                    )}
                                  >
                                    {item.proof ? (
                                      <img
                                        src={
                                          item.proof
                                        }
                                        alt={`Payment proof uploaded by ${item.user.name}`}
                                        className={cn(
                                          "max-h-[65vh] w-full object-contain",
                                        )}
                                      />
                                    ) : (
                                      <div
                                        className={cn(
                                          "text-foreground/40 flex min-h-64 flex-col items-center justify-center",
                                        )}
                                      >
                                        <ImageIcon
                                          className={cn(
                                            "size-10",
                                          )}
                                        />

                                        <p
                                          className={cn(
                                            "mt-2 text-xs",
                                          )}
                                        >
                                          No
                                          payment
                                          proof
                                          available
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Email + Date */}

                                  <div
                                    className={cn(
                                      "text-foreground/40 mt-3 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between",
                                    )}
                                  >
                                    <span>
                                      {
                                        item
                                          .user
                                          .email
                                      }
                                    </span>

                                    <span>
                                      {
                                        item.date
                                      }
                                    </span>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>

                          {/* Date */}

                          <td
                            className={cn(
                              "text-foreground/60 py-4 pr-4 text-xs",
                            )}
                          >
                            {
                              item.date
                            }
                          </td>

                          {/* Status */}

                          <td
                            className={cn(
                              "py-4 pr-4",
                            )}
                          >
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500",
                              )}
                            >
                              {
                                item.status
                              }
                            </span>
                          </td>

                          {/* Actions */}

                          <td
                            className={cn(
                              "py-4 text-right",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-end gap-2",
                              )}
                            >
                              <Button
                                size="xs"
                                variant="success"
                              >
                                <Check
                                  className={cn(
                                    "size-3.5",
                                  )}
                                />

                                Approve
                              </Button>

                              <Button
                                size="xs"
                                variant="destructive"
                              >
                                <X
                                  className={cn(
                                    "size-3.5",
                                  )}
                                />

                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                        PENDING WITHDRAWALS TABLE                           */
/* -------------------------------------------------------------------------- */

export function PendingWithdrawalsTable({
  className,
  ...props
}: ComponentProps<"section">) {
  const [state] =
    useState<
      "error" | "loading" | "empty" | "data"
    >("data");

  const pendingWithdrawls = [
    {
      id: "dep-1",

      user: {
        name: "Surajit Sarder",
        email:
          "surajitsarder2000@gmail.com",
        initial: "S",
      },

      amount: "$1,000.00",

      method: "Bsc_bep20",

      date: "Aug 31, 2026 21:45",

      status: "Pending",
    },
  ];

  return (
    <section
      className={cn(
        "@container",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
            )}
          >
            <ArrowUpRight
              className={cn(
                "text-primary-600 size-4",
              )}
            />

            <h2
              className={cn(
                "font-brand-secondary text-sm font-semibold",
              )}
            >
              Pending Withdrawals
            </h2>
          </div>
        </div>

        <hr
          className={cn(
            "border-foreground/20 -mx-6 my-4",
          )}
        />

        {state === "error" && (
          <PendingWithdrawalsTableError />
        )}

        {state === "loading" && (
          <PendingWithdrawalsTableLoading />
        )}

        {state === "data" && (
          <>
            {pendingWithdrawls.length ===
            0 ? (
              <div
                className={cn(
                  "flex flex-col items-center justify-center py-12 text-center",
                )}
              >
                <div
                  className={cn(
                    "mb-3 flex size-12 items-center justify-center rounded-full border border-green-500/40 bg-green-500/20 text-green-500",
                  )}
                >
                  <Check
                    className={cn(
                      "size-6",
                    )}
                  />
                </div>

                <p
                  className={cn(
                    "text-foreground/60 text-sm",
                  )}
                >
                  No pending withdrawals
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  "overflow-x-auto",
                )}
              >
                <table
                  className={cn(
                    "w-full border-collapse text-left",
                  )}
                >
                  <thead>
                    <tr
                      className={cn(
                        "text-foreground/50 text-2.75 tracking-wider uppercase",
                      )}
                    >
                      <th className="py-3 font-medium">
                        User
                      </th>

                      <th className="py-3 font-medium">
                        Amount
                      </th>

                      <th className="py-3 font-medium">
                        Method
                      </th>

                      <th className="py-3 font-medium">
                        Date
                      </th>

                      <th className="py-3 font-medium">
                        Status
                      </th>

                      <th className="py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody
                    className={cn(
                      "divide-foreground/10 divide-y text-sm",
                    )}
                  >
                    {pendingWithdrawls.map(
                      (item) => (
                        <tr
                          key={item.id}
                        >
                          <td
                            className={cn(
                              "py-4 pr-4",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center gap-3",
                              )}
                            >
                              <div
                                className={cn(
                                  "bg-secondary-500 text-secondary-50 flex size-10 shrink-0 items-center justify-center rounded-full font-semibold",
                                )}
                              >
                                {
                                  item
                                    .user
                                    .initial
                                }
                              </div>

                              <div
                                className={cn(
                                  "flex flex-col",
                                )}
                              >
                                <span
                                  className={cn(
                                    "font-medium",
                                  )}
                                >
                                  {
                                    item
                                      .user
                                      .name
                                  }
                                </span>

                                <span
                                  className={cn(
                                    "text-foreground/50 text-xs",
                                  )}
                                >
                                  {
                                    item
                                      .user
                                      .email
                                  }
                                </span>
                              </div>
                            </div>
                          </td>

                          <td
                            className={cn(
                              "py-4 pr-4 font-semibold text-red-500",
                            )}
                          >
                            {
                              item.amount
                            }
                          </td>

                          <td
                            className={cn(
                              "text-foreground/80 py-4 pr-4",
                            )}
                          >
                            {
                              item.method
                            }
                          </td>

                          <td
                            className={cn(
                              "text-foreground/60 py-4 pr-4 text-xs",
                            )}
                          >
                            {
                              item.date
                            }
                          </td>

                          <td
                            className={cn(
                              "py-4 pr-4",
                            )}
                          >
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500",
                              )}
                            >
                              {
                                item.status
                              }
                            </span>
                          </td>

                          <td
                            className={cn(
                              "py-4 text-right",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-end gap-2",
                              )}
                            >
                              <Button
                                size="xs"
                                variant="success"
                              >
                                <Check
                                  className={cn(
                                    "size-3.5",
                                  )}
                                />

                                Approve
                              </Button>

                              <Button
                                size="xs"
                                variant="destructive"
                              >
                                <X
                                  className={cn(
                                    "size-3.5",
                                  )}
                                />

                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}