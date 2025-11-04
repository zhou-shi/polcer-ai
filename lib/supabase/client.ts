import { createBrowserClient } from '@supabase/ssr';
import { Database } from '../database.types'; // <-- Impor tipe yang di-generate

export function createClient() {
  // Perhatikan penggunaan '!' untuk memastikan env var ada
  // Anda perlu mengatur env var ini di file .env.local
  return createBrowserClient<Database>( // <-- Terapkan tipe di sini
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}