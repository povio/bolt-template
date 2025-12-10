import { jsx } from "react/jsx-runtime";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { unpackRules } from "@casl/ability/extra";
import { useAbility } from "@casl/react";
import { createContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/auth.context.js";
var AbilityContext;
((AbilityContext2) => {
  const createAppAbilityBuilder = () => new AbilityBuilder(createMongoAbility);
  const initialAppAbility = createAppAbilityBuilder().build();
  const Context = createContext({});
  ({ Consumer: AbilityContext2.Consumer } = Context);
  AbilityContext2.Provider = ({ children }) => {
    const [ability, setAbility] = useState(initialAppAbility);
    const { user } = AuthContext.useAuth();
    useEffect(() => {
      if (!user || !("aclRules" in user)) {
        return;
      }
      const { can, build } = createAppAbilityBuilder();
      const packedRules = user.aclRules;
      const rules = unpackRules(packedRules);
      rules.forEach(({ action, subject, conditions }) => {
        can(action, subject, conditions);
      });
      setAbility(build());
    }, [user]);
    return /* @__PURE__ */ jsx(Context.Provider, { value: ability, children });
  };
  AbilityContext2.useAbility = () => {
    const ability = useAbility(Context);
    return ability;
  };
})(AbilityContext || (AbilityContext = {}));
export {
  AbilityContext
};
