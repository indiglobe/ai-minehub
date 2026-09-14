import { Conversations } from '@/components/main/admin-dashboard/message/message'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(without-header-footer)/(authenticated)/(existing-user)/(admin)/message/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Conversations/>
    </>
  )
}
