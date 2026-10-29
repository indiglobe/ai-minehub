import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { Users, Eye, Wallet, UserCog, Search, ChevronDown } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Link } from "@tanstack/react-router";
import { AllUsersError, AllUsersLoading } from "./boundary-comps";
import { useReadAllUsers } from "@/integrations/tanstack/react-querry/admin/users.rq";

export function AllUsers({ className, ...props }: ComponentProps<"section">) {
  const {
    data: allUsers,
    isError: isAllUsersError,
    isLoading: isAllUsersLoading,
  } = useReadAllUsers();

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

        {isAllUsersError && <AllUsersError />}
        {isAllUsersLoading && <AllUsersLoading />}
        {allUsers && (
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
                  {/* <th className={cn(`py-3 font-medium`)}>Mining Invested</th> */}
                  {/* <th className={cn(`py-3 font-medium`)}>Mining Profit</th> */}
                  {/* <th className={cn(`py-3 font-medium`)}>Transactions</th> */}
                  <th className={cn(`py-3 font-medium`)}>Joined</th>
                  <th className={cn(`py-3 font-medium`)}>Status</th>
                  <th className={cn(`py-3 text-right font-medium`)}>Actions</th>
                </tr>
              </thead>
              <tbody className={cn(`divide-foreground/10 divide-y text-sm`)}>
                {allUsers.map((item) => (
                  <tr key={item.id} className={cn(`group`)}>
                    <td className={cn(`py-4 pr-4`)}>
                      <div className={cn(`flex items-center gap-3`)}>
                        <div
                          className={cn(
                            `flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white`,
                            // item.bg,
                          )}
                        >
                          {item.fullName[0]}
                        </div>
                        <div className={cn(`flex flex-col`)}>
                          <span className={cn(`font-medium`)}>
                            {item.fullName}
                          </span>
                          {item.referrerId && (
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
                        {item.id}
                      </span>
                    </td>
                    {/* <td
                      className={cn(`text-primary-500 py-4 pr-4 font-semibold`)}
                    >
                      {item.miningInvested}
                    </td> */}
                    {/* <td
                      className={cn(`py-4 pr-4 font-semibold text-green-500`)}
                    >
                      {item.miningProfit}
                    </td> */}
                    {/* <td
                      className={cn(`text-foreground/80 py-4 pr-4 font-medium`)}
                    >
                      {item.transactions}
                    </td> */}
                    <td className={cn(`text-foreground/60 py-4 pr-4 text-xs`)}>
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }).format(new Date(item.createdAt))}
                    </td>
                    <td className={cn(`py-4 pr-4`)}>
                      <span
                        className={cn(`text-xs font-semibold text-green-500`)}
                      >
                        {item.userStatus}
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
