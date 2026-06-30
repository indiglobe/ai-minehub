import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { Await, useLoaderData } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { extractMonthName } from "@repo/utils/date";
import ReactMarkdown from "react-markdown";
import { AlertTriangle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

export default function News() {
  return (
    <Main>
      <Pageheading />
      <NewsList />
    </Main>
  );
}

export function Pageheading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`default-padding relative py-10 text-center`, className)}
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
        <span>Latest </span>
        <span
          className={cn(
            `from-primary-500 to-secondary-500 bg-linear-to-r bg-clip-text text-transparent`,
          )}
        >
          News
        </span>
      </h1>

      <p
        className={cn(
          `text-foreground/70 m-auto max-w-160 text-base lg:text-lg xl:text-xl`,
        )}
      >
        Stay up to date with new server deployments, asset listings, and
        essential economic data updates.
      </p>
    </section>
  );
}

export function NewsList({ className, ...props }: ComponentProps<"div">) {
  const { newsData: newsDataProm } = useLoaderData({
    from: "/(with-header-footer)/company/news/",
  });

  return (
    <ErrorBoundary fallback={<NewsError />}>
      <Await
        promise={newsDataProm}
        fallback={<NewsLoading />}
        children={(newsData) => {
          return (
            <div
              className={cn(`default-padding space-y-4`, className)}
              {...props}
            >
              {newsData.map(({ id, effectiveDate, heading, details }) => {
                return (
                  <NewsCard key={id}>
                    <NewsCardEffectiveDate
                      effectiveDate={new Date(effectiveDate)}
                    />
                    <NewsCardHeading>{heading}</NewsCardHeading>
                    <NewsCardDetails>{details}</NewsCardDetails>
                  </NewsCard>
                );
              })}
            </div>
          );
        }}
      />
    </ErrorBoundary>
  );
}

export function NewsCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot={`news-card`}
      className={cn(
        `border-secondary-500 mx-auto max-w-[80ch] space-y-2 rounded-2xl border-l-4 bg-white/3 p-6`,
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

export function NewsCardEffectiveDate({
  className,
  effectiveDate,
  ...props
}: ComponentProps<"div"> & { effectiveDate: Date }) {
  return (
    <div
      data-slot={`news-card-effective-date`}
      className={cn(`text-secondary-500 text-sm`, className)}
      {...props}
    >
      {extractMonthName(new Date(effectiveDate))}{" "}
      {new Date(effectiveDate).getDate()} {", "}
      {new Date(effectiveDate).getFullYear()}
    </div>
  );
}

export function NewsCardHeading({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`news-card-heading`}
      className={cn(`text-xl font-semibold`, className)}
      {...props}
    />
  );
}

export function NewsCardDetails({
  className,
  children,
  ...props
}: ComponentProps<"div"> & { children: string }) {
  return (
    <div
      data-slot={`news-card-details`}
      className={cn(`text-foreground/60 prose w-full`, className)}
      {...props}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}

export function NewsLoading({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn(`default-padding space-y-4`, className)} {...props}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "border-secondary-500 mx-auto max-w-[80ch] rounded-2xl border-l-4 bg-white/3 p-6",
          )}
        >
          <div className="bg-secondary-500/20 mb-3 h-4 w-28 animate-pulse rounded" />
          <div className="mb-4 h-7 w-2/3 animate-pulse rounded bg-white/10" />

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NewsError({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding flex min-h-[60vh] items-center justify-center`,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "border-destructive/30 bg-destructive/5 mx-auto flex max-w-xl flex-col items-center rounded-2xl border p-8 text-center",
        )}
      >
        <AlertTriangle className="text-destructive mb-5 size-12" />

        <h2 className="mb-2 text-2xl font-semibold">Unable to load news</h2>

        <p className="text-foreground/70 mb-6 max-w-md">
          Something went wrong while loading the latest news. Please try again
          in a few moments.
        </p>

        {/* {onRetry && (
            <button
              onClick={onRetry}
              className="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white transition-colors"
            >
              <RefreshCcw className="size-4" />
              Try Again
            </button>
          )} */}
      </div>
    </section>
  );
}
