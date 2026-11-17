import * as React from "react";
import { cn } from "@repo/styles/cn";

function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("flex min-w-0 flex-col gap-5", className)}
      {...props}
    />
  );
}

function Message({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end";
}) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        "group/message relative flex w-full min-w-0 items-end gap-3 text-sm",
        "data-[align=end]:flex-row-reverse",
        className,
      )}
      {...props}
    />
  );
}

function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center self-end",
        "overflow-hidden rounded-full border border-primary-100",
        "bg-primary-50 text-primary-700",
        "shadow-sm shadow-primary-950/5",
        "group-has-data-[slot=message-footer]/message:mb-5",
        "dark:border-primary-900 dark:bg-primary-950 dark:text-primary-300",
        className,
      )}
      {...props}
    />
  );
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex w-fit max-w-[85%] min-w-0 flex-col gap-2",
        "wrap-break-word",
        "group-data-[align=end]/message:items-end",
        className,
      )}
      {...props}
    />
  );
}

function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        "flex max-w-full min-w-0 items-center gap-2 px-1",
        "font-brand-secondary text-xs font-semibold tracking-wide",
        "text-foreground/55",
        "group-data-[align=end]/message:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "flex max-w-full min-w-0 items-center gap-2 px-1",
        "text-[0.7rem] font-medium text-foreground/45",
        "group-data-[align=end]/message:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
};
