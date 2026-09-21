import Main from "@/components/main/main";
import { Mining } from "@/components/main/dashboard-groups/user-dashboard/mining/mining";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import { createFileRoute } from "@tanstack/react-router";
import { env } from "@repo/env/client";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/mining/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Mining | AI MInehub";
    const description =
      "Manage your AI Minehub mining profiles, monitor mining activity, and access tools to optimize your mining experience.";

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
          content: `${env.VITE_WEB_APP_HOST}/mining`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/mining`,
        },
      ],
    };
  },

  loader: async () => {
    return {
      allMiningProfiles: serverFn__readAllMiningProfiles(),
    };
  },
});

function RouteComponent() {
  return (
    <Main className="space-y-20 pt-10">
      <Mining />
    </Main>
  );
}
