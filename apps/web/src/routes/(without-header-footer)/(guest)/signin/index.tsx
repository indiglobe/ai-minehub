import { SigninComp } from "@/components/main/signin/signin";
import {
  deleteUserDetailsCookie,
  fetchSession,
  fetchUserDetailsCookie,
} from "@/lib/auth/session";
import { signinPageSearchParams } from "@/utils/zod-schema/search-params-schema/signin-page";
import { env } from "@repo/env/client";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute(
  "/(without-header-footer)/(guest)/signin/",
)({
  component: RouteComponent,

  /**
   * Validates and parses the URL search parameters
   * using the Zod schema before rendering the route.
   */
  validateSearch: zodValidator(signinPageSearchParams),

  /**
   * ## Route Guard
   *
   * Runs before the route is loaded.
   * Prevents authenticated users from accessing the sign-in page.
   */
  beforeLoad: async ({ search }) => {
    // Check whether the user already has an active session.
    const session = await fetchSession();
    const userDetailsFromCookie = await fetchUserDetailsCookie();

    if (session && !userDetailsFromCookie) {
      throw redirect({
        to: "/redirect-signin",
        search: { redirectUrl: search.redirectUrl },
      });
    }

    if (session && userDetailsFromCookie) {
      throw redirect({
        href: new URL(
          search.redirectUrl ?? "/dashboard",
          env.VITE_WEB_APP_HOST,
        ).toString(),
      });
    }

    deleteUserDetailsCookie();
  },
});

function RouteComponent() {
  return (
    <>
      <SigninComp />
    </>
  );
}
