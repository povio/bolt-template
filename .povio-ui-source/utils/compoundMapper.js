const compoundMapper = (config) => {
  return (props) => {
    const variant = config.compoundVariants?.find((v) => {
      return Object.entries(v).filter(([key]) => key !== "value").every(([key, value]) => {
        const prop = props[key] || config.defaultVariants?.[key];
        return Array.isArray(value) ? value.includes(prop) : prop === value;
      });
    });
    return variant?.value ?? config.default;
  };
};
export {
  compoundMapper
};
