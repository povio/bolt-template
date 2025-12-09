import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { Tag } from "../../../text/Tag/Tag.js";
const SelectInputTags = ({
  selectedItems,
  isDisabled,
  selectedTagsType,
  collapseAfter,
  onRemove
}) => {
  const { displayedItems, remainingCount } = useMemo(() => {
    if (!collapseAfter || selectedItems.length <= collapseAfter) {
      return { displayedItems: selectedItems, remainingCount: 0 };
    }
    return {
      displayedItems: selectedItems.slice(0, collapseAfter - 1),
      remainingCount: selectedItems.length - (collapseAfter - 1)
    };
  }, [selectedItems, collapseAfter]);
  if (selectedTagsType === "tags") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      displayedItems.map((item) => /* @__PURE__ */ jsx(
        Tag,
        {
          dismissable: true,
          isDisabled,
          onDismiss: () => onRemove(item.id),
          excludeFromTabOrder: true,
          className: "z-1",
          children: item.label
        },
        item.id
      )),
      remainingCount > 0 && /* @__PURE__ */ jsx(
        Tag,
        {
          isDisabled,
          excludeFromTabOrder: true,
          children: `+${remainingCount} more`
        },
        "remaining-count"
      )
    ] });
  }
  return /* @__PURE__ */ jsx("p", { children: selectedItems.map((item) => item.label).join(", ") });
};
export {
  SelectInputTags
};
