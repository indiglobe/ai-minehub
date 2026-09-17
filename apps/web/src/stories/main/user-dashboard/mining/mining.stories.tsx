import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route as LayoutRoute } from "@/routes/(without-header-footer)/(authenticated)/(existing-user)/(basic)/route";
import {
  beforeEach,
  mocked__contextData__userDetailsFromCookies,
} from "@/integrations/storybook/mock";
import type { FileRoutesByFullPath, FileRoutesById } from "@/routeTree.gen";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { Mining } from "@/components/main/dashboard-groups/user-dashboard/mining/mining";

const meta = {
  beforeEach: beforeEach,

  parameters: {
    tanstack: {
      router: {
        // @ts-ignore no-need to check working just fine
        route: LayoutRoute,
        routeOverrides: {
          "/(without-header-footer)/(authenticated)/(existing-user)": {
            context: () => {
              return {
                userDetailsFromCookie:
                  mocked__contextData__userDetailsFromCookies(),
              };
            },
          },
        },
      },
    },
  },
} satisfies Meta<typeof LayoutRoute>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MiningStory: Story = {
  args: {},
  render: () => {
    const router = renderWithMockRouter("/mining/");
    return <RouterProvider router={router} />;
  },
};

function renderWithMockRouter(initialPath: keyof FileRoutesByFullPath = "/") {
  const rootRoute = createRootRoute();

  const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "/(without-header-footer)/(authenticated)/(existing-user)" satisfies keyof FileRoutesById,
    context: () => {
      return {
        userDetailsFromCookie: mocked__contextData__userDetailsFromCookies(),
      };
    },
    component: () => (
      <>
        <Outlet />
      </>
    ),
  });

  const basicUserDashboardLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)" satisfies keyof FileRoutesById,
    component: () => (
      <>
        <Outlet />
      </>
    ),
  });

  const miningIndexRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/mining/" satisfies keyof FileRoutesByFullPath,
    component: () => (
      <>
        <Mining />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    dashboardLayoutRoute.addChildren([
      basicUserDashboardLayoutRoute,
      miningIndexRoute,
    ]),
  ]);

  const history = createMemoryHistory({
    initialEntries: [initialPath],
  });

  return createRouter({
    routeTree,
    history,
  });
}
