import { clsx } from "clsx";
const uiOutlineClass = clsx(
  "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2"
);
const uiGroupOutlineClass = clsx(
  "group-focus:outline-none group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-solid group-focus-visible:outline-offset-2"
);
export {
  uiGroupOutlineClass,
  uiOutlineClass
};
