import Main from "@/components/main/main";
import { Referral } from "@/components/main/user-dashboard/referral/referral";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/referral/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main className={`pt-20`}>
      <Referral />
    </Main>
  );
}
