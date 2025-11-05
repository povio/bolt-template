import { Typography } from '@povio/ui'
import { createFileRoute } from '@tanstack/react-router'

function CodeExamplesPage() {
  return (
    <div className="p-20 flex flex-col gap-4">
      <Typography as="h1" size="title-4">Code Examples</Typography>

      <Typography as="p" size="body-1">
        This page contains code examples for the different components and hooks in the @povio/ui library. These pages also serve as an example for how to use the @tanstack/react-router library.
      </Typography>
    </div>
  )
}

export const Route = createFileRoute('/code-examples/')({
  component: CodeExamplesPage,
})
