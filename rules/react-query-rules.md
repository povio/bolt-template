1. NEVER use Supabase. ALL data fetching/mutations MUST go through `src/openapi/*.queries.ts` files
2. Invalidate cache when calling mutations

```typescript
const createPostMutation = PostsQueries.useCreate({
  invalidateCurrentModule: true,
  invalidateModules: [QueryModule.Profiles], // Any other modules that include queries whose data may be affected by this mutation
});
```
