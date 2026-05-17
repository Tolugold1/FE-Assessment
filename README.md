# Snaarp Dashboard — Frontend Assessment

A React implementation of the Snaarp admin dashboard with drag-and-drop
reordering of dashboard cards. Built as part of the Snaarp Frontend Developer
assessment.

## Live demo

> _Add Vercel/Netlify URL here once deployed._

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** for styling (via `@tailwindcss/vite`)
- **@dnd-kit** for drag-and-drop (see notes below)
- **Recharts** for the bar and area charts
- **lucide-react** for icons

State is managed with plain React hooks. The order of draggable cards is
persisted to `localStorage` so rearrangements survive a refresh.

## Running it

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # type-check + production build
npm run preview # preview the built bundle
```

## What was built

Out of the full design, I prioritised the pieces that exercise the actual
assessment criterion (drag-and-drop) and a presentable layout. In order of
completeness:

- **Layout**: sidebar (static), top bar with search and "agent code" copy.
- **Cloud Network**: 4 metric cards that are drag-and-droppable in their row,
  plus the storage donut and the upgrade-plan note.
- **File Sharing**: bar chart rendered with Recharts; toggle between bar/line
  icons is purely visual.
- **Active Users**: country list with progress bars and a hand-drawn map
  placeholder (more on this below).
- **Device Management Dashboard**: 4 draggable metric cards on top, then the
  Plugged / Unplugged / Active / Offline / Sent / Received pair-cards and OS
  / org / read-status breakdown rows.
- **Productivity Report**: 4 draggable cards.
- **Email Chart** and **Total Email**: hand-rolled SVG donut and a Recharts
  area chart.
- **Online Users**: sortable-looking table with status dots, avatars and app
  badges.

Each of the three draggable card sections persists its order independently
under its own `localStorage` key (e.g. `snaarp.cloudNetwork.order`).

## What I left out

To stay honest about a weekend-sized scope I did not attempt:

- A real interactive **map** for the "Active Users" panel. A proper Mapbox /
  Leaflet integration was out of scope for the timeframe, so I drew a stand-in
  SVG with the pins from the design.
- Full **mobile** polish. Layouts collapse sensibly down to tablet (the
  sidebar hides below `lg`) but I did not iterate on mobile spacing.
- A **search results** view — the search input in the topbar is wired to state
  but not to any results.

## Challenges faced

- `react-beautiful-dnd` is the library the brief lists by name, but it has
  been [deprecated since 2022](https://github.com/atlassian/react-beautiful-dnd/issues/2672)
  and is unmaintained for React 18+. I initially used the maintained fork
  `@hello-pangea/dnd` — same API, same family — but ran into a fundamental
  limitation: both libraries are 1D-only. The Cloud Network section in the
  design is a 2×2 grid of metric cards, and in that layout the placement
  transforms `react-beautiful-dnd` applies to siblings during a drag
  escape the column boundaries and visually overlap the next section.
  Switched to [`@dnd-kit`](https://docs.dndkit.com/) and used its
  `rectSortingStrategy`, which is purpose-built for 2D grids. As a bonus
  the bundle is ~40 kB smaller.
- **Recharts 3 + React 19 ResponsiveContainer** can land in a measurement
  loop where reported dimensions oscillate between `-1` and the real size.
  Symptom: tons of `width(-1) and height(-1) of chart should be greater than 0`
  warnings and the renderer locks up. I replaced `ResponsiveContainer` with a
  small `useElementSize` hook (`src/hooks/useElementSize.ts`) that observes the
  parent once via `ResizeObserver`, rounds the result to integer pixels, and
  passes explicit `width` / `height` to the chart.
- The storage donut and email donut are not Recharts — they are hand-rolled
  SVG. For a static decorative chart it was less code than the Recharts
  Pie + Cell + Tooltip setup and rendered exactly how I wanted.

## Project layout

```
src/
  components/
    layout/      Sidebar, Topbar
    dashboard/   Each panel from the design
    ui/          Reusable bits: Card, MetricCard, DraggableCards
  data/mock.ts   All mock data + types in one place
  hooks/         usePersistedOrder, useElementSize
  lib/cn.ts      Tailwind class joiner
  App.tsx        Page composition
```

## Accessibility notes

- The drag handles inherit `@hello-pangea/dnd`'s keyboard support out of the
  box: focus a card and press <kbd>Space</kbd> to lift, arrow keys to move,
  <kbd>Space</kbd> to drop.
- The search input, notification button, sort headers, and toggle buttons
  carry `aria-label` / `aria-pressed` where the visual is ambiguous.
- Trend arrows and dots are paired with text so colour isn't the only signal.
