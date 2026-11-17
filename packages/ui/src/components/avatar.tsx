"use client";

import * as React from "react";
import { cn } from "@repo/styles/cn";
import { Avatar as AvatarPrimitive } from "radix-ui";

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex shrink-0 select-none items-center justify-center",
        "size-9 rounded-full",
        "border border-primary-200/80 bg-primary-50",
        "shadow-sm shadow-primary-950/5",
        "ring-2 ring-background",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-full",
        "after:border after:border-white/30",
        "data-[size=sm]:size-7",
        "data-[size=lg]:size-12",
        "dark:border-primary-800 dark:bg-primary-950",
        "dark:after:border-white/10",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full",
        "bg-primary-100 font-brand-secondary text-sm font-semibold",
        "tracking-tight text-primary-800",
        "group-data-[size=sm]/avatar:text-[0.65rem]",
        "group-data-[size=lg]/avatar:text-base",
        "dark:bg-primary-900 dark:text-primary-200",
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center",
        "size-3 rounded-full border-2 border-background",
        "bg-primary-500 text-white shadow-sm",
        "group-data-[size=sm]/avatar:size-2.5",
        "group-data-[size=default]/avatar:size-3",
        "group-data-[size=lg]/avatar:size-3.5",
        "[&>svg]:size-2",
        "group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex items-center -space-x-2.5",
        "*:data-[slot=avatar]:ring-2",
        "*:data-[slot=avatar]:ring-background",
        "*:data-[slot=avatar]:transition-transform",
        "hover:*:data-[slot=avatar]:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center",
        "rounded-full border border-primary-200/80",
        "bg-primary-100 font-brand-secondary text-xs font-semibold",
        "text-primary-800 shadow-sm ring-2 ring-background",
        "group-has-data-[size=lg]/avatar-group:size-12",
        "group-has-data-[size=sm]/avatar-group:size-7",
        "[&>svg]:size-4",
        "group-has-data-[size=lg]/avatar-group:[&>svg]:size-5",
        "group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        "dark:border-primary-800 dark:bg-primary-900 dark:text-primary-200",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
