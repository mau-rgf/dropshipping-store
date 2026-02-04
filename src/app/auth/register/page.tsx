'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) {
        if (error.message.includes('already registered')) {
          setError('Este e-mail já está cadastrado')
        } else {
          setError('Erro ao criar conta. Tente novamente.')
        }
        return
      }

      router.push('/auth/verify-email')
    } catch {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-light tracking-wider text-center mb-8">
          CRIAR CONTA
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-sm text-red-600 text-center py-2 bg-red-50">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="NOME COMPLETO"
              className="w-full bg-transparent border-0 border-b border-border
                       py-3 text-sm tracking-wider placeholder:text-muted-foreground
                       focus:outline-none focus:border-foreground transition-colors"
              required
            />
          </div>

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

          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="CONFIRMAR SENHA"
              className="w-full bg-transparent border-0 border-b border-border
                       py-3 text-sm tracking-wider placeholder:text-muted-foreground
                       focus:outline-none focus:border-foreground transition-colors"
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="terms" required className="mt-1" />
            <label htmlFor="terms" className="text-xs text-muted-foreground">
              Li e aceito os{' '}
              <Link href="/termos" className="underline hover:text-foreground">
                termos e condições
              </Link>{' '}
              e a{' '}
              <Link href="/politica-privacidade" className="underline hover:text-foreground">
                política de privacidade
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-foreground text-background text-xs tracking-wider
                     hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'CRIANDO...' : 'CRIAR CONTA'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs tracking-wider text-muted-foreground mb-4">
            JÁ TEM UMA CONTA?
          </p>
          <Link
            href="/auth/login"
            className="inline-block w-full py-3 border border-foreground text-xs tracking-wider
                     hover:bg-foreground hover:text-background transition-colors"
          >
            INICIAR SESSÃO
          </Link>
        </div>
      </div>
    </main>
  )
}
