Whenever working with forms which are connected to a mutation hook from either src/data or src/mocks, you should ALWAYS use the useForm hook for state management. DO NOT use useState for entire or partial form data. Use zodResolver and the schema which is used for that hook/endpoint.

Example:

const form = useForm({
    resolver: zodResolver(PostsModels.createPostSchema),
});