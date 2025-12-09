import { jsx } from "react/jsx-runtime";
import { Link as Link$1 } from "react-aria-components";
import { link } from "./link.cva.js";
import { LinkContext } from "../../../config/link.context.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const Link = ({ variant, ...props }) => {
  const linkContext = LinkContext.useLinkContext();
  const uiStyle = UIStyle.useConfig();
  const linkCva = uiStyle?.link?.cva ?? link;
  const LinkComponent = linkContext?.LinkComponent ?? Link$1;
  if (!props.to && props.href) {
    props.to = props.href;
  }
  return /* @__PURE__ */ jsx(
    LinkComponent,
    {
      ...props,
      className: linkCva({ variant, className: props.className })
    }
  );
};
export {
  Link
};
