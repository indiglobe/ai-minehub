import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route as LayoutRoute } from "@/routes/(without-header-footer)/(authenticated)/(existing-user)/route";
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
import { UserDashboard } from "@/components/main/dashboard-groups/user-dashboard/dashboard/dashboard";

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

  const dashboardIndexRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/dashboard/" satisfies keyof FileRoutesByFullPath,
    component: () => (
      <>
        <UserDashboard />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    dashboardLayoutRoute.addChildren([dashboardIndexRoute]),
  ]);

  const history = createMemoryHistory({
    initialEntries: [initialPath],
  });

  return createRouter({
    routeTree,
    history,
  });
}

const meta = {
  beforeEach: beforeEach,

  parameters: {
    tanstack: {
      router: {
        // @ts-ignore no-need to check working just fine
        route: LayoutRoute,
      },
    },
  },
} satisfies Meta<typeof LayoutRoute>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OverallDashboardStory: Story = {
  args: {},
  render: () => {
    const router = renderWithMockRouter("/dashboard/");
    return <RouterProvider router={router} />;
  },
};
