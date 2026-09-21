import { SyntX } from "@/components/main/trading/syntx/syntx";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/trading/syntx/")({
  component: RouteComponent,

  head: () => {
    const title = "SyntX Indices — Trade 24/7 Synthetic Indices | AI Mine Hub";
    const description =
      "Explore SyntX synthetic indices on AI Mine Hub and access 24/7 market opportunities with a range of instruments designed for continuous trading.";

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
          content: `${env.VITE_WEB_APP_HOST}/trading/syntx`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/trading/syntx`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <SyntX />
    </>
  );
}
