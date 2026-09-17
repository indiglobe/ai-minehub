import { MiningSessions } from '@/components/main/dashboard-groups/admin-dashboard/mining-sesions/mining-sesions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(without-header-footer)/(authenticated)/(existing-user)/(admin)/mining-sesions/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <MiningSessions/>
    </>
  )
}
