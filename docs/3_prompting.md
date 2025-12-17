# Prompting Guide

This guide covers best practices for prompting in Bolt, applicable to both [Supabase mode](./1_supabase.md) and [External API mode](./2_external_api.md).

---

# AI Models

Bolt supports multiple AI models. Choose based on your task complexity and token budget:

| Model | Speed | Token Usage | Best For |
|-------|-------|-------------|----------|
| **Haiku** | Fast | Low | Small tasks with detailed instructions |
| **Sonnet** | Medium | Medium | Smaller features, bugfixes (default) |
| **Opus** | Sometimes slower | High (up to 2x Sonnet) | New features, design-heavy work |

**Recommendations:**
- **Haiku**: Use when you can provide very specific, detailed instructions for small/simple changes
- **Sonnet**: Good balance for most development work - the default choice
- **Opus**: Recommended for new features, especially when using design reference images. Produces better code quality and more accurate design implementations

---

# Planning Mode

Bolt has two interaction modes accessible via the **Plan** button:

| Mode | Description |
|------|-------------|
| **Agent Mode** | Default mode - Bolt immediately implements changes |
| **Planning Mode** | Bolt explains proposed changes before implementing |

**When to use Planning Mode:**
- Complex features where you want to confirm the approach first
- When you're unsure if the AI understood your requirements correctly
- To avoid wasted tokens on unwanted features or misunderstood instructions
- When exploring different implementation options

**How it works:**
1. Click the **Plan** button to switch to Planning Mode
2. Describe what you want to build
3. Bolt will outline the proposed changes without implementing them
4. Review and confirm, or provide corrections
5. Once confirmed, Bolt implements the agreed-upon changes

This helps prevent misunderstandings and saves tokens by catching issues before code is written.

---

# General Prompting Tips

- **One feature at a time**: Keep prompts to max one new feature per prompt
- **Be technical when debugging**: When fixing bugs, provide more technical directions on how to fix if possible
- **Use checkpoints**: After each prompt, Bolt creates a checkpoint you can revert back to
- **Manual edits welcome**: You can also edit code manually and run commands in the terminal
- **Guide the AI**: If Bolt can't find the correct queries/models for a feature, tell it explicitly what to use

---

# Design & Styling

By default, Bolt apps may look "bland" because the template rules restrict it to using only use specific colors from our design system (Povio UI's default colors). This ensures consistency but limits visual variety.

**If you have a design or concept available:**
- Provide Bolt with screenshots, mockups, or design references (as images)
- Tell it to use the image as reference. Tell it explicitly what elements to take from the image if not all is needed
- Consider using **Opus** model for better design implementation accuracy
- If you want it to match the colors in the given reference image, you must explicitly tell it

Note: This does not produce a pixel-perfect result, but it should generally look similar to the given reference. If Figma is available, export/copy the target selection node as a PNG for best accuracy.

Example prompt:
```
Here's an image of the design I want. Refer to the given image when implementing the page.
```

---

# First Prompt

Your first prompt should give an overview of the app and focus on authentication. See mode-specific guidance:
- [Supabase Mode - First Prompt](./1_supabase.md#first-prompt)
- [External API Mode - First Prompt](./2_external_api.md#first-prompt)

