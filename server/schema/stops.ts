import { t } from 'elysia'

// what a client may send to create or update a stop, only name is required
export const stopBody = t.Object({
  name: t.String(),
  lines: t.Optional(t.String()),
  is_transfer: t.Optional(t.Boolean()),
  transfer_lines: t.Optional(t.Nullable(t.String())),
  x: t.Optional(t.Number()),
  y: t.Optional(t.Number()),
  wheelchair_accessible: t.Optional(t.Boolean()),
  has_shelter: t.Optional(t.Boolean()),
  has_bench: t.Optional(t.Boolean()),
  has_ticket_machine: t.Optional(t.Boolean()),
  has_display: t.Optional(t.Boolean()),
  image_url: t.Optional(t.Nullable(t.String())),
})

// the typescript type made from the schema above
export type NewStop = typeof stopBody.static