import { env } from "@repo/env/client";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export default function Referral({
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

  return (
    <section
      className={cn(
        `default-padding`,
        `flex flex-col items-center justify-center space-y-12`,
        className,
      )}
      {...props}
    >
      <div className={cn(`space-y-4 pt-20 text-center`)}>
        <h1 className={cn(`font-brand-accent text-5xl`)}>
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
          <h2 className={cn(`font-brand-accent text-3xl font-semibold`)}>
            Your Unique Referral Code
          </h2>
          <p className={cn(`text-foreground/50`)}>
            Share this code with your friends and earn rewards!
          </p>
        </div>

        <div
          className={cn(
            `text-background border-foreground/50 space-y-4 rounded-2xl border border-dashed bg-slate-200 p-6 dark:bg-slate-900`,
          )}
        >
          <div>
            <p className={cn(`text-foreground/50 text-sm uppercase`)}>
              Referral Code
            </p>

            <div className={cn(`flex items-center justify-center gap-4`)}>
              <pre
                className={cn(
                  `from-secondary-500 to-accent-500 bg-linear-to-br bg-clip-text text-6xl font-semibold text-transparent`,
                )}
              >
                {userId.toUpperCase()}
              </pre>
              <Button
                variant={"secondary"}
                className={cn(`h-12 w-30 rounded-xl bg-purple-500`)}
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
              <pre className={cn(`text-foreground/50`)}>
                {env.VITE_WEB_APP_HOST}
                {signinRoute.href}
              </pre>
              <Button
                variant={"secondary"}
                className={cn(`h-12 w-full rounded-xl bg-purple-500`)}
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
