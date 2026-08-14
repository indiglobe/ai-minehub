import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import type { Route } from "@/routes/(with-header-footer)/index";
import HomePage, { PassiveIncomeSection } from "@/components/main/home/home";
import type { DeepPartial } from "@/utils/types/storybook";
import type { serverFn__readAllRatings } from "@/integrations/server-function/rating";
import type { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import type { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";

const meta = {
  parameters: {
    tanstack: {
      router: {
        // @ts-ignore no-need
        route: { id: "/(with-header-footer)/" },
        routeOverrides: {
          "/(with-header-footer)/": {
            loader: () => {
              return routeLoader();
            },
          },
        },
      },
    },
  },
} satisfies Meta<typeof Route> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof HomePage> & TypedStoryOptions;

export const HomePageStory: Story = {
  args: {},

  render: HomePage,
};

export const PassiveIncomeSectionStory: Story = {
  args: {},

  render: () => <PassiveIncomeSection />,
};

function routeLoader() {
  return {
    allRatings: new Promise((res) => res([])),
    allMiningProfiles: new Promise((res) =>
      res([
        {
          id: "21fb49a3ac",
          maximumAllowedAmount: 399,
          minimumAllowedAmount: 299,
          lockinPeriod: 90,
          category: "Considero vinum.",
          dailyReturn: 0.25,
          isPopular: true,
          createdAt: "2026-08-11 10:25:21.615000",
          updatedAt: "2026-08-11 10:25:21.615000",
          tableIdentifierToken: "MPRO",
        },
        {
          id: "879e7fb30f",
          maximumAllowedAmount: 399,
          minimumAllowedAmount: 299,
          lockinPeriod: 30,
          category: "Deludo conicio.",
          dailyReturn: 0.8,
          isPopular: false,
          createdAt: "2026-08-11 10:25:21.615000",
          updatedAt: "2026-08-11 10:25:21.615000",
          tableIdentifierToken: "MPRO",
        },
        {
          id: "b60d41e4a9",
          maximumAllowedAmount: 499,
          minimumAllowedAmount: 399,
          lockinPeriod: 30,
          category: "Trans.",
          dailyReturn: 0.06,
          isPopular: false,
          createdAt: "2026-08-11 10:25:21.615000",
          updatedAt: "2026-08-11 10:25:21.615000",
          tableIdentifierToken: "MPRO",
        },
        {
          id: "ec205152b8",
          maximumAllowedAmount: 499,
          minimumAllowedAmount: 399,
          lockinPeriod: 90,
          category: "Vesper.",
          dailyReturn: 0.65,
          isPopular: false,
          createdAt: "2026-08-11 10:25:21.615000",
          updatedAt: "2026-08-11 10:25:21.615000",
          tableIdentifierToken: "MPRO",
        },
      ]),
    ),
    allMiningOrders: new Promise((res) =>
      res([
        {
          id: "01749fdb80",
          orderedBy: "623f7d8974",
          amountInvested: 455,
          amountRecived: 450,
          miningProfileUsed: "ec205152b8",
          createdAt: "2026-08-11 10:25:21.780000",
          updatedAt: "2026-08-11 10:25:21.780000",
          tableIdentifierToken: "MORD",
        },
      ]),
    ),
  } satisfies {
    allRatings: Promise<
      DeepPartial<Awaited<ReturnType<typeof serverFn__readAllRatings>>>
    >;
    allMiningProfiles: Promise<
      DeepPartial<Awaited<ReturnType<typeof serverFn__readAllMiningProfiles>>>
    >;
    allMiningOrders: Promise<
      DeepPartial<Awaited<ReturnType<typeof serverFn__readAllMiningOrders>>>
    >;
  };
}
