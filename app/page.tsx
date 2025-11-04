import ChatPolcer from '@/components/chat-polcer/chat-polcer'
import LandingPage from '@/components/landing/landing'
import WaitingVerification from '@/components/waiting-verification/waiting-verification'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is not logged in, show landing page
  if (!user) {
    return <LandingPage />
  }

  // If user is logged in, check if profile exists
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // If profile doesn't exist, show waiting verification page
  if (!profile) {
    return <WaitingVerification />
  }

  // If user is authenticated and profile exists, show chat interface
  return <ChatPolcer />
}