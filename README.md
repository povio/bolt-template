# Povio Bolt Template

## Usage Modes

This template supports two distinct development workflows:

### Mode 1: Building from Scratch (No Backend)

**When to use:** Starting a new project where the backend doesn't exist yet. You'll develop the frontend with a temporary Supabase backend, then generate an OpenAPI specification for the backend team to implement.

**Get started:**
```
http://bolt.new/github.com/poviolabs/bolt-template
```

📖 **[Read the full Mode 1 documentation](docs/1_supabase.md)**

---

### Mode 2: Backend Ready (Existing Backend)

**When to use:** Backend is already developed or being developed in parallel and is deployed with an accessible OpenAPI specification endpoint.

**Get started:**
```
http://bolt.new/github.com/poviolabs/bolt-template/tree/external-be
```

📖 **[Read the full Mode 2 documentation](docs/2_external_api.md)**

---

## Tech Stack

- **UI Components**: `@povio/ui` with `lucide-react` icons
- **Data Fetching**: `@tanstack/react-query` for server state management
- **Forms**: `react-hook-form` for form management using our wrapper hooks from `@povio/ui`
- **Routing**: `@tanstack/react-router` with file-based routing
- **Global State**: `zustand` for client-side state
- **Styling**: `tailwindcss` with custom configuration
- **Validation**: `zod` for schema validation

---

## Reference Examples

The `src/pages/code-examples/` directory contains usage examples of @povio/ui and major patterns for the AI to check.

**⚠️ These files should NEVER be modified by the AI agent** - they are reference only and can be removed once Bolt development is finished.

---

## Additional Resources

- **Bolt Documentation**: `docs/` directory
- **Rules Documentation for Bolt**: `rules/` directory
- **Component Examples**: `src/pages/code-examples/`

---

## Support

For issues or suggestions:
- Check the mode-specific documentation in `docs/`
- Contact "Tadej Rebernjak" on Slack
