import { useFetchMiningWallet } from "@/integrations/tanstack/react-querry/dashboard/user-dashboard";
import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export function Mining() {
  return (
    <>
      <MiningHeading />
      <MiningBalance />
    </>
  );
}

export function MiningHeading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding space-y-4 text-center md:space-y-6`,
        className,
      )}
      {...props}
    >
      <h1 className={cn(`text-2xl md:text-4xl`)}>
        <span>⛏️ </span>
        <span>Cloud Mining</span>
      </h1>

      <p
        className={cn(
          `text-foreground/50 mx-auto max-w-160 text-sm md:text-base`,
        )}
      >
        Start earning passive income with our automated cloud mining system.
        Choose a plan that fits your investment goals.
      </p>
    </section>
  );
}

export function MiningBalance({
  className,
  ...props
}: ComponentProps<"section">) {
  const { data: miningWalletInfo, isError, isLoading } = useFetchMiningWallet();

  return (
    <section
      className={cn(`default-padding space-y-6 text-center`, className)}
      {...props}
    >
      {isError && <>isError</>}
      {isLoading && <>isLoading</>}

      <div className={cn(`bg-foreground/10`)}>
        <h2>Mining wallet</h2>
        <p>{miningWalletInfo && <>miningWalletInfo</>}</p>
      </div>
    </section>
  );
}
