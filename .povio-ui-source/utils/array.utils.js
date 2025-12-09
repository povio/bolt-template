var ArrayUtils;
((ArrayUtils2) => {
  ArrayUtils2.fromCommaSeparatedStr = (str) => {
    if (!str) {
      return [];
    }
    return str.split(",").map((item) => item.trim());
  };
})(ArrayUtils || (ArrayUtils = {}));
export {
  ArrayUtils
};
