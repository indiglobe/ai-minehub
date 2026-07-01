import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { fetchSession } from "@/lib/auth/session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)",
)({
  component: RouteComponent,

  /**
   * ## Route Guard
   *
   * This layout protects all "(existing-user)" routes.
   *
   * Access rules:
   * - No session → redirect to /signin
   * - Session exists but no user profile → redirect to /welcome (onboarding)
   * - Valid existing user → allow access to child routes
   */
  beforeLoad: async () => {
    // Check authentication state
    const session = await fetchSession();

    // Block unauthenticated users
    if (!session) {
      throw redirect({ to: "/signin" });
    }

    const {
      user: { email },
    } = session;

    // Verify that the user has a completed profile in the system
    const userDetails = await serverFn__readOneUser({
      data: { identifier: { email } },
    });

    // If no user record exists, treat as onboarding user
    if (!userDetails) {
      throw redirect({ to: "/welcome" });
    }

    // Otherwise user is valid and allowed into existing-user routes
    return {
      userDetails,
    };
  },
});

function RouteComponent() {
  return (
    <>
      {/* Layout outlet for all existing-user nested routes */}
      <Outlet />
    </>
  );
}
