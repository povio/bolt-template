**IMPORTANT:** After adding/changing routes, run dev server to regenerate `routeTree.gen.ts`.

Structure:
```
src/pages/
  ├── __root.tsx        // Global layout (required)
  ├── home.tsx          // Single route
  └── dashboard/        // Has 2+ children
      ├── route.tsx     // Layout with <Outlet /> (if shared UI)
      ├── index.tsx     // /dashboard
      └── $userId.tsx   // /dashboard/:userId (dynamic param)
```

Rules:
1. **Navigation:** ALWAYS use `RouteConfig.routeName.to`, NEVER hardcoded strings
2. **Folders:** Only create for 2+ children. When adding children to `posts.tsx`, move to `posts/index.tsx` first
3. **Layouts:** Create `route.tsx` with `<Outlet />` only when pages share UI (headers, navbars, sidebars)
4. **Dynamic Routes:** Use `$` prefix (`$userId.tsx`)
5. **Route Config:** Update `src/config/route.config.ts` after adding routes
