import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(without-header-footer)/(authenticated)/(existing-user)/deposit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/(without-header-footer)/(authenticated)/(existing-user)/deposit/"!
    </div>
  )
}
