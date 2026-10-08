import { MiningPlans } from "@/components/main/dashboard-groups/admin-dashboard/mining-plans/mining-plans";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/mining-plans/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Mining Plans | AI Minehub Admin";
    const description =
      "Create, manage, and review mining plans, configure plan settings, and oversee mining offerings from the AI Minehub admin dashboard.";

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
          content: `${env.VITE_WEB_APP_HOST}/mining-plans`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/mining-plans`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <MiningPlans />
    </>
  );
}
