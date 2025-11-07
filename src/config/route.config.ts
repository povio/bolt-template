import { Route as CodeExamplesButtonsRoute } from "@/pages/code-examples/buttons";
import { Route as CodeExamplesFormsRoute } from "@/pages/code-examples/forms";
import { Route as CodeExamplesInputsRoute } from "@/pages/code-examples/inputs";
import { Route as CodeExamplesModalsRoute } from "@/pages/code-examples/modals";
import { Route as CodeExamplesRoute } from "@/pages/code-examples/route";
import { Route as CodeExamplesTableRoute } from "@/pages/code-examples/table";
import { Route as CodeExamplesTextRoute } from "@/pages/code-examples/text";
import { Route as CodeExamplesToastsRoute } from "@/pages/code-examples/toasts";
import { Route as HomeRoute } from "@/pages/index";

export const RouteConfig = {
  home: HomeRoute,
  codeExamples: {
    index: CodeExamplesRoute,
    buttons: CodeExamplesButtonsRoute,
    forms: CodeExamplesFormsRoute,
    inputs: CodeExamplesInputsRoute,
    text: CodeExamplesTextRoute,
    table: CodeExamplesTableRoute,
    modals: CodeExamplesModalsRoute,
    toasts: CodeExamplesToastsRoute,
  },
};
