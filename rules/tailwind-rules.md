NEVER concatenate class names dynamically. Tailwind's JIT needs complete class names in source code.

- Use `clsx()` for conditional classes
- No nested ternaries - use helper function with switch/object map instead
- Prefer semantic colors from `tailwind.config.ts` over default Tailwind colors, use only blue and neutral color pallettes from Tailwind's default colors