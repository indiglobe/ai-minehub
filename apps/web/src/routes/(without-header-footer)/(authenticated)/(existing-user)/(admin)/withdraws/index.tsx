import { AllWithdrawals } from "@/components/main/dashboard-groups/admin-dashboard/withdraws/withdraws";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/withdraws/",
)({
  component: RouteComponent,

  head: () => {
  const title = "Withdrawals | AI Minehub Admin";
  const description =
    "Manage and review user withdrawal requests, monitor withdrawal activity, and oversee withdrawal transactions from the AI Minehub admin dashboard.";

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
        content: `${env.VITE_WEB_APP_HOST}/withdraws`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/withdraws`,
      },
    ],
  };
},

});

function RouteComponent() {
  return (
    <>
      <AllWithdrawals />
    </>
  );
}
