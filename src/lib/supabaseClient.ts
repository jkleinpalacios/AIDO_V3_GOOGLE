import { createClient } from '@supabase/supabase-js';

// Fix: Cast import.meta to any to resolve TypeScript error regarding 'env' property on ImportMeta
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Faltan las variables de entorno de Supabase. La autenticación no funcionará correctamente.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);