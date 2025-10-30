# Core Rule

**NEVER concatenate class names dynamically. Tailwind's JIT needs complete class names in source.**

```typescript
// ❌ BAD - Won't work
className={`text-${color}-500`}

// ✅ GOOD - Complete class names
className={isActive ? 'bg-blue-500' : 'bg-gray-500'}
className={clsx('px-4 py-2', isActive ? 'bg-blue-500' : 'bg-gray-500')}
```

# Patterns

## Ternary (2 options)
```typescript
className={clsx('px-4 py-2', size === 'large' ? 'text-xl' : 'text-sm')}
```

## Helper Function (3+ options)
```typescript
function getVariant(v: string) {
  switch (v) {
    case 'primary': return 'bg-blue-500 text-white';
    case 'secondary': return 'bg-gray-500 text-black';
    default: return 'bg-gray-200';
  }
}
className={clsx('px-4 py-2', getVariant(variant))}
```

## Object Mapping
```typescript
const variants = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-500 text-black',
};
className={clsx('px-4 py-2', variants[variant])}
```
