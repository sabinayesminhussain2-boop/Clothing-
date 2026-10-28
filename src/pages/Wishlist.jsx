import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, X } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import { EmptyState } from '../components/ProductCard'
import RecentlyViewed from '../components/RecentlyViewed'
import { useStore } from '../context/StoreContext'
import SizePicker from '../components/SizePicker'
import { discountPercent, formatPrice, getProductById, hasDiscount } from '../data/products'

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToBag, preferredSizes } = useStore()
  const [pickerFor, setPickerFor] = useState(null)

  const products = wishlist.map(getProductById).filter(Boolean)

  const handleAdd = (product) => {
    if (!product.inStock) return
    const preferred = preferredSizes[product.id]
    if (preferred) {
      addToBag(product.id, preferred, 1)
      return
    }
    setPickerFor((current) => (current === product.id ? null : product.id))
  }

  return (
    <>
      <div className="container">
        <div className="page-head">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
          <div className="page-head__row">
            <div>
              <h1>Wishlist</h1>
              <p className="page-head__desc">
                Saved for later — pieces you are considering. Your wishlist is stored on this device.
              </p>
            </div>
            <span className="page-head__count">
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div style={{ padding: '34px 0 80px' }}>
          {products.length === 0 ? (
            <EmptyState
              icon={<Heart size={34} strokeWidth={1.1} />}
              title="Your wishlist is empty"
              action={
                <Link to="/clothing" className="btn btn--sm">
                  Explore clothing
                </Link>
              }
            >
              Tap the heart on any product to save it here for later.
            </EmptyState>
          ) : (
            <div className="product-grid">
              {products.map((product) => {
                const discount = hasDiscount(product)
                return (
                  <article className="product-card" key={product.id}>
                    <div className="product-card__media">
                      <Link to={`/clothing/${product.slug}`}>
                        <img
                          className="product-card__img"
                          style={{ opacity: 1 }}
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />
                      </Link>
                      <div className="product-card__badges">
                        {discount && <span className="badge badge--sale">Sale</span>}
                        {product.isNew && <span className="badge">New</span>}
                        {!product.inStock && <span className="badge badge--out">Sold out</span>}
                      </div>
                      <button
                        className="product-card__wish is-active"
                        aria-label={`Remove ${product.name} from wishlist`}
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        <X size={16} strokeWidth={1.6} />
                      </button>

                      {pickerFor === product.id ? (
                        <SizePicker
                          product={product}
                          onCancel={() => setPickerFor(null)}
                          onSelect={(size) => {
                            addToBag(product.id, size, 1)
                            setPickerFor(null)
                          }}
                        />
                      ) : (
                        <button
                          className="quick-add is-open"
                          onClick={() => handleAdd(product)}
                          disabled={!product.inStock}
                        >
                          <ShoppingBag size={13} />{' '}
                          {product.inStock ? 'Add to bag' : 'Sold out'}
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
                            <span className="price price--original">
                              {formatPrice(product.originalPrice)}
                            </span>
                            <span className="price--off">−{discountPercent(product)}%</span>
                          </>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                        <Link
                          to={`/clothing/${product.slug}`}
                          className="btn btn--ghost btn--sm"
                          style={{ flex: 1, minWidth: 100 }}
                        >
                          View product
                        </Link>
                        <button
                          className="remove-link"
                          style={{ alignSelf: 'center' }}
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <RecentlyViewed limit={4} />
    </>
  )
}
