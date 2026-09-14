import Main from "@/components/main/main";
import { Mining } from "@/components/main/user-dashboard/mining/mining";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/mining/",
)({
  component: RouteComponent,

  loader: async () => {
    return {
      allMiningProfiles: serverFn__readAllMiningProfiles(),
    };
  },
});

function RouteComponent() {
  return (
    <Main className="space-y-20 pt-10">
      <Mining />
    </Main>
  );
}
