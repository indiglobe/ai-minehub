import News from "@/components/main/company/news/news";
import { serverFn__readAllNewsSchema } from "@/integrations/server-function/news";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/company/news/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Company News & Updates | AI Mine Hub" }],
  }),

  loader: async () => {
    return {
      newsData: serverFn__readAllNewsSchema({
        data: { queryOptions: { limit: 4 } },
      }),
    };
  },
});

function RouteComponent() {
  return (
    <>
      <News />
    </>
  );
}
