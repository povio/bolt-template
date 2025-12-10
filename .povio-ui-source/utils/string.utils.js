var StringUtils;
((StringUtils2) => {
  StringUtils2.containsCaseInsensitive = (str, substr) => {
    return str.toLowerCase().includes(substr.toLowerCase());
  };
  StringUtils2.capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
})(StringUtils || (StringUtils = {}));
export {
  StringUtils
};
