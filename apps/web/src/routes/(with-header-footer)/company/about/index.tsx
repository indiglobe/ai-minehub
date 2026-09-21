import { About } from "@/components/main/company/about/about";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/company/about/")({
  component: RouteComponent,

  head: () => {
    const title = "About AI Mine Hub | Our Company, Vision & Mission";
    const description =
      "Learn about AI Mine Hub, our company, vision, mission, values, and commitment to providing innovative mining and trading solutions.";

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
          content: `${env.VITE_WEB_APP_HOST}/company/about`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/company/about`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <About />
    </>
  );
}
