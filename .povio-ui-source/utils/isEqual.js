import { ObjectUtils } from "./object.utils.js";
const isEqual = (a, b) => {
  return eq(a, b);
};
const eq = (a, b, aStack, bStack) => {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  if (a == null || b == null) {
    return a === b;
  }
  if (a !== a) {
    return b !== b;
  }
  const type = typeof a;
  if (type !== "function" && type !== "object" && typeof b !== "object") {
    return false;
  }
  return deepEq(a, b, aStack, bStack);
};
const deepEq = (a, b, aStack, bStack) => {
  const className = toString.call(a);
  if (className !== toString.call(b)) {
    return false;
  }
  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case "[object RegExp]":
    case "[object String]":
      return `${a}` === `${b}`;
    case "[object Number]":
      if (+a !== +a) {
        return +b !== +b;
      }
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case "[object Date]":
    case "[object Boolean]":
      return +a === +b;
    case "[object Symbol]":
      return Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b);
  }
  const areArrays = className === "[object Array]";
  if (!areArrays) {
    if (typeof a !== "object" || typeof b !== "object") {
      return false;
    }
    const aCtor = a.constructor;
    const bCtor = b.constructor;
    if (aCtor !== bCtor && !(ObjectUtils.isFunction(aCtor) && aCtor instanceof aCtor && ObjectUtils.isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
      return false;
    }
  }
  aStack = aStack || [];
  bStack = bStack || [];
  let { length } = aStack;
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }
  aStack.push(a);
  bStack.push(b);
  if (areArrays) {
    length = a.length;
    if (length !== b.length) {
      return false;
    }
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) {
        return false;
      }
    }
  } else {
    const keys = Object.keys(a);
    let key;
    length = keys.length;
    if (Object.keys(b).length !== length) {
      return false;
    }
    while (length--) {
      key = keys[length];
      if (!(Object.prototype.hasOwnProperty.call(b, key) && // oxlint-disable-next-line no-explicit-any
      eq(a[key], b[key], aStack, bStack))) {
        return false;
      }
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
};
export {
  isEqual
};
