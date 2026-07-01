import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { fetchSession } from "@/lib/auth/session";
import { signinPageSearchParams } from "@/utils/zod-schema/search-params-schema/signin-page";
import { env } from "@repo/env/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/redirect-signin/",
)({
  /**
   * Validates the incoming search parameters before
   * the route guard executes.
   */
  validateSearch: zodValidator(signinPageSearchParams),

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
  beforeLoad: async ({ search: { referralCode } }) => {
    // Check whether the user has an active session.
    const session = await fetchSession();

    // User is not authenticated.
    // Redirect to sign-in while preserving the intended redirect URL.
    if (!session) {
      throw redirect({
        to: "/signin",
        search: {
          redirectUrl: new URL("", env.WEB_APP_HOST).toString(),
        },
      });
    }

    const {
      user: { email },
    } = session;

    // Verify that the authenticated user has completed
    // the application's onboarding/profile creation.
    const userDetails = await serverFn__readOneUser({
      data: { identifier: { email } },
    });

    // Authenticated but onboarding is incomplete.
    // Forward the referral code so onboarding can continue.
    if (!userDetails) {
      throw redirect({
        to: "/welcome",
        search: { referralCode },
      });
    }

    // User is authenticated and fully onboarded.
    // No redirect is required, so navigation continues to the target route.
  },
});
