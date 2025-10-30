**ALWAYS use `useForm` for forms connected to mutations. NEVER use `useState` for form data.**

```typescript
const form = useForm({
  resolver: zodResolver(PostsModels.createPostSchema),
});
```

Use zodResolver with the schema from your data layer.
