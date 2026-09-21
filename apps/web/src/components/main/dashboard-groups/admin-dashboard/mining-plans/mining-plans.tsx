import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { Layers, Plus, Edit, X } from "lucide-react";
import { Button } from "@repo/ui/button";
import { useFetchAllMiningPlans } from "@/integrations/tanstack/react-querry/dashboard/admin-dashboard";
import { MiningPlansError, MiningPlansLoading } from "@/components/main/dashboard-groups/admin-dashboard/mining-plans/boundary-comps";

export function MiningPlans({
  className,
  ...props
}: ComponentProps<"section">) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const plans = [
  //   {
  //     id: "p-1",
  //     name: "Starter",
  //     dailyReturn: "0.4000%",
  //     duration: "30 days",
  //     minDeposit: "$1.00",
  //     maxDeposit: "$500.00",
  //     totalReturn: "12.0000%",
  //     status: "Active",
  //   },
  //   {
  //     id: "p-2",
  //     name: "Basic",
  //     dailyReturn: "0.5000%",
  //     duration: "45 days",
  //     minDeposit: "$501.00",
  //     maxDeposit: "$3,000.00",
  //     totalReturn: "22.5000%",
  //     status: "Active",
  //   },
  //   {
  //     id: "p-3",
  //     name: "Professional",
  //     dailyReturn: "0.7000%",
  //     duration: "60 days",
  //     minDeposit: "$3,001.00",
  //     maxDeposit: "$8,000.00",
  //     totalReturn: "42.0000%",
  //     status: "Active",
  //   },
  //   {
  //     id: "p-4",
  //     name: "Enterprise",
  //     dailyReturn: "1.0000%",
  //     duration: "90 days",
  //     minDeposit: "$8,001.00",
  //     maxDeposit: "$100,000.00",
  //     totalReturn: "90.0000%",
  //     status: "Active",
  //   },
  // ];

  const { data: plans } = useFetchAllMiningPlans();

  //const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
   const [state] = useState<"error" | "loading" | "data">("error");


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
        <div className={cn(`flex w-full items-center justify-between`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <Layers className={cn(`text-primary-500 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              Mining Plans
            </h2>
          </div>

          <Button
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className={cn(
              `h-9 gap-1.5 rounded-lg bg-blue-600 px-4 text-xs text-white hover:bg-blue-700`,
            )}
          >
            <Plus className={cn(`size-3.5`)} />
            Add New Mining Plan
          </Button>
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
                  <th className={cn(`py-3 font-medium`)}>Plan Name</th>
                  <th className={cn(`py-3 font-medium`)}>Daily Return</th>
                  <th className={cn(`py-3 font-medium`)}>Duration</th>
                  <th className={cn(`py-3 font-medium`)}>Min Deposit</th>
                  <th className={cn(`py-3 font-medium`)}>Max Deposit</th>
                  <th className={cn(`py-3 font-medium`)}>Total Return</th>
                  <th className={cn(`py-3 font-medium`)}>Status</th>
                  <th className={cn(`py-3 font-medium`)}>Popularity</th>
                  <th className={cn(`py-3 text-right font-medium`)}>Actions</th>
                </tr>
              </thead>
              <tbody className={cn(`divide-foreground/10 divide-y text-sm`)}>
                {plans &&
                  plans.map((plan) => (
                    <tr key={plan.id} className={cn(`group`)}>
                      <td className={cn(`py-4 pr-4 font-semibold`)}>
                        {plan.category}
                      </td>
                      <td
                        className={cn(`py-4 pr-4 font-semibold text-green-500`)}
                      >
                        {plan.dailyReturn}
                      </td>
                      <td
                        className={cn(`text-foreground/80 py-4 pr-4 text-xs`)}
                      >
                        {plan.lockinPeriod}
                      </td>
                      <td className={cn(`text-foreground/80 py-4 pr-4`)}>
                        {plan.minimumAllowedAmount}
                      </td>
                      <td className={cn(`text-foreground/80 py-4 pr-4`)}>
                        {plan.maximumAllowedAmount}
                      </td>
                      <td
                        className={cn(
                          `text-primary-400 py-4 pr-4 font-semibold`,
                        )}
                      >
                        {Math.round(plan.dailyReturn * plan.lockinPeriod)}
                      </td>
                      <td className={cn(`py-4 pr-4`)}>
                        <span
                          className={cn(
                            `inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400`,
                          )}
                        >
                          ---"plan"---
                        </span>
                      </td>
                      <td className={cn(`py-4 pr-4`)}>
                        <span
                          className={cn(
                            `inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400`,
                          )}
                        >
                          {plan.isPopular ? "--true--" : "--false--"}
                        </span>
                      </td>
                      <td className={cn(`py-4 text-right`)}>
                        <Button
                          size="sm"
                          className={cn(
                            `h-8 gap-1.5 rounded-md bg-blue-600 px-3 text-xs text-white hover:bg-blue-700`,
                          )}
                        >
                          <Edit className={cn(`size-3.5`)} />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {state === "error" && <MiningPlansError></MiningPlansError>}

        {state === "loading" && <MiningPlansLoading></MiningPlansLoading>}
      </div>

      {/* Add Mining Plan Modal */}
      {isModalOpen && (
        <div
          className={cn(
            `fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4`,
          )}
        >
          <div
            className={cn(
              `bg-background border-foreground/20 relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl`,
            )}
          >
            <div className={cn(`flex items-center justify-between pb-4`)}>
              <div className={cn(`flex items-center gap-2`)}>
                <Layers className={cn(`text-primary-500 size-4`)} />
                <h3
                  className={cn(`font-brand-secondary text-base font-semibold`)}
                >
                  Add New Mining Plan
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className={cn(
                  `bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground flex size-8 items-center justify-center rounded-lg transition-colors`,
                )}
              >
                <X className={cn(`size-4`)} />
              </button>
            </div>

            <hr className={cn(`border-foreground/20 -mx-6 mb-6`)} />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
              className={cn(`space-y-4`)}
            >
              <div className={cn(`space-y-1.5`)}>
                <label className={cn(`text-foreground/70 text-xs font-medium`)}>
                  Plan Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Advanced"
                  className={cn(
                    `border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:ring-secondary-500 h-10 w-full rounded-lg border px-3 text-xs focus:ring-1 focus:outline-none`,
                  )}
                  required
                />
              </div>

              <div className={cn(`grid grid-cols-2 gap-4`)}>
                <div className={cn(`space-y-1.5`)}>
                  <label
                    className={cn(`text-foreground/70 text-xs font-medium`)}
                  >
                    Daily Return (%)
                  </label>
                  <input
                    type="text"
                    placeholder="0.6000%"
                    className={cn(
                      `border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:ring-secondary-500 h-10 w-full rounded-lg border px-3 text-xs focus:ring-1 focus:outline-none`,
                    )}
                    required
                  />
                </div>
                <div className={cn(`space-y-1.5`)}>
                  <label
                    className={cn(`text-foreground/70 text-xs font-medium`)}
                  >
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    placeholder="30"
                    className={cn(
                      `border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:ring-secondary-500 h-10 w-full rounded-lg border px-3 text-xs focus:ring-1 focus:outline-none`,
                    )}
                    required
                  />
                </div>
              </div>

              <div className={cn(`grid grid-cols-2 gap-4`)}>
                <div className={cn(`space-y-1.5`)}>
                  <label
                    className={cn(`text-foreground/70 text-xs font-medium`)}
                  >
                    Min Deposit ($)
                  </label>
                  <input
                    type="text"
                    placeholder="100.00"
                    className={cn(
                      `border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:ring-secondary-500 h-10 w-full rounded-lg border px-3 text-xs focus:ring-1 focus:outline-none`,
                    )}
                    required
                  />
                </div>
                <div className={cn(`space-y-1.5`)}>
                  <label
                    className={cn(`text-foreground/70 text-xs font-medium`)}
                  >
                    Max Deposit ($)
                  </label>
                  <input
                    type="text"
                    placeholder="1000.00"
                    className={cn(
                      `border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:ring-secondary-500 h-10 w-full rounded-lg border px-3 text-xs focus:ring-1 focus:outline-none`,
                    )}
                    required
                  />
                </div>
              </div>

              <div className={cn(`flex items-center justify-end gap-3 pt-4`)}>
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={cn(
                    `bg-foreground/10 hover:bg-foreground/20 text-foreground h-10 rounded-lg px-4 text-xs`,
                  )}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={cn(
                    `h-10 rounded-lg bg-blue-600 px-6 text-xs text-white hover:bg-blue-700`,
                  )}
                >
                  Save Plan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
