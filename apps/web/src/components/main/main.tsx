import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export default function Main({ className, ...props }: ComponentProps<"main">) {
  return <main className={cn(``, className)} {...props} />;
}
