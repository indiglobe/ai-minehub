import Affiliate from "@/components/main/partnership/affiliate/affiliate";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(with-header-footer)/partnership/affiliate/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Affiliate Program — CPA & Revenue Share | AI Mine Hub";
    const description =
      "Join the AI Mine Hub Affiliate Program and explore CPA and revenue-share opportunities while promoting our trading and financial services.";

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
          content: `${env.VITE_WEB_APP_HOST}/partnership/affiliate`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/partnership/affiliate`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Affiliate />
    </>
  );
}
