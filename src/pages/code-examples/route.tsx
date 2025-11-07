import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

import { RouteConfig } from "@/config/route.config";

function CodeExamplesLayout() {
  return (
    <div>
      <header className="flex items-center justify-between bg-elevation-fill-default-3 p-5">
        <Link to={RouteConfig.home.to}>Home</Link>

        <nav className="flex gap-4">
          <Link to={RouteConfig.codeExamples.index.to}>Code Examples</Link>
          <Link to={RouteConfig.codeExamples.text.to}>Text</Link>
          <Link to={RouteConfig.codeExamples.buttons.to}>Buttons</Link>
          <Link to={RouteConfig.codeExamples.forms.to}>Forms</Link>
          <Link to={RouteConfig.codeExamples.inputs.to}>Inputs</Link>
          <Link to={RouteConfig.codeExamples.table.to}>Table</Link>
          <Link to={RouteConfig.codeExamples.modals.to}>Modals</Link>
          <Link to={RouteConfig.codeExamples.toasts.to}>Toasts</Link>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/code-examples")({
  component: CodeExamplesLayout,
});
