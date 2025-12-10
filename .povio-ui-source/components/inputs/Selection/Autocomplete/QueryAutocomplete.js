import { jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Autocomplete } from "./Autocomplete.js";
const QueryAutocomplete = ({
  query,
  queryParams,
  queryOptions,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const { data: items, isLoading } = query({ search, ...queryParams }, queryOptions);
  return /* @__PURE__ */ jsx(
    Autocomplete,
    {
      ...props,
      items: items ?? [],
      onSearchChange: setSearch,
      isClientSearchDisabled: true,
      isLoading
    }
  );
};
export {
  QueryAutocomplete
};
