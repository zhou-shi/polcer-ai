'use client'

import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import SplineErrorBoundary from './error-boundary'

// Dynamic import untuk Spline dengan loading fallback
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Memuat 3D Scene...</p>
      </div>
    </div>
  )
})

interface SplineSceneProps {
  scene: string
}

function SplineSceneComponent({ scene }: SplineSceneProps) {
  return (
    <div className="relative w-full h-full">
      <Spline
        scene={scene}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />
    </div>
  )
}

export default function SplineScene() {
  return (
    <SplineErrorBoundary>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Memuat 3D Scene...</p>
            </div>
          </div>
        }
      >
        <SplineSceneComponent scene="https://prod.spline.design/z-N6HevBt9TorsBn/scene.splinecode" />
      </Suspense>
    </SplineErrorBoundary>
  )
}