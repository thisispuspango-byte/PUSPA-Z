'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, LogIn, UserPlus, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signInWithGoogle, signUp } = useAuth()

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp(email, password, name)
        if (signUpError) {
          const translated = translateError(signUpError)
          setError(translated)
        } else {
          setSuccess('Pendaftaran berjaya! Sila semak e-mel anda untuk pengesahan.')
        }
      } else {
        const { error: signInError } = await signIn(email, password)
        if (signInError) {
          const translated = translateError(signInError)
          setError(translated)
        } else {
          router.push('/')
          router.refresh()
        }
      }
    } catch {
      setError('Ralat tidak dijangka. Sila cuba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-900/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-900/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-100/20 dark:bg-purple-900/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand header — Exact Mirror of Identity Image Layout */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            {/* Logo Icon on White */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-2xl shadow-white/10 ring-4 ring-white/5 transition-all hover:scale-105">
              <img
                src="/puspa-logo-transparent.png"
                alt="PUSPA Icon"
                className="h-14 w-14 object-contain"
              />
            </div>
            
            {/* PUSPA Text Layout */}
            <div className="flex flex-col items-start text-left">
              <h1 className="text-6xl font-black tracking-tighter text-purple-950 dark:text-white leading-none">
                PUSPA
              </h1>
              {/* TAGLINE: IMPROVED CONTRAST */}
              <p className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-[0.2em] mt-1">
                Pertubuhan Urus Peduli Asnaf
              </p>
            </div>
          </div>
          
          <p className="text-xs text-purple-900/60 dark:text-white/40 italic font-medium">
            "Cerdas. Mesra. Sentiasa di sisi anda."
          </p>
        </div>

        {/* Login card */}
        <Card className="border-purple-100 dark:border-purple-900/40 shadow-xl shadow-purple-100/30 dark:shadow-purple-900/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">
              {isSignUp ? 'Daftar Akaun Baru' : 'Log Masuk'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp
                ? 'Cipta akaun untuk mengakses platform PUSPA'
                : 'Masukkan maklumat anda untuk meneruskan'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (sign up only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Penuh</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ahmad bin Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isSignUp}
                    disabled={loading}
                    className="h-11"
                  />
                </div>
              )}

              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mel</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@puspa.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-11"
                />
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password">Kata Laluan</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="h-11 pr-10"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 p-3">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              {success && (
                <div className="rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900/50 p-3">
                  <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
                </div>
              )}

              <Button id="page-Button-1"
                type="submit"
                className="w-full h-11 bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : isSignUp ? (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Daftar Sekarang
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log Masuk Sistem
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-purple-100 dark:border-purple-900/40" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">Atau teruskan dengan</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
              onClick={async () => {
                setLoading(true)
                try {
                  await signInWithGoogle()
                } catch (e) {
                  setError('Gagal log masuk dengan Google.')
                  setLoading(false)
                }
              }}
              disabled={loading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Log Masuk dengan Google
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? 'Sudah mempunyai akaun?' : 'Belum mempunyai akaun?'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError(null)
                  setSuccess(null)
                }}
                className="mt-1 text-sm font-bold text-purple-700 hover:underline dark:text-purple-400 transition-colors"
                disabled={loading}
              >
                {isSignUp ? 'Log masuk di sini' : 'Cipta akaun baru'}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
            PPM-024-10-05012022 &bull; NGO Management Platform
          </p>
        </div>
      </div>
    </div>
  )
}

function translateError(error: string): string {
  const translations: Record<string, string> = {
    'Invalid login credentials': 'E-mel atau kata laluan tidak sah.',
    'Email not confirmed': 'E-mel belum disahkan.',
    'User already registered': 'E-mel ini sudah didaftarkan.',
    'Password should be at least 6 characters': 'Kata laluan terlalu pendek.',
  }
  return translations[error] || error
}
