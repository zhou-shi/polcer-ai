'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Loader2, RefreshCw, UserCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function WaitingVerification() {
  const [isChecking, setIsChecking] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const checkVerificationStatus = async () => {
    setIsChecking(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        router.refresh()
      }
    }

    setIsChecking(false)
  }

  useEffect(() => {
    // Check status every 10 seconds
    const interval = setInterval(checkVerificationStatus, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-background items-center justify-center p-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <UserCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-xl">Verifikasi Akun</CardTitle>
          <CardDescription>
            Akun Anda sedang dalam proses verifikasi. Halaman ini akan diperbarui otomatis saat verifikasi selesai.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>

          <Button
            onClick={checkVerificationStatus}
            disabled={isChecking}
            variant="outline"
            className="w-full"
          >
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memeriksa Status...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Periksa Sekarang
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Proses verifikasi biasanya memakan waktu beberapa menit. Jika masih terkendala, hubungi administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}