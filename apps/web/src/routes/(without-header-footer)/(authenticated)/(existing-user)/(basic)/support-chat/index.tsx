import { SupportChat } from '@/components/main/dashboard-groups/user-dashboard/support-chat/support-chat'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(without-header-footer)/(authenticated)/(existing-user)/(basic)/support-chat/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SupportChat/>
    </>
  )
}
