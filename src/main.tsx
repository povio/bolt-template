import { LinkContext, type LinkNavigationProps } from "@povio/ui";
import { AbilityContext } from "@povio/ui/auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createLink, createRouter } from "@tanstack/react-router";
import { type ComponentType, StrictMode } from "react";
import { Link as AriaLink } from "react-aria-components";
import { createRoot } from "react-dom/client";

import { queryClient } from "@/config/query.config";
import { useAuth } from "@/hooks/useAuth";
import Providers from "@/providers";
import { SupabaseAuthProvider } from "@/providers/auth.provider";

import { routeTree } from "./routeTree.gen";

const LinkComponent = createLink(AriaLink) as unknown as ComponentType<LinkNavigationProps>;

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  // basepath: import.meta.env.BASE_URL, // Uncomment this when moving to monorepo
  context: {
    auth: undefined,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Main = () => {
  const auth = useAuth();

  return (
    <RouterProvider
      router={router}
      context={{ auth }}
    />
  );
};

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Providers
        providers={[
          { provider: LinkContext.LinkContextProvider, props: { LinkComponent } },
          { provider: QueryClientProvider, props: { client: queryClient } },
          { provider: SupabaseAuthProvider }, // Replace with JWTProvider when implementing JWT authentication
          { provider: AbilityContext.Provider },
        ]}
      >
        <Main />
      </Providers>
    </StrictMode>,
  );
}
