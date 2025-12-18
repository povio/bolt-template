import type { OpenAPICodegenConfig } from "@povio/openapi-codegen-cli";

const config: OpenAPICodegenConfig = {
  // input: "../be/resources/openapi-main.json", // Local backend in monorepo
  input: "https://api.dev.pov.io/api/docs-json", // External deployed backend
  output: "src/openapi",
  replaceOptionalWithNullish: true,
  tsPath: "@/openapi",
  errorHandlingImportPath: "@povio/ui",
  abilityContextImportPath: "@povio/ui/auth",
  queryTypesImportPath: "@povio/ui",
  restClientImportPath: "@/clients/app-rest-client",
  abilityContextGenericAppAbilities: true,
  infiniteQueries: true,
  builderConfigs: true,
};

export default config;
