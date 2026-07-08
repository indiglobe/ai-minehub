import { WelcomeComp } from "@/components/main/welcome/welcome";
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
  useLoaderData,
  useRouteContext,
} from "@tanstack/react-router";

const routeContext = useRouteContext({
  from: "/(without-header-footer)/(authenticated)/(new-user)/welcome/",
});

const loaderData = useLoaderData({
  from: "/(without-header-footer)/(authenticated)/(new-user)/welcome/",
});

const meta: Meta<typeof WelcomeComp> & TypedMetaOptions = {
  component: WelcomeComp,
  decorators: (Story) => {
    const rootRoute = createRootRoute();

    const route = createRoute({
      getParentRoute: () => rootRoute,
      path: "/welcome/" satisfies FileRouteTypes["fullPaths"],
      id: "/(without-header-footer)/(authenticated)/(new-user)/welcome/" satisfies FileRouteTypes["id"],
      beforeLoad: () =>
        ({
          session: {
            session: {
              id: "sess_01JY8N3A4BCDEF56789GHIJKL",
              createdAt: new Date("2026-07-02T10:15:30.000Z"),
              updatedAt: new Date("2026-07-02T12:45:00.000Z"),
              userId: "user_01JY8N3A123456789ABCDEFG",
              expiresAt: new Date("2026-07-09T10:15:30.000Z"),
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample.token.signature",
              ipAddress: "192.168.1.100",
              userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36",
            },
            user: {
              id: "user_01JY8N3A123456789ABCDEFG",
              createdAt: new Date("2026-01-15T08:30:00.000Z"),
              updatedAt: new Date("2026-07-02T12:45:00.000Z"),
              email: "john.doe@example.com",
              emailVerified: true,
              name: "John Doe",
              image: "https://example.com/avatars/john-doe.png",
            },
          },
        }) satisfies Pick<typeof routeContext, "session">,
      loader: () =>
        ({
          referralCode: "23er23er23",
        }) satisfies typeof loaderData,
      component: Story,
    });

    const routeTree = rootRoute.addChildren([route]);

    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/"] satisfies FileRouteTypes["fullPaths"][],
      }),
    });
    return <RouterProvider router={router} />;
  },
};

export default meta;

type Story = StoryObj<typeof WelcomeComp> & TypedStoryOptions;

export const WelcomeCompStory: Story = {
  args: {},
};
