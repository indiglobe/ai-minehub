import { deleteUserDetailsCookie, fetchSession } from "@/lib/auth/session";
import { env } from "@repo/env/client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)",
)({
  component: RouteComponent,

  /**
   * ## Route Guard
   *
   * This is a redirect-only route and is never intended to render UI.
   * Its sole responsibility is to determine the user's final destination
   * based on their authentication and onboarding state.
   *
   * Flow:
   * 1. No active session -> Redirect to the sign-in page.
   * 2. Authenticated but onboarding incomplete -> Redirect to /welcome.
   * 3. Authenticated and onboarding complete -> Allow navigation to continue.
   */
  beforeLoad: async ({ location }) => {
    // Check whether the user has an active session.
    const session = await fetchSession();

    // User is not authenticated.
    // Redirect to sign-in while preserving the intended redirect URL.
    if (!session) {
      await deleteUserDetailsCookie();

      throw redirect({
        to: "/signin",
        search: {
          redirectUrl: new URL(
            location.pathname ?? "/",
            env.VITE_WEB_APP_HOST,
          ).toString(),
        },
      });
    }

    return { session };
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
