import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, MoveRight } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import CategoryCards from '../components/CategoryCards'
import EditorialBanner from '../components/EditorialBanner'
import Benefits from '../components/Benefits'
import RecentlyViewed from '../components/RecentlyViewed'
import { ProductGrid } from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

const MARQUEE_ITEMS = [
  'Free shipping over ₹2,499',
  '30-day easy returns',
  'New season — arrival 01',
  'Made in small runs',
  'Premium everyday essentials',
]

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <span key={group}>
            {row.map((item, index) => (
              <span key={`${group}-${index}`}>
                {item} <MoveRight size={12} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

function NewsletterBand() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
  }

  return (
    <section className="newsletter-band">
      <div className="container">
        <span className="eyebrow">Stay in the loop</span>
        <h2 style={{ marginTop: 10 }}>Join the VANTA list</h2>
        <p>New drops, restocks and private sales — sent sparingly.</p>
        {sent ? (
          <p className="newsletter-band__success">
            <Check size={16} /> Thank you — you are subscribed. Watch your inbox.
          </p>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="band-email" className="sr-only">
              Email address
            </label>
            <input
              id="band-email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="btn" type="submit">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default function Home() {
  const trending = PRODUCTS.filter((product) => product.featuredRank <= 8)

  return (
    <>
      <HeroBanner />
      <Marquee />

      <CategoryCards />

      <section className="section" aria-labelledby="trending-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Most wanted</span>
              <h2 id="trending-heading" style={{ marginTop: 8 }}>
                Trending now
              </h2>
              <p>The pieces our community keeps coming back for.</p>
            </div>
            <Link to="/clothing" className="link-arrow">
              Shop all <ArrowUpRight size={14} />
            </Link>
          </div>
          <ProductGrid products={trending} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}>
            <Link to="/clothing" className="btn btn--ghost">
              View complete collection <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <EditorialBanner />

      <Benefits />

      <section className="section" aria-labelledby="sale-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sale-band">
            <div>
              <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Limited time
              </span>
              <h2>Private sale</h2>
              <p>
                A short edit of selected pieces, quietly reduced. Four styles only — while sizes
                last.
              </p>
            </div>
            <div className="sale-band__side">
              <span className="sale-band__figure">Up to 25% off</span>
              <Link to="/sale" className="btn btn--light">
                Shop the sale <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RecentlyViewed limit={4} />
      <NewsletterBand />
    </>
  )
}
