import { cn } from "@repo/styles/cn";
import { ComponentProps } from "react";

export function MetaTraderLogo({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="80" height="80" viewBox="0 0 60 60" fill="none" {...props}>
      <rect
        width="60"
        height="60"
        rx="12"
        className={cn(`fill-current`)}
      ></rect>
      <path
        d="M15 45V15L25 30L30 22L40 40L45 30V45"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
}
