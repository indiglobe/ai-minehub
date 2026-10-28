import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { ArrowDownLeft, Search, ChevronDown } from "lucide-react";
import { Button } from "@repo/ui/button";
import {
  AllDepositsError,
  AllDepositsLoading,
} from "@/components/main/dashboard-groups/admin-dashboard/deposits/boundary-comps";
import {
  useReadAllPendingMiningWalletDeposite,
  useReadAllusers,
} from "@/integrations/tanstack/react-querry/dashboard/admin.rq";

export function AllDeposits({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: pendingMiningWalletDeposites,
    isError: isErrorPendingMiningWalletDeposites,
    isLoading: isLoadingPendingMiningWalletDeposites,
  } = useReadAllPendingMiningWalletDeposite();
  const { data: allUsers } = useReadAllusers();

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
            <ArrowDownLeft className={cn(`text-primary-500 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              All Deposits
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
                defaultValue="all"
              >
                <option
                  value="all"
                  className={cn(`bg-background text-foreground`)}
                >
                  All Status
                </option>
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
        {isErrorPendingMiningWalletDeposites && <AllDepositsError />}
        {isLoadingPendingMiningWalletDeposites && <AllDepositsLoading />}
        {pendingMiningWalletDeposites &&
          pendingMiningWalletDeposites.length > 1 && (
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
                    <th className={cn(`py-3 font-medium`)}>Method</th>
                    <th className={cn(`py-3 font-medium`)}>Transaction ID</th>
                    <th className={cn(`py-3 font-medium`)}>Description</th>
                    <th className={cn(`py-3 font-medium`)}>Status</th>
                    {/* <th className={cn(`py-3 font-medium`)}>Date</th> */}
                  </tr>
                </thead>

                <tbody className={cn(`divide-foreground/10 divide-y text-sm`)}>
                  {pendingMiningWalletDeposites.map((item) => (
                    <tr key={item.id} className={cn(`group`)}>
                      <td className={cn(`py-4 pr-4`)}>
                        <div className={cn(`flex items-center gap-3`)}>
                          <div
                            className={cn(
                              `flex size-10 shrink-0 items-center justify-center rounded-full`,
                              `text-xs font-semibold text-white`,
                            )}
                          ></div>

                          <div className={cn(`flex flex-col`)}>
                            <span className={cn(`font-medium`)}>
                              {allUsers!.find((u) => item.orderedBy === u.id)
                                ?.fullName ?? "Jhon Doe"}
                            </span>
                            <span className={cn(`text-foreground/50 text-xs`)}>
                              {allUsers!.find((u) => item.orderedBy === u.id)
                                ?.email ?? "jhon-doe@email.com"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td
                        className={cn(`py-4 pr-4 font-semibold text-green-500`)}
                      >
                        {item.amount}
                      </td>

                      <td className={cn(`py-4 pr-4`)}>
                        <span
                          className={cn(
                            `border-secondary-500/20 bg-secondary-500/20 rounded-md border`,
                            `text-secondary-300 px-2 py-0.5 text-xs font-semibold`,
                          )}
                        >
                          {item.wallet}
                        </span>
                      </td>

                      <td
                        className={cn(`text-foreground/80 py-4 pr-4 text-xs`)}
                      >
                        {item.depositMethod}
                      </td>

                      <td
                        className={cn(
                          `text-foreground/60 py-4 pr-4 font-mono text-xs`,
                        )}
                      >
                        {item.transactionId}
                      </td>

                      <td
                        className={cn(`text-foreground/70 py-4 pr-4 text-xs`)}
                      ></td>

                      <td className={cn(`py-4 pr-4`)}>
                        <span
                          className={cn(
                            `inline-flex items-center rounded-full border border-yellow-500/30`,
                            `bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500`,
                          )}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* <td
                        className={cn(`text-foreground/60 py-4 pr-4 text-xs`)}
                      >
                        {new (item.createdAt)}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </section>
  );
}
