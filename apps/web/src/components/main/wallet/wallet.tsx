import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export default function Wallet({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn(``, className)} {...props}>
      <div>
        <h1>💰 Deposit & Withdraw</h1>
        <p>Manage your funds securely with instant cryptocurrency deposits</p>
      </div>
    </section>
  );
}
