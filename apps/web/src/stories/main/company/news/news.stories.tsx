import News from "@/components/main/company/news/news";
import type { serverFn__readAllNewsSchema } from "@/integrations/server-function/news";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(with-header-footer)/company/news/index";
import { mocked__serverFn__readAllNewsSchema } from "@/integrations/storybook/mock/news.mock";

const SLEEP = 1000 * 2;

const meta = {
  parameters: {
    tanstack: {
      router: {
        route: Route,
        routeOverrides: {
          "/(with-header-footer)/company/news/": {
            loader: () => {
              return { newsData: newsDataData() };
            },
          },
        },
      },
    },
  },
} satisfies Meta<typeof Route> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof News> & TypedStoryOptions;

export const NewsStory: Story = {
  args: {},
  render: News,
};

async function newsDataData() {
  await new Promise((res) => setTimeout(res, SLEEP));
  const random = Math.random();

  if (random < 0.7) {
    return mocked__serverFn__readAllNewsSchema() satisfies Awaited<
      ReturnType<typeof serverFn__readAllNewsSchema>
    >;
  }

  throw new Error();
}
