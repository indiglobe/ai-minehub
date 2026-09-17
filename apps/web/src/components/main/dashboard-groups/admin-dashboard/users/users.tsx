import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { Users, Eye, Wallet, UserCog, Search, ChevronDown } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Link } from "@tanstack/react-router";
import { AllUsersError, AllUsersLoading } from "./boundary-comps";

export function AllUsers({ className, ...props }: ComponentProps<"section">) {
  const users = [
    {
      id: "u-1",
      name: "dsfsd dsfsf",
      email: "birthday@yzcalo.com",
      isReferred: false,
      referralCode: "QFL6D2HG",
      miningInvested: "$0.00",
      miningProfit: "$0.00",
      transactions: 0,
      joined: "Sep 07, 2026",
      status: "Active",
      initial: "D",
      bg: "bg-secondary-500",
    },
    {
      id: "u-2",
      name: "Surajit Sarder",
      email: "surajitsarder2000@gmail.com",
      isReferred: false,
      referralCode: "VEOQEWRH",
      miningInvested: "$500.00",
      miningProfit: "$27.00",
      transactions: 4,
      joined: "Aug 31, 2026",
      status: "Active",
      initial: "S",
      bg: "bg-accent-500",
    },
    {
      id: "u-3",
      name: "dimitriy dimitriy",
      email: "dimitriy.livanov@mail.ru",
      isReferred: false,
      referralCode: "XNSC4ZM6",
      miningInvested: "$0.00",
      miningProfit: "$0.00",
      transactions: 0,
      joined: "Jul 24, 2026",
      status: "Active",
      initial: "D",
      bg: "bg-primary-500",
    },
    {
      id: "u-4",
      name: "fdgdfg dfgdf",
      email: "sfddsdsf12@bltiwd.com",
      isReferred: false,
      referralCode: "QYZZSM03",
      miningInvested: "$0.00",
      miningProfit: "$0.00",
      transactions: 0,
      joined: "Jun 08, 2026",
      status: "Active",
      initial: "F",
      bg: "bg-secondary-600",
    },
    {
      id: "u-5",
      name: "Vladimir Grigorenko",
      email: "mhummock@mail.ru",
      isReferred: false,
      referralCode: "NATLLUHU",
      miningInvested: "$0.00",
      miningProfit: "$0.00",
      transactions: 0,
      joined: "May 14, 2026",
      status: "Active",
      initial: "V",
      bg: "bg-accent-600",
    },
    {
      id: "u-6",
      name: "aaa aaa",
      email: "7689894@mail.ru",
      isReferred: false,
      referralCode: "WXZXMU7J",
      miningInvested: "$0.00",
      miningProfit: "$0.00",
      transactions: 0,
      joined: "Apr 14, 2026",
      status: "Active",
      initial: "A",
      bg: "bg-primary-600",
    },
    {
      id: "u-7",
      name: "Joy Bj",
      email: "joy003@gmail.com",
      isReferred: true,
      referralCode: "EFQNF7SD",
      miningInvested: "$600.00",
      miningProfit: "$135.00",
      transactions: 2,
      joined: "Apr 10, 2026",
      status: "Active",
      initial: "J",
      bg: "bg-secondary-500",
    },
    {
      id: "u-8",
      name: "Arindam Sardar",
      email: "sardararindam651@gmail.com",
      isReferred: true,
      referralCode: "RUWFCNSK",
      miningInvested: "$100.00",
      miningProfit: "$12.00",
      transactions: 2,
      joined: "Apr 09, 2026",
      status: "Active",
      initial: "A",
      bg: "bg-accent-500",
    },
    {
      id: "u-9",
      name: "Deep Ranadip Naskar",
      email: "dipn57374@gmail.com",
      isReferred: true,
      referralCode: "WZEXHVQJ",
      miningInvested: "$100.00",
      miningProfit: "$12.00",
      transactions: 2,
      joined: "Apr 09, 2026",
      status: "Active",
      initial: "D",
      bg: "bg-primary-500",
    },
    {
      id: "u-10",
      name: "Tatai Manna",
      email: "rataimanna013@gmail.com",
      isReferred: false,
      referralCode: "ML1ZQSLT",
      miningInvested: "$1,109.00",
      miningProfit: "$238.08",
      transactions: 10,
      joined: "Apr 09, 2026",
      status: "Active",
      initial: "T",
      bg: "bg-secondary-700",
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
            <Users className={cn(`text-secondary-500 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              All Users
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
                placeholder="Search users..."
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
                defaultValue="active"
              >
                <option
                  value="active"
                  className={cn(`bg-background text-foreground`)}
                >
                  Active
                </option>
                <option
                  value="inactive"
                  className={cn(`bg-background text-foreground`)}
                >
                  Inactive
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

        {state === "error" && <AllUsersError />}
        {state === "loading" && <AllUsersLoading />}
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
                  <th className={cn(`py-3 font-medium`)}>Email</th>
                  <th className={cn(`py-3 font-medium`)}>Referral Code</th>
                  <th className={cn(`py-3 font-medium`)}>Mining Invested</th>
                  <th className={cn(`py-3 font-medium`)}>Mining Profit</th>
                  <th className={cn(`py-3 font-medium`)}>Transactions</th>
                  <th className={cn(`py-3 font-medium`)}>Joined</th>
                  <th className={cn(`py-3 font-medium`)}>Status</th>
                  <th className={cn(`py-3 text-right font-medium`)}>Actions</th>
                </tr>
              </thead>
              <tbody className={cn(`divide-foreground/10 divide-y text-sm`)}>
                {users.map((item) => (
                  <tr key={item.id} className={cn(`group`)}>
                    <td className={cn(`py-4 pr-4`)}>
                      <div className={cn(`flex items-center gap-3`)}>
                        <div
                          className={cn(
                            `flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white`,
                            item.bg,
                          )}
                        >
                          {item.initial}
                        </div>
                        <div className={cn(`flex flex-col`)}>
                          <span className={cn(`font-medium`)}>{item.name}</span>
                          {item.isReferred && (
                            <span
                              className={cn(
                                `text-2.5 font-semibold text-green-500`,
                              )}
                            >
                              Referred
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className={cn(`text-foreground/70 py-4 pr-4 text-xs`)}>
                      {item.email}
                    </td>
                    <td className={cn(`py-4 pr-4`)}>
                      <span
                        className={cn(
                          `border-foreground/10 bg-foreground/5 text-foreground/80 rounded-md border px-2 py-1 font-mono text-xs font-semibold`,
                        )}
                      >
                        {item.referralCode}
                      </span>
                    </td>
                    <td
                      className={cn(`text-primary-500 py-4 pr-4 font-semibold`)}
                    >
                      {item.miningInvested}
                    </td>
                    <td
                      className={cn(`py-4 pr-4 font-semibold text-green-500`)}
                    >
                      {item.miningProfit}
                    </td>
                    <td
                      className={cn(`text-foreground/80 py-4 pr-4 font-medium`)}
                    >
                      {item.transactions}
                    </td>
                    <td className={cn(`text-foreground/60 py-4 pr-4 text-xs`)}>
                      {item.joined}
                    </td>
                    <td className={cn(`py-4 pr-4`)}>
                      <span
                        className={cn(`text-xs font-semibold text-green-500`)}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className={cn(`py-4 text-right`)}>
                      <div
                        className={cn(`flex items-center justify-end gap-1.5`)}
                      >
                        <Button
                          size={"xs"}
                          variant={"info"}
                          asChild
                          title="View User"
                        >
                          <Link
                            to="/users/$userId"
                            params={{ userId: item.id }}
                          >
                            <Eye className={cn(`size-3.5`)} />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          size={"xs"}
                          variant={"success"}
                          title="Wallet Details"
                        >
                          <Link
                            to="/users/$userId/wallet"
                            params={{ userId: item.id }}
                          >
                            <Wallet className={cn(`size-3.5`)} />
                          </Link>
                        </Button>
                        <Button
                          asChild
                              size={"xs"}
                          variant={"warn"}
                          title="Manage User"
                        >
                          <Link to="/users/$userId" params={{ userId: "" }}>
                            <UserCog className={cn(`size-3.5`)} />
                          </Link>
                        </Button>
                      </div>
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
