import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { Layers, Plus, Edit, X } from "lucide-react";
import { Button } from "@repo/ui/button";

export function MiningPlans({
  className,
  ...props
}: ComponentProps<"section">) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans = [
    {
      id: "p-1",
      name: "Starter",
      dailyReturn: "0.4000%",
      duration: "30 days",
      minDeposit: "$1.00",
      maxDeposit: "$500.00",
      totalReturn: "12.0000%",
      status: "Active",
    },
    {
      id: "p-2",
      name: "Basic",
      dailyReturn: "0.5000%",
      duration: "45 days",
      minDeposit: "$501.00",
      maxDeposit: "$3,000.00",
      totalReturn: "22.5000%",
      status: "Active",
    },
    {
      id: "p-3",
      name: "Professional",
      dailyReturn: "0.7000%",
      duration: "60 days",
      minDeposit: "$3,001.00",
      maxDeposit: "$8,000.00",
      totalReturn: "42.0000%",
      status: "Active",
    },
    {
      id: "p-4",
      name: "Enterprise",
      dailyReturn: "1.0000%",
      duration: "90 days",
      minDeposit: "$8,001.00",
      maxDeposit: "$100,000.00",
      totalReturn: "90.0000%",
      status: "Active",
    },
  ];

  return (
    <section className={cn(`default-padding py-10 @container`, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div className={cn(`flex w-full items-center justify-between`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <Layers className={cn(`size-4 text-primary-500`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              Mining Plans
            </h2>
          </div>

          <Button
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className={cn(
              `bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs h-9 px-4 gap-1.5`,
            )}
          >
            <Plus className={cn(`size-3.5`)} />
            Add New Mining Plan
          </Button>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        <div className={cn(`overflow-x-auto`)}>
          <table className={cn(`w-full text-left border-collapse`)}>
            <thead>
              <tr className={cn(`text-foreground/50 text-2.75 uppercase tracking-wider`)}>
                <th className={cn(`py-3 font-medium`)}>Plan Name</th>
                <th className={cn(`py-3 font-medium`)}>Daily Return</th>
                <th className={cn(`py-3 font-medium`)}>Duration</th>
                <th className={cn(`py-3 font-medium`)}>Min Deposit</th>
                <th className={cn(`py-3 font-medium`)}>Max Deposit</th>
                <th className={cn(`py-3 font-medium`)}>Total Return</th>
                <th className={cn(`py-3 font-medium`)}>Status</th>
                <th className={cn(`py-3 font-medium text-right`)}>Actions</th>
              </tr>
            </thead>
            <tbody className={cn(`divide-y divide-foreground/10 text-sm`)}>
              {plans.map((plan) => (
                <tr key={plan.id} className={cn(`group`)}>
                  <td className={cn(`py-4 pr-4 font-semibold`)}>{plan.name}</td>
                  <td className={cn(`py-4 pr-4 font-semibold text-green-500`)}>
                    {plan.dailyReturn}
                  </td>
                  <td className={cn(`py-4 pr-4 text-foreground/80 text-xs`)}>
                    {plan.duration}
                  </td>
                  <td className={cn(`py-4 pr-4 text-foreground/80`)}>
                    {plan.minDeposit}
                  </td>
                  <td className={cn(`py-4 pr-4 text-foreground/80`)}>
                    {plan.maxDeposit}
                  </td>
                  <td className={cn(`py-4 pr-4 font-semibold text-primary-400`)}>
                    {plan.totalReturn}
                  </td>
                  <td className={cn(`py-4 pr-4`)}>
                    <span
                      className={cn(
                        `inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400`,
                      )}
                    >
                      {plan.status}
                    </span>
                  </td>
                  <td className={cn(`py-4 text-right`)}>
                    <Button
                      size="sm"
                      className={cn(
                        `bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs h-8 px-3 gap-1.5`,
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
      </div>

      {/* Add Mining Plan Modal */}
      {isModalOpen && (
        <div className={cn(`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4`)}>
          <div
            className={cn(
              `bg-background border-foreground/20 relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl`,
            )}
          >
            <div className={cn(`flex items-center justify-between pb-4`)}>
              <div className={cn(`flex items-center gap-2`)}>
                <Layers className={cn(`size-4 text-primary-500`)} />
                <h3 className={cn(`font-brand-secondary text-base font-semibold`)}>
                  Add New Mining Plan
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className={cn(
                  `flex size-8 items-center justify-center rounded-lg bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground transition-colors`,
                )}
              >
                <X className={cn(`size-4`)} />
              </button>
            </div>

            <hr className={cn(`border-foreground/20 -mx-6 mb-6`)} />

            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className={cn(`space-y-4`)}>
              <div className={cn(`space-y-1.5`)}>
                <label className={cn(`text-xs font-medium text-foreground/70`)}>Plan Name</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced"
                  className={cn(
                    `h-10 w-full rounded-lg border border-foreground/20 bg-foreground/5 px-3 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-secondary-500`,
                  )}
                  required
                />
              </div>

              <div className={cn(`grid grid-cols-2 gap-4`)}>
                <div className={cn(`space-y-1.5`)}>
                  <label className={cn(`text-xs font-medium text-foreground/70`)}>Daily Return (%)</label>
                  <input
                    type="text"
                    placeholder="0.6000%"
                    className={cn(
                      `h-10 w-full rounded-lg border border-foreground/20 bg-foreground/5 px-3 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-secondary-500`,
                    )}
                    required
                  />
                </div>
                <div className={cn(`space-y-1.5`)}>
                  <label className={cn(`text-xs font-medium text-foreground/70`)}>Duration (Days)</label>
                  <input
                    type="number"
                    placeholder="30"
                    className={cn(
                      `h-10 w-full rounded-lg border border-foreground/20 bg-foreground/5 px-3 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-secondary-500`,
                    )}
                    required
                  />
                </div>
              </div>

              <div className={cn(`grid grid-cols-2 gap-4`)}>
                <div className={cn(`space-y-1.5`)}>
                  <label className={cn(`text-xs font-medium text-foreground/70`)}>Min Deposit ($)</label>
                  <input
                    type="text"
                    placeholder="100.00"
                    className={cn(
                      `h-10 w-full rounded-lg border border-foreground/20 bg-foreground/5 px-3 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-secondary-500`,
                    )}
                    required
                  />
                </div>
                <div className={cn(`space-y-1.5`)}>
                  <label className={cn(`text-xs font-medium text-foreground/70`)}>Max Deposit ($)</label>
                  <input
                    type="text"
                    placeholder="1000.00"
                    className={cn(
                      `h-10 w-full rounded-lg border border-foreground/20 bg-foreground/5 px-3 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-secondary-500`,
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
                    `bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg text-xs h-10 px-4`,
                  )}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={cn(
                    `bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs h-10 px-6`,
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