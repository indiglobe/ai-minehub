import {
  ActiveMiningSession,
  StatSection,
} from "@/components/main/dashboard/dashboard";
import type { Dashboard } from "@/components/main/dashboard/dashboard";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(without-header-footer)/(authenticated)/(existing-user)/dashboard/index";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import type { fetchUserDetailsCookie } from "@/lib/auth/session";
import { mocked } from "storybook/test";
import { serverFn__readOneMiningWallet } from "@/integrations/server-function/mining-wallet";
import { serverFn__readOneTradingWallet } from "@/integrations/server-function/trading-wallet";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";
import type { DeepPartial } from "@/utils/types/storybook";

const meta = {
  beforeEach: () => {
    mocked(serverFn__readOneUser).mockResolvedValue(
      querryData__userData() as any,
    );
    mocked(serverFn__readOneUser).mockResolvedValue(
      querryData__userData() as any,
    );
    mocked(serverFn__readOneMiningWallet).mockResolvedValue(
      querryData__readOneMiningWallet() as any,
    );
    mocked(serverFn__readOneTradingWallet).mockResolvedValue(
      querryData__readOneTradingWallet() as any,
    );
    mocked(serverFn__readAllMiningOrders).mockResolvedValue(
      querryData__readAllMiningOrders() as any,
    );
  },

  parameters: {
    tanstack: {
      router: {
        route: Route,
        routeOverrides: {
          "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/":
            {
              context: () => ({
                userDetailsFromCookie: contextData__userDetailsFromCookies(),
              }),
            },
        },
      },
    },
  },
} satisfies Meta<typeof Route> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof Dashboard> & TypedStoryOptions;

export const DashboardStory: Story = {
  args: {},
};

export const LoadingDashboardStory: Story = {
  args: {},
  parameters: {
    tanstack: {
      router: {},
    },
  },
};

export const StatSectionStory: Story = {
  args: {},
  render: StatSection,
};

export const ActiveMiningSessionStory: Story = {
  args: {},
  render: ActiveMiningSession,
};

function contextData__userDetailsFromCookies() {
  return {
    userId: "some-id",
    fullName: "Indiglobe IT",
  } satisfies DeepPartial<Awaited<ReturnType<typeof fetchUserDetailsCookie>>>;
}

function querryData__userData() {
  return {
    fullName: "Indiglobe IT",
    miningOrders: [
      {
        amountInvested: 20,
        amountRecived: 30,
        createdAt: new Date(),
        id: "12345678",
        miningProfileUsed: "Pro ",
        miningStatus: "active",
        orderedBy: "23232323",
        tableIdentifierToken: "MORD",
        updatedAt: new Date(),
      },
      {
        amountInvested: 20,
        amountRecived: 30,
        createdAt: new Date(),
        id: "12345679",
        miningProfileUsed: "Pro ",
        miningStatus: "completed",
        orderedBy: "23232323",
        tableIdentifierToken: "MORD",
        updatedAt: new Date(),
      },
    ],
    tradingOrders: [
      {
        amountInvested: 20,
        amountRecived: 30,
        createdAt: new Date(),
        id: "",
        tradingStatus: "active",
        orderedBy: "",
        tableIdentifierToken: "MORD",
        updatedAt: new Date(),
      },
      {
        amountInvested: 20,
        amountRecived: 30,
        createdAt: new Date(),
        id: "",
        tradingStatus: "completed",
        orderedBy: "",
        tableIdentifierToken: "MORD",
        updatedAt: new Date(),
      },
      {
        amountInvested: 20,
        amountRecived: 30,
        createdAt: new Date(),
        id: "",
        tradingStatus: "active",
        orderedBy: "",
        tableIdentifierToken: "MORD",
        updatedAt: new Date(),
      },
    ],
  } satisfies Partial<Awaited<ReturnType<typeof serverFn__readOneUser>>>;
}

function querryData__readOneMiningWallet() {
  return {
    balance: 200,
  } satisfies DeepPartial<
    Awaited<ReturnType<typeof serverFn__readOneMiningWallet>>
  >;
}

function querryData__readOneTradingWallet() {
  return {
    balance: 200,
  } satisfies DeepPartial<
    Awaited<ReturnType<typeof serverFn__readOneTradingWallet>>
  >;
}

function querryData__readAllMiningOrders() {
  return [
    {
      amountInvested: 3000,
      amountRecived: 3500,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      id: "21",
      miningStatus: "active",
      orderedBy: "",
      tableIdentifierToken: "MORD",
      updatedAt: new Date(Date.now()),
      miningProfile: {
        category: "PRO",
        createdAt: new Date(Date.now()),
        dailyReturn: 3,
        id: "",
        isPopular: false,
        lockinPeriod: 45,
        maximumAllowedAmount: 3500,
        minimumAllowedAmount: 2000,
        tableIdentifierToken: "MPRO",
        updatedAt: new Date(Date.now()),
      },
    },
    {
      amountInvested: 3000,
      amountRecived: 3500,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      id: "22",
      miningStatus: "active",
      orderedBy: "",
      tableIdentifierToken: "MORD",
      updatedAt: new Date(Date.now()),
      miningProfile: {
        category: "PRO",
        createdAt: new Date(Date.now()),
        dailyReturn: 3,
        id: "",
        isPopular: false,
        lockinPeriod: 45,
        maximumAllowedAmount: 3500,
        minimumAllowedAmount: 2000,
        tableIdentifierToken: "MPRO",
        updatedAt: new Date(Date.now()),
      },
    },
  ] satisfies DeepPartial<
    Awaited<ReturnType<typeof serverFn__readAllMiningOrders>>
  >;
}
