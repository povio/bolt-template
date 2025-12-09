import { jsx } from "react/jsx-runtime";
import { createContext, use } from "react";
import { useDeepCompareMemo } from "../hooks/useDeepCompare.js";
import { ObjectUtils } from "../utils/object.utils.js";
var UIConfig;
((UIConfig2) => {
  const DEFAULT_CONFIG = {
    input: {
      variant: "outlined",
      as: "default",
      size: "default",
      isClearable: false,
      hideLabel: false
    },
    numberInput: {
      formatOptions: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
      }
    },
    radioGroup: {
      variant: "default",
      hideLabel: false
    },
    checkbox: {
      variant: "default"
    },
    select: {
      selectionMode: "single",
      isSearchable: false,
      selectedTagsType: "list",
      collapseAfter: 3
    },
    toggle: {
      variant: "default"
    },
    slider: {
      minValue: 0,
      maxValue: 100
    },
    dateInput: {
      todayIcon: false,
      shouldForceLeadingZeros: false
    }
  };
  const Context = createContext(DEFAULT_CONFIG);
  UIConfig2.Provider = ({ config = {}, children }) => {
    const parentConfig = use(Context) || DEFAULT_CONFIG;
    const value = useDeepCompareMemo(() => {
      return ObjectUtils.deepConditionalMerge(
        parentConfig,
        config,
        (val) => val !== null && val !== void 0
      );
    }, [config, parentConfig]);
    return /* @__PURE__ */ jsx(Context.Provider, { value, children });
  };
  UIConfig2.useConfig = () => {
    const context = use(Context);
    if (!context) {
      throw new Error("UIConfig.useConfig must be used within a UIConfig.Provider");
    }
    return context;
  };
})(UIConfig || (UIConfig = {}));
export {
  UIConfig
};
