import SigninComp from "@/components/main/signin/signin";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { fetchSession } from "@/lib/auth/session";
import { signinPageSearchParams } from "@/utils/zod-schema/search-params-schema/signin-page";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute(
  "/(without-header-footer)/(guest)/signin/",
)({
  component: RouteComponent,

  /**
   * ## Route Guard
   *
   * Runs before the route is loaded.
   * Prevents authenticated users from accessing the sign-in page.
   */
  beforeLoad: async () => {
    // Check whether the user already has an active session.
    const session = await fetchSession();

    // If a session exists, determine where the user should be redirected.
    if (session) {
      const {
        user: { email },
      } = session;

      // Verify whether the authenticated user already has
      // an application profile in the database.
      const userDetails = await serverFn__readOneUser({
        data: { identifier: { email } },
      });

      // Authenticated but onboarding/profile not completed.
      // Redirect the user to the welcome/onboarding page.
      if (!userDetails) {
        throw redirect({ to: "/welcome" });
      }

      // Authenticated and fully registered.
      // Redirect away from the sign-in page to the dashboard.
      throw redirect({ to: "/dashboard" });
    }

    // No session found.
    // Allow guest users to access the sign-in page.
  },

  /**
   * Validates and parses the URL search parameters
   * using the Zod schema before rendering the route.
   */
  validateSearch: zodValidator(signinPageSearchParams),
});

function RouteComponent() {
  return (
    <>
      {/* Sign-in page UI */}
      <SigninComp />
    </>
  );
}
