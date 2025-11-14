import { AbilityContext } from "@povio/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { queryClient } from "@/config/query.config";
import Providers from "@/providers";
import { SupabaseAuthProvider } from "@/providers/auth.provider";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Providers
        providers={[
          { provider: QueryClientProvider, props: { client: queryClient } },
          { provider: SupabaseAuthProvider },
          { provider: AbilityContext.Provider },
        ]}
      >
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>,
  );
}
