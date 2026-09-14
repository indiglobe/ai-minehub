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
import { useFetchReferrals } from "@/integrations/tanstack/react-querry/referrals/referrals";
import { Image } from "@unpic/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@repo/ui/table";

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
  const { data, isLoading, isError } = useFetchReferrals();

  return (
    <section
      className={cn(`default-padding w-full`, `@container pb-20`, className)}
      {...props}
    >
      <div
        className={cn(
          `flex w-full flex-col items-center justify-center gap-4 @lg:flex-row`,
        )}
      >
        <ReferralStatCard>
          <ReferralStatIcon>👥</ReferralStatIcon>
          <ReferralStatHeading>
            {isLoading && (
              <span className="text-foreground/50">loading...</span>
            )}

            {isError && <span className="text-foreground/50">error!!!</span>}

            {data && <span>{data.referrals.length}</span>}
          </ReferralStatHeading>

          <ReferralStatDescription>Total Referrals</ReferralStatDescription>
        </ReferralStatCard>

        <ReferralStatCard>
          <ReferralStatIcon>💰</ReferralStatIcon>

          <ReferralStatHeading>
            {isLoading && (
              <span className="text-foreground/50">loading...</span>
            )}

            {isError && <span className="text-foreground/50">error!!!</span>}

            {data && <span>${data.referrals.length * 10}</span>}
          </ReferralStatHeading>

          <ReferralStatDescription>Referral Earnings</ReferralStatDescription>
        </ReferralStatCard>

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
    from: "/(without-header-footer)/(authenticated)/(existing-user)/referral/",
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

        <div
          className={cn(
            `grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6`,
          )}
        >
          {steps.map(({ number, icon, title, description }) => (
            <div
              key={number}
              className={cn(
                `flex min-h-97 flex-col items-center rounded-3xl border-secondary-900/80 border bg-[#0d1729] px-7 py-10 text-center transition-transform duration-300 hover:-translate-y-1 sm:min-h-95 xl:min-h-97`,
              )}
            >
              <div
                className={cn(
                  `flex size-14 shrink-0 items-center justify-center rounded-fulld bg-linear-to-br from-purple-500 to-purple-600d font-brand-primary text-2xl font-bold text-whited shadow-lg shadow-purple-500/10`,
                )}
              >
                {number}
              </div>

              <div
                className={cn(
                  `mt-11 flex min-h-17 items-center justify-center`,
                )}
              >
                <span className={cn(`text-5xl leading-none`, `sm:text-13.5`)}>
                  {icon}
                </span>
              </div>

              <div className={cn(`mt-8`)}>
                <h3
                  className={cn(
                    `font-brand-primary text-foreground text-xl font-bold tracking-tight`,
                  )}
                >
                  {title}
                </h3>

                <p
                  className={cn(
                    `font-brand-primary mx-auto mt-3 max-w-55 text-foreground/50 text-base leading-7 font-medium`,
                  )}
                >
                  {description}
                </p>
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
  const { data, isLoading, isError, error } = useFetchReferrals();

  console.log(error);

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
          {data.referrals.length === 0 && (
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
          {data.referrals.length > 0 && (
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
                  {data.referrals.map(({ avatarUrl, email, fullName, id }) => {
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
                              src={avatarUrl}
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