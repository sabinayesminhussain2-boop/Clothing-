import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import { ProductGrid } from '../components/ProductCard'
import Benefits from '../components/Benefits'
import RecentlyViewed from '../components/RecentlyViewed'
import { saleProducts } from '../data/products'

export default function Sale() {
  const products = saleProducts()

  return (
    <>
      <section className="sale-hero">
        <div className="container sale-hero__inner">
          <div>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Limited time
            </span>
            <h1>Season Sale</h1>
            <p>
              Selected pieces from the collection, reduced quietly. Four styles only — once they are
              gone, they are gone.
            </p>
            <Link to="/clothing" className="btn btn--light">
              Shop all clothing <ArrowRight size={15} />
            </Link>
          </div>
          <div className="sale-hero__figure">
            <span>Up to</span>
            <strong>25%</strong>
            <span>off selected styles</span>
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ paddingTop: 24 }}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Sale' }]} />
        </div>
        <div className="section" style={{ paddingTop: 8 }}>
          <div className="section-head">
            <div>
              <span className="eyebrow">Reduced</span>
              <h2 style={{ marginTop: 8 }}>On sale now</h2>
              <p>Original prices shown alongside every discounted piece.</p>
            </div>
            <span className="page-head__count">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>

      <Benefits />
      <RecentlyViewed limit={4} />
    </>
  )
}
