ALWAYS use `useForm`/`useFormAutosave` from `@povio/ui`. NEVER use `useState` for forms or `react-hook-form` directly.

- Always pass zodSchema to `useForm`/`useFormAutosave`

```typescript
import { Button, TextInput, useForm } from "@povio/ui";
import { PostsModels } from "@/openapi/posts/posts.models";

const { control, handleSubmit } = useForm({
  zodSchema: PostsModels.CreatePostSchema,
});

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <TextInput 
      formControl={{ control, name: "title" }}
      label="Title" 
    />
    <Button type="submit">Create</Button>
  </form>
);
```
