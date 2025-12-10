import { QueryClient } from '@tanstack/react-query';
export declare namespace QueriesUtils {
    const prefetchMultipleQueries: (queryClient: QueryClient, queries: Array<(queryClient: QueryClient) => Promise<void>>) => Promise<void[]>;
}
