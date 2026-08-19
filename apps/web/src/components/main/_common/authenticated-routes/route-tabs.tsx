import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export function RouteTabs({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className="default-padding">
      <div
        className={cn("w-full scrollbar-none overflow-x-auto pb-4", className)}
        {...props}
      >
        <div className="flex min-w-max justify-between gap-1 rounded-2xl border border-white/10 bg-white/5 p-1.5 *:grow">
          <TabButton
            to="/dashboard"
            activationLinks={["/dashboard/", "/dashboard"]}
          >
            Dashboard
          </TabButton>

          <TabButton to="/mining" activationLinks={["/mining/", "/mining"]}>
            Mining
          </TabButton>

          <TabButton
            to="/referral"
            activationLinks={["/referral/", "/referral"]}
          >
            Invite & Earn
          </TabButton>

          <TabButton
            to="/support-chat"
            activationLinks={["/support-chat/", "/support-chat"]}
          >
            Support chat
          </TabButton>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  className,
  activationLinks,
  to,
  ...props
}: ComponentProps<typeof Button> & {
  activationLinks: string[];
} & Pick<LinkProps, "to">) {
  const location = useLocation();

  const href = location.publicHref;

  return (
    <Button
      asChild
      variant={activationLinks.includes(href) ? "secondary" : "ghost"}
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
