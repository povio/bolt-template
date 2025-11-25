import { TextButton } from "@povio/ui";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

import { RouteConfig } from "@/config/route.config";

function CodeExamplesLayout() {
  return (
    <div>
      <header className="flex items-center justify-between bg-elevation-fill-default-3 p-5">
        <Link to={RouteConfig.home.to}>Home</Link>

        <nav className="flex gap-4">
          <TextButton link={{ href: RouteConfig.codeExamples.index.to }}>Code Examples</TextButton>
          <TextButton link={{ href: RouteConfig.codeExamples.text.to }}>Text</TextButton>
          <TextButton link={{ href: RouteConfig.codeExamples.buttons.to }}>Buttons</TextButton>
          <TextButton link={{ href: RouteConfig.codeExamples.forms.to }}>Forms</TextButton>
          <TextButton link={{ href: RouteConfig.codeExamples.inputs.to }}>Inputs</TextButton>
          <TextButton link={{ href: RouteConfig.codeExamples.table.to }}>Table</TextButton>
          <TextButton link={{ href: RouteConfig.codeExamples.modals.to }}>Modals</TextButton>
          <TextButton link={{ href: RouteConfig.codeExamples.toasts.to }}>Toasts</TextButton>
          <TextButton link={{ href: RouteConfig.codeExamples.fileUpload.to }}>File Upload</TextButton>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/code-examples")({
  component: CodeExamplesLayout,
});
