**ALWAYS use `clsx()` for dynamic class names.**

```typescript
import clsx from 'clsx';

// Single condition
className={clsx('px-4 py-2', isActive && 'bg-blue-500')}

// Multiple conditions
className={clsx(
  'px-4 py-2 border',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50',
  hasError && 'border-red-500'
)}

// Simple ternary (no nesting)
className={clsx('px-4 py-2', isActive ? 'bg-blue-500' : 'bg-gray-500')}
```

## Rules

1. Always use `clsx()` - never template literals or concatenation
2. Use `&&` for conditions: `condition && 'classes'`
3. Simple ternaries only (no nesting)
4. One condition per line for readability
