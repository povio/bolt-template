import { TextButton } from "@povio/ui";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

function CodeExamplesLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="flex items-center justify-between border-elevation-outline-default-1 border-b bg-elevation-fill-default-2 p-5">
        <Link to="/">Home</Link>

        <nav className="flex gap-4">
          <TextButton link={{ to: "/code-examples" }}>Code Examples</TextButton>
          <TextButton link={{ to: "/code-examples/text" }}>Text</TextButton>
          <TextButton link={{ to: "/code-examples/buttons" }}>Buttons</TextButton>
          <TextButton link={{ to: "/code-examples/forms" }}>Forms</TextButton>
          <TextButton link={{ to: "/code-examples/inputs" }}>Inputs</TextButton>
          <TextButton link={{ to: "/code-examples/table" }}>Table</TextButton>
          <TextButton link={{ to: "/code-examples/modals" }}>Modals</TextButton>
          <TextButton link={{ to: "/code-examples/toasts" }}>Toasts</TextButton>

          {/* Ignore if using Supabase */}
          <TextButton link={{ to: "/code-examples/file-upload" }}>File Upload</TextButton>
        </nav>
      </header>

      <main className="grow overflow-y-auto">
        <Outlet />
      </main>

      <footer className="bg-elevation-fill-default-2 p-5">test</footer>
    </div>
  );
}

export const Route = createFileRoute("/code-examples")({
  component: CodeExamplesLayout,
});
