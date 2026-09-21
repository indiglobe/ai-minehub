import AdminDashboard from "@/components/main/dashboard-groups/admin-dashboard/dashboard/dashboard";
import { UserDashboard } from "@/components/main/dashboard-groups/user-dashboard/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";
import { env } from "@repo/env/client";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Dashboard | AI MInehub";
    const description =
      "Access your AI Minehub dashboard to manage your account, monitor activity, and access personalized tools and resources.";

    return {
      meta: [
        { title: title },
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
          content: `${env.VITE_WEB_APP_HOST}/dashboard`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/dashboard`,
        },
      ],
    };
  },
});

function RouteComponent() {
  const {
    userDetailsFromCookie: { role },
  } = Route.useRouteContext();
  return (
    <>
      {role === "basic" && <UserDashboard />}
      {role === "admin" && <AdminDashboard />}
    </>
  );
}
