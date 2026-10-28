import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products'

export default function CategoryCards() {
  return (
    <section className="section" aria-labelledby="categories-heading">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2 id="categories-heading" style={{ marginTop: 8 }}>
              Built around the essentials
            </h2>
          </div>
          <Link to="/clothing" className="link-arrow">
            View all clothing <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="categories">
          {CATEGORIES.map((category) => {
            const count = PRODUCTS.filter((product) => product.categorySlug === category.slug).length
            return (
              <Link
                key={category.slug}
                to={`/clothing?category=${category.slug}`}
                className="category-card"
                aria-label={`Explore ${category.name}`}
              >
                <img src={category.image} alt={category.name} loading="lazy" />
                <div className="category-card__body">
                  <div>
                    <span className="category-card__name">{category.name}</span>
                    <span className="category-card__count">{count} pieces</span>
                  </div>
                  <span className="category-card__cta">
                    Explore <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
