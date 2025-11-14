import { AuthContext } from "@povio/ui";

import type { MockAuthUser } from "@/providers/auth.provider";

// import type { UserModels } from "@/data/user/user.models";

// export const useAuth = () => AuthContext.useAuth<UserModels.UserMeResponse>();
export const useAuth = () => AuthContext.useAuth<MockAuthUser>();
