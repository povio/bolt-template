import { jsx } from "react/jsx-runtime";
import { createContext, useState, useCallback, useEffect, useMemo, use } from "react";
import { z } from "zod";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
var ThemeContext;
((_ThemeContext) => {
  const DEFAULT_STORAGE_KEY = "theme";
  const ThemeSchema = z.literal(["light", "dark", "system"]);
  const ThemeContext2 = createContext(null);
  _ThemeContext.ThemeContextProvider = ({
    children,
    storageKey = DEFAULT_STORAGE_KEY
  }) => {
    const [systemTheme, setSystemTheme] = useState(() => {
      if (typeof window === "undefined") {
        return void 0;
      }
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      return media.matches ? "dark" : "light";
    });
    const { value: theme, set } = useLocalStorage({
      key: storageKey,
      schema: ThemeSchema
    });
    const updateTheme = useCallback(
      (theme2) => {
        set(theme2);
      },
      [set]
    );
    useEffect(() => {
      if (typeof window === "undefined") {
        return;
      }
      const onChange = (event) => {
        setSystemTheme(event.matches ? "dark" : "light");
      };
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", onChange);
      return () => {
        media.removeEventListener("change", onChange);
      };
    }, []);
    useEffect(() => {
      document.documentElement.classList.remove("dark");
      if ((!theme || theme === "system") && systemTheme === "dark" || theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else if (theme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.style.colorScheme = "light";
      } else {
        document.documentElement.style.colorScheme = "light";
      }
    }, [theme, systemTheme]);
    const contextValue = useMemo(
      () => ({
        theme: theme ?? "system",
        systemTheme,
        updateTheme
      }),
      [theme, systemTheme, updateTheme]
    );
    return /* @__PURE__ */ jsx(ThemeContext2.Provider, { value: contextValue, children });
  };
  _ThemeContext.useTheme = () => {
    const context = use(ThemeContext2);
    return context;
  };
})(ThemeContext || (ThemeContext = {}));
export {
  ThemeContext
};
