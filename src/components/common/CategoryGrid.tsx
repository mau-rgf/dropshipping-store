import Link from 'next/link'
import { Smartphone, Shirt, Home, Dumbbell, Sparkles, Gift } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  { name: 'Eletrônicos', slug: 'eletronicos', icon: Smartphone, color: 'bg-blue-500' },
  { name: 'Moda', slug: 'moda', icon: Shirt, color: 'bg-pink-500' },
  { name: 'Casa', slug: 'casa-decoracao', icon: Home, color: 'bg-amber-500' },
  { name: 'Esportes', slug: 'esportes', icon: Dumbbell, color: 'bg-green-500' },
  { name: 'Beleza', slug: 'beleza', icon: Sparkles, color: 'bg-purple-500' },
  { name: 'Presentes', slug: 'presentes', icon: Gift, color: 'bg-red-500' },
]

export function CategoryGrid() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Categorias</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Link key={cat.slug} href={`/category/${cat.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className={`${cat.color} p-3 rounded-full text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-center">{cat.name}</span>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
