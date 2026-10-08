import { Platforms } from "@/components/main/trading/platforms/platforms";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(with-header-footer)/trading/platforms/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Trading Platforms — MT4 & MT5 Download | AI Mine Hub";
    const description =
      "Access AI Mine Hub trading platforms with MT4 and MT5. Explore platform features and find the tools you need for a seamless trading experience.";

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
          content: `${env.VITE_WEB_APP_HOST}/trading/platforms`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/trading/platforms`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Platforms />
    </>
  );
}
