import AuthenticatedHeader from "@/components/header/authenticated-header";
import { GreetSection } from "@/components/main/_common/authenticated-routes/greet";
import { RouteTabs } from "@/components/main/_common/authenticated-routes/route-tabs";
import Main from "@/components/main/main";
import { fetchUserDetailsCookie } from "@/lib/auth/session";
import { env } from "@repo/env/client";
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
  beforeLoad: async ({ location }) => {
    const userDetailsFromCookie = await fetchUserDetailsCookie();

    if (!userDetailsFromCookie) {
      throw redirect({
        to: "/redirect-signin",
        search: {
          redirectUrl: new URL(
            location.pathname,
            env.VITE_WEB_APP_HOST,
          ).toString(),
        },
      });
    }

    // Otherwise user is valid and allowed into existing-user routes
    return {
      userDetailsFromCookie,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <AuthenticatedHeader />
      <Main>
        <GreetSection />
        <RouteTabs />
        <Outlet />
      </Main>
    </>
  );
}
