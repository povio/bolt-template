Create a new Bolt project from the template here: http://bolt.new/github.com/poviolabs/bolt-template

Make sure to copy paste the rules inside the rules folder into your team's Packages knowledge. Example:

Package Name => Package Prompt:
- `@tanstack/react-query` => `rules/react-query-rules.md`
- `@tanstack/react-router` => `rules/tanstack-router-rules.md`
- `clsx` => `rules/clsx-rules.md`
- `tailwindcss` => `rules/tailwind-rules.md`
- `react-hook-form` => `rules/react-hook-form-rules.md`

When asking for Bolt to generate an OpenAPI specification, tell it to read `rules/openapi-rules.md` to ensure it follows these rules. These rules ensure our CLI can parse the generated `openapi.json` file.

