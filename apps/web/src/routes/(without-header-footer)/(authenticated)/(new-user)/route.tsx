import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(new-user)",
)({
  component: RouteComponent,

  /**
   * ## Route Guard
   *
   * Protects all routes under the `(new-user)` layout.
   *
   * Access rules:
   * - No active session -> Redirect to the sign-in page.
   * - Authenticated but already onboarded -> Redirect to the dashboard.
   * - Authenticated and not yet onboarded -> Allow access to child routes.
   */
  beforeLoad: async ({ context }) => {
    // Verify that the user is authenticated.
    const session = context.session;

    const {
      user: { email },
    } = session;

    // Check whether the authenticated user already has
    // an application profile.
    const userDetails = await serverFn__readOneUser({
      data: { identifier: { email } },
    });

    // Users who have already completed onboarding
    // should not be able to revisit new-user routes.
    if (userDetails) {
      throw redirect({ to: "/dashboard" });
    }

    return {
      session,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
