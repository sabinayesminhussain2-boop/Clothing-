import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import { ProductGrid } from '../components/ProductCard'
import Benefits from '../components/Benefits'
import RecentlyViewed from '../components/RecentlyViewed'
import { newArrivals } from '../data/products'

export default function NewArrivals() {
  const products = newArrivals()

  return (
    <>
      <section className="arrivals-hero">
        <img src="/images/editorial-new-season.jpg" alt="VANTA new arrivals editorial" />
        <div className="arrivals-hero__overlay" />
        <div className="container arrivals-hero__body">
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Drop 01 · Autumn Winter 2026
          </span>
          <h1>New Arrivals</h1>
          <p>
            The newest additions to the VANTA wardrobe — heavier cottons, softer linen and tailoring
            built to be lived in.
          </p>
          <Link to="/clothing" className="btn btn--light">
            Shop the full collection <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <div className="container">
        <div style={{ paddingTop: 24 }}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'New Arrivals' }]} />
        </div>
        <div className="section" style={{ paddingTop: 8 }}>
          <div className="section-head">
            <div>
              <span className="eyebrow">Just landed</span>
              <h2 style={{ marginTop: 8 }}>The new edit</h2>
              <p>{products.length} pieces, added this season.</p>
            </div>
            <span className="page-head__count">{products.length} products</span>
          </div>
          <ProductGrid products={products} showNew />
        </div>
      </div>

      <Benefits />
      <RecentlyViewed limit={4} />
    </>
  )
}
