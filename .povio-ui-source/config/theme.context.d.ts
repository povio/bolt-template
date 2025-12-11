import { PropsWithChildren } from 'react';
import { z } from 'zod';
export declare namespace ThemeContext {
    const ThemeSchema: z.ZodLiteral<"dark" | "light" | "system">;
    export type Theme = z.infer<typeof ThemeSchema>;
    interface ThemeContextValue {
        theme: Theme;
        systemTheme?: Exclude<Theme, "system">;
        updateTheme: (theme: Theme) => void;
    }
    interface ThemeContextProviderProps {
        storageKey?: string;
    }
    export const ThemeContextProvider: ({ children, storageKey, }: PropsWithChildren<ThemeContextProviderProps>) => import("react/jsx-runtime").JSX.Element;
    export const useTheme: () => ThemeContextValue;
    export {};
}
