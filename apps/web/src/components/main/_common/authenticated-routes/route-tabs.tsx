import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export function UserRouteTabs({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className="default-padding">
      <div
        className={cn("w-full scrollbar-none overflow-x-auto pb-4", className)}
        {...props}
      >
        <div className="flex min-w-max justify-between gap-1 rounded-2xl border border-white/10 bg-white/5 p-1.5 *:grow">
          <TabButton
            to="/dashboard"
            activationLinkShouldStartWith={"dashboard"}
          >
            Dashboard
          </TabButton>

          <TabButton to="/wallet" activationLinkShouldStartWith={"wallet"}>
            Wallet
          </TabButton>

          <TabButton to="/mining" activationLinkShouldStartWith={"mining"}>
            Mining
          </TabButton>

          <TabButton
            to="/referral"
            activationLinkShouldStartWith={"referral"}
          >
            Invite & Earn
          </TabButton>

          <TabButton
            to="/support-chat"
            activationLinkShouldStartWith={"support-chat"}
          >
            Support chat
          </TabButton>
        </div>
      </div>
    </div>
  );
}

export function AdminRouteTabs({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className="default-padding">
      <div
        className={cn("w-full scrollbar-none overflow-x-auto pb-4", className)}
        {...props}
      >
        <div className="flex min-w-max justify-between gap-1 rounded-2xl border border-white/10 bg-white/5 p-1.5 *:grow">
          <TabButton
            to="/dashboard"
            activationLinkShouldStartWith={"dashboard"}
          >
            Dashboard
          </TabButton>

          <TabButton
            to="/users"
            activationLinkShouldStartWith={"users"}
          >
            Users
          </TabButton>

          <TabButton
            to="/deposits"
            activationLinkShouldStartWith={"deposits"}
          >
            Deposits
          </TabButton>

          <TabButton
            to="/withdraws"
            activationLinkShouldStartWith={"withdraws"}
          >
            Withdraws
          </TabButton>

          <TabButton
            to="/mining-plans"
            activationLinkShouldStartWith={"mining-plans"}
          >
            Mining plans
          </TabButton>

          <TabButton
            to="/mining-sesions"
            activationLinkShouldStartWith={"mining-sesions"}
          >
            Mining sesions
          </TabButton>

          <TabButton to="/message" activationLinkShouldStartWith={"message"}>
            Message
          </TabButton>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  className,
  activationLinkShouldStartWith,
  to,
  ...props
}: ComponentProps<typeof Button> & {
  activationLinkShouldStartWith: string;
} & Pick<LinkProps, "to">) {
  const location = useLocation();

  const href = location.publicHref.split('/')[1];


  return (
    <Button
      asChild
      variant={activationLinkShouldStartWith.startsWith(href) ? "secondary" : "ghost"}
      className={cn(``, className)}
      {...props}
    >
      <Link
        to={to}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl px-6 py-3 font-medium whitespace-nowrap text-white/80 transition-all duration-200 hover:bg-white/20 hover:text-white",
        )}
      >
        {props.children}
      </Link>
    </Button>
  );
}
