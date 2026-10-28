import { useStore } from '../context/StoreContext'
import { getProductById } from '../data/products'
import { ProductGrid } from './ProductCard'

export default function RecentlyViewed({ excludeId, limit = 4 }) {
  const { recentlyViewed } = useStore()
  const products = recentlyViewed
    .filter((id) => id !== excludeId)
    .map(getProductById)
    .filter(Boolean)
    .slice(0, limit)

  if (products.length < 2) return null

  return (
    <section className="section section--tight" aria-label="Recently viewed">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Keep exploring</span>
            <h2 style={{ marginTop: 8 }}>Recently viewed</h2>
          </div>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  )
}
