// one soft color per category so the lists are easier to scan
// (full class names on purpose, tailwind can't see classes that are glued together at runtime)

type CategoryColor = {
  dot: string // small dot in the sidebar
  chip: string // category label in lists
  thumb: string // image placeholder background + icon color
}

const colors: Record<string, CategoryColor> = {
  cleaning: { dot: 'bg-sky-500', chip: 'bg-sky-50 text-sky-700 ring-sky-200', thumb: 'bg-sky-100 text-sky-400' },
  // repairs: { dot: 'bg-amber-500', chip: 'bg-amber-50 text-amber-800 ring-amber-200', thumb: 'bg-amber-100 text-amber-400' },
  // moving: { dot: 'bg-violet-500', chip: 'bg-violet-50 text-violet-700 ring-violet-200', thumb: 'bg-violet-100 text-violet-400' },
  // garden: { dot: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200', thumb: 'bg-emerald-100 text-emerald-400' },
  // tutoring: { dot: 'bg-rose-500', chip: 'bg-rose-50 text-rose-700 ring-rose-200', thumb: 'bg-rose-100 text-rose-400' },
  // it: { dot: 'bg-indigo-500', chip: 'bg-indigo-50 text-indigo-700 ring-indigo-200', thumb: 'bg-indigo-100 text-indigo-400' },
  // pets: { dot: 'bg-teal-500', chip: 'bg-teal-50 text-teal-700 ring-teal-200', thumb: 'bg-teal-100 text-teal-400' },
}

const fallback: CategoryColor = { dot: 'bg-slate-400', chip: 'bg-slate-50 text-slate-700 ring-slate-200', thumb: 'bg-slate-100 text-slate-400' }

export function categoryColor(slug: string): CategoryColor {
  return colors[slug] ?? fallback
}
