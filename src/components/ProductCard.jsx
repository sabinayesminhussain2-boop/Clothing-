import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Heart, Plus, ShoppingBag } from 'lucide-react'
import { formatPrice, hasDiscount, discountPercent } from '../data/products'
import { useStore } from '../context/StoreContext'
import SizePicker from './SizePicker'

export default function ProductCard({ product, showNew = false }) {
  const { addToBag, toggleWishlist, isWishlisted, preferredSizes } = useStore()
  const [isPickingSize, setPickingSize] = useState(false)
  const wishlisted = isWishlisted(product.id)
  const discount = hasDiscount(product)
  const isNew = showNew || (product.isNew && !discount)
  const preferredSize = preferredSizes[product.id]

  const handleQuickAdd = () => {
    if (!product.inStock) return
    if (preferredSize) {
      addToBag(product.id, preferredSize, 1)
      return
    }
    setPickingSize(true)
  }

  const handleSize = (size) => {
    setPickingSize(false)
    addToBag(product.id, size, 1)
  }

  return (
    <article className={`product-card${!product.inStock ? ' is-sold-out' : ''}`}>
      <div className="product-card__media">
        <Link to={`/clothing/${product.slug}`} aria-label={product.name}>
          <img
            className="product-card__img product-card__img--primary"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
          <img
            className="product-card__img product-card__img--secondary"
            src={product.secondaryImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </Link>

        <div className="product-card__badges">
          {isNew && <span className="badge">New</span>}
          {discount && <span className="badge badge--sale">Sale</span>}
          {!product.inStock && <span className="badge badge--out">Sold out</span>}
        </div>

        <button
          className={`product-card__wish${wishlisted ? ' is-active' : ''}`}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={17} strokeWidth={1.5} />
        </button>

        {!product.inStock ? (
          <span className="quick-add" style={{ opacity: 1, transform: 'none' }}>
            Sold out
          </span>
        ) : isPickingSize ? (
          <SizePicker
            product={product}
            onCancel={() => setPickingSize(false)}
            onSelect={handleSize}
          />
        ) : (
          <button className="quick-add" onClick={handleQuickAdd}>
            {preferredSize ? (
              <>
                <Check size={13} /> Add · Size {preferredSize}
              </>
            ) : (
              <>
                <Plus size={13} /> Quick add
              </>
            )}
          </button>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <Link to={`/clothing/${product.slug}`} className="product-card__name">
          {product.name}
        </Link>
        <div className="product-card__prices">
          <span className="price price--current">{formatPrice(product.price)}</span>
          {discount && (
            <>
              <span className="price price--original">{formatPrice(product.originalPrice)}</span>
              <span className="price--off">−{discountPercent(product)}%</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProductGrid({ products, showNew = false }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showNew={showNew} />
      ))}
    </div>
  )
}

export function MiniProductRow({ product, meta }) {
  return (
    <Link to={`/clothing/${product.slug}`} className="search-result" onClick={() => {}}>
      <img src={product.image} alt={product.name} loading="lazy" />
      <div>
        <div className="search-result__name">{product.name}</div>
        <div className="search-result__meta">{meta ?? product.category}</div>
      </div>
      <div className="search-result__price">
        <span>{formatPrice(product.price)}</span>
        {hasDiscount(product) && (
          <span className="price price--original">{formatPrice(product.originalPrice)}</span>
        )}
      </div>
    </Link>
  )
}

export function EmptyState({ icon, title, children, action }) {
  return (
    <div className="empty-state">
      {icon ?? <ShoppingBag size={34} strokeWidth={1.1} />}
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
    </div>
  )
}
