import { AuthContext } from "@povio/ui";

import type { MockAuthUser } from "@/providers/auth.provider";

// Replace type with correct model from @/openapi
export const useAuth = () => AuthContext.useAuth<MockAuthUser>();
