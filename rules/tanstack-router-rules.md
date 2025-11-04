# File Structure

```
src/pages/
  ├── __root.tsx           // Global layout (required)
  ├── home.tsx             // Single route
  └── dashboard/           // Has children with shared header
      ├── route.tsx        // Layout with Outlet (header + nav)
      ├── index.tsx        // /dashboard
      ├── settings.tsx     // /dashboard/settings
      └── users/           // Has children, no shared UI
          ├── index.tsx    // /dashboard/users
          └── $userId.tsx  // /dashboard/users/:userId
```

1. Navigation: NEVER use hardcoded strings in `Link` components or `useNavigate`. ALWAYS use `RouteConfig` for the `to` parameter.
2. Folders: Only create when route has two or more children. When adding children to `posts.tsx`, move to `posts/index.tsx` first
3. Layouts: 
   - Create `route.tsx` with `<Outlet />` when pages share UI (headers, navbars, sidebars)
   - Skip layout if child pages have no shared elements
   - Common use cases: dashboard header, authenticated layout, settings sidebar
4. Parameters: Use `$` prefix for dynamic routes (`$userId.tsx`)
5. Route Config: Update `RouteConfig` in `src/config/route.config.ts` after adding new routes
