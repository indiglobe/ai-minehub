import { logOut } from "@/lib/auth/session";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { LogoIconFilled } from "@repo/ui/logo";
import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import type { ComponentProps } from "react";

export default function AuthenticatedNavbar({
  className,
  ...props
}: ComponentProps<"nav">) {
  return (
    <nav
      className={cn(
        `default-padding flex w-full items-center justify-between py-4`,
        className,
      )}
      {...props}
    >
      <Button asChild variant={"ghost"} className={cn(`px-0`)}>
        <Link to="/" className={cn(`flex items-center justify-start gap-3`)}>
          <span className={cn(`max-xs:hidden`)}>
            <LogoIconFilled className={cn(`size-10`)} />
          </span>
          <span className={cn(`fs-5.5 font-semibold`)}>AI Mine Hub</span>
        </Link>
      </Button>

      <Button
        variant={"destructive"}
        corner={"circle"}
        onClick={async () => await logOut()}
      >
        <span className={cn(`max-xs:hidden`)}>Logout</span>
        <span>
          <LogOut />
        </span>
      </Button>
    </nav>
  );
}
