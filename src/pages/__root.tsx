import { Confirmation, ToastContainer, UIConfig, UIRouter } from "@povio/ui";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { UrlObject } from "url";

import GoogleAnalytics from "@/components/googleAnalytics/GoogleAnalytics";
import Providers from "@/providers";

import "@/config/i18n";
import "@/styles/index.css";
import "@/styles/theme.css";

function RootComponent() {
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

  return (
    <>
      <GoogleAnalytics />
      <Providers
        providers={[
          { provider: UIRouter.UIRouterProvider, props: { pathname, push, query, replace } },
          { provider: UIConfig.Provider },
          { provider: Confirmation.Provider },
        ]}
      >
        <RootLayout />
        <ToastContainer />
        <ReactQueryDevtools />
      </Providers>
    </>
  );
}

function RootLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
