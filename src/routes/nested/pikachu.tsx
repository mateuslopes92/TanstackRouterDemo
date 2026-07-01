import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nested/pikachu')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nested/pikachu"!</div>
}
