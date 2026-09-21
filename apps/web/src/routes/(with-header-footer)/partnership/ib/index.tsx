import IB from "@/components/main/partnership/ib/ib";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/partnership/ib/")({
  component: RouteComponent,

  head: () => {
    const title = "Introducing Broker (IB) Program | AI Mine Hub";
    const description =
      "Join the AI Mine Hub Introducing Broker (IB) Program and explore opportunities to grow your network, refer clients, and build a rewarding partnership.";

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
          content: `${env.VITE_WEB_APP_HOST}/partnership/ib`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/partnership/ib`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <IB />
    </>
  );
}
