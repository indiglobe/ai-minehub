import { StatSection } from "@/components/main/dashboard/dashboard";
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

const meta = {
  beforeEach: () => {
    mocked(serverFn__readOneUser).mockResolvedValue(
      querryData__userData() as any,
    );
    mocked(serverFn__readOneUser).mockResolvedValue(
      querryData__userData() as any,
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

function contextData__userDetailsFromCookies() {
  return {
    userId: "some-id",
    fullName: "Indiglobe IT",
  } satisfies Partial<Awaited<ReturnType<typeof fetchUserDetailsCookie>>>;
}

function querryData__userData() {
  return {
    fullName: "Indiglobe IT",
    miningWallet: {
      balance: 200,
      id: "",
      tableIdentifierToken: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      associatedUser: "",
    },
    tradingWallet: {
      balance: 200,
      id: "",
      tableIdentifierToken: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      associatedUser: "",
    },
    miningOrders: [
      {
        amountInvested: 20,
        amountRecived: 30,
        createdAt: new Date(),
        id: "",
        miningProfileUsed: "",
        miningStatus: "active",
        orderedBy: "",
        tableIdentifierToken: "MORD",
        updatedAt: new Date(),
      },
      {
        amountInvested: 20,
        amountRecived: 30,
        createdAt: new Date(),
        id: "",
        miningProfileUsed: "",
        miningStatus: "completed",
        orderedBy: "",
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
