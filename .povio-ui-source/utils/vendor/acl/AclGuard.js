import { UIRouter } from "../../../config/router.context.js";
import { AbilityContext } from "./ability.context.js";
const createAclGuard = () => ({ canUse, redirectTo = "/", children }) => {
  const ability = AbilityContext.useAbility();
  const { replace } = UIRouter.useUIRouter();
  if (!ability.can(canUse[0], canUse[1])) {
    replace(redirectTo);
    return null;
  }
  return children;
};
export {
  createAclGuard
};
