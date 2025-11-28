import { type AuthContext, Confirmation, ToastContainer, UIConfig, UIRouter } from "@povio/ui";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext, useLocation, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { UrlObject } from "url";
import { onCLS, onINP, onLCP } from "web-vitals";

import { NotFoundPage } from "@/components/404";
import GoogleAnalytics from "@/components/googleAnalytics/GoogleAnalytics";
import { DefaultAppHead } from "@/components/shared/head/DefaultAppHead";
import { AppConfig } from "@/config/app.config";
import { initA11y } from "@/config/inits/a11y";
import { initLogger } from "@/config/inits/logger";
import { initSentry } from "@/config/inits/sentry";
import Providers from "@/providers";
import { AppErrorBoundary } from "@/providers/AppErrorBoundary";
import { Fonts } from "@/styles/fonts/fonts";

import "@/config/i18n";
import "@/styles/tailwind-v3/globals.css";

initLogger();
initSentry();
initA11y();

const Root = () => {
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const push = async (to: string | UrlObject) => {
    const url = typeof to === "string" ? to : to.pathname || "/";
    await navigate({ href: url });
    return true;
  };

  const replace = async (to: string | UrlObject) => {
    const url = typeof to === "string" ? to : to.pathname || "/";
    await navigate({ href: url, replace: true });
    return true;
  };

  const { pathname } = location;
  const query = Object.fromEntries(new URLSearchParams(location.search).entries());

  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("lang", lng);
      }
    });
  }, [i18n]);

  if (AppConfig.enableWebVitals) {
    onCLS(console.log);
    onINP(console.log);
    onLCP(console.log);
  }

  return (
    <>
      <GoogleAnalytics />
      <AppErrorBoundary>
        <Providers
          providers={[
            { provider: UIRouter.UIRouterProvider, props: { pathname, push, query, replace } },
            { provider: UIConfig.Provider },
            { provider: Confirmation.Provider },
          ]}
        >
          <Fonts />
          <DefaultAppHead />

          <RootLayout />

          <ToastContainer />
          <TanStackDevtools
            plugins={[
              {
                name: "TanStack Query",
                render: <ReactQueryDevtoolsPanel />,
                defaultOpen: true,
              },
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
                defaultOpen: false,
              },
            ]}
          />
        </Providers>
      </AppErrorBoundary>
    </>
  );
};

function RootLayout() {
  return (
    <main className="flex min-h-screen flex-col">
      <Outlet />
    </main>
  );
}

type RouterContext = {
  auth: undefined | ReturnType<typeof AuthContext.useAuth>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#ffffff" },
      { title: "Bolt Template" },
      { name: "msapplication-TileColor", content: "#da532c" },
    ],
    links: [{ rel: "icon", type: "image/svg+xml", href: "/vite.svg" }], // Not working? Update index.html
  }),
  component: Root,
  notFoundComponent: NotFoundPage,
});
