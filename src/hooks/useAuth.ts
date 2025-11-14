import { AuthContext } from "@povio/ui";

import type { MockAuthUser } from "@/providers/auth.provider";

// Replace type with AuthUser from @/providers/auth.provider after switching from mock auth
export const useAuth = () => AuthContext.useAuth<MockAuthUser>();
