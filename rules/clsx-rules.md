# clsx Usage Guidelines

## Core Rule

**ALWAYS use the `clsx()` function for dynamic class names.**

## Usage Examples

```typescript
import clsx from 'clsx';

// Single condition
className={clsx('px-4 py-2 rounded', isActive && 'bg-blue-500 text-white')}

// Multiple conditions
className={clsx(
  'px-4 py-2 rounded border',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed',
  hasError && 'border-red-500'
)}

// Simple ternary (one condition only)
className={clsx('px-4 py-2 rounded', isActive ? 'bg-blue-500' : 'bg-gray-500')}
```

## Rules

1. **Always use `clsx()` for dynamic class names** - Never use template literals or string concatenation
2. **Use `&&` for conditions** - `condition && 'tailwind-classes'`
3. **Simple ternaries only** - `condition ? 'class-a' : 'class-b'` (no nesting)
4. **Never nest ternaries** - Use multiple `&&` statements instead