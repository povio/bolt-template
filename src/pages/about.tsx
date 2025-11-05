import { RouteConfig } from '@/config/route.config'
import { createFileRoute, Link } from '@tanstack/react-router'

function AboutPage() {
  return (
    <>
      <div>Hello "/about"!</div>
      <Link to={RouteConfig.home.to}>Home</Link>
    </>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
