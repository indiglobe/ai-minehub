import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { ArrowUpRight, Search, ChevronDown } from "lucide-react";
import { Button } from "@repo/ui/button";
import { AllWithdrawalsError, AllWithdrawalsLoading } from "./boundary-comps";

export function AllWithdrawals({
  className,
  ...props
}: ComponentProps<"section">) {
  const withdrawals = [
    {
      id: "w-1",
      user: {
        name: "Shanu Mridha",
        email: "mridhashanu240420...",
        initial: "S",
        bg: "bg-secondary-500",
      },
      amount: "$12.00",
      wallet: "Mining",
      walletAddress: "Dhhavnnkjiioyhjijnnnn",
      transactionId: "N/A",
      description: "Withdrawal from ...",
      status: "Completed",
      date: "Jun 01, 202...",
    },
  ];

  const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

  return (
    <section
      className={cn(`default-padding @container py-10`, className)}
      {...props}
    >
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div
          className={cn(
            `flex w-full flex-col gap-4 @md:flex-row @md:items-center @md:justify-between`,
          )}
        >
          <div className={cn(`flex items-center gap-2`)}>
            <ArrowUpRight className={cn(`text-primary-600 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              All Withdrawals
            </h2>
          </div>

          <div className={cn(`flex items-center gap-3`)}>
            <div className={cn(`relative`)}>
              <Search
                className={cn(
                  `text-foreground/40 absolute top-1/2 left-3 size-4 -translate-y-1/2`,
                )}
              />
              <input
                type="text"
                placeholder="Search by email..."
                className={cn(
                  `border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:ring-secondary-500 h-9 w-full rounded-lg border pr-4 pl-9 text-xs focus:ring-1 focus:outline-none @md:w-48`,
                )}
              />
            </div>

            <div className={cn(`relative`)}>
              <select
                className={cn(
                  `border-foreground/20 bg-foreground/5 text-foreground focus:ring-secondary-500 h-9 appearance-none rounded-lg border px-3 pr-8 text-xs focus:ring-1 focus:outline-none`,
                )}
                defaultValue="pending"
              >
                <option
                  value="pending"
                  className={cn(`bg-background text-foreground`)}
                >
                  Pending
                </option>
                <option
                  value="completed"
                  className={cn(`bg-background text-foreground`)}
                >
                  Completed
                </option>
                <option
                  value="all"
                  className={cn(`bg-background text-foreground`)}
                >
                  All Status
                </option>
              </select>
              <ChevronDown
                className={cn(
                  `text-foreground/40 pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2`,
                )}
              />
            </div>

            <Button
              size="sm"
              className={cn(
                `h-9 gap-1.5 rounded-lg bg-blue-600 px-4 text-xs text-white hover:bg-blue-700`,
              )}
            >
              <Search className={cn(`size-3.5`)} />
              Search
            </Button>
          </div>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        {state === "data" && (
          <div className={cn(`overflow-x-auto`)}>
            <table className={cn(`w-full border-collapse text-left`)}>
              <thead>
                <tr
                  className={cn(
                    `text-foreground/50 text-2.75 tracking-wider uppercase`,
                  )}
                >
                  <th className={cn(`py-3 font-medium`)}>User</th>
                  <th className={cn(`py-3 font-medium`)}>Amount</th>
                  <th className={cn(`py-3 font-medium`)}>Wallet</th>
                  <th className={cn(`py-3 font-medium`)}>Wallet Address</th>
                  <th className={cn(`py-3 font-medium`)}>Transaction ID</th>
                  <th className={cn(`py-3 font-medium`)}>Description</th>
                  <th className={cn(`py-3 font-medium`)}>Status</th>
                  <th className={cn(`py-3 font-medium`)}>Date</th>
                </tr>
              </thead>
              <tbody className={cn(`divide-foreground/10 divide-y text-sm`)}>
                {withdrawals.map((item) => (
                  <tr key={item.id} className={cn(`group`)}>
                    <td className={cn(`py-4 pr-4`)}>
                      <div className={cn(`flex items-center gap-3`)}>
                        <div
                          className={cn(
                            `flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white`,
                            item.user.bg,
                          )}
                        >
                          {item.user.initial}
                        </div>
                        <div className={cn(`flex flex-col`)}>
                          <span className={cn(`font-medium`)}>
                            {item.user.name}
                          </span>
                          <span className={cn(`text-foreground/50 text-xs`)}>
                            {item.user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={cn(`py-4 pr-4 font-semibold text-red-500`)}>
                      {item.amount}
                    </td>
                    <td className={cn(`py-4 pr-4`)}>
                      <span
                        className={cn(
                          `border-secondary-500/20 bg-secondary-500/20 text-secondary-300 rounded-md border px-2 py-0.5 text-xs font-semibold`,
                        )}
                      >
                        {item.wallet}
                      </span>
                    </td>
                    <td
                      className={cn(
                        `text-foreground/80 py-4 pr-4 font-mono text-xs`,
                      )}
                    >
                      {item.walletAddress}
                    </td>
                    <td
                      className={cn(
                        `text-foreground/60 py-4 pr-4 font-mono text-xs`,
                      )}
                    >
                      {item.transactionId}
                    </td>
                    <td className={cn(`text-foreground/70 py-4 pr-4 text-xs`)}>
                      {item.description}
                    </td>
                    <td className={cn(`py-4 pr-4`)}>
                      <span
                        className={cn(
                          `inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500`,
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className={cn(`text-foreground/60 py-4 pr-4 text-xs`)}>
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {state === "error" && <AllWithdrawalsError></AllWithdrawalsError>}
        {state === "loading" && <AllWithdrawalsLoading></AllWithdrawalsLoading>}
      </div>
    </section>
  );
}
