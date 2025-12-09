import { jsx } from "react/jsx-runtime";
import { FileUpload } from "./FileUpload.js";
const FileUploadContainer = (props) => {
  return /* @__PURE__ */ jsx(
    FileUpload,
    {
      label: "",
      hideLabel: true,
      variant: "vertical",
      as: "button",
      ...props
    }
  );
};
export {
  FileUploadContainer
};
