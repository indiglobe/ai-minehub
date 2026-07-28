import AuthenticatedHeader from "@/components/header/authenticated-header";
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

const meta: Meta<typeof AuthenticatedHeader> & TypedMetaOptions = {
  component: AuthenticatedHeader,

  decorators: (Story) => {
    const rootRoute = createRootRoute();

    const route = createRoute({
      getParentRoute: () => rootRoute,
      id: "/(without-header-footer)/(authenticated)/(existing-user)" satisfies FileRouteTypes["id"],
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

type Story = StoryObj<typeof AuthenticatedHeader> & TypedStoryOptions;

export const AuthenticatedHeaderStory: Story = {
  args: {},
};
