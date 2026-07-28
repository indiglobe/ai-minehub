import { SigninComp } from "@/components/main/signin/signin";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { FileRouteTypes } from "@/routeTree.gen";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const meta: Meta<typeof SigninComp> & TypedMetaOptions = {
  component: SigninComp,

  decorators: (Story) => {
    const rootRoute = createRootRoute();

    const route = createRoute({
      getParentRoute: () => rootRoute,
      id: "/(without-header-footer)/(guest)/signin/" satisfies FileRouteTypes["id"],
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

type Story = StoryObj<typeof SigninComp> & TypedStoryOptions;

export const SigninCompStory: Story = {
  args: {},
};
