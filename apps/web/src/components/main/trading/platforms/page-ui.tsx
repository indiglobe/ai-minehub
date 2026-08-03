import { cn } from "@repo/styles/cn";
import { Smartphone } from "lucide-react";
import type { ComponentProps } from "react";
import { FaAndroid, FaApple, FaWindows } from "react-icons/fa";

export function DownloadButtons({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(`grid grid-cols-2 gap-2`, className)}
      data-slot={`download-buttons`}
      {...props}
    />
  );
}

export function DownloadWindows({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `col-span-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r text-lg font-semibold text-white`,
        className,
      )}
      data-slot={`download-windows`}
      {...props}
    >
      <FaWindows size={20} />
      Download for Windows
    </button>
  );
}

export function DownloadMacOS({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r text-lg font-semibold text-white`,
        className,
      )}
      data-slot={`download-mac-os`}
      {...props}
    >
      <FaApple size={20} />
      macOS
    </button>
  );
}

export function DownloadIOS({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r text-lg font-semibold text-white`,
        className,
      )}
      data-slot={`download-ios`}
      {...props}
    >
      <Smartphone size={20} />
      iOS
    </button>
  );
}

export function DownloadAndroid({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r text-lg font-semibold text-white`,
        className,
      )}
      data-slot={`download-android`}
      {...props}
    >
      <FaAndroid size={20} />
      Android
    </button>
  );
}

export function StatRow({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn(`mt-10`, className)} data-slot={`stat-row`} {...props} />
  );
}

export function StatRowItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `flex items-center justify-between border-b border-slate-700/40 py-4`,
        className,
      )}
      data-slot={`stat-row-item`}
      {...props}
    />
  );
}

export function StatRowItemLabel({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(`text-slate-400`, className)}
      data-slot={`stat-row-item-label`}
      {...props}
    />
  );
}

export function StatRowItemValue({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(`font-mono font-semibold`, className)}
      data-slot={`stat-row-item-value`}
      {...props}
    />
  );
}

export function PlatformCardHeading({
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        `mt-6 text-center text-lg font-bold text-white sm:text-xl md:text-2xl`,
        className,
      )}
      data-slot={`platform-card-heading`}
      {...props}
    />
  );
}

export function PlatformCardSubHeading({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        `mt-3 text-center text-sm text-slate-400 md:text-base`,
        className,
      )}
      data-slot={`platform-card-sub-heading`}
      {...props}
    />
  );
}

export function PlatformCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `relative overflow-hidden rounded-3xl border border-white/10 p-8`,
        className,
      )}
      data-slot={`platform-card`}
      {...props}
    >
      {props.children}
    </div>
  );
}

export function PlatformCardRecomendation({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute top-0 left-1/2 -translate-x-1/2")}
      data-slot={`platform-card-recomendation`}
      {...props}
    >
      <div className="rounded-b-xl bg-emerald-500 px-6 py-1 text-sm font-semibold text-white">
        ✓ Recommended
      </div>
    </div>
  );
}
