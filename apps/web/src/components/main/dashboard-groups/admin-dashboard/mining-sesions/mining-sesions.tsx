import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { Clock, Filter, ChevronDown } from "lucide-react";
import { Button } from "@repo/ui/button";
import { MiningSessionsError, MiningSessionsLoading } from "./boundary-comps";

export function MiningSessions({
  className,
  ...props
}: ComponentProps<"section">) {
  const sessions = [
    {
      id: "ms-1",
      user: {
        name: "Surajit Sarder",
        email: "surajitsardar2000@gmail.com",
        initial: "S",
        bg: "bg-secondary-500",
      },
      plan: "Starter",
      invested: "$500.00",
      profit: "$27.18",
      totalReturn: "$527.18",
      daily: "$2.00",
      progress: 45.3,
      status: "Active",
      started: "Aug 31, 2026",
      ends: "Sep 30, 2026",
    },
    {
      id: "ms-2",
      user: {
        name: "Tatai Manna",
        email: "rataimanna013@gmail.com",
        initial: "T",
        bg: "bg-accent-500",
      },
      plan: "Starter",
      invested: "$100.00",
      profit: "$12.00",
      totalReturn: "$112.00",
      daily: "$0.40",
      progress: 100.0,
      status: "Active",
      started: "Jun 23, 2026",
      ends: "Jul 23, 2026",
    },
    {
      id: "ms-3",
      user: {
        name: "Shanu Mridha",
        email: "mridhashanu240420@gmail.com",
        initial: "S",
        bg: "bg-primary-500",
      },
      plan: "Professional",
      invested: "$3,001.00",
      profit: "$1,260.42",
      totalReturn: "$4,261.42",
      daily: "$21.01",
      progress: 100.0,
      status: "Active",
      started: "May 27, 2026",
      ends: "Jul 26, 2026",
    },
    {
      id: "ms-4",
      user: {
        name: "Joy Bj",
        email: "joy003@gmail.com",
        initial: "J",
        bg: "bg-secondary-600",
      },
      plan: "Basic",
      invested: "$600.00",
      profit: "$135.00",
      totalReturn: "$735.00",
      daily: "$3.00",
      progress: 100.0,
      status: "Active",
      started: "May 27, 2026",
      ends: "Jul 11, 2026",
    },
    {
      id: "ms-5",
      user: {
        name: "Tatai Manna",
        email: "rataimanna013@gmail.com",
        initial: "T",
        bg: "bg-accent-600",
      },
      plan: "Basic",
      invested: "$1,000.00",
      profit: "$225.00",
      totalReturn: "$1,225.00",
      daily: "$5.00",
      progress: 100.0,
      status: "Active",
      started: "May 27, 2026",
      ends: "Jul 11, 2026",
    },
    {
      id: "ms-6",
      user: {
        name: "Tatai Manna",
        email: "rataimanna013@gmail.com",
        initial: "T",
        bg: "bg-primary-600",
      },
      plan: "Starter",
      invested: "$8.00",
      profit: "$0.96",
      totalReturn: "$8.96",
      daily: "$0.03",
      progress: 100.0,
      status: "Active",
      started: "Apr 09, 2026",
      ends: "May 09, 2026",
    },
    {
      id: "ms-7",
      user: {
        name: "Tatai Manna",
        email: "rataimanna013@gmail.com",
        initial: "T",
        bg: "bg-secondary-700",
      },
      plan: "Starter",
      invested: "$1.00",
      profit: "$0.12",
      totalReturn: "$1.12",
      daily: "$0.00",
      progress: 100.0,
      status: "Active",
      started: "Apr 09, 2026",
      ends: "May 09, 2026",
    },
    {
      id: "ms-8",
      user: {
        name: "Arindam Sardar",
        email: "sardararindam651@gmail.com",
        initial: "A",
        bg: "bg-accent-500",
      },
      plan: "Starter",
      invested: "$100.00",
      profit: "$12.00",
      totalReturn: "$112.00",
      daily: "$0.40",
      progress: 100.0,
      status: "Active",
      started: "Apr 09, 2026",
      ends: "May 09, 2026",
    },
    {
      id: "ms-9",
      user: {
        name: "Shanu Mridha",
        email: "mridhashanu240420@gmail.com",
        initial: "S",
        bg: "bg-primary-500",
      },
      plan: "Starter",
      invested: "$500.00",
      profit: "$60.00",
      totalReturn: "$560.00",
      daily: "$2.00",
      progress: 100.0,
      status: "Active",
      started: "Apr 09, 2026",
      ends: "May 09, 2026",
    },
    {
      id: "ms-10",
      user: {
        name: "Deep Ranadip Naskar",
        email: "dipn57374@gmail.com",
        initial: "D",
        bg: "bg-secondary-500",
      },
      plan: "Starter",
      invested: "$100.00",
      profit: "$12.00",
      totalReturn: "$112.00",
      daily: "$0.40",
      progress: 100.0,
      status: "Active",
      started: "Apr 09, 2026",
      ends: "May 09, 2026",
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
            <Clock className={cn(`text-secondary-500 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              Mining Sessions
            </h2>
          </div>

          <div className={cn(`flex items-center gap-3`)}>
            <div className={cn(`relative`)}>
              <select
                className={cn(
                  `border-foreground/20 bg-foreground/5 text-foreground focus:ring-secondary-500 h-9 appearance-none rounded-lg border px-3 pr-8 text-xs focus:ring-1 focus:outline-none`,
                )}
                defaultValue="active"
              >
                <option
                  value="active"
                  className={cn(`bg-background text-foreground`)}
                >
                  Active
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
                  All
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
              <Filter className={cn(`size-3.5`)} />
              Filter
            </Button>
          </div>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        {state === "loading" && <MiningSessionsLoading></MiningSessionsLoading>}
        {state === "error" && <MiningSessionsError></MiningSessionsError>}
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
                  <th className={cn(`py-3 font-medium`)}>Plan</th>
                  <th className={cn(`py-3 font-medium`)}>Invested</th>
                  <th className={cn(`py-3 font-medium`)}>Profit</th>
                  <th className={cn(`py-3 font-medium`)}>Total Return</th>
                  <th className={cn(`py-3 font-medium`)}>Daily</th>
                  <th className={cn(`min-w-35 py-3 font-medium`)}>Progress</th>
                  <th className={cn(`py-3 font-medium`)}>Status</th>
                  <th className={cn(`py-3 font-medium`)}>Started</th>
                  <th className={cn(`py-3 text-right font-medium`)}>Ends</th>
                </tr>
              </thead>
              <tbody className={cn(`divide-foreground/10 divide-y text-sm`)}>
                {sessions.map((item) => (
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
                    <td
                      className={cn(
                        `text-foreground/90 py-4 pr-4 font-semibold`,
                      )}
                    >
                      {item.plan}
                    </td>
                    <td
                      className={cn(`text-primary-500 py-4 pr-4 font-semibold`)}
                    >
                      {item.invested}
                    </td>
                    <td
                      className={cn(`py-4 pr-4 font-semibold text-green-500`)}
                    >
                      {item.profit}
                    </td>
                    <td
                      className={cn(`py-4 pr-4 font-semibold text-green-500`)}
                    >
                      {item.totalReturn}
                    </td>
                    <td
                      className={cn(
                        `text-foreground/80 py-4 pr-4 font-semibold`,
                      )}
                    >
                      {item.daily}
                    </td>
                    <td className={cn(`py-4 pr-4`)}>
                      <div className={cn(`flex flex-col gap-1`)}>
                        <div
                          className={cn(
                            `bg-foreground/10 relative h-1.5 w-full overflow-hidden rounded-full`,
                          )}
                        >
                          <div
                            className={cn(
                              `absolute inset-y-0 left-0 rounded-full bg-blue-500`,
                            )}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span
                          className={cn(
                            `text-2.5 text-foreground/50 text-right`,
                          )}
                        >
                          {item.progress.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className={cn(`py-4 pr-4`)}>
                      <span
                        className={cn(
                          `inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400`,
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className={cn(`text-foreground/60 py-4 pr-4 text-xs`)}>
                      {item.started}
                    </td>
                    <td
                      className={cn(
                        `text-foreground/60 py-4 text-right text-xs`,
                      )}
                    >
                      {item.ends}
                    </td>
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
