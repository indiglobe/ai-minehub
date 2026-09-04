import Main from "@/components/main/main";
import { Mining } from "@/components/main/mining/mining";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/mining/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main className="space-y-20 pt-10">
      <Mining />
    </Main>
  );
}
