import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice, getProductById } from '../data/products'
import { EmptyState } from './ProductCard'

export const FREE_SHIPPING_THRESHOLD = 2499
export const SHIPPING_FEE = 99

export const getTotals = (subtotal) => {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE
  return { shipping, total: subtotal + shipping }
}

export default function ShoppingBagDrawer() {
  const {
    isBagOpen,
    closeBag,
    bag,
    bagCount,
    bagSubtotal,
    updateBagQuantity,
    removeFromBag,
    openCheckout,
  } = useStore()

  useEffect(() => {
    if (!isBagOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') closeBag()
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('is-locked')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
    }
  }, [isBagOpen, closeBag])

  if (!isBagOpen) return null

  const { shipping } = getTotals(bagSubtotal)

  return (
    <>
      <div className="scrim" onClick={closeBag} aria-hidden="true" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="drawer__head">
          <h3>
            Shopping Bag<span>{bagCount} {bagCount === 1 ? 'item' : 'items'}</span>
          </h3>
          <button className="icon-btn" aria-label="Close bag" onClick={closeBag}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="drawer__body">
          {bag.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag size={34} strokeWidth={1.1} />}
              title="Your bag is empty"
              action={
                <Link to="/clothing" className="btn btn--ghost btn--sm" onClick={closeBag}>
                  Explore clothing
                </Link>
              }
            >
              Add a few essentials and they will appear here.
            </EmptyState>
          ) : (
            <>
              {bag.map((item) => {
                const product = getProductById(item.productId)
                if (!product) return null
                return (
                  <div className="bag-item" key={item.key}>
                    <Link to={`/clothing/${product.slug}`} onClick={closeBag}>
                      <img className="bag-item__img" src={product.image} alt={product.name} />
                    </Link>
                    <div>
                      <div className="bag-item__top">
                        <div>
                          <Link
                            to={`/clothing/${product.slug}`}
                            className="bag-item__name"
                            onClick={closeBag}
                          >
                            {product.name}
                          </Link>
                          <div className="bag-item__meta">
                            Size {item.size} · {product.category}
                          </div>
                        </div>
                        <div className="bag-item__price">{formatPrice(product.price * item.quantity)}</div>
                      </div>
                      <div className="bag-item__bottom">
                        <div className="qty">
                          <button
                            aria-label={`Decrease quantity of ${product.name}`}
                            disabled={item.quantity <= 1}
                            onClick={() => updateBagQuantity(item.key, item.quantity - 1)}
                          >
                            <Minus size={13} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            aria-label={`Increase quantity of ${product.name}`}
                            onClick={() => updateBagQuantity(item.key, item.quantity + 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button className="remove-link" onClick={() => removeFromBag(item.key)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
              <p className="summary-note" style={{ padding: '16px 0' }}>
                {shipping === 0
                  ? 'Complimentary shipping applied to this order.'
                  : `Add ${formatPrice(FREE_SHIPPING_THRESHOLD - bagSubtotal)} more for complimentary shipping.`}
              </p>
            </>
          )}
        </div>

        {bag.length > 0 && (
          <div className="drawer__foot">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(bagSubtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="summary-row summary-row--total">
              <span>Total</span>
              <span>{formatPrice(bagSubtotal + shipping)}</span>
            </div>
            <p className="summary-note">Taxes included. Demo checkout — no payment is processed.</p>
            <div className="drawer__actions">
              <button className="btn btn--block" onClick={openCheckout}>
                Checkout <ArrowRight size={14} />
              </button>
              <button className="btn btn--ghost btn--block" onClick={closeBag}>
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
