import Main from "@/components/main/main";
import { Referral } from "@/components/main/dashboard-groups/user-dashboard/referral/referral";
import { createFileRoute } from "@tanstack/react-router";
import { env } from "@repo/env/client";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/referral/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Referral | AI Minehub";
    const description =
      "Invite others to AI Minehub, manage your referrals, and track your referral activity and rewards.";

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
          content: `${env.VITE_WEB_APP_HOST}/referral`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/referral`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <Main className={`pt-20`}>
      <Referral />
    </Main>
  );
}
