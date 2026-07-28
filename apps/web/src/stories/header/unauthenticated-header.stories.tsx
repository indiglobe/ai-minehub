import Header from "@/components/header/unauthenticated-header";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FileRouteTypes } from "@/routeTree.gen";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const meta: Meta<typeof Header> & TypedMetaOptions = {
  component: Header,

  decorators: (Story) => {
    const rootRoute = createRootRoute();

    const route = createRoute({
      getParentRoute: () => rootRoute,
      id: "/(with-header-footer)/" satisfies FileRouteTypes["id"],
      loader: () => null,
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

type Story = StoryObj<typeof Header> & TypedStoryOptions;

export const HeaderStory: Story = {
  args: {},
};
