import GoogleOAuthButton from '@/components/auth/google-oauth-button'
import SplineScene from '@/components/spline/spline-scene'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Sparkles, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Spline Scene dengan background transparan */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="relative z-10 w-full h-full">
          <SplineScene />
        </div>
      </div>

      {/* Right Side - CTA Card */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Polcer AI</h1>
            </div>
            <CardTitle className="text-center text-xl">
              Asisten Cerdas untuk Pembelajaran Anda
            </CardTitle>
            <CardDescription className="text-center">
              Dapatkan pengalaman belajar yang lebih interaktif dan personal dengan AI kami
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">Akses materi pembelajaran kapan saja</p>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">Bantuan AI untuk menjawab pertanyaan</p>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">Konten pembelajaran yang disesuaikan</p>
              </div>
            </div>

            <div className="space-y-3">
              <GoogleOAuthButton />

              <div className="flex items-center justify-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  Cepat & Mudah
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Aman & Terpercaya
                </Badge>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Dengan masuk, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}