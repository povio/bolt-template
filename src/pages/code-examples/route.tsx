import { RouteConfig } from '@/config/route.config'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

function CodeExamplesLayout() {
  return (
    <div>
      <header className="flex justify-between items-center p-5 bg-elevation-fill-default-3">
        <Link to={RouteConfig.home.to}>Home</Link>

        <nav className="flex gap-4">
          <Link to={RouteConfig.codeExamples.index.to}>Code Examples</Link>
          <Link to={RouteConfig.codeExamples.buttons.to}>Buttons</Link>
          <Link to={RouteConfig.codeExamples.inputs.to}>Inputs</Link>
          <Link to={RouteConfig.codeExamples.table.to}>Table</Link>
          <Link to={RouteConfig.codeExamples.modals.to}>Modals</Link>
          <Link to={RouteConfig.codeExamples.toasts.to}>Toasts</Link>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/code-examples')({
  component: CodeExamplesLayout,
})
