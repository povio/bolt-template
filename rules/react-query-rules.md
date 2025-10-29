# React Query Usage Guidelines

All data hooks are created in `src/data` and wrap Supabase queries with React Query.

## Data Layer Structure

```
src/data/
  ├── posts/
  │   ├── posts.queries.ts    // Export as PostsQueries namespace
  │   └── posts.models.ts     // Export as PostsModels namespace
  └── userProfiles/           // Use camelCase for multi-word resources
      ├── userProfiles.queries.ts
      └── userProfiles.models.ts
```

**Naming Convention:**

- Use camelCase for multi-word resources: `userProfiles/`, `blogPosts/`, `orderItems/`
- Namespace follows PascalCase: `UserProfilesModels`, `BlogPostsQueries`

## Namespace Pattern (Required)

ALWAYS use TypeScript namespace syntax:

```typescript
// posts.models.ts
export namespace PostsModels {
    export const postSchema = z.object({
        id: z.string(),  // Use z.string() for IDs, not z.uuid()
        title: z.string(),
    });
    export const createPostSchema = z.object({ title: z.string() });
    export type Post = z.infer<typeof postSchema>;
    export type CreatePostDto = z.infer<typeof createPostSchema>;
}

// posts.queries.ts
export namespace PostsQueries {
    export const useList = () => useQuery({ queryKey: ["posts"], queryFn: async () => {...} });
    export const useCreate = () => useMutation({
        mutationFn: async (data: PostsModels.CreatePostDto) => {...},
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] })
    });
}

// Usage in components
import { PostsQueries } from "@/data/posts/posts.queries";
import { PostsModels } from "@/data/posts/posts.models";

const { data } = PostsQueries.useList();
const form = useForm({ resolver: zodResolver(PostsModels.createPostSchema) });
```

## Rules

1. ALWAYS use namespace syntax (PostsQueries, PostsModels)
2. ALWAYS use z.string() for IDs, NOT z.uuid()
3. ALWAYS use react-hook-form with zodResolver
4. ALWAYS invalidate cache after mutations
5. Use Supabase joins for nested data when displayed together
6. Handle loading and error states
7. Use proper TypeScript types from namespaced models
