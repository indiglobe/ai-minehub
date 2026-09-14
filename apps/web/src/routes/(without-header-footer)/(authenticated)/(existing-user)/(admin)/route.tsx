import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)",
)({
  component: RouteComponent,

  beforeLoad:async({context:{userDetailsFromCookie:{role}}})=>{
    if(role === 'basic'){
      throw redirect({to:'/dashboard'})
    }
  }


});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
