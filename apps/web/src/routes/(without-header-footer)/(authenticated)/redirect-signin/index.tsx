import { RedirectOnlyPage } from "@/components/main/redirect-signin";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import {
  fetchUserDetailsCookie,
  setUserDetailsCookie,
} from "@/lib/auth/session";
import { signinPageSearchParams } from "@/utils/zod-schema/search-params-schema/signin-page";
import { env } from "@repo/env/client";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/redirect-signin/",
)({
  head: () => {
    const title = "Sign In | AI Minehub";
    const description =
      "Sign in to your AI Minehub account to access your dashboard, mining activities, wallet, referrals, and other account features.";

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "og:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "og:description",
          content: description,
        },
        {
          name: "twitter:url",
          content: `${env.VITE_WEB_APP_HOST}/redirect-signin`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/redirect-signin`,
        },
      ],
    };
  },

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
  beforeLoad: async ({ search: { referralCode, redirectUrl }, context }) => {
    // Check whether the user has an active session.
    const session = context.session;
    const userDetailsFromCookie = await fetchUserDetailsCookie();

    if (!userDetailsFromCookie) {
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

      const { age, avatarUrl, fullName, phoneNumber, role, id } = userDetails;

      await setUserDetailsCookie({
        data: {
          age,
          avatarUrl,
          email,
          fullName,
          phone: phoneNumber,
          role,
          userId: id,
        },
      });

      throw redirect({
        href:
          redirectUrl ??
          new URL("/dashboard", env.VITE_WEB_APP_HOST).toString(),
      });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <RedirectOnlyPage />;
}
