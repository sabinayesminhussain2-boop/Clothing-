import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import { ProductGrid } from '../components/ProductCard'
import { FilterPanel } from '../components/FilterBar'
import RecentlyViewed from '../components/RecentlyViewed'
import { CATEGORIES, PRODUCTS, isSizeAvailable } from '../data/products'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

const DEFAULT_MAX = Math.max(...PRODUCTS.map((product) => product.price))

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false)

  const category = searchParams.get('category') ?? 'all'
  const sort = searchParams.get('sort') ?? 'featured'
  const size = searchParams.get('size') ?? ''
  const inStockOnly = searchParams.get('inStock') === '1'
  const maxPrice = Number(searchParams.get('maxPrice') ?? DEFAULT_MAX)

  const updateParams = (updates, { replace = false } = {}) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === undefined) next.delete(key)
      else next.set(key, String(value))
    })
    setSearchParams(next, { replace })
  }

  const setCategory = (slug) => {
    updateParams({ category: slug === 'all' ? null : slug })
    setFilterDrawerOpen(false)
  }

  const toggleSize = (nextSize) => updateParams({ size: size === nextSize ? null : nextSize })

  const resetFilters = () => {
    setSearchParams(new URLSearchParams(sort === 'featured' ? {} : { sort }))
    setFilterDrawerOpen(false)
  }

  useEffect(() => {
    if (!isFilterDrawerOpen) return undefined
    document.body.classList.add('is-locked')
    const onKey = (event) => event.key === 'Escape' && setFilterDrawerOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      document.removeEventListener('keydown', onKey)
    }
  }, [isFilterDrawerOpen])

  const activeCategory = CATEGORIES.find((item) => item.slug === category)
  const activeFilterCount =
    (category !== 'all' ? 1 : 0) +
    (size ? 1 : 0) +
    (maxPrice < DEFAULT_MAX ? 1 : 0) +
    (inStockOnly ? 1 : 0)

  const products = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => {
      if (category !== 'all' && product.categorySlug !== category) return false
      if (product.price > maxPrice) return false
      if (size && !isSizeAvailable(product, size)) return false
      if (inStockOnly && !product.inStock) return false
      return true
    })

    switch (sort) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'name-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return [...filtered].sort((a, b) => a.featuredRank - b.featuredRank)
    }
  }, [category, maxPrice, size, inStockOnly, sort])

  const title = activeCategory ? activeCategory.name : 'All Clothing'
  const description = activeCategory
    ? {
        'T-Shirts': 'Weighty cottons, clean necklines and the fits we return to every week.',
        Shirts: 'Linen, twill and everything in between — designed to layer or stand alone.',
        Pants: 'Relaxed, straight and utility cuts built for long days on your feet.',
        Hoodies: 'Brushed fleece and loopback cotton in the weights that actually last.',
      }[activeCategory.name]
    : 'The complete VANTA collection — considered essentials in black, white and quiet neutrals.'

  const filterProps = {
    category,
    onCategory: setCategory,
    sizes: size ? [size] : [],
    onToggleSize: toggleSize,
    maxPrice,
    onMaxPrice: (value) => updateParams({ maxPrice: value >= DEFAULT_MAX ? null : value }, { replace: true }),
    inStockOnly,
    onInStockOnly: () => updateParams({ inStock: inStockOnly ? null : '1' }),
    onReset: resetFilters,
    activeCount: activeFilterCount,
  }

  return (
    <>
      <div className="container">
        <div className="page-head">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Clothing', to: '/clothing' },
              ...(activeCategory ? [{ label: activeCategory.name }] : [{ label: 'All clothing' }]),
            ]}
          />
          <div className="page-head__row">
            <div>
              <h1>{title}</h1>
              <p className="page-head__desc">{description}</p>
            </div>
            <span className="page-head__count">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>
        </div>

        <div className="collection__toolbar">
          <div className="collection__toolbar-left">
            <button
              className={`chip${category === 'all' ? ' is-active' : ''}`}
              onClick={() => setCategory('all')}
            >
              All
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item.slug}
                className={`chip${category === item.slug ? ' is-active' : ''}`}
                onClick={() => setCategory(item.slug)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="collection__toolbar-right">
            <button className="filter-toggle" onClick={() => setFilterDrawerOpen(true)}>
              Filters
              {activeFilterCount > 0 && (
                <span className="filter-toggle__count">{activeFilterCount}</span>
              )}
            </button>
            <div className="sort-select">
              <label htmlFor="sort" className="sr-only">
                Sort products
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => updateParams({ sort: event.target.value })}
              >
                {SORT_OPTIONS.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="collection__layout">
          <aside aria-label="Filters">
            <FilterPanel {...filterProps} />
          </aside>

          <div>
            {(activeFilterCount > 0 || products.length !== PRODUCTS.length) && (
              <div className="results-note">
                <div className="active-filters">
                  {activeCategory && (
                    <button className="active-filter" onClick={() => setCategory('all')}>
                      {activeCategory.name} <X size={11} />
                    </button>
                  )}
                  {size && (
                    <button className="active-filter" onClick={() => toggleSize(size)}>
                      Size {size} <X size={11} />
                    </button>
                  )}
                  {maxPrice < DEFAULT_MAX && (
                    <button
                      className="active-filter"
                      onClick={() => updateParams({ maxPrice: null })}
                    >
                      Under ₹{maxPrice.toLocaleString('en-IN')} <X size={11} />
                    </button>
                  )}
                  {inStockOnly && (
                    <button className="active-filter" onClick={() => updateParams({ inStock: null })}>
                      In stock <X size={11} />
                    </button>
                  )}
                </div>
                <button className="remove-link" onClick={resetFilters}>
                  Reset filters
                </button>
              </div>
            )}

            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="collection-empty">
                <h3>No products match those filters</h3>
                <p>
                  Try widening the price range, choosing a different size or clearing the filters to
                  see the full collection.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button className="btn btn--sm" onClick={resetFilters}>
                    Reset filters
                  </button>
                  <Link to="/new-arrivals" className="btn btn--ghost btn--sm">
                    Browse new arrivals
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isFilterDrawerOpen && (
        <>
          <div className="scrim" onClick={() => setFilterDrawerOpen(false)} aria-hidden="true" />
          <aside className="drawer" role="dialog" aria-modal="true" aria-label="Filters">
            <div className="drawer__head">
              <h3>
                Filters <span>{products.length} results</span>
              </h3>
              <button
                className="icon-btn"
                aria-label="Close filters"
                onClick={() => setFilterDrawerOpen(false)}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="drawer__body" style={{ padding: '8px 24px 24px' }}>
              <FilterPanel {...filterProps} />
            </div>
          </aside>
        </>
      )}

      <RecentlyViewed limit={4} />
    </>
  )
}
