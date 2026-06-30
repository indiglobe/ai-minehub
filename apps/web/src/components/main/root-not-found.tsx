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
          `bg-background border-brand-200 dark:border-brand-800 w-full max-w-md rounded-none border p-6`,
        )}
      >
        <div className={cn(`flex flex-col gap-4`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <span className={cn(`text-brand-500 text-sm font-medium`)}>
              404
            </span>
            <h1 className={cn(`text-lg font-semibold`)}>Page not found ⚠️</h1>
          </div>

          <p className={cn(`text-brand-700 dark:text-brand-300 text-sm`)}>
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <div className={cn(`flex w-full pt-2`)}>
            <Button variant={"primary"} className={cn(`ml-auto`)}>
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
