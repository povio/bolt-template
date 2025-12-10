var RoutingUtils;
((RoutingUtils2) => {
  RoutingUtils2.addQueryParams = (path, params) => {
    const sParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        sParams.append(key, value.toString());
      }
    }
    return `${path}?${sParams.toString()}`;
  };
})(RoutingUtils || (RoutingUtils = {}));
export {
  RoutingUtils
};
