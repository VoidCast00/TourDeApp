import { t } from 'elysia'
import { url } from 'inspector'

// what a client may send to create or update a stop, only name is required
export const stopBody = t.Object({
  name: t.String({maxLength:255, minLength:1}),
  lines: t.Optional(t.String({maxLength:255})),
  is_transfer: t.Optional(t.Boolean()),
  transfer_lines: t.Optional(t.Nullable(t.String({maxLength: 255}))),
  x: t.Optional(t.Number()),
  y: t.Optional(t.Number()),
  wheelchair_accessible: t.Boolean(),
  has_shelter: t.Boolean(),
  has_bench: t.Optional(t.Boolean()),
  has_ticket_machine: t.Boolean(),
  has_display: t.Optional(t.Boolean()),
  image_url: t.Optional(t.Nullable(t.String({maxLength:255, format:'uri'}))),
})


export const stopIdParams = t.Object({ id: t.Integer({ minimum: 1, maximum: Number.MAX_SAFE_INTEGER }) })

// the typescript type made from the schema above
export type NewStop = typeof stopBody.static