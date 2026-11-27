---
name: Sagnik Chowdhury Portfolio
description: Obsidian Liner Notes paired with Linen Studio Paper — a restrained, text-first engineering portfolio with tactile audio and physics craft.
colors:
  studio-amber: "#e59a3c"
  studio-amber-bright: "#f0ab52"
  studio-amber-ink: "#13100b"
  studio-amber-wash: "rgba(229, 154, 60, 0.14)"
  burnt-ochre: "#9e4c0b"
  burnt-ochre-deep: "#853e07"
  burnt-ochre-wash: "rgba(158, 76, 11, 0.12)"
  obsidian-ground: "#0e0e10"
  obsidian-raised: "#151518"
  obsidian-subtle: "#1c1c20"
  obsidian-vinyl: "#09090b"
  obsidian-groove: "#1b1b20"
  warm-bone: "#f1eee8"
  linen-ash: "#c4bfb5"
  studio-slate: "#938e84"
  hairline-dark: "#26262c"
  rule-strong-dark: "#393942"
  dot-matrix-dark: "rgba(241, 238, 232, 0.11)"
  dot-glow-dark: "rgba(229, 154, 60, 0.34)"
  cord-wire-dark: "#7c7870"
  cord-cap-dark: "#2c2c33"
  linen-ground: "#f5f3ee"
  linen-raised: "#fbf9f5"
  linen-subtle: "#ece8df"
  linen-vinyl: "#191817"
  linen-groove: "#2d2b29"
  charcoal-ink: "#171614"
  espresso-ink: "#433f39"
  warm-stone: "#686259"
  hairline-light: "#dcd6ca"
  rule-strong-light: "#c2bab0"
  dot-matrix-light: "rgba(23, 22, 20, 0.12)"
  dot-glow-light: "rgba(196, 104, 24, 0.32)"
  cord-wire-light: "#7f786e"
  cord-cap-light: "#d6cfc3"
  cord-tip-light: "#c46818"
  print-paper: "#faf9f6"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "0em"
  label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0em"
    fontFeature: "tnum"
rounded:
  sm: "4px"
  md: "6px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.studio-amber}"
    textColor: "{colors.studio-amber-ink}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.studio-amber-bright}"
    textColor: "{colors.studio-amber-ink}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.obsidian-raised}"
    textColor: "{colors.warm-bone}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.obsidian-subtle}"
    textColor: "{colors.warm-bone}"
    rounded: "{rounded.md}"
  filter-chip:
    backgroundColor: "{colors.obsidian-raised}"
    textColor: "{colors.linen-ash}"
    rounded: "{rounded.sm}"
    padding: "6px 14px"
  filter-chip-active:
    backgroundColor: "{colors.studio-amber}"
    textColor: "{colors.studio-amber-ink}"
    rounded: "{rounded.sm}"
    padding: "6px 14px"
  header-nav:
    backgroundColor: "{colors.obsidian-ground}"
    textColor: "{colors.warm-bone}"
    height: "64px"
    padding: "0 32px"
  sound-deck:
    backgroundColor: "{colors.obsidian-raised}"
    textColor: "{colors.warm-bone}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
  sampler-pad:
    backgroundColor: "{colors.obsidian-raised}"
    textColor: "{colors.warm-bone}"
    rounded: "{rounded.sm}"
    padding: "12px"
    height: "76px"
  sampler-pad-active:
    backgroundColor: "{colors.studio-amber-wash}"
    textColor: "{colors.warm-bone}"
    rounded: "{rounded.sm}"
    padding: "12px"
    height: "76px"
  hover-preview-card:
    backgroundColor: "{colors.obsidian-raised}"
    textColor: "{colors.warm-bone}"
    rounded: "{rounded.md}"
    width: "224px"
  pull-cord:
    backgroundColor: "{colors.warm-bone}"
    textColor: "{colors.linen-ash}"
    rounded: "{rounded.pill}"
    width: "52px"
    height: "96px"
---

# Design System: Sagnik Chowdhury Portfolio

## Overview

**Creative North Star: "Obsidian Liner Notes"**

This portfolio behaves like the printed sleeve of a late-night house record laid across an engineer's drafting desk. Its default dark mode (**Obsidian Liner Notes**) sets matte charcoal surfaces over a fixed 22px architectural dot matrix, carrying crisp warm-bone prose and a single studio-amber accent drawn from hardware LEDs and vinyl center labels. Pulling the weighted ceiling cord in the top-right gutter floods the viewport via a circular View Transition into **Linen Studio Paper**, a warm daylight paper palette calibrated for extended reading and clean printing.

The layout rejects developer-template spectacle—no Inter, no purple gradients, no glowing pills, no particle canvases, no autoplay sound, and no decorative eyebrows above headings. Proof is carried by clear engineering prose, hairline structural rules, and three restrained tactile instruments: a muted-by-default Desk Sound Deck, a 5-pad Off-the-Clock audio sampler, and a spring-physics Pull Cord theme switch.

**Key Characteristics:**
- Dual-polarity studio material: matte obsidian dark default paired with warm linen daylight mode via a physics-simulated Pull Cord.
- Architectural 22px dot-grid backdrop with a subtle 240px pointer-warmth mask on fine-pointer desktops.
- Single-accent discipline: Studio Amber in dark mode and high-contrast Burnt Ochre in light mode reserved for primary actions, live audio states, focus rings, and hover highlights.
- Editorial text density: 1000px reading frame, 200px left section labels, hairline horizontal rules, and 56ch–64ch prose measures.
- Strictly opt-in audio and full `prefers-reduced-motion` support across every animation and physics spring.

## Colors

A warm achromatic charcoal-and-linen palette anchored by a single amber-ochre studio accent that shifts luminance between dark and light modes to maintain contrast.

### Primary
- **Studio Amber** (`#e59a3c`, `--accent` dark): Primary button fill, active navigation underline, vinyl pressing label, active VU bars, active sampler pad border and LED, focus outlines, text selection, and editorial link hover color in dark mode.
- **Studio Amber Bright** (`#f0ab52`, `--accent-hover` dark): Hover fill for the primary button in dark mode.
- **Studio Amber Ink** (`#13100b`, `--accent-ink` dark): High-contrast foreground text on Studio Amber fills and text selections in dark mode.
- **Studio Amber Wash** (`rgba(229, 154, 60, 0.14)`, `--accent-soft` dark): Tinted background fill for active toggle chips, active sampler pads, the header Live audio indicator, and the open physics jar button in dark mode.
- **Burnt Ochre** (`#9e4c0b`, `--accent` light): Darkened primary accent for Linen Studio Paper mode, serving all primary button, active state, focus ring, and link hover roles with accessible contrast on light paper.
- **Burnt Ochre Deep** (`#853e07`, `--accent-hover` light): Hover fill for the primary button in light mode.
- **Burnt Ochre Wash** (`rgba(158, 76, 11, 0.12)`, `--accent-soft` light): Tinted fill for active pads and toggles in light mode.

### Neutral
- **Obsidian Ground** (`#0e0e10`, `--surface-ground` dark): Primary page canvas and sticky header base (mixed at 88% opacity with backdrop blur) in dark mode.
- **Obsidian Raised** (`#151518`, `--surface-raised` dark): Card and control surface for secondary buttons, the Sound Deck shell, sampler pads, filter chips, the resume sheet, and the desktop hover preview card.
- **Obsidian Subtle** (`#1c1c20`, `--surface-subtle` dark): Nested control surface for the Sound Deck vinyl well, selected track segment, secondary button hover, and inactive UI-tick toggle.
- **Obsidian Vinyl / Groove** (`#09090b` / `#1b1b20`, `--surface-vinyl` / `--surface-vinyl-groove` dark): Deep matte concentric vinyl disc grooves, project thumbnail frames, and the Matter.js physics jar enclosure.
- **Warm Bone** (`#f1eee8`, `--ink-primary` dark): Primary headings, company and project titles, active navigation text, and the dark-mode Pull Cord bead body.
- **Linen Ash** (`#c4bfb5`, `--ink-secondary` dark): Narrative body paragraphs, project summaries, and inactive filter chip labels in dark mode.
- **Studio Slate** (`#938e84`, `--ink-muted` dark): Monospace metadata (dates, stack lists, BPM, IST clock), section subtitles, and inactive navigation links in dark mode.
- **Hairline Dark / Strong Rule Dark** (`#26262c` / `#393942`, `--rule-hair` / `--rule-strong` dark): 1px structural section dividers, container borders, link underline rest state, hover preview frame border, and scrollbar thumb.
- **Dot Matrix Dark / Dot Glow Dark** (`rgba(241, 238, 232, 0.11)` / `rgba(229, 154, 60, 0.34)`): Fixed 22px background dot grid and cursor-masked amber warmth layer in dark mode.
- **Cord Wire Dark / Cord Cap Dark** (`#7c7870` / `#2c2c33`): Hanging cord stroke and ceiling grommet cap in dark mode.
- **Linen Ground / Raised / Subtle** (`#f5f3ee` / `#fbf9f5` / `#ece8df`): Light-mode page ground, elevated card surfaces (also light `--accent-ink`), and recessed segment fills.
- **Linen Vinyl / Groove** (`#191817` / `#2d2b29`): Matte dark vinyl disc and media backing preserved in light mode so dark grooves stay authentic.
- **Charcoal Ink / Espresso Ink / Warm Stone** (`#171614` / `#433f39` / `#686259`): Light-mode primary headings (also `--print-ink` and light cord bead), body prose, and muted monospace metadata.
- **Hairline Light / Strong Rule Light** (`#dcd6ca` / `#c2bab0`): Light-mode 1px structural borders and link underlines.
- **Dot Matrix Light / Dot Glow Light / Cord Hardware Light** (`rgba(23, 22, 20, 0.12)` / `rgba(196, 104, 24, 0.32)` / `#7f786e` wire / `#d6cfc3` cap / `#c46818` bead tip): Light-mode architectural dot field and Pull Cord hardware accents.
- **Print Paper** (`#faf9f6`, `--print-ground`): Forced clean paper ground paired with Charcoal Ink (`#171614`) under `@media print` on `/resume`.

### Named Rules
**The Single-Accent Discipline Rule.** Only one hue family (Studio Amber in dark mode, Burnt Ochre in light mode) carries chromatic emphasis. It marks primary CTAs, active audio or filter states, focus rings, and link hover states—never large card fills, decorative gradients, or competing secondary accents.

**The Polarity-Matched Contrast Rule.** Every semantic surface, ink, rule, and accent token resolves through CSS custom properties under `:root` and `:root[data-theme="light"]`, darkening amber (`#e59a3c`) to burnt ochre (`#9e4c0b`) on linen paper so text and borders preserve legibility across both modes.

## Typography

**Display Font:** Archivo (with `ui-sans-serif, system-ui, sans-serif` fallback)
**Body Font:** Archivo (with `ui-sans-serif, system-ui, sans-serif` fallback)
**Label/Mono Font:** Geist Mono (with `ui-monospace, SFMono-Regular, monospace` fallback)

**Character:** Archivo's tight geometric grotesk proportions give headings compact editorial weight without display theatrics, while Geist Mono provides crisp tabular precision for dates, BPM readouts, IST time, keyboard hints, and stack listings.

### Hierarchy
- **Display** (600, `48px` / `3rem` on desktop `md+`, `40px` `sm`, `28px` mobile; `42px` on `/projects`, `36px` on `/resume`; line-height `1.06`, tracking `-0.03em`, `text-wrap: balance`): Page `h1` identity and route titles only.
- **Headline** (600, `20px` / `1.25rem` on home sections, `22px` on `/projects` entries, `18px` on `/resume` sections; line-height `1.25`, tracking `-0.02em`): Major section headings and archive item titles.
- **Title** (600, `17px` / `1.0625rem` on home rows, `15px–16px` on resume items; line-height `1.35`, tracking `-0.01em`): Experience company names and featured project row headings.
- **Body** (400, `16px` / `1rem` in hero lead prose on `sm+`, `15px` / `0.9375rem` in section summaries and mobile hero, `14px` in architecture notes and resume bullets; line-height `1.62–1.65`; measure constrained to `56ch–64ch`): Narrative copy and engineering summaries.
- **Label** (400, `12px` / `0.75rem`, `Geist Mono`, `tabular-nums`, line-height `1.4`; `11px` micro-labels on pad key indices, hover preview captions, and pull-cord tooltip): Dates, locations, IST clock, stack lists, deck BPM/status, and keyboard hints.

### Named Rules
**The Slash-Separator Rule.** Inline metadata pairs and sequences use forward slashes (`Kolkata, India / 03:48 IST`, `Uphook.ai / Technical Intern`, `Playing / 122 BPM / Click vinyl to pause`) rather than middle-dot (`·`) chains.

**The No-Eyebrow Rule.** Section headings stand directly at the top of their left column in sentence case, followed below by a quiet `13px` muted descriptor—never preceded by an uppercase tracked kicker or pill badge.

## Layout

Pages sit inside a centered single-column editorial container (`max-width: 1000px` on `/` and `/projects`, `max-width: 820px` on `/resume`) with horizontal gutters of `20px` (`px-5`) on mobile and `32px` (`sm:px-8`) from `640px` upward (`16px` mobile padding on the sticky header).

- **Hero Split (`/`):** Single column on mobile with a compact `76×96px` portrait lockup and `48px` right clearance (`pr-12`) to prevent overlap with the hanging Pull Cord; shifts at `768px` (`md`) to an asymmetric two-column grid (`296px` fixed `3:4` portrait column + `minmax(0, 1fr)` prose column, `48px` gap).
- **Index Section Grid (`/` and `/projects`):** Below the hero, every major section (`Experience`, `Selected Projects`, `Stack`, `Off the Clock`) and every `/projects` archive entry separates with a `1px` top hairline (`--rule-hair`), generous `48px` vertical padding (`py-12`, `36px` on `/projects` items), and a two-column split at `768px` (`200px` left heading/media column + `minmax(0, 1fr)` content column, `40px` gap).
- **Spacing Rhythm:** Built on a 4px base (`4px`, `8px`, `16px`, `24px`, `32px`, `48px`). Prose measures cap at `56ch` in the hero and `62ch–64ch` in body lists to sustain fast 45-second scanning.
- **Breakpoints:** Standard Tailwind responsive thresholds—`640px` (`sm`), `768px` (`md`, activates split grids and desktop portrait), `1024px` (`lg`, activates desktop cursor-following Hover Preview), and `1280px` (`xl`, shifts the hanging Pull Cord out into the `32px` right gutter).
- **Print Layout (`/resume`):** Under `@media print`, dot backdrops, header, footer, Pull Cord, and action bar (`.no-print`) are hidden, the resume article drops its border and padding, and ground/ink force to Print Paper (`#faf9f6`) and Charcoal Ink (`#171614`).

## Elevation & Depth

This system is flat by default. Structural hierarchy comes from tonal surface stepping (`--surface-ground` → `--surface-raised` → `--surface-subtle`) and `1px` hairline borders (`--rule-hair` at rest, `--rule-strong` or `--accent` for emphasis), never ambient card drop shadows.

### Shadow Vocabulary
- **Floating Preview Shadow — Dark** (`box-shadow: 0 18px 44px -16px rgba(0, 0, 0, 0.65)`): Used exclusively on the cursor-following desktop Hover Preview card over `Selected Projects`.
- **Floating Preview Shadow — Light** (`box-shadow: 0 18px 40px -18px rgba(23, 22, 20, 0.22)`): Light-mode counterpart for the floating desktop Hover Preview card.

### Named Rules
**The Flat-By-Default Rule.** Resting containers, buttons, sampler pads, and the resume sheet carry zero box-shadow. Elevation is reserved strictly for transient overlays floating over page content (the desktop Hover Preview card) and the sticky header's `88%` translucent backdrop blur.

## Shapes

Form language is crisp, technical, and studio-hardware derived—tight rectangular corners paired with true circles only for mechanical or analog elements.

- **Compact Controls (`4px` / `--radius-sm`, Tailwind `rounded-md`):** Filter chips, studio sampler pads, the Sound Deck vinyl trigger well and segmented track buttons, project thumbnail frames, and the footer copy-email button.
- **Primary Containers & Actions (`6px` / `--radius-md`, Tailwind `rounded-lg`):** Primary and secondary buttons (`.btn-primary`, `.btn-secondary`), the `3:4` hero portrait frame, the Desk Sound Deck shell, the `/resume` sheet, the floating Hover Preview card, and the Matter.js physics jar frame.
- **Analog & Indicator Pills (`999px` / `--radius-pill`, `rounded-full`):** The grooved vinyl record, center label, VU meter bars, active navigation underline bar, sampler pad LEDs, scrollbar thumb, and weighted Pull Cord bead.
- **Stroke Weight:** Uniform `1px` solid borders throughout (`--rule-hair` resting, `--rule-strong` framed media/hover, `--accent` active/live), plus `2px` solid `--accent` keyboard focus outlines with `2px` offset.

## Components

Every interactive surface favors crisp tactile feedback (`140ms` ease-out transitions, `1px` vertical nudge on buttons, optional synthesized Web Audio UI ticks) while keeping visual chrome quiet.

### Buttons
- **Shape:** Tight rounded rectangle (`6px` radius via `--radius-md`), minimum `44px` height for touch accessibility, horizontal padding `20px`, `8px` icon gap, `14px` Archivo text.
- **Primary (`.btn-primary`):** Solid `--accent` fill (`#e59a3c` dark / `#9e4c0b` light) with `1px` matching border, `--accent-ink` foreground (`#13100b` dark / `#fbf9f5` light), weight `600`.
- **Hover / Active / Focus:** Primary shifts to `--accent-hover` and lifts `translateY(-1px)`, settling to `0` on `:active`. Keyboard `:focus-visible` shows a `2px` solid `--accent` outline with `2px` offset.
- **Secondary (`.btn-secondary`):** `--surface-raised` fill, `1px` `--rule-hair` border, `--ink-primary` text, weight `500`. Hover shifts to `--surface-subtle` with `--rule-strong` border and `translateY(-1px)`.
- **Editorial Inline Link (`.editorial-link`):** Inherited primary ink with a `1px` `--rule-strong` underline offset `4px`; hover transitions both text and underline to `--accent` in `140ms`.

### Chips
- **Discipline Filter Chips (`/projects`):** Compact `4px` radius (`rounded-md`), `6px 14px` padding (`px-3.5 py-1.5`), `13px` weight `500`. Unselected uses `--surface-raised`, `--rule-hair` border, and `--ink-secondary`; selected flips to solid `--accent` fill and `--accent-ink` text with `aria-pressed`.
- **Monospace Status & Action Chips:** `12px` Geist Mono with `4px` radius used for the footer copy-email toggle, the Sound Deck `UI ticks: on/off` toggle, and the conditional header `Live` pause pill (`--accent` border and text over `--accent-soft` fill when active).

### Cards / Containers
- **Corner Style:** `6px` radius (`rounded-lg`) on top-level cards (`SoundDeck`, `/resume` sheet, Hover Preview, Physics Jar); `4px` radius (`rounded-md`) on nested wells and project thumbnail previews.
- **Background:** `--surface-raised` over `--surface-ground`, with `--surface-vinyl` behind dark media thumbnails and the physics jar.
- **Shadow Strategy:** Flat (`none`) for all inline cards; `--shadow-float` exclusively on the cursor-tracking desktop Hover Preview (`224px` wide, `lg+` only).
- **Border:** `1px solid var(--rule-hair)` at rest, stepping to `var(--rule-strong)` on framed media thumbnails and the Hover Preview.
- **Internal Padding:** `16px 20px` on the Sound Deck, `24px` (`40px` `sm+`) on the `/resume` sheet, `12px` on sampler pads.

### Navigation
- **Sticky Header (`SiteHeader`):** `64px` height (`h-16`), sticky top (`z-30`), `1px` bottom hairline, `color-mix(in srgb, var(--surface-ground) 88%, transparent)` with `backdrop-blur-md`. Left displays `Sagnik Chowdhury` (`14px–15px`, weight `600`); right aligns three plain links (`Home`, `Projects`, `Resume` at `14px`) with a `2px` `--accent` bottom pill indicator on the active route (`aria-current="page"`) plus an optional `Live` audio pause pill shown only while playback is active.

### Desk Sound Deck (`SoundDeck`)
A horizontal studio transport strip (`--surface-raised`, `1px` `--rule-hair`, `6px` radius) anchored below the hero. Left holds a `56×56px` tactile vinyl trigger housing a `44px` grooved matte disc (`repeating-radial-gradient`), a `20px` amber center play/pause button, and a pivoting `2×26px` tonearm (`4deg` rest → `24deg` playing). Right holds a recessed `House` / `GTA` segmented track selector, a `UI ticks: off/on` toggle, and a 4-bar studio VU meter (`2px` wide bars animating only while playing). Always initializes muted (`isPlaying = false`).

### Studio Sampler Pads (`OffTheClockPads`)
A 5-pad hardware controller grid (`grid-cols-2 sm:grid-cols-5`, `10px` gap) paired with a full-width monospace status readout bar. Each pad (`min-height: 76px`, `4px` radius, `12px` padding) displays a `16px` stroke icon (`1.75px` stroke), a `1–5` monospace shortcut hint, a `6px` status LED (`--rule-strong` idle → `--accent` active), and a `13px` label. Active pads tint to `--accent-soft` with a `1px` `--accent` border and trigger short audio clips strictly on click or keys `1–5`.

### Physics Pull Cord (`PullCordToggle`)
A fixed `52×96px` spring-simulated cord anchored beneath the sticky header in the top-right gutter (`right-1` mobile, `right-4` `sm`, `right-8` `xl`). Composed of a `16×8px` ceiling grommet (`--cord-cap`), an SVG quadratic Bezier wire (`1.75px` stroke, `--cord-wire`), and a `12×22px` rounded-pill bead (`--cord-bead`) with a `6px` amber/ochre bottom tip (`--cord-bead-tip`), backed by a `40×44px` `role="switch"` hit target and mono tooltip (`pull for light` / `pull for dark`). Dragging past threshold, tapping, or activating via keyboard plays a synthesized switch click and triggers a `520ms` circular `clip-path` View Transition (`cord-flood`) from the bead's screen coordinates. Under `prefers-reduced-motion: reduce`, springs critically damp and theme switches commit immediately without the clip flood.

## Do's and Don'ts

### Do:
- **Do** author all color, border, and surface assignments through the CSS custom properties in `app/globals.css` so Obsidian Liner Notes and Linen Studio Paper remain in sync.
- **Do** keep audio muted by default on page load and require explicit user interaction (click, tap, or `1–5` pad shortcut) for any playback or UI tick sound.
- **Do** preserve `prefers-reduced-motion: reduce` behavior by disabling vinyl spin, VU oscillation, pointer dot glow, View Transition clip animations, and spring overshoot.
- **Do** format dates, BPM, coordinates, stack tags, and status counters in `Geist Mono` with `tabular-nums` and `/` separators.
- **Do** constrain narrative prose lines to `56ch–64ch` and keep resting cards flat with `1px` `--rule-hair` borders.

### Don't:
- **Don't** introduce Inter, decorative serif headlines, purple gradients, glowing neon buttons, or background particle canvases.
- **Don't** add uppercase tracked eyebrows or pill badges above section headings, or middle-dot (`·`) metadata chains.
- **Don't** apply drop shadows to static inline cards, buttons, or sampler pads; reserve `--shadow-float` strictly for transient floating overlays.
- **Don't** trigger hover audio or autoplay background loops when visitors enter the site or move across project rows.
- **Don't** style interactive components with Tailwind's `bg-accent` or `text-accent` utility classes until the `tailwind.config.ts` `hsl(var(--accent))` bridge is reconciled; reference `var(--accent)` directly.
