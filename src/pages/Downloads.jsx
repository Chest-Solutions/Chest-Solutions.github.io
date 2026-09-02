import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { products } from '../data/site.js'

export default function Downloads() {
  useTitle('Downloads')

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Downloads</h1>
        <p className="mt-3 text-neutral-400">All software is free and open source.</p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.name} product={product} delay={i * 0.08} />
        ))}
      </div>
    </div>
  )
}
