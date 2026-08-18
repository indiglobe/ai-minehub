import { cn } from "@repo/styles/cn";
import { useRouteContext } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export function GreetSection({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    userDetailsFromCookie: { fullName },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return (
    <section className={cn(`default-padding`, `py-10`, className)} {...props}>
      <h1
        className={cn(`font-brand-secondary text-2xl md:text-3xl lg:text-4xl`)}
      >
        <span>Good day, </span>
        <span
          className={cn(
            `from-accent-500 to-secondary-500 bg-linear-to-r bg-clip-text font-semibold text-transparent`,
          )}
        >
          {fullName}
        </span>
        <span> 👋</span>
      </h1>

      <p className={cn(`text-foreground/50 pt-4`)}>
        Your portfolio is running smoothly. Here's your overview.
      </p>
    </section>
  );
}
