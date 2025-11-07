import { Confirmation, ToastContainer, UIConfig } from "@povio/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useState } from "react";

import { QueryConfig } from "@/config/query.config";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient(QueryConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <UIConfig.Provider>
        <Confirmation.Provider>
          <RouterProvider router={router} />
          <ToastContainer />
        </Confirmation.Provider>
      </UIConfig.Provider>
    </QueryClientProvider>
  );
}
