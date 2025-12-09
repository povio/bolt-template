var ObjectUtils;
((ObjectUtils2) => {
  ObjectUtils2.isNil = (obj) => {
    return obj === null || obj === void 0;
  };
  ObjectUtils2.isFunction = (obj) => {
    return typeof obj === "function";
  };
  ObjectUtils2.isObject = (obj) => {
    return typeof obj === "object" && !!obj;
  };
  ObjectUtils2.isString = (obj) => {
    return Object.prototype.toString.call(obj) === "[object String]";
  };
  ObjectUtils2.isDate = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Date]";
  };
  ObjectUtils2.isRegExp = (obj) => {
    return Object.prototype.toString.call(obj) === "[object RegExp]";
  };
  ObjectUtils2.isEmpty = (obj) => {
    if (obj === null || obj === void 0) {
      return true;
    }
    if (Array.isArray(obj) || (0, ObjectUtils2.isString)(obj)) {
      return obj.length === 0;
    }
    return Object.keys(obj).length === 0;
  };
  ObjectUtils2.deepConditionalMerge = (target, source, condition) => {
    const output = { ...target };
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const value = source[key];
        if (condition(value, key)) {
          if (typeof value === "object" && !Array.isArray(value)) {
            output[key] = (0, ObjectUtils2.deepConditionalMerge)(
              output[key],
              value,
              condition
            );
          } else {
            output[key] = value;
          }
        }
      }
    }
    return output;
  };
})(ObjectUtils || (ObjectUtils = {}));
export {
  ObjectUtils
};
