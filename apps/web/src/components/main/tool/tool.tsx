import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import Main from "../main";
import { ChartLine, UserRound } from "lucide-react";
import { Button } from "@repo/ui/button";

export default function Tool({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <Main className={cn(``, className)} {...props}>
      <PageHeading />

      <CardsList />
    </Main>
  );
}

export function PageHeading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding relative space-y-6 py-10 text-center`,
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          `absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--color-secondary-500)_20%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-primary-500)_20%,transparent)_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] bg-size-[56px_56px]`,
        )}
      />

      <h1
        className={cn(
          `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
        )}
      >
        <span>Professional </span>
        <span
          className={cn(
            `to-secondary-500 bg-linear-to-r from-indigo-500 bg-clip-text text-transparent`,
          )}
        >
          Trading Tools{" "}
        </span>
      </h1>

      <p
        className={cn(
          `text-foreground/70 m-auto max-w-160 text-base lg:text-lg xl:text-xl`,
        )}
      >
        Empower your market analysis with our suite of advanced institutional
        calculators and economic tracking overlays.
      </p>
    </section>
  );
}

export function CardsList({ className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn(`py-30`, className)} {...props}>
      <CardHolder>
        <Card>
          <CardIcon className={cn(`text-secondary-500`)}>
            <ChartLine />
          </CardIcon>
          <CardHeading>Margin Calculator</CardHeading>
          <CardSubHeading>
            Accurately calculate the initial margin requirements based on
            real-time asset pricing, requested leverage, and trading lots.
          </CardSubHeading>

          <Buttons>Launch Calculator →</Buttons>
        </Card>

        <Card>
          <CardIcon className={cn(`text-accent-500`)}>
            <UserRound />
          </CardIcon>
          <CardHeading>Economic Calendar</CardHeading>
          <CardSubHeading>
            Stay ahead of the markets with real-time news alerts mapped
            precisely to global macroeconomic data and currency events.
          </CardSubHeading>

          <Buttons>Open Calendar →</Buttons>
        </Card>
      </CardHolder>
    </section>
  );
}

export function CardHolder({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding`,
        `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`,
        className,
      )}
      data-slot={`card-holder`}
      {...props}
    />
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `group relative space-y-4 overflow-clip rounded-xl border border-indigo-500/20 bg-slate-600/10 px-8 py-10 transition-transform hover:-translate-y-1`,
        className,
      )}
      data-slot={`card`}
      {...props}
    >
      <div
        className={cn(
          `from-secondary-500 to-accent-500 absolute top-0 left-0 h-1 w-full bg-linear-to-r opacity-0 transition-opacity group-hover:opacity-100`,
        )}
      />
      {props.children}
    </div>
  );
}

export function CardIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `flex max-w-max rounded-xl border border-current/20 bg-current/10 p-2 text-current *:size-12`,
        className,
      )}
      data-slot={`card-icon`}
      {...props}
    />
  );
}

export function CardHeading({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(`text-lg font-semibold md:text-xl`, className)}
      data-slot={`card-heading`}
      {...props}
    />
  );
}

export function CardSubHeading({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(`text-foreground/50`, className)}
      data-slot={`card-sub-heading`}
      {...props}
    />
  );
}

export function Buttons({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button className={cn(`mt-4 h-12 rounded-lg`, className)} {...props} />
  );
}
