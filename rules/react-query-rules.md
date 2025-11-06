Structure:
```
src/data/posts/
  ├── posts.queries.ts  // PostsQueries namespace
  └── posts.models.ts   // PostsModels namespace
```

Pattern:
```typescript
// posts.models.ts
export namespace PostsModels {
  export const postSchema = z.object({ id: z.string(), title: z.string() });
  export type Post = z.infer<typeof postSchema>;
}

// posts.queries.ts
export namespace PostsQueries {
  export const useList = () => useQuery({ queryKey: ["posts"], queryFn: ... });
  export const useCreate = () => useMutation({
    mutationFn: async (data: PostsModels.CreatePostDto) => {...},
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] })
  });
}
```

Rules:
1. NEVER use Supabase directly in components - ALL data fetching/mutations MUST go through `*.queries.ts` files
2. Use namespace syntax: `PostsQueries`, `PostsModels`
3. Naming: camelCase folders (`userProfiles/`), PascalCase namespaces (`UserProfilesQueries`)
4. Use `z.string()` for IDs (not `z.uuid()`)
5. Invalidate cache after mutations
6. Use Supabase joins for nested data
