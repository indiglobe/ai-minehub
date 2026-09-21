import { AllDeposits } from "@/components/main/dashboard-groups/admin-dashboard/deposits/deposits";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/deposits/",
)({
  component: RouteComponent,

head: () => {
  const title = "Deposits | AI Minehub Admin";
  const description =
    "Manage and review user deposits, monitor deposit activity, and oversee deposit transactions from the AI Minehub admin dashboard.";

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
        content: `${env.VITE_WEB_APP_HOST}/deposits`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/deposits`,
      },
    ],
  };
},

});

function RouteComponent() {
  return (
    <>
      <AllDeposits />
    </>
  );
}
