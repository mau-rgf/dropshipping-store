import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            Novidades toda semana
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Os melhores produtos com os{' '}
            <span className="text-primary">melhores preços</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Descubra milhares de produtos com frete grátis para todo o Brasil.
            Pagamento seguro e parcelamento em até 12x.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/category/ofertas">
                Ver ofertas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/category/novidades">Novidades</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decoração */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
    </section>
  )
}
