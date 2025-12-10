import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm as useForm$1 } from "react-hook-form";
function useForm({
  resolver,
  zodSchema,
  defaultValues,
  ...props
}) {
  const formResolver = useMemo(
    () => resolver ?? (zodSchema ? zodResolver(zodSchema) : void 0),
    [resolver, zodSchema]
  );
  return useForm$1({
    ...props,
    resolver: formResolver,
    defaultValues
  });
}
export {
  useForm
};
