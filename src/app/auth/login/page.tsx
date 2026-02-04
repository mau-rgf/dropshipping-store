'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError('E-mail ou senha incorretos')
        return
      }

      router.push('/account')
      router.refresh()
    } catch {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-light tracking-wider text-center mb-8">
          INICIAR SESSÃO
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-sm text-red-600 text-center py-2 bg-red-50">
              {error}
            </div>
          )}

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-MAIL"
              className="w-full bg-transparent border-0 border-b border-border
                       py-3 text-sm tracking-wider placeholder:text-muted-foreground
                       focus:outline-none focus:border-foreground transition-colors"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="SENHA"
              className="w-full bg-transparent border-0 border-b border-border
                       py-3 text-sm tracking-wider placeholder:text-muted-foreground
                       focus:outline-none focus:border-foreground transition-colors pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground
                       hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          </div>

          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              ESQUECEU A SENHA?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-foreground text-background text-xs tracking-wider
                     hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs tracking-wider text-muted-foreground mb-4">
            AINDA NÃO TEM CONTA?
          </p>
          <Link
            href="/auth/register"
            className="inline-block w-full py-3 border border-foreground text-xs tracking-wider
                     hover:bg-foreground hover:text-background transition-colors"
          >
            CRIAR CONTA
          </Link>
        </div>
      </div>
    </main>
  )
}
