import { SupportChat } from "@/components/main/dashboard-groups/user-dashboard/support-chat/support-chat";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/support-chat/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Support Chat | AI Minehub";
    const description =
      "Get help and support through AI Minehub's support chat. Ask questions, resolve issues, and get assistance with your account and services.";

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
          content: `${env.VITE_WEB_APP_HOST}/support-chat`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/support-chat`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <SupportChat />
    </>
  );
}
