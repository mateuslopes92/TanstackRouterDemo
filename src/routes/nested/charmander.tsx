import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nested/charmander')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nested/charmander"!</div>
}
