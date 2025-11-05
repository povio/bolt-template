import { Button, CloseIcon, IconButton, ToggleButton, TextButton, InlineIconButton, PillButton, Typography } from '@povio/ui'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

function ButtonExamplesPage() {
  const [isToggleButtonToggled, setIsToggleButtonToggled] = useState(false);

  return (
    <div className="p-20 flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <Typography as="h2" size="title-3">Colors</Typography>

        <div className="flex flex-row items-center gap-4">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="error">Error</Button>
          <Button color="dual">Dual</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        {/* Affects paddings */}
        <Typography as="h2" size="title-3">Sizes</Typography>

        <div className="flex flex-row items-center gap-4">
          <Button size="xxs">XXS</Button>
          <Button size="xs">XS</Button>
          <Button size="s">S</Button>
          <Button size="m">M</Button>
          <Button size="l">L</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        {/* Buttons are by default full width. Use `width="hug"` to make them fit the content. */}
        <Typography as="h2" size="title-3">Width</Typography>

        <div className="flex flex-row items-center gap-4">
          <Button width="fill">Fill</Button>
          <Button width="hug">Hug</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Typography as="h2" size="title-3">Variants</Typography>

        <div className="flex flex-row items-center gap-4">
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="text">Text</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Typography as="h2" size="title-3">Icons</Typography>

        <div className="flex flex-row items-center gap-4">
          <Button icon={CloseIcon}>Close</Button>
          <Button icon={CloseIcon} iconPosition="right">Close</Button>
          <Button icon={CloseIcon} iconPosition="left">Close</Button>
          {/* The label shows up as a Tooltip when hovering over the button */}
          <Button icon={CloseIcon} iconOnly>Close</Button>
          {/* Disable the tooltip for icon only buttons */}
          <Button icon={CloseIcon} iconOnly disableTooltip>Close</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Typography as="h2" size="title-3">States</Typography>

        <div className="flex flex-row items-center gap-4">
          {/* Use real conditions to show loading and disabled states */}
          <Button isLoading={true}>Loading</Button>
          <Button isDisabled={true}>Disabled</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Typography as="h2" size="title-3">Links</Typography>

        <div className="flex flex-row items-center gap-4">
          <Button link={{ href: '/' }}>Link</Button>
          <Button link={{ href: '/', target: '_blank' }}>Link on new tab</Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Typography as="h2" size="title-3">Special Button Components</Typography>

        <div className="flex flex-row items-center gap-4">
          <IconButton icon={CloseIcon} label="Close" />
          {/* InlineIconButton is a button that is used to display an icon only with no background color */}
          <InlineIconButton icon={CloseIcon} label="Close" />
          <PillButton>Pill</PillButton>
          <TextButton>Text</TextButton>
          <ToggleButton isSelected={isToggleButtonToggled} onPress={() => setIsToggleButtonToggled(!isToggleButtonToggled)}>Toggle</ToggleButton>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/code-examples/buttons')({
  component: ButtonExamplesPage,
})
