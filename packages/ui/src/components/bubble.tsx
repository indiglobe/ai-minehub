
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/styles/cn";
import { Slot } from "radix-ui";

function BubbleGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn(
        "flex min-w-0 flex-col gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

const bubbleVariants = cva(
  [
    "group/bubble relative flex w-fit max-w-[85%] min-w-0 flex-col gap-1",
    "group-data-[align=end]/message:self-end",
    "data-[align=end]:self-end",
    "data-[variant=ghost]:max-w-full",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "*:data-[slot=bubble-content]:border-primary-600",
          "*:data-[slot=bubble-content]:bg-primary-600",
          "*:data-[slot=bubble-content]:text-white",
          "*:data-[slot=bubble-content]:shadow-sm",
          "*:data-[slot=bubble-content]:shadow-primary-950/10",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-700",
          "dark:*:data-[slot=bubble-content]:border-primary-500",
          "dark:*:data-[slot=bubble-content]:bg-primary-600",
        ].join(" "),

        secondary: [
          "*:data-[slot=bubble-content]:border-secondary-300",
          "*:data-[slot=bubble-content]:bg-secondary-100",
          "*:data-[slot=bubble-content]:text-secondary-900",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-secondary-200",
          "dark:*:data-[slot=bubble-content]:border-secondary-800",
          "dark:*:data-[slot=bubble-content]:bg-secondary-950/70",
          "dark:*:data-[slot=bubble-content]:text-secondary-200",
          "dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-secondary-900",
        ].join(" "),

        muted: [
          "*:data-[slot=bubble-content]:border-primary-100",
          "*:data-[slot=bubble-content]:bg-primary-50",
          "*:data-[slot=bubble-content]:text-foreground",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-100",
          "dark:*:data-[slot=bubble-content]:border-primary-900",
          "dark:*:data-[slot=bubble-content]:bg-primary-950/70",
          "dark:*:data-[slot=bubble-content]:text-foreground",
          "dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-900",
        ].join(" "),

        tinted: [
          "*:data-[slot=bubble-content]:border-primary-200/70",
          "*:data-[slot=bubble-content]:bg-primary-100",
          "*:data-[slot=bubble-content]:text-primary-950",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-200",
          "dark:*:data-[slot=bubble-content]:border-primary-800",
          "dark:*:data-[slot=bubble-content]:bg-primary-900/60",
          "dark:*:data-[slot=bubble-content]:text-primary-100",
          "dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-800",
        ].join(" "),

        outline: [
          "*:data-[slot=bubble-content]:border-primary-200",
          "*:data-[slot=bubble-content]:bg-background",
          "*:data-[slot=bubble-content]:text-foreground",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-50",
          "dark:*:data-[slot=bubble-content]:border-primary-800",
          "dark:*:data-[slot=bubble-content]:bg-background",
          "dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-950",
        ].join(" "),

        ghost: [
          "border-none",
          "*:data-[slot=bubble-content]:rounded-none",
          "*:data-[slot=bubble-content]:border-transparent",
          "*:data-[slot=bubble-content]:bg-transparent",
          "*:data-[slot=bubble-content]:p-0",
          "*:data-[slot=bubble-content]:shadow-none",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:text-primary-700",
          "dark:[&>[data-slot=bubble-content]:is(button,a):hover]:text-primary-300",
        ].join(" "),

        destructive: [
          "*:data-[slot=bubble-content]:border-red-200",
          "*:data-[slot=bubble-content]:bg-red-50",
          "*:data-[slot=bubble-content]:text-red-700",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-red-100",
          "dark:*:data-[slot=bubble-content]:border-red-900/70",
          "dark:*:data-[slot=bubble-content]:bg-red-950/50",
          "dark:*:data-[slot=bubble-content]:text-red-300",
          "dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-red-900/50",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end";
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  );
}

function BubbleContent({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="bubble-content"
      className={cn(
        "w-fit max-w-full min-w-0 overflow-hidden",
        "rounded-2xl border px-4 py-2.5",
        "font-brand-primary text-sm leading-relaxed",
        "wrap-break-word",
        "group-data-[align=end]/bubble:self-end",
        "first:rounded-tl-md",
        "group-data-[align=end]/bubble:first:rounded-tl-2xl",
        "group-data-[align=end]/bubble:first:rounded-tr-md",
        "[button]:text-left",
        "[button,a]:transition-colors [button,a]:outline-none",
        "[button,a]:focus-visible:ring-2",
        "[button,a]:focus-visible:ring-primary-500/40",
        "[button,a]:focus-visible:ring-offset-2",
        "[button,a]:focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    />
  );
}

const bubbleReactionsVariants = cva(
  [
    "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1",
    "rounded-full border border-primary-100 bg-background",
    "px-2 py-1 text-xs font-medium text-foreground",
    "shadow-md shadow-primary-950/10 ring-2 ring-background",
    "has-[button]:gap-0 has-[button]:p-0.5",
    "dark:border-primary-900 dark:shadow-black/20",
  ].join(" "),
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  },
);

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end";
  side?: "top" | "bottom";
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(
        bubbleReactionsVariants({ side, align }),
        className,
      )}
      {...props}
    />
  );
}

export {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
};
