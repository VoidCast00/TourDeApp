// this is where env vars get read, so the rest of the server doesn't touch process.env
export const PORT = Number(process.env.PORT) || 3000
export const JWT_SECRET = process.env.JWT_SECRET
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
