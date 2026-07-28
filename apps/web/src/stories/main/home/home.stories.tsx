import type { serverFn__readAllRatings } from "@/integrations/server-function/rating";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Home from "@/components/main/home/home";
import type { FileRouteTypes } from "@/routeTree.gen";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const meta: Meta<typeof Home> & TypedMetaOptions = {
  component: Home,

  decorators: (Story) => {
    const rootRoute = createRootRoute();

    const route = createRoute({
      getParentRoute: () => rootRoute,
      id: "/(with-header-footer)/" satisfies FileRouteTypes["id"],
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

type Story = StoryObj<typeof Home> & TypedStoryOptions;

export const HomeStory: Story = {
  args: {},
};

type TReadAllRatings = Awaited<ReturnType<typeof serverFn__readAllRatings>>;
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
      user: {
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
        referrerId: null,
      },
    },
    {
      id: "1212121212",
      associatedUser: "2121212121",
      createdAt: new Date(Date.now()),
      ratingStar: 1,
      tableIdentifierToken: "RTNG",
      updatedAt: new Date(Date.now()),
      user: {
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
        referrerId: null,
      },
    },
    {
      id: "1212121212",
      associatedUser: "2121212121",
      createdAt: new Date(Date.now()),
      ratingStar: 5,
      tableIdentifierToken: "RTNG",
      updatedAt: new Date(Date.now()),
      user: {
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
        referrerId: "1212121212",
      },
    },
  ] satisfies TReadAllRatings;
}
