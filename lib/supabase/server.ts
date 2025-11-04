import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '../database.types'; // <-- Impor tipe yang di-generate

export async function createClient() { // <-- INI HARUS ASYNC
  const cookieStore = await cookies(); // <-- INI HARUS AWAIT

  // Perhatikan penggunaan '!' untuk memastikan env var ada
  // Anda perlu mengatur env var ini di file .env.local
  return createServerClient<Database>( // <-- Gunakan createServerClient
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Cookie store bersifat read-only saat merender Server Component
          }
        },
        remove(name: string, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Cookie store bersifat read-only saat merender Server Component
          }
        },
      },
    }
  );
}