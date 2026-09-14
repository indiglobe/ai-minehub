import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { ArrowDownLeft, Search, ChevronDown, Check, X } from "lucide-react";
import { Button } from "@repo/ui/button";

export function AllDeposits({
  className,
  ...props
}: ComponentProps<"section">) {
  const deposits = [
    {
      id: "dep-1",
      user: {
        name: "Surajit Sarder",
        email: "surajitsardar2000@gmail.com",
        initial: "S",
        bg: "bg-accent-500",
      },
      amount: "$1,000.00",
      wallet: "Mining",
      method: "Bsc_bep20",
      transactionId: "0x498B3e02EBdF93A263bD2731",
      description: "Deposit to Mining ...",
      status: "Pending",
      date: "Aug 31, 2026 21:...",
    },
  ];

  return (
    <section className={cn(`default-padding py-10 @container`, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div className={cn(`flex w-full flex-col gap-4 @md:flex-row @md:items-center @md:justify-between`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <ArrowDownLeft className={cn(`size-4 text-primary-500`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              All Deposits
            </h2>
          </div>

          <div className={cn(`flex items-center gap-3`)}>
            <div className={cn(`relative`)}>
              <Search className={cn(`absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40`)} />
              <input
                type="text"
                placeholder="Search by email..."
                className={cn(
                  `h-9 w-full rounded-lg border border-foreground/20 bg-foreground/5 pl-9 pr-4 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-secondary-500 @md:w-48`,
                )}
              />
            </div>

            <div className={cn(`relative`)}>
              <select
                className={cn(
                  `h-9 appearance-none rounded-lg border border-foreground/20 bg-foreground/5 px-3 pr-8 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-secondary-500`,
                )}
                defaultValue="all"
              >
                <option value="all" className={cn(`bg-background text-foreground`)}>
                  All Status
                </option>
                <option value="pending" className={cn(`bg-background text-foreground`)}>
                  Pending
                </option>
                <option value="completed" className={cn(`bg-background text-foreground`)}>
                  Completed
                </option>
              </select>
              <ChevronDown className={cn(`pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-foreground/40`)} />
            </div>

            <Button
              size="sm"
              className={cn(
                `bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs h-9 px-4 gap-1.5`,
              )}
            >
              <Search className={cn(`size-3.5`)} />
              Search
            </Button>
          </div>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        <div className={cn(`overflow-x-auto`)}>
          <table className={cn(`w-full text-left border-collapse`)}>
            <thead>
              <tr className={cn(`text-foreground/50 text-2.75 uppercase tracking-wider`)}>
                <th className={cn(`py-3 font-medium`)}>User</th>
                <th className={cn(`py-3 font-medium`)}>Amount</th>
                <th className={cn(`py-3 font-medium`)}>Wallet</th>
                <th className={cn(`py-3 font-medium`)}>Method</th>
                <th className={cn(`py-3 font-medium`)}>Transaction ID</th>
                <th className={cn(`py-3 font-medium`)}>Description</th>
                <th className={cn(`py-3 font-medium`)}>Status</th>
                <th className={cn(`py-3 font-medium`)}>Date</th>
                <th className={cn(`py-3 font-medium text-right`)}>Actions</th>
              </tr>
            </thead>
            <tbody className={cn(`divide-y divide-foreground/10 text-sm`)}>
              {deposits.map((item) => (
                <tr key={item.id} className={cn(`group`)}>
                  <td className={cn(`py-4 pr-4`)}>
                    <div className={cn(`flex items-center gap-3`)}>
                      <div
                        className={cn(
                          `flex size-10 shrink-0 items-center justify-center rounded-full text-white font-semibold text-xs`,
                          item.user.bg,
                        )}
                      >
                        {item.user.initial}
                      </div>
                      <div className={cn(`flex flex-col`)}>
                        <span className={cn(`font-medium`)}>{item.user.name}</span>
                        <span className={cn(`text-foreground/50 text-xs`)}>
                          {item.user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={cn(`py-4 pr-4 font-semibold text-green-500`)}>
                    {item.amount}
                  </td>
                  <td className={cn(`py-4 pr-4`)}>
                    <span className={cn(`rounded-md border border-secondary-500/20 bg-secondary-500/20 px-2 py-0.5 text-xs font-semibold text-secondary-300`)}>
                      {item.wallet}
                    </span>
                  </td>
                  <td className={cn(`py-4 pr-4 text-foreground/80 text-xs`)}>
                    {item.method}
                  </td>
                  <td className={cn(`py-4 pr-4 font-mono text-xs text-foreground/60`)}>
                    {item.transactionId}
                  </td>
                  <td className={cn(`py-4 pr-4 text-foreground/70 text-xs`)}>
                    {item.description}
                  </td>
                  <td className={cn(`py-4 pr-4`)}>
                    <span className={cn(`inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500`)}>
                      {item.status}
                    </span>
                  </td>
                  <td className={cn(`py-4 pr-4 text-foreground/60 text-xs`)}>
                    {item.date}
                  </td>
                  <td className={cn(`py-4 text-right`)}>
                    <div className={cn(`flex items-center justify-end gap-1.5`)}>
                      <button
                        className={cn(
                          `flex size-7 items-center justify-center rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors`,
                        )}
                        title="Approve"
                      >
                        <Check className={cn(`size-3.5`)} />
                      </button>
                      <button
                        className={cn(
                          `flex size-7 items-center justify-center rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors`,
                        )}
                        title="Reject"
                      >
                        <X className={cn(`size-3.5`)} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}