import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/styles/cn";
import { Slot } from "radix-ui";

const markerVariants = cva(
  [
    "group/marker relative flex min-h-5 w-full items-center gap-2.5",
    "font-brand-primary text-sm leading-relaxed text-foreground/65",
    "transition-colors duration-200",
    "[&_svg:not([class*='size-'])]:size-4",
    "[a]:font-medium [a]:text-primary-600 [a]:underline [a]:underline-offset-4",
    "[a]:transition-colors [a]:hover:text-primary-800",
    "dark:[a]:text-primary-400 dark:[a]:hover:text-primary-300",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",

        separator: [
          "before:mr-1 before:h-px before:min-w-0 before:flex-1",
          "before:bg-primary-200/80",
          "after:ml-1 after:h-px after:min-w-0 after:flex-1",
          "after:bg-primary-200/80",
          "dark:before:bg-primary-900 dark:after:bg-primary-900",
          "[&>*]:shrink-0",
          "group-data-[variant=separator]/marker:text-center",
        ].join(" "),

        border: [
          "border-b border-primary-200/70 pb-2.5",
          "dark:border-primary-900/70",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Marker({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof markerVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="marker"
      data-variant={variant}
      className={cn(markerVariants({ variant }), className)}
      {...props}
    />
  );
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center",
        "rounded-md text-primary-600",
        "[&_svg:not([class*='size-'])]:size-4",
        "dark:text-primary-400",
        className,
      )}
      {...props}
    />
  );
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "min-w-0 wrap-break-word",
        "group-data-[variant=separator]/marker:flex-none",
        "group-data-[variant=separator]/marker:text-center",
        "[&>a]:font-medium [&>a]:text-primary-600",
        "[&>a]:underline [&>a]:underline-offset-4",
        "[&>a]:transition-colors [&>a]:hover:text-primary-800",
        "dark:[&>a]:text-primary-400 dark:[&>a]:hover:text-primary-300",
        className,
      )}
      {...props}
    />
  );
}

export { Marker, MarkerIcon, MarkerContent, markerVariants };
