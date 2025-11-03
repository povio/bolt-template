ALWAYS use the UI components from @povio/ui. NEVER use default buttons or inputs.

Use hooks from @povio/ui when available for a certain feature you need.

For forms, always use useForm or useFormAutosave from @povio/ui. Use input components from the package and pass them the formControl from these hooks. For example:

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