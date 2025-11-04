'use client'

import GoogleIcon from '@/components/icons/google-icon'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function GoogleOAuthButton() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Error signing in with Google:', error.message)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Memproses...
        </>
      ) : (
        <>
          <GoogleIcon size={18} />
          Mulai Dengan Google
        </>
      )}
    </Button>
  )
}