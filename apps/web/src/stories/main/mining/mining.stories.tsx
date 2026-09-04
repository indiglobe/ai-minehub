import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(without-header-footer)/(authenticated)/(existing-user)/mining/index";
import { contextData__userDetailsFromCookies } from "@/integrations/storybook/context-data";
import { beforeEach } from "@/integrations/storybook/mock";
import { useMatch } from "@tanstack/react-router";
import { Mining } from "@/components/main/mining/mining";
// import {
//   createMemoryHistory,
//   createRootRoute,
//   createRoute,
//   createRouter,
//   RouterProvider,
// } from "@tanstack/react-router";
// import type { FileRouteTypes } from "@/routeTree.gen";

const meta = {
  beforeEach: beforeEach,

  // decorators:[(Story)=>{
  //   useMatch({from:'/(without-header-footer)/(authenticated)/(existing-user)/mining/'})
  //   return <Story/>
  // }]

  // decorators: (Story) => {
  //   const rootRoute = createRootRoute();

  //   const route = createRoute({
  //     getParentRoute: () => rootRoute,
  //     id: "/(without-header-footer)/(authenticated)/(existing-user)" satisfies FileRouteTypes["id"],
  //     component: Story,
  //   });

  //   const routeTree = rootRoute.addChildren([route]);

  //   const router = createRouter({
  //     routeTree,
  //     history: createMemoryHistory({
  //       initialEntries: [
  //         "/(with-header-footer)",
  //       ] satisfies FileRouteTypes["id"][],
  //     }),
  //   });
  //   return <RouterProvider router={router} />;
  // },

  component: Mining,

  parameters: {
    tanstack: {
      router: {
        route: {
          id: "/(without-header-footer)/(authenticated)/(existing-user)/mining/",
        },
        path: "/mining/",
        // context: {
        //   userDetailsFromCookie: contextData__userDetailsFromCookies({
        //     role: "admin",
        //   }),
        // },
      },
    },
  },
} satisfies Meta<typeof Route>;

export default meta;

type Story = StoryObj<typeof meta> & TypedStoryOptions;

// =========================================================
// =========================================================
// STORIES
// =========================================================
// =========================================================

export const MiningStory: Story = {
  args: {},
};
