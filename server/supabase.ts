import { createClient } from '@supabase/supabase-js';
import { Elysia, status, t } from 'elysia';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY');
  
}

const supabase = createClient(supabaseUrl, supabaseKey);

new Elysia()
  .post('/api/v1/register', async  ({body}) => {
      const { data } = await supabase.from('Users').insert({name:'test',passwordHash:'test'}) 
      return data   
    })
 .listen(Number(process.env.PORT) || 3000)








