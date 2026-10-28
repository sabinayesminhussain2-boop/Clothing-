import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { CATEGORIES, formatPrice, hasDiscount, newArrivals, searchProducts } from '../data/products'

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('')
      return undefined
    }
    document.body.classList.add('is-locked')
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60)
    const onKey = (event) => {
      if (event.key === 'Escape') closeSearch()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
    }
  }, [isSearchOpen, closeSearch])

  if (!isSearchOpen) return null

  const results = searchProducts(query)
  const hasQuery = query.trim().length > 0

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="search-overlay__top">
        <div className="search-overlay__field">
          <Search size={22} strokeWidth={1.4} />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            ref={inputRef}
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {hasQuery && (
            <button className="icon-btn" aria-label="Clear search" onClick={() => setQuery('')}>
              <X size={18} strokeWidth={1.5} />
            </button>
          )}
        </div>
        <button className="btn btn--ghost btn--sm" onClick={closeSearch}>
          Close
        </button>
      </div>

      <div className="search-overlay__body">
        <p className="search-overlay__hint">{hasQuery ? `${results.length} results` : 'Browse by category'}</p>
        <div className="chips">
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              className={`chip${query.toLowerCase() === category.name.toLowerCase() ? ' is-active' : ''}`}
              onClick={() => setQuery(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {hasQuery ? (
          results.length > 0 ? (
            <div className="search-results">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/clothing/${product.slug}`}
                  className="search-result"
                  onClick={closeSearch}
                >
                  <img src={product.image} alt={product.name} />
                  <div>
                    <div className="search-result__name">{product.name}</div>
                    <div className="search-result__meta">
                      {product.category}
                      {hasDiscount(product) ? ' · On sale' : ''}
                      {!product.inStock ? ' · Sold out' : ''}
                    </div>
                  </div>
                  <div className="search-result__price">
                    <span>{formatPrice(product.price)}</span>
                    {hasDiscount(product) && (
                      <span className="price price--original">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="search-empty">
              <strong>No products found</strong>
              <span>Try “shirt”, “pants”, “hoodie” or “sale”.</span>
            </div>
          )
        ) : (
          <>
            <p className="search-overlay__hint" style={{ marginTop: 30 }}>
              Popular right now
            </p>
            <div className="search-results">
              {newArrivals()
                .slice(0, 4)
                .map((product) => (
                  <Link
                    key={product.id}
                    to={`/clothing/${product.slug}`}
                    className="search-result"
                    onClick={closeSearch}
                  >
                    <img src={product.image} alt={product.name} />
                    <div>
                      <div className="search-result__name">{product.name}</div>
                      <div className="search-result__meta">{product.category}</div>
                    </div>
                    <div className="search-result__price">
                      <span>{formatPrice(product.price)}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
