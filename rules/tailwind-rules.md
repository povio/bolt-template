NEVER concatenate class names dynamically via string concatenation or template literals. Tailwind's JIT needs complete class names in source code.

Use clsx for conditionally combining classNames.

Never nest ternary conditions - only use them for one condition. Otherwise use a helper function with a switch statement or an object map.

Try to use the semantic colors defined in `tailwind.config.ts` over default Tailwind colors in most cases.
