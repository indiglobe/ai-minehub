import Home, {
  HeroSection,
  AccountTypesSection,
  EverythingYouNeedSection,
  ExclusiveOffersSection,
  TrustStatSection,
  Rating,
  WhyUsSection,
  PassiveIncomeSection,
} from "@/components/main/home/home";
import type { serverFn__readAllRatings } from "@/integrations/server-function/rating";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

function HomeComp() {
  return <Home />;
}

const meta: Meta<typeof HomeComp> & TypedMetaOptions = {
  component: HomeComp,
  decorators: (Story) => {
    const rootRoute = createRootRoute();

    const route = createRoute({
      getParentRoute: () => rootRoute,
      id: "/(with-header-footer)/",
      loader: () => ({
        allRatings: allRatingsData(),
      }),
      component: Story,
    });

    const routeTree = rootRoute.addChildren([route]);

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/"],
      }),
    });
    return <RouterProvider router={router} />;
  },
};

export default meta;

type Story = StoryObj<typeof HomeComp> & TypedStoryOptions;

export const HomeCompStory: Story = {
  args: {},
};

export const HeroSectionCompStory: Story = {
  args: {},
  render: () => <HeroSection />,
};

export const RatingCompStory: Story = {
  args: {},
  render: () => <Rating />,
  parameters: {
    layout: "centered",
  },
};

export const TrustStatSectionCompStory: Story = {
  args: {},
  render: () => <TrustStatSection />,
};

export const WhyUsSectionCompStory: Story = {
  args: {},
  render: () => <WhyUsSection />,
};

export const AccountTypesSectionCompStory: Story = {
  args: {},
  render: () => <AccountTypesSection />,
};

export const ExclusiveOffersSectionCompStory: Story = {
  args: {},
  render: () => <ExclusiveOffersSection />,
};

export const EverythingYouNeedSectionCompStory: Story = {
  args: {},
  render: () => <EverythingYouNeedSection />,
};

export const PassiveIncomeSectionCompStory: Story = {
  args: {},
  render: () => <PassiveIncomeSection />,
};

async function allRatingsData() {
  await new Promise((res) => setTimeout(res, 0));
  return [
    {
      id: "1212121212",
      associatedUser: "2121212121",
      createdAt: new Date(Date.now()),
      ratingStar: 4,
      tableIdentifierToken: "RTNG",
      updatedAt: new Date(Date.now()),
      userDetails: {
        age: 30,
        avatarUrl: "",
        createdAt: new Date(Date.now()),
        email: "",
        fullName: "",
        id: "2121212121",
        phoneNumber: (2121212121).toString(),
        role: "basic",
        tableIdentifierToken: "USER",
        updatedAt: new Date(Date.now()),
      },
    },
    {
      id: "1212121212",
      associatedUser: "2121212121",
      createdAt: new Date(Date.now()),
      ratingStar: 1,
      tableIdentifierToken: "RTNG",
      updatedAt: new Date(Date.now()),
      userDetails: {
        age: 30,
        avatarUrl: "",
        createdAt: new Date(Date.now()),
        email: "",
        fullName: "",
        id: "2121212121",
        phoneNumber: (2121212121).toString(),
        role: "basic",
        tableIdentifierToken: "USER",
        updatedAt: new Date(Date.now()),
      },
    },
    {
      id: "1212121212",
      associatedUser: "2121212121",
      createdAt: new Date(Date.now()),
      ratingStar: 5,
      tableIdentifierToken: "RTNG",
      updatedAt: new Date(Date.now()),
      userDetails: {
        age: 30,
        avatarUrl: "",
        createdAt: new Date(Date.now()),
        email: "",
        fullName: "",
        id: "2121212121",
        phoneNumber: (2121212121).toString(),
        role: "basic",
        tableIdentifierToken: "USER",
        updatedAt: new Date(Date.now()),
      },
    },
  ] satisfies Awaited<ReturnType<typeof serverFn__readAllRatings>>;
}
