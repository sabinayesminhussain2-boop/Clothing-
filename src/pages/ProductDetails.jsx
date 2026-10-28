import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Check,
  Heart,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
} from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import { ProductGrid } from '../components/ProductCard'
import RecentlyViewed from '../components/RecentlyViewed'
import { useStore } from '../context/StoreContext'
import {
  discountPercent,
  formatPrice,
  getProductBySlug,
  hasDiscount,
  isSizeAvailable,
  relatedProducts,
} from '../data/products'

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <div className="accordion" style={{ marginTop: 24 }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div className="accordion__item" key={item.title}>
            <button
              className={`accordion__trigger${isOpen ? ' is-open' : ''}`}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              {item.title}
              <Plus size={16} strokeWidth={1.4} />
            </button>
            <div className={`accordion__panel${isOpen ? ' is-open' : ''}`}>
              <div>
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ProductDetails() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { addToBag, toggleWishlist, isWishlisted, trackView, openBag, notify } = useStore()

  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!product) return
    setSize('')
    setQuantity(1)
    setSizeError(false)
    setActiveImage(0)
    setActiveColor(0)
    setJustAdded(false)
    trackView(product.id)
  }, [product, trackView])

  const images = useMemo(
    () => (product ? [product.image, product.secondaryImage] : []),
    [product]
  )

  if (!product) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 500 }}>Product not found</h1>
        <p style={{ color: 'var(--muted)', margin: '12px 0 24px' }}>
          The piece you are looking for is no longer available.
        </p>
        <Link to="/clothing" className="btn">
          Back to clothing
        </Link>
      </div>
    )
  }

  const wishlisted = isWishlisted(product.id)
  const discount = hasDiscount(product)
  const related = relatedProducts(product, 4)

  const handleAddToBag = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    addToBag(product.id, size, quantity)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 6000)
  }

  return (
    <>
      <div className="container pdp">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Clothing', to: '/clothing' },
            { label: product.category, to: `/clothing?category=${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <div className="pdp__grid">
          <div className="pdp__gallery">
            <div className="pdp__thumbs">
              {images.map((image, index) => (
                <button
                  key={image}
                  className={`pdp__thumb${activeImage === index ? ' is-active' : ''}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
            <div className="pdp__main">
              <div className="pdp__badges">
                {product.isNew && <span className="badge">New</span>}
                {discount && <span className="badge badge--sale">Sale</span>}
                {!product.inStock && <span className="badge badge--out">Sold out</span>}
              </div>
              <img key={activeImage} src={images[activeImage]} alt={product.name} />
            </div>
          </div>

          <div className="pdp__info">
            <span className="eyebrow">{product.category}</span>
            <h1 className="pdp__title">{product.name}</h1>
            <p className="pdp__tagline">{product.tagline}</p>

            <div className="pdp__price">
              <span className="price price--current">{formatPrice(product.price)}</span>
              {discount && (
                <>
                  <span className="price price--original">{formatPrice(product.originalPrice)}</span>
                  <span className="price--off">Save {discountPercent(product)}%</span>
                </>
              )}
            </div>
            <p className="pdp__tax">Inclusive of all taxes · Free shipping over ₹2,499</p>

            <p className="pdp__desc">{product.description}</p>

            <div>
              <div className="option-label">
                Colour <span>{product.colors[activeColor]?.name}</span>
              </div>
              <div className="swatches">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    className={`swatch${activeColor === index ? ' is-active' : ''}`}
                    style={{ background: color.hex }}
                    aria-label={color.name}
                    aria-pressed={activeColor === index}
                    onClick={() => setActiveColor(index)}
                  />
                ))}
              </div>
            </div>

            <div className="option-label">
              Size <span>Model wears M · relaxed fit</span>
            </div>
            <div className="pdp__sizes">
              {product.sizes.map((option) => {
                const available = isSizeAvailable(product, option)
                return (
                  <button
                    key={option}
                    className={size === option ? 'is-active' : ''}
                    disabled={!available}
                    style={!available ? { opacity: 0.32, textDecoration: 'line-through', cursor: 'not-allowed' } : undefined}
                    onClick={() => {
                      setSize(option)
                      setSizeError(false)
                    }}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {sizeError && <p className="field-error">Please select a size before adding to bag.</p>}
            {!product.inStock && (
              <p className="field-error">This piece is currently sold out. Join the newsletter for restocks.</p>
            )}

            <button
              type="button"
              className="remove-link"
              style={{ marginBottom: 12, color: 'var(--muted)' }}
              onClick={() => notify('Size guide: view the returns page for full measurements')}
            >
              View size guide
            </button>

            <div className="pdp__buy">
              <div className="qty">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}>
                  <Plus size={14} />
                </button>
              </div>
              <button className="btn" onClick={handleAddToBag} disabled={!product.inStock}>
                <ShoppingBag size={15} /> Add to bag
              </button>
              <button
                className={`pdp__wish${wishlisted ? ' is-active' : ''}`}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wishlisted}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} strokeWidth={1.5} />
              </button>
            </div>

            {justAdded && (
              <div
                className="pdp__added"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 12,
                  padding: '10px 12px',
                  background: 'var(--off-white)',
                  border: '1px solid var(--line)',
                  fontSize: 12,
                  animation: 'rise-in .25s var(--ease)',
                }}
              >
                <Check size={14} />
                <span style={{ flex: 1 }}>Added to bag · Size {size} · Qty {quantity}</span>
                <button
                  className="remove-link"
                  style={{ color: 'var(--ink)' }}
                  onClick={() => {
                    setJustAdded(false)
                    openBag()
                  }}
                >
                  Open bag
                </button>
                <button aria-label="Dismiss" onClick={() => setJustAdded(false)}>
                  <X size={13} />
                </button>
              </div>
            )}

            <div className="pdp__assurance">
              <div>
                <Truck size={16} strokeWidth={1.4} />
                <span>
                  <strong>Free delivery</strong> on orders above ₹2,499. Dispatched in 24 hours.
                </span>
              </div>
              <div>
                <RotateCcw size={16} strokeWidth={1.4} />
                <span>
                  <strong>30-day returns.</strong> Unworn, with tags. No questions asked.
                </span>
              </div>
              <div>
                <ShieldCheck size={16} strokeWidth={1.4} />
                <span>
                  <strong>Secure checkout.</strong> This is a frontend demo — no payments are taken.
                </span>
              </div>
            </div>

            <Accordion
              items={[
                { title: 'Product Description', content: product.description },
                { title: 'Fabric & Care', content: product.fabricCare },
                { title: 'Shipping & Returns', content: product.shippingReturns },
              ]}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 18,
                fontSize: 11.5,
                color: 'var(--muted)',
              }}
            >
              <Package size={14} strokeWidth={1.4} /> SKU · VANTA-{product.id.toUpperCase()}-
              {product.categorySlug.slice(0, 3).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <section className="section section--tight" aria-labelledby="related-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Complete the look</span>
              <h2 id="related-heading" style={{ marginTop: 8 }}>
                You may also like
              </h2>
            </div>
            <Link to="/clothing" className="link-arrow">
              Shop all
            </Link>
          </div>
          <ProductGrid products={related} />
        </div>
      </section>

      <RecentlyViewed excludeId={product.id} limit={4} />
    </>
  )
}
