import { SlidersHorizontal } from 'lucide-react'
import { CATEGORIES, PRODUCTS, SIZES, formatPrice } from '../data/products'

const maxCatalogPrice = Math.max(...PRODUCTS.map((product) => product.price))

export function FilterPanel({
  category,
  onCategory,
  sizes,
  onToggleSize,
  maxPrice,
  onMaxPrice,
  inStockOnly,
  onInStockOnly,
  onReset,
  activeCount,
  showReset = true,
}) {
  return (
    <div className="filters">
      <div className="filters__group">
        <h4>
          Category <span>{category === 'all' ? 'All' : ''}</span>
        </h4>
        <div className="filters__list">
          <label className="check">
            <input
              type="checkbox"
              checked={category === 'all'}
              onChange={() => onCategory('all')}
            />
            All clothing
          </label>
          {CATEGORIES.map((item) => (
            <label className="check" key={item.slug}>
              <input
                type="checkbox"
                checked={category === item.slug}
                onChange={() => onCategory(item.slug)}
              />
              {item.name}
            </label>
          ))}
        </div>
      </div>

      <div className="filters__group">
        <h4>Price range</h4>
        <div className="range">
          <span className="range__value">Up to {formatPrice(maxPrice)}</span>
          <input
            type="range"
            min={900}
            max={maxCatalogPrice}
            step={100}
            value={maxPrice}
            aria-label="Maximum price"
            onChange={(event) => onMaxPrice(Number(event.target.value))}
          />
        </div>
      </div>

      <div className="filters__group">
        <h4>Size</h4>
        <div className="size-options">
          {SIZES.map((size) => (
            <button
              key={size}
              className={sizes.includes(size) ? 'is-active' : ''}
              aria-pressed={sizes.includes(size)}
              onClick={() => onToggleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="filters__group">
        <h4>Availability</h4>
        <label className="check">
          <input type="checkbox" checked={inStockOnly} onChange={onInStockOnly} />
          In stock only
        </label>
      </div>

      {showReset && (
        <div className="filters__footer">
          <button className="btn btn--ghost btn--sm btn--block" onClick={onReset}>
            Reset filters {activeCount > 0 ? `(${activeCount})` : ''}
          </button>
        </div>
      )}
    </div>
  )
}

export function FilterToggle({ activeCount, onClick }) {
  return (
    <button className="filter-toggle" onClick={onClick} aria-label="Open filters">
      <SlidersHorizontal size={14} /> Filters
      {activeCount > 0 && <span className="filter-toggle__count">{activeCount}</span>}
    </button>
  )
}
