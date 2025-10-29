# Tanstack Router Usage Guidelines

## ❌ NEVER DO THIS:

- ❌ Don't use string literals: `<Link to="/dashboard" />`
- ❌ Don't use flat file names: `dashboard.users.tsx`
- ❌ Don't skip layout when pages share UI elements
- ❌ Don't forget Outlet in layout files
- ❌ Don't create folder for single route without children
- ❌ Don't keep single file route when adding child routes - MUST convert to folder with `index.tsx`

## ✅ ALWAYS DO THIS:

- ✅ Use RouteConfig: `<Link to={RouteConfig.dashboard.to} />`
- ✅ Use folder structure only when there are child routes
- ✅ When adding child routes, convert single file → folder with `index.tsx` first
- ✅ Create route.tsx with Outlet for shared layouts
- ✅ Let Outlet render the page content inside layout

## File Structure (Required)

```
src/pages/
   ├── __root.tsx          // Global layout (wraps entire app with Outlet)
   ├── home.tsx            // Single route, no children
   ├── about.tsx           // Single route, no children
   └── dashboard/          // Has child routes
       ├── route.tsx       // Layout (navbar + Outlet)
       ├── index.tsx       // Dashboard home (/dashboard)
       ├── settings.tsx    // Settings page (/dashboard/settings)
       └── users/          // Has child routes
           ├── index.tsx   // Users list (/dashboard/users)
           └── $userId.tsx // Single user (/dashboard/users/:userId)
```

## Core Rules

1. Files & Folders:

   - Use folder + index.tsx ONLY when there are child routes
   - Use descriptive file name in parent folder when no children (e.g., `dashboard/settings.tsx`)
   - **CRITICAL**: When adding child routes to existing route, MUST move file into folder first:
     - If you have `posts.tsx` and need to add `posts/$postId.tsx`
     - First: Move `posts.tsx` → `posts/index.tsx`
     - Then: Add `posts/$postId.tsx`
     - Both files CANNOT coexist at different levels
   - NEVER use dot notation in filenames
   - Use $ prefix for dynamic parameters ($userId.tsx)
   - Use \_\_root.tsx for app-wide layout

2. Navigation:

   - ALWAYS import from route.config.ts
   - ALWAYS use RouteConfig.\*.to
   - NEVER use string literals
   - For params: `RouteConfig.userDetails.to({ userId: "123" })`

3. Layouts:
   - Use \_\_root.tsx for global app layout
   - Use route.tsx for shared UI (headers, navbars, sidebars)
   - ALWAYS use Outlet to render the page content inside layout
   - Group pages that share common UI elements
   - Layout wraps shared UI around child page content
