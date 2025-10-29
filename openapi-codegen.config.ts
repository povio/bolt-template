import { OpenAPICodegenConfig } from '@povio/openapi-codegen-cli';

const config: OpenAPICodegenConfig = {
  input: 'openapi.json',
  output: 'src/openapi',
  standalone: true,
  acl: false,
  checkAcl: false,
  builderConfigs: true,
};

export default config;
