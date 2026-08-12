import { Loader2 } from 'lucide-react'

export function SkeletonLoader() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh] gap-4">
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold text-foreground animate-pulse">
          Memuat turun data...
        </h3>
        <p className="text-sm text-muted-foreground animate-pulse">
          Sila tunggu sebentar
        </p>
      </div>
    </div>
  )
}
