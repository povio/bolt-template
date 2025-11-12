import { Confirmation, ToastContainer, UIConfig } from "@povio/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { QueryConfig } from "@/config/query.config";
import Providers from "@/providers";
import { routeTree } from "@/routeTree.gen";

import "@/config/i18n";
import "@/styles/index.css";
import "@/styles/theme.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { i18n } = useTranslation();

  const [queryClient] = useState(() => new QueryClient(QueryConfig));

  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("lang", lng);
      }
    });
  }, [i18n]);

  return (
    <Providers
      providers={[
        { provider: QueryClientProvider, props: { client: queryClient } },
        { provider: UIConfig.Provider },
        { provider: Confirmation.Provider },
      ]}
    >
      <RouterProvider router={router} />
      <ToastContainer />
      <ReactQueryDevtools />
    </Providers>
  );
}
