import { AllUsers } from '@/components/main/dashboard-groups/admin-dashboard/users/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AllUsers/>
    </>
  )
}
