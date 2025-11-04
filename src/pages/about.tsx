import { createFileRoute, Link } from '@tanstack/react-router'

function RouteComponent() {
  return (
    <>
      <div>Hello "/about"!</div>
      <Link to="/">Home</Link>
    </>
  )
}

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})
