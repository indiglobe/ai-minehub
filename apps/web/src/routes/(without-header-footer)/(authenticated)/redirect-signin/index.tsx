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
   * Validates and parses the query parameters used during the
   * post-authentication redirect flow.
   *
   * Supported parameters include:
   *
   * - `referralCode` — preserves a referral code when redirecting
   *   a newly authenticated user to the onboarding flow.
   * - `redirectUrl` — specifies the destination after authentication
   *   and user initialization.
   */
  validateSearch: zodValidator(signinPageSearchParams),

  /**
   * Performs the post-authentication routing and user initialization.
   *
   * This route acts as a redirect controller rather than a page.
   * It determines whether the authenticated user has already had their
   * application-level profile initialized and redirects them accordingly.
   *
   * ## Flow
   *
   * 1. Read the application user details from the user-details cookie.
   * 2. If the cookie is missing, retrieve the user's application profile
   *    using the authenticated session email.
   * 3. If no application profile exists, redirect the user to `/welcome`
   *    and preserve the referral code.
   * 4. If the profile exists, populate the user-details cookie.
   * 5. Redirect the user to the requested `redirectUrl`, or `/dashboard`
   *    when no destination was provided.
   *
   * The session itself is provided by the route context and represents
   * the authentication state established by the authentication system.
   */
  beforeLoad: async ({ search: { referralCode, redirectUrl }, context }) => {
    /**
     * The authenticated session is supplied by the router context.
     * The user-details cookie contains the application's cached
     * user profile information.
     */
    const session = context.session;
    const userDetailsFromCookie = await fetchUserDetailsCookie();

    /**
     * The application user profile has not yet been cached locally.
     * Resolve it from the authenticated user's email and initialize
     * the user-details cookie.
     */
    if (!userDetailsFromCookie) {
      const {
        user: { email },
      } = session;

      /**
       * Look up the application's user record.
       *
       * An authenticated Better Auth user may not necessarily have
       * a corresponding application-level user/profile record yet.
       */
      const userDetails = await serverFn__readOneUser({
        data: {
          identifier: { email },
        },
      });

      /**
       * No application profile exists yet.
       *
       * Redirect the authenticated user to onboarding and preserve
       * the referral code so it can be processed during registration.
       */
      if (!userDetails) {
        throw redirect({
          to: "/welcome",
          search: { referralCode },
        });
      }

      /**
       * Cache the application-level user information in a cookie so
       * subsequent authenticated navigation does not need to resolve
       * the user profile again.
       */
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

      /**
       * Redirect the user to the originally requested destination.
       *
       * Falls back to the dashboard when no explicit redirect URL
       * was supplied.
       */
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
