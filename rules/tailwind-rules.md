# Tailwind CSS Usage Guidelines

## Core Rule

**NEVER concatenate class names dynamically. Tailwind's JIT compiler needs to see complete class names in source code.**

## ❌ NEVER DO THIS:

```typescript
// BAD - Tailwind won't recognize these
className={`text-${color}-500`}
className={`bg-${size}-500`}
```

## ✅ ALWAYS DO THIS:

### 1. Use ternary for two options:

```typescript
className={isActive ? 'bg-blue-500' : 'bg-gray-500'}
className={size === 'large' ? 'text-xl' : 'text-sm'}
```

### 2. Use helper function with switch for multiple options:

```typescript
function getVariantClasses(variant: string) {
  switch (variant) {
    case 'primary': return 'bg-blue-500 text-white';
    case 'secondary': return 'bg-gray-500 text-black';
    case 'danger': return 'bg-red-500 text-white';
    default: return 'bg-gray-200 text-gray-900';
  }
}

className={getVariantClasses(variant)}
```

### 3. Use object mapping:

```typescript
const variants = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-500 text-black',
  danger: 'bg-red-500 text-white',
};

className={variants[variant]}
```

**Key**: Every class name must appear as a complete string somewhere in your code.
