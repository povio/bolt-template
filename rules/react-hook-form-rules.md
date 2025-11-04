ALWAYS use `useForm` or `useFormAutosave` from `@povio/ui` for forms. NEVER use `useState` for form data. DO NOT use the default `useForm` hook from `react-hook-form`.

Pass `formControl={{ control, name: "fieldName" }}` to input components from `@povio/ui`.

```typescript
import { Button, TextArea, TextInput, useForm } from "@povio/ui";
import { PostsModels } from "@/data/posts/posts.models";

const { control, handleSubmit } = useForm({
  schema: PostsModels.CreatePostSchema,
});

const onSubmit = (data: PostsModels.CreatePostDto) => {
  // call mutation
}

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <TextInput 
      formControl={{ control, name: "title" }}
      label="Title" 
      name="Enter title"
    />

    <TextArea
      formControl={{ control, name: "description" }}
      label="Description" 
      name="Enter description"
    />

    <Button type="submit">Create</Button>
  </form>
)
```
