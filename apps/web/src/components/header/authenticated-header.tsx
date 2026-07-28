import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import AuthenticatedNavbar from "@/components/header/authenticated-navbar";

export default function AuthenticatedHeader({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header className={cn(``, className)} {...props}>
      {/* <AuthenticatedNavbar /> */}
    </header>
  );
}
