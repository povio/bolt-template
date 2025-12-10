import { AuthContext } from "@povio/ui";

import type { MockAuthUser } from "@/providers/auth.provider";

// Replace type with correct type after switching from mock auth
export const useAuth = () => AuthContext.useAuth<MockAuthUser>();
