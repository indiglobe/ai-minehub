import { UserDetailsFromDashboard } from "@/components/main/dashboard-groups/admin-dashboard/users/user-details";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/",
)({
  component: RouteComponent,

  loader: async ({ params: { userId } }) => {
    const userDetails = await serverFn__readOneUser({
      data: { identifier: { id: userId } },
    });

    return { userDetails: userDetails! };
  },

  head: ({ params }) => {
    const { userId } = params;

    const title = "User Details | AI Minehub Admin";
    const description =
      "View detailed user information, account activity, mining activity, transactions, and other account details from the AI Minehub admin dashboard.";

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
          content: `${env.VITE_WEB_APP_HOST}/users/${userId}`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/users/${userId}`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <UserDetailsFromDashboard />
    </>
  );
}
