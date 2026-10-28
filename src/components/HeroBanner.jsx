import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="hero">
      <img className="hero__image" src="/images/hero.jpg" alt="Two models wearing VANTA essentials" />
      <div className="container hero__inner">
        <h1 className="hero__wordmark">VANTA</h1>
        <h2 className="hero__title">Style that moves with you</h2>
        <p className="hero__text">Discover everyday essentials and modern silhouettes.</p>
        <div className="hero__actions">
          <Link to="/clothing" className="btn btn--light">
            Shop collection <ArrowRight size={15} />
          </Link>
          <Link to="/new-arrivals" className="btn btn--ghost-light">
            Explore new arrivals
          </Link>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        Autumn / Winter 2026
      </div>
    </section>
  )
}
