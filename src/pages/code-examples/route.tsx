import { TextButton } from "@povio/ui";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

function CodeExamplesLayout() {
  return (
    <div>
      <header className="flex items-center justify-between bg-elevation-fill-default-3 p-5">
        <Link to="/">Home</Link>

        <nav className="flex gap-4">
          <TextButton link={{ href: "/code-examples" }}>Code Examples</TextButton>
          <TextButton link={{ href: "/code-examples/text" }}>Text</TextButton>
          <TextButton link={{ href: "/code-examples/buttons" }}>Buttons</TextButton>
          <TextButton link={{ href: "/code-examples/forms" }}>Forms</TextButton>
          <TextButton link={{ href: "/code-examples/inputs" }}>Inputs</TextButton>
          <TextButton link={{ href: "/code-examples/table" }}>Table</TextButton>
          <TextButton link={{ href: "/code-examples/modals" }}>Modals</TextButton>
          <TextButton link={{ href: "/code-examples/toasts" }}>Toasts</TextButton>
          <TextButton link={{ href: "/code-examples/file-upload" }}>File Upload</TextButton>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/code-examples")({
  component: CodeExamplesLayout,
});
