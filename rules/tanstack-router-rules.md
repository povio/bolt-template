**IMPORTANT:** After adding/changing routes, run dev server to regenerate `routeTree.gen.ts`.

Code Examples: See `src/pages/code-examples/` for a working example of nested routes with a layout (`route.tsx`) and child pages. **NEVER modify files in this directory** - they are reference examples only.

Structure:
```
src/pages/
  ├── __root.tsx           // Global layout & providers (required)
  ├── (private)/           // Auth required - redirects to login if not authenticated
  │   └── dashboard/       // Has 2+ children
  │       ├── route.tsx    // Layout with <Outlet /> (if shared UI)
  │       ├── index.tsx    // /dashboard
  │       └── $userId.tsx  // /dashboard/:userId (dynamic param)
  ├── (public-only)/       // Must be logged out - redirects to home if authenticated
  │   └── login.tsx        // /login
  └── home.tsx             // Public route (accessible to everyone)
```

Auth Folders:
- `(private)/` - Protected routes requiring authentication (e.g., dashboard, profile)
- `(public-only)/` - Guest-only routes (e.g., login, register) - redirects authenticated users
- Outside both folders - Public routes accessible to everyone

Rules:
1. **Folders:** NEVER have both a file and folder with the same name (e.g., `posts.tsx` + `posts/`) - TanStack Router will only generate routes for one. When adding children to a route, FIRST move the file to `index.tsx` inside a folder, THEN add child routes
2. **Layouts:** Create `route.tsx` with `<Outlet />` only when pages share UI (headers, navbars, sidebars)
3. **Dynamic Routes:** Use `$` prefix (`$userId.tsx`)
4. **Route Config:** Update `src/config/route.config.ts` after adding routes
