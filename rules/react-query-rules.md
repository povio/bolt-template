# Structure

```
src/data/
  └── posts/
      ├── posts.queries.ts  // PostsQueries namespace
      └── posts.models.ts   // PostsModels namespace
```

**Naming:** camelCase folders (`userProfiles/`), PascalCase namespaces (`UserProfilesQueries`)

# Pattern

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

// Usage
const { data } = PostsQueries.useList();
```

# Rules

1. Use namespace syntax (PostsQueries, PostsModels)
2. Use z.string() for IDs (not z.uuid())
3. Use react-hook-form with zodResolver
4. Invalidate cache after mutations
5. Use Supabase joins for nested data
