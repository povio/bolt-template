import { jsx } from "react/jsx-runtime";
import { SelectDesktop } from "./SelectDesktop.js";
import { SelectMobile } from "./SelectMobile.js";
import { SelectContext } from "./select.context.js";
import { UIConfig } from "../../../../config/uiConfig.context.js";
import { useBreakpoint } from "../../../../hooks/useBreakpoint.js";
const SelectBase = (dProps) => {
  const ui = UIConfig.useConfig();
  const props = {
    ...dProps,
    selectionMode: dProps.selectionMode ?? ui.select.selectionMode,
    variant: dProps.variant ?? ui.input.variant,
    as: dProps.as ?? ui.input.as,
    size: dProps.size ?? ui.input.size,
    hideLabel: dProps.hideLabel ?? ui.input.hideLabel,
    isClearable: dProps.isClearable ?? ui.input.isClearable,
    isSearchable: dProps.isSearchable ?? ui.select.isSearchable,
    selectedTagsType: dProps.selectedTagsType ?? ui.select.selectedTagsType,
    ignoreTriggerWidth: dProps.virtualizerOptions || dProps.items.length > 100 ? false : dProps.ignoreTriggerWidth ?? false,
    collapseAfter: dProps.collapseAfter ?? ui.select.collapseAfter
  };
  const isDesktop = useBreakpoint("md");
  return /* @__PURE__ */ jsx(SelectContext.Provider, { ...props, children: isDesktop ? /* @__PURE__ */ jsx(SelectDesktop, { ...props }) : /* @__PURE__ */ jsx(SelectMobile, { ...props }) });
};
export {
  SelectBase
};
