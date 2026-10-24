import { env } from "@repo/env/client";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import {
  ReferralStatCard,
  ReferralStatDescription,
  ReferralStatHeading,
  ReferralStatIcon,
} from "./page-ui";
import { useReadReferrals } from "@/integrations/tanstack/react-querry/referrals/referrals";
import { Image } from "@unpic/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@repo/ui/table";
import { useReadAllReferalEarning } from "@/integrations/tanstack/react-querry/dashboard/user-dashboard";

export function Referral() {
  return (
    <>
      <ReferralStats />
      <ReferralCode />
      <HowItWorks />
      <YourReferrals />
    </>
  );
}

export function ReferralStats({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: allReferalEarning,
    isPending: isPendingAllReferalEarning,
    isError: isErrorAllReferalEarning,
  } = useReadAllReferalEarning();

  // Calculate total referrals
  const totalReferrals =
    allReferalEarning?.filter((r) => r.earningWay === "REFERING").length ?? 0;

  // Calculate total referral earnings
  const totalEarnings =
    allReferalEarning?.reduce(
      (total, item) => total + Number(item.amount || 0),
      0,
    ) ?? 0;

  // Reusable loading/error/success rendering
  const renderStatValue = (value: React.ReactNode) => {
    if (isPendingAllReferalEarning) {
      return <span className="text-foreground/50">Loading...</span>;
    }

    if (isErrorAllReferalEarning) {
      return <span className="text-foreground/50">Error loading data</span>;
    }

    return value;
  };

  return (
    <section
      className={cn("default-padding w-full", "@container pb-20", className)}
      {...props}
    >
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-4 @lg:flex-row",
        )}
      >
        {/* Total Referrals */}
        <ReferralStatCard>
          <ReferralStatIcon>👥</ReferralStatIcon>

          <ReferralStatHeading>
            {renderStatValue(<span>{totalReferrals}</span>)}
          </ReferralStatHeading>

          <ReferralStatDescription>Total Referrals</ReferralStatDescription>
        </ReferralStatCard>

        {/* Referral Earnings */}
        <ReferralStatCard>
          <ReferralStatIcon>💰</ReferralStatIcon>

          <ReferralStatHeading>
            {renderStatValue(
              <span>
                $
                {totalEarnings.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>,
            )}
          </ReferralStatHeading>

          <ReferralStatDescription>Referral Earnings</ReferralStatDescription>
        </ReferralStatCard>

        {/* Commission Rate */}
        <ReferralStatCard>
          <ReferralStatIcon>🎁</ReferralStatIcon>

          <ReferralStatHeading>10%</ReferralStatHeading>

          <ReferralStatDescription>Commission Rate</ReferralStatDescription>
        </ReferralStatCard>
      </div>
    </section>
  );
}

export function ReferralCode({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/referral/",
  });

  const router = useRouter();

  const signinRoute = router.buildLocation({
    to: "/signin",
    search: {
      referralCode: userId.toUpperCase(),
    },
  });

  async function copyReferralCode() {
    await navigator.clipboard.writeText(userId);
  }

  async function copyReferralLink() {
    await navigator.clipboard.writeText(
      `${env.VITE_WEB_APP_HOST}${signinRoute.href}`,
    );
  }

  return (
    <section
      className={cn(
        `default-padding flex flex-col items-center justify-center space-y-12 pb-20`,
        className,
      )}
      {...props}
    >
      <div className="space-y-4 text-center">
        <h1 className="font-brand-accent text-3xl md:text-5xl">
          🎁 Referral Program
        </h1>

        <p className="text-foreground/50">
          Invite friends and earn 10% bonus on every deposit they make
        </p>
      </div>

      <div
        className={cn(
          `from-secondary-500/20 to-primary-500/20 border-foreground/20 w-full space-y-8 rounded-3xl border bg-linear-to-br px-4 py-8 text-center md:px-8 @lg:max-w-[70svw]`,
        )}
      >
        <div>
          <h2 className="font-brand-accent text-xl font-semibold md:text-3xl">
            Your Unique Referral Code
          </h2>

          <p className="text-foreground/50 text-sm md:text-base">
            Share this code with your friends and earn rewards!
          </p>
        </div>

        <div
          className={cn(
            `text-background border-foreground/50 space-y-4 rounded-2xl border border-dashed bg-slate-200 p-6 dark:bg-slate-900`,
          )}
        >
          <div>
            <p className="text-foreground/50 pb-8 text-sm uppercase">
              Referral Code
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <span
                className={cn(
                  `from-secondary-500 to-accent-500 bg-linear-to-br bg-clip-text text-3xl font-semibold text-transparent md:text-4xl lg:text-6xl`,
                )}
              >
                {userId.toUpperCase()}
              </span>

              <Button
                variant="secondary"
                className="h-12 w-30 rounded-xl bg-purple-500"
                onClick={copyReferralCode}
              >
                📋 Copy
              </Button>
            </div>
          </div>

          <hr className="border-foreground/20 border" />

          <div className="@container">
            <p className="text-foreground/50 pb-8 text-xs">
              Or share your referral link
            </p>

            <div className="flex flex-col items-center justify-center gap-4 @md:flex-row">
              <span className="text-foreground/50">
                {env.VITE_WEB_APP_HOST}
                {signinRoute.href}
              </span>

              <Button
                variant="secondary"
                className="h-12 w-full rounded-xl bg-purple-500 @md:w-max"
                onClick={copyReferralLink}
              >
                🔗 Copy Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ className, ...props }: ComponentProps<"section">) {
  const steps = [
    {
      number: "1",
      icon: "📋",
      title: "Copy Your Code",
      description: "Copy your unique referral code from above",
    },
    {
      number: "2",
      icon: "📤",
      title: "Share With Friends",
      description: "Share via social media or direct link",
    },
    {
      number: "3",
      icon: "✅",
      title: "They Register",
      description: "Friends sign up using your code",
    },
    {
      number: "4",
      icon: "💵",
      title: "Earn Rewards",
      description: "Get 10% bonus on their deposits",
    },
  ];

  return (
    <section
      className={cn(`default-padding bg-background w-full pb-20`, className)}
      {...props}
    >
      <div className={cn(`mx-auto w-full max-w-305`)}>
        <h2
          className={cn(
            `font-brand-primary mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl`,
          )}
        >
          <span className={cn(`text-foreground`)}>How It </span>

          <span
            className={cn(
              `bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent`,
            )}
          >
            Works
          </span>
        </h2>

        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {steps.map(({ number, icon, title, description }, index) => (
            <div
              key={number}
              className={cn(
                `group relative isolate flex min-h-85 flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#0b1020] p-7 transition-all duration-500`,
                `hover:-translate-y-2 hover:border-purple-400/30 hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.25)]`,
              )}
            >
              {/* Ambient background glow */}
              <div
                className={cn(
                  `pointer-events-none absolute -top-16 -right-16 -z-10 size-48 rounded-full bg-purple-600/10 blur-3xl transition-all duration-500`,
                  `group-hover:scale-125 group-hover:bg-purple-500/20`,
                )}
              />

              <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-white/[0.035] via-transparent to-purple-500/4 opacity-80" />

              {/* Step number and progress indicator */}
              <div className="flex items-center justify-between">
                <span className="font-brand-primary text-xs font-bold tracking-[0.22em] text-purple-300/70">
                  STEP {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-3 py-1.5">
                  <span className="size-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(167,139,250,0.8)] transition-colors group-hover:bg-cyan-300" />
                  <span className="text-2.5 font-semibold tracking-widest text-white/40">
                    {index === 0
                      ? "START"
                      : index === steps.length - 1
                        ? "FINISH"
                        : "NEXT"}
                  </span>
                </div>
              </div>

              {/* Icon container */}
              <div className="mt-9 flex items-center justify-between">
                <div
                  className={cn(
                    `relative flex size-20 items-center justify-center rounded-2xl border border-purple-400/20 bg-linear-to-br from-purple-500/15 via-[#17152e] to-blue-500/10`,
                    `shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-500`,
                    `group-hover:scale-110 group-hover:border-purple-400/40 group-hover:shadow-[0_0_35px_rgba(139,92,246,0.16)]`,
                  )}
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-400/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="relative text-4xl leading-none transition-transform duration-500 group-hover:rotate-6">
                    {icon}
                  </span>
                </div>

                <span className="font-brand-primary text-5xl font-bold tracking-tighter text-white/6 transition-colors duration-500 group-hover:text-purple-300/20">
                  {String(number).padStart(2, "0")}
                </span>
              </div>

              {/* Card content */}
              <div className="mt-8">
                <h3 className="font-brand-primary text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-purple-200">
                  {title}
                </h3>

                <p className="font-brand-primary mt-3 text-sm leading-7 font-medium text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {description}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="mt-auto pt-8">
                <div className="h-px w-full overflow-hidden bg-white/6">
                  <div className="h-full w-0 bg-linear-to-r from-purple-500 via-violet-400 to-cyan-400 transition-all duration-700 ease-out group-hover:w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function YourReferrals({
  className,
  ...props
}: ComponentProps<"section">) {
  const { data, isLoading, isError } = useReadReferrals();

  return (
    <section className={cn(`default-padding pb-20`, className)} {...props}>
      <div>
        <h2 className={cn(`text-center text-3xl font-bold`)}>
          <span>Your </span>
          <span
            className={cn(
              `from-secondary-500/90 to-accent-500/90 bg-linear-to-br bg-clip-text text-transparent`,
            )}
          >
            Referrals
          </span>
        </h2>
      </div>

      {isLoading && (
        <div
          className={cn(
            `mt-8 flex min-h-40 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/30`,
          )}
        >
          <div className={cn(`flex items-center gap-3 text-slate-400`)}>
            <div
              className={cn(
                `border-t-secondary-500 size-5 animate-spin rounded-full border-2 border-slate-600`,
              )}
            />
            <span>Loading your referrals...</span>
          </div>
        </div>
      )}

      {isError && (
        <div
          className={cn(
            `mt-8 flex min-h-40 flex-col items-center justify-center rounded-xl border border-red-500/30 bg-red-500/5 px-6 text-center`,
          )}
        >
          <p className={cn(`font-semibold text-red-400`)}>
            Unable to load your referrals
          </p>
          <p className={cn(`mt-1 text-sm text-slate-400`)}>
            Something went wrong while fetching your referrals. Please try again
            later.
          </p>
        </div>
      )}

      {data && (
        <>
          {data.length === 0 && (
            <div
              className={cn(
                `mt-8 flex min-h-40 flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900/30 px-6 text-center`,
              )}
            >
              <p className={cn(`font-semibold text-slate-200`)}>
                No referrals yet
              </p>
              <p className={cn(`mt-1 text-sm text-slate-400`)}>
                Your referrals will appear here once someone joins using your
                referral link.
              </p>
            </div>
          )}
          {data.length > 0 && (
            <div className={cn(`overflow-x-auto`)}>
              <Table
                className={cn(
                  `w-full border-collapse overflow-hidden rounded-xl border border-slate-700`,
                )}
              >
                <Thead className={cn(`uppercase`)}>
                  <Tr
                    className={cn(
                      `text-background dark:text-foreground bg-slate-900 text-left dark:bg-slate-800`,
                    )}
                  >
                    <Th>Avatar</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Your bonus</Th>
                  </Tr>
                </Thead>

                <Tbody className={cn(`*:even:bg-slate-800/30`)}>
                  {data.map(({ avatarUrl, email, fullName, id }) => {
                    return (
                      <Tr
                        key={id}
                        className={cn(
                          `*:data-[table-cell=ask]:text-sm *:data-[table-cell=bid]:text-sm *:data-[table-cell=change]:text-sm`,
                        )}
                      >
                        <Td data-table-cell="avatarUrl" className={cn(``)}>
                          <span
                            className={cn(
                              `relative inline-block size-10 overflow-clip rounded-full`,
                            )}
                          >
                            <Image
                              src={`${avatarUrl ?? ""}`}
                              alt={`avatarImage of ${fullName}`}
                              layout="fullWidth"
                              className={cn(`absolute inset-0`)}
                            />
                          </span>
                        </Td>
                        <Td data-table-cell="fullName">{fullName}</Td>
                        <Td data-table-cell="email">{email}</Td>
                        <Td data-table-cell="bonus">$10</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </div>
          )}
        </>
      )}
    </section>
  );
}
