import { Button } from "@repo/ui/button";
import { cn } from "@repo/styles/cn";
import { Link } from "@tanstack/react-router";

export function RootNotFound() {
  return (
    <section
      className={cn(
        `bg-background text-foreground flex min-h-screen items-center justify-center px-6`,
      )}
    >
      <div
        className={cn(
          `bg-background border-accent-200 dark:border-accent-800 w-full max-w-md rounded-2xl border p-6`,
        )}
      >
        <div className={cn(`flex flex-col gap-4`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <span className={cn(`text-accent-500 text-lg font-medium`)}>
              404
            </span>
            <h1 className={cn(`text-accent-500 text-lg font-semibold`)}>
              Page not found ⚠️
            </h1>
          </div>

          <p className={cn(`text-foreground/70 text-sm`)}>
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <div className={cn(`flex w-full pt-2`)}>
            <Button
              variant={"accent"}
              asChild
              className={cn(`ml-auto rounded-md`)}
            >
              <Link to="/" tabIndex={-1}>
                Go home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
