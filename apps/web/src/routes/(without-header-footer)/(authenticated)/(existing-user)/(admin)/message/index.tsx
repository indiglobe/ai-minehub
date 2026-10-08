import { Conversations } from "@/components/main/dashboard-groups/admin-dashboard/message/message";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/message/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Messages | AI Minehub Admin";
    const description =
      "Manage user conversations, review support messages, and communicate with users from the AI Minehub admin dashboard.";

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
          content: `${env.VITE_WEB_APP_HOST}/message`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/message`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Conversations />
    </>
  );
}
