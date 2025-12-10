import { z } from "zod";
var ZodUtils;
((ZodUtils2) => {
  ZodUtils2.unwrapZodType = (schemaType) => {
    let unwrappedType = schemaType;
    while (unwrappedType instanceof z.ZodNullable || unwrappedType instanceof z.ZodOptional) {
      unwrappedType = unwrappedType.unwrap();
    }
    return unwrappedType;
  };
  const hasZodObjectProperty = (schemaType, property, type) => {
    return property in schemaType.shape && schemaType.shape[property] instanceof z.core.$ZodType && (0, ZodUtils2.unwrapZodType)(schemaType.shape[property]) instanceof type;
  };
  ZodUtils2.isDateRange = (schemaType) => {
    const unwrappedType = (0, ZodUtils2.unwrapZodType)(schemaType);
    return unwrappedType instanceof z.ZodObject && hasZodObjectProperty(unwrappedType, "start", z.ZodISODateTime) && hasZodObjectProperty(unwrappedType, "end", z.ZodISODateTime);
  };
  ZodUtils2.isTextEditor = (schemaType) => {
    const unwrappedType = (0, ZodUtils2.unwrapZodType)(schemaType);
    return unwrappedType instanceof z.ZodObject && hasZodObjectProperty(unwrappedType, "html", z.ZodString) && hasZodObjectProperty(unwrappedType, "json", z.ZodObject);
  };
})(ZodUtils || (ZodUtils = {}));
export {
  ZodUtils
};
