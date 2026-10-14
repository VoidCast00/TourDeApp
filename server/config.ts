
//the deploy config uses VITE names and local .env uses NEXT_PUBLIC_ names, so accept both
export const PORT = Number(process.env.PORT) || 3000
export const JWT_SECRET = process.env.JWT_SECRET ?? process.env.VITE_JWT_SECRET
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
export const AUTH_KEY = process.env.BETTER_AUTH_SECRET ?? process.env.VITE_BETTER_AUTH_SECRET
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY


if(AUTH_KEY === undefined){
    throw Error("missing auth key")
}