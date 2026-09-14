import { Fragment } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import {
  ActiveInvestment,
  GainedAmount,
  InvestedAmount,
  MiningWallet,
  TradingWallet,
} from "@/components/main/user-dashboard/dashboard/dashboard-stats";
import { extractMonthName } from "@repo/utils/date";
import {
  useMiningOrdersData,
  useRecentTransactionsHistory,
} from "@/integrations/tanstack/react-querry/dashboard/user-dashboard";
import { round } from "es-toolkit/math";
import {
  ActiveDenoteBadge,
  ActiveSessionStatCard,
  Progress,
  ProgressBar,
  ProgressStat,
} from "@/components/main/user-dashboard/dashboard/page-ui";
import { Button } from "@repo/ui/button";
import { env } from "@repo/env/client";

export function UserDashboard() {
  return (
    <>
      <StatSection />

      <div
        className={cn(
          `default-padding`,
          `grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-3`,
        )}
      >
        <div className={cn(`space-y-4 md:col-span-2`)}>
          <ActiveMiningSession />

          <RecentTransaction />
        </div>
        <div className={cn(`space-y-4`)}>
          <QuickActions />

          <InviteEarn />
        </div>
      </div>
    </>
  );
}

export function StatSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding`,
        `grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`,

        className,
      )}
      {...props}
    >
      <MiningWallet />

      <TradingWallet />

      <InvestedAmount />

      <GainedAmount />

      <ActiveInvestment />
    </section>
  );
}

export function ActiveMiningSession({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: activeMiningSessions,
    isPending,
    error,
  } = useMiningOrdersData();

  return (
    <section className={cn(``, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div className={cn(`flex w-full items-center justify-between`)}>
          <h2 className={cn(`font-brand-secondary`)}>
            ⛏️ Active Mining Sessions
          </h2>
          <Link to="/" className={cn(`text-sm text-purple-500`)}>
            View all →
          </Link>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

        {error && (
          <div
            className={cn(
              `flex flex-col items-center justify-center py-10 text-center`,
            )}
          >
            <div
              className={cn(
                `mb-4 flex size-12 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20`,
              )}
            >
              ⚠️
            </div>

            <h3 className={cn(`font-brand-secondary font-semibold`)}>
              Something went wrong
            </h3>

            <p className={cn(`text-foreground/50 mt-1 max-w-sm text-sm`)}>
              We couldn't load your active mining sessions. Please try again
              later.
            </p>
          </div>
        )}

        {isPending && (
          <div className={cn(`space-y-5 py-4`)}>
            <div className={cn(`flex w-full gap-4`)}>
              <div
                className={cn(
                  `bg-foreground/10 size-10 shrink-0 animate-pulse rounded-md`,
                )}
              />

              <div className={cn(`flex-1 space-y-2`)}>
                <div
                  className={cn(
                    `bg-foreground/10 h-4 w-32 animate-pulse rounded`,
                  )}
                />

                <div
                  className={cn(
                    `bg-foreground/10 h-3 w-24 animate-pulse rounded`,
                  )}
                />
              </div>

              <div
                className={cn(
                  `bg-foreground/10 h-6 w-16 animate-pulse rounded-full`,
                )}
              />
            </div>

            <div className={cn(`space-y-2`)}>
              <div className={cn(`flex justify-between`)}>
                <div
                  className={cn(
                    `bg-foreground/10 h-3 w-14 animate-pulse rounded`,
                  )}
                />

                <div
                  className={cn(
                    `bg-foreground/10 h-3 w-8 animate-pulse rounded`,
                  )}
                />
              </div>

              <div
                className={cn(
                  `bg-foreground/10 h-1 w-full animate-pulse rounded-full`,
                )}
              />
            </div>

            <div className={cn(`flex w-full gap-4 max-md:flex-wrap`)}>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    `bg-foreground/10 h-20 min-w-0 flex-1 animate-pulse rounded-md max-md:min-w-[calc(50%-0.5rem)]`,
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {activeMiningSessions && (
          <div className={cn(`space-y-4`)}>
            {activeMiningSessions.length === 0 && (
              <div
                className={cn(
                  `flex flex-col items-center justify-center py-10 text-center`,
                  className,
                )}
                data-slot="active-mining-session-empty"
              >
                <div
                  className={cn(
                    `bg-secondary-500/10 border-secondary-500/20 mb-4 flex size-12 items-center justify-center rounded-full border text-xl`,
                  )}
                >
                  ⛏️
                </div>

                <h3 className={cn(`font-brand-secondary font-semibold`)}>
                  No active mining sessions
                </h3>

                <p className={cn(`text-foreground/50 mt-1 text-sm`)}>
                  You don't have any active mining sessions right now.
                </p>
              </div>
            )}

            {activeMiningSessions.length > 0 &&
              activeMiningSessions.map((activeSession) => {
                const ONE_DAY = 1000 * 60 * 60 * 24;

                const now = Date.now();
                const createdAt = new Date(activeSession.createdAt).getTime();
                const durationMs =
                  ONE_DAY * activeSession.miningProfile.lockinPeriod;
                const elapsedMs = now - createdAt;
                let progress = (elapsedMs / durationMs) * 100;

                progress = Math.floor(Math.min(100, Math.max(0, progress)));
                const remainingMs = Math.max(0, durationMs - elapsedMs);
                const remainingDays = Math.ceil(remainingMs / ONE_DAY);
                const approxReturnTillToday =
                  activeSession.miningProfile.dailyReturn *
                  (elapsedMs / ONE_DAY);

                return (
                  <div
                    key={activeSession.id}
                    className={cn(
                      `bg-foreground/5 border-foreground/10 space-y-4 rounded-md border px-4 py-4`,
                      `@container`,
                    )}
                  >
                    <div
                      className={cn(`flex w-full flex-col gap-4 @md:flex-row`)}
                    >
                      <div
                        className={cn(
                          `flex flex-row flex-wrap items-center gap-4`,
                        )}
                      >
                        <div
                          className={cn(
                            `from-primary-500/30 to-secondary-500/30 flex size-10 items-center justify-center rounded-md bg-linear-to-r`,
                          )}
                        >
                          ⛏️
                        </div>

                        <div>
                          <h2 className={cn(`font-semibold`)}>
                            {activeSession.miningProfile.category}
                          </h2>

                          <p className={cn(`text-foreground/50 text-xs`)}>
                            Started {extractMonthName(activeSession.createdAt)}{" "}
                            {activeSession.createdAt.getDate()}
                            {", "}
                            {activeSession.createdAt.getFullYear()}
                          </p>
                        </div>
                      </div>

                      <ActiveDenoteBadge className={cn(`@md:ml-auto`)} />
                    </div>

                    <Progress>
                      <ProgressStat progress={progress} />
                      <ProgressBar progress={progress} />
                    </Progress>

                    <div className={cn(`flex w-full gap-4 max-md:flex-wrap`)}>
                      <ActiveSessionStatCard>
                        <p
                          className={cn(
                            `text-secondary-500 text-xl font-semibold`,
                          )}
                        >
                          ₹ {activeSession.amountInvested}
                        </p>
                        <p className={cn(`text-foreground/50 text-xs`)}>
                          Amount Invested
                        </p>
                      </ActiveSessionStatCard>
                      <ActiveSessionStatCard>
                        <p
                          className={cn(
                            `text-secondary-500 text-xl font-semibold`,
                          )}
                        >
                          ₹ {round(approxReturnTillToday, 2)}
                        </p>
                        <p className={cn(`text-foreground/50 text-xs`)}>
                          Approx. Profit
                        </p>
                      </ActiveSessionStatCard>
                      <ActiveSessionStatCard>
                        <p
                          className={cn(
                            `text-secondary-500 text-xl font-semibold`,
                          )}
                        >
                          {round(remainingDays, 0)}
                        </p>
                        <p className={cn(`text-foreground/50 text-xs`)}>
                          Days Left
                        </p>
                      </ActiveSessionStatCard>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}

export function RecentTransaction({
  className,
  ...props
}: ComponentProps<"section">) {
  const { data, isError, isLoading } = useRecentTransactionsHistory();

  return (
    <section className={cn(``, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div className={cn(`flex w-full items-center justify-between`)}>
          <h2 className={cn(`font-brand-secondary`)}>⛏️ Recent Transactions</h2>
          <Link to="/" className={cn(`text-sm text-purple-500`)}>
            View all →
          </Link>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

        {isLoading && (
          <div className={cn(`space-y-5`)}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  `flex w-full animate-pulse items-center justify-between`,
                )}
              >
                <div className={cn(`flex flex-col gap-y-2`)}>
                  <div className={cn(`bg-foreground/10 h-4 w-28 rounded`)} />
                  <div className={cn(`bg-foreground/10 h-3 w-20 rounded`)} />
                </div>

                <div className={cn(`flex flex-col items-end gap-y-2`)}>
                  <div className={cn(`bg-foreground/10 h-4 w-20 rounded`)} />
                  <div
                    className={cn(`bg-foreground/10 h-5 w-16 rounded-full`)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div
            className={cn(
              `flex flex-col items-center justify-center py-10 text-center`,
            )}
          >
            <span className={cn(`mb-2 text-2xl`)}>⚠️</span>
            <p className={cn(`text-sm font-semibold`)}>
              Unable to load transactions
            </p>
            <p className={cn(`text-foreground/50 mt-1 text-xs`)}>
              Something went wrong while fetching your recent transactions.
            </p>
          </div>
        )}

        {data && (
          <>
            {data.length === 0 ? (
              <div
                className={cn(
                  `flex flex-col items-center justify-center py-10 text-center`,
                )}
              >
                <div
                  className={cn(
                    `bg-secondary-500/10 border-secondary-500/20 mb-4 flex size-12 items-center justify-center rounded-full border text-xl`,
                  )}
                >
                  📭
                </div>

                <h3 className={cn(`font-brand-secondary font-semibold`)}>
                  No recent transactions
                </h3>

                <p className={cn(`text-foreground/50 mt-1 text-sm`)}>
                  Your recent transactions will appear here.
                </p>
              </div>
            ) : (
              <>
                {data.map(
                  ({ id, category, createdAt, amount, status, type }) => {
                    return (
                      <Fragment key={id}>
                        <div
                          className={cn(
                            `flex w-full items-center justify-between`,
                          )}
                        >
                          <div
                            className={cn(
                              `flex flex-col justify-start gap-y-2`,
                            )}
                          >
                            <span className={cn(`text-sm`)}>{category}</span>
                            <span className={cn(`text-foreground/50 text-xs`)}>
                              {extractMonthName(new Date(createdAt))}{" "}
                              {createdAt.getDate()}, {createdAt.getFullYear()}
                            </span>
                          </div>

                          <div
                            className={cn(
                              `flex flex-col justify-start gap-y-2`,
                            )}
                          >
                            <span
                              className={cn(`text-sm font-semibold`, {
                                "text-green-500":
                                  type === "gain" || type === "receive",
                                "text-red-500": type === "spend",
                              })}
                            >
                              {(type === "gain" || type === "receive") && "+"}
                              {type === "spend" && "-"} ₹ {amount}
                            </span>
                            <span
                              className={cn(
                                `fs-2.5 rounded-full border px-2 py-0.5 font-bold`,
                                {
                                  "border-green-500/20 bg-green-500/10 text-green-500":
                                    status === "completed",
                                  "border-red-500/20 bg-red-500/10 text-red-500":
                                    status === "pending",
                                },
                              )}
                            >
                              {status.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <hr
                          className={cn(
                            `border-foreground/20 -mx-6 my-5 last:hidden`,
                          )}
                        />
                      </Fragment>
                    );
                  },
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export function QuickActions({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn(``, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div className={cn(`flex w-full items-center justify-between`)}>
          <h2 className={cn(`font-brand-secondary`)}>⛏️ Quick Actions</h2>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

        <div className={cn(`grid grid-cols-2 gap-4`)}>
          <Link
            to="/"
            className={cn(
              `bg-secondary-500/5 border-secondary-500/10 flex flex-col items-center justify-center rounded-lg border p-4`,
            )}
          >
            <span
              className={cn(
                `bg-secondary-500/5 flex size-12 items-center justify-center rounded-md`,
              )}
            >
              ⛏️
            </span>
            <span className={cn(`pt-4 text-xs`)}>Start mining</span>
          </Link>

          <Link
            to="/"
            className={cn(
              `bg-secondary-500/5 border-secondary-500/10 flex flex-col items-center justify-center rounded-lg border p-4`,
            )}
          >
            <span
              className={cn(
                `bg-secondary-500/5 flex size-12 items-center justify-center rounded-md`,
              )}
            >
              💰
            </span>
            <span className={cn(`pt-4 text-xs`)}>Deposit</span>
          </Link>

          <Link
            to="/"
            className={cn(
              `bg-secondary-500/5 border-secondary-500/10 flex flex-col items-center justify-center rounded-lg border p-4`,
            )}
          >
            <span
              className={cn(
                `bg-secondary-500/5 flex size-12 items-center justify-center rounded-md`,
              )}
            >
              🎁
            </span>
            <span className={cn(`pt-4 text-xs`)}>Referral</span>
          </Link>

          <Link
            to="/"
            className={cn(
              `bg-secondary-500/5 border-secondary-500/10 flex flex-col items-center justify-center rounded-lg border p-4`,
            )}
          >
            <span
              className={cn(
                `bg-secondary-500/5 flex size-12 items-center justify-center rounded-md`,
              )}
            >
              📋
            </span>
            <span className={cn(`pt-4 text-xs`)}>History</span>
          </Link>

          <Link
            to="/"
            className={cn(
              `bg-secondary-500/5 border-secondary-500/10 flex flex-col items-center justify-center rounded-lg border p-4`,
            )}
          >
            <span
              className={cn(
                `bg-secondary-500/5 flex size-12 items-center justify-center rounded-md`,
              )}
            >
              💬
            </span>
            <span className={cn(`pt-4 text-xs`)}>Support chat</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function InviteEarn({ className, ...props }: ComponentProps<"section">) {
  const router = useRouter();
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  const referralLink = new URL(
    router.buildLocation({
      to: "/signin",
      search: { referralCode: userId },
    }).href,
    env.VITE_WEB_APP_HOST,
  ).toString();

  async function copyLinkToClipboard() {
    await navigator.clipboard.writeText(referralLink);
  }

  return (
    <section className={cn(``, className)} {...props}>
      <div
        className={cn(
          `from-accent-500/10 border-secondary-500/20 to-secondary-500/10 flex flex-col items-center justify-center gap-y-4 rounded-lg border bg-linear-to-tl p-6 text-center`,
        )}
      >
        <span className={cn(`text-4xl`)}>🎁</span>
        <span className={cn(`font-semibold`)}>Invite & Earn</span>
        <span className={cn(`text-foreground/50 text-xs`)}>
          Refer friends and earn 10% bonus on their every investment
          automatically.
        </span>

        <Button
          variant={"secondary"}
          corner={"rounded"}
          onClick={copyLinkToClipboard}
        >
          <span>Get Referral Link</span>
          <span>→</span>
        </Button>
      </div>
    </section>
  );
}
