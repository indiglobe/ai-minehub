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
} from "./referral-ui";
import { useFetchReferrals } from "@/integrations/tanstack/react-querry/referrals/referrals";
import { Table, Tbody, Td, Th, Thead, Tr } from "@repo/ui/table";
import { Image } from "@unpic/react";

export function Referral() {
  return (
    <>
      <ReferralStats />
      <ReferralCode />
      <YourReferrals />
    </>
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
        `default-padding`,
        `flex flex-col items-center justify-center space-y-12 pb-20`,
        className,
      )}
      {...props}
    >
      <div className={cn(`space-y-4 text-center`)}>
        <h1 className={cn(`font-brand-accent text-3xl md:text-5xl`)}>
          🎁 Referral Program
        </h1>
        <p className={cn(`text-foreground/50`)}>
          Invite friends and earn 10% bonus on every deposit they make
        </p>
      </div>

      <div
        className={cn(
          `from-secondary-500/20 to-primary-500/20 border-foreground/20 space-y-8 rounded-3xl border bg-linear-to-br p-8 text-center`,
        )}
      >
        <div className={cn(``)}>
          <h2
            className={cn(
              `font-brand-accent text-xl font-semibold md:text-3xl`,
            )}
          >
            Your Unique Referral Code
          </h2>
          <p className={cn(`text-foreground/50 text-sm md:text-base`)}>
            Share this code with your friends and earn rewards!
          </p>
        </div>

        <div
          className={cn(
            `text-background border-foreground/50 space-y-4 rounded-2xl border border-dashed bg-slate-200 p-6 dark:bg-slate-900`,
          )}
        >
          <div>
            <p className={cn(`text-foreground/50 pb-8 text-sm uppercase`)}>
              Referral Code
            </p>

            <div
              className={cn(`flex flex-col items-center justify-center gap-4`)}
            >
              <span
                className={cn(
                  `from-secondary-500 to-accent-500 bg-linear-to-br bg-clip-text text-3xl font-semibold text-transparent md:text-4xl lg:text-6xl`,
                )}
              >
                {userId.toUpperCase()}
              </span>
              <Button
                variant={"secondary"}
                className={cn(`h-12 w-30 rounded-xl bg-purple-500`)}
                onClick={copyReferralCode}
              >
                📋 Copy
              </Button>
            </div>
          </div>

          <hr className={cn(`border-foreground/20 border`)} />

          <div>
            <p className={cn(`text-foreground/50 pb-8 text-xs`)}>
              Or share your referral link
            </p>

            <div
              className={cn(`flex flex-col items-center justify-center gap-4`)}
            >
              <span className={cn(`text-foreground/50`)}>
                {env.VITE_WEB_APP_HOST}
                {signinRoute.href}
              </span>
              <Button
                variant={"secondary"}
                className={cn(`h-12 w-full rounded-xl bg-purple-500`)}
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

export function ReferralStats({
  className,
  ...props
}: ComponentProps<"section">) {
  const { data, isLoading, isError } = useFetchReferrals();

  console.log();

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
              <span className={cn(`text-foreground/50`)}>loading...</span>
            )}
            {isError && (
              <span className={cn(`text-foreground/50`)}>error!!!</span>
            )}
            {data && <span>{data.referrals.length}</span>}
          </ReferralStatHeading>
          <ReferralStatDescription>Total Referrals</ReferralStatDescription>
        </ReferralStatCard>

        <ReferralStatCard>
          <ReferralStatIcon>💰</ReferralStatIcon>
          <ReferralStatHeading>
            {isLoading && (
              <span className={cn(`text-foreground/50`)}>loading...</span>
            )}
            {isError && (
              <span className={cn(`text-foreground/50`)}>error!!!</span>
            )}
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

export function YourReferrals({
  className,
  ...props
}: ComponentProps<"section">) {
  const { data, isLoading, isError } = useFetchReferrals();

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
            <div>
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
                        <Td
                          data-table-cell="avatarUrl"
                          className={cn(`font-medium`)}
                        >
                          <Image
                            src={avatarUrl}
                            alt={`avatarImage of ${fullName}`}
                            layout="fullWidth"
                          />
                        </Td>
                        <Td data-table-cell="fullName">{fullName}</Td>
                        <Td data-table-cell="email">{email}</Td>
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
