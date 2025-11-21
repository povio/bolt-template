import { RestInterceptor } from "@povio/ui";
import type { AxiosError } from "axios";

export const ResponseInterceptor = new RestInterceptor((client) => {
  return client.interceptors.response.use(
    (response) => {
      return {
        ...response,
        // oxlint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: response.data === "" ? undefined : response.data,
      };
    },
    (error: AxiosError) => {
      throw error;
    },
  );
});
