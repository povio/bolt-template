import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { FileCard } from "./FileCard.js";
const FileCardList = ({ uploadState, as, isDisabled, className, onRemove, onCancel }) => {
  return /* @__PURE__ */ jsx("div", { className: clsx("mt-10 flex flex-col items-start gap-4 self-stretch", className), children: uploadState.map((state, index) => /* @__PURE__ */ jsx(
    FileCard,
    {
      index,
      as,
      state,
      isDisabled,
      onRemove,
      onCancel
    },
    state.file.name || state.id || state.src
  )) });
};
export {
  FileCardList
};
