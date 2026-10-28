import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Info, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice, getProductById } from '../data/products'
import { getTotals, FREE_SHIPPING_THRESHOLD } from './ShoppingBagDrawer'

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, bag, bagSubtotal, clearBag } = useStore()
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    if (!isCheckoutOpen) {
      setOrderId(null)
      return
    }
    const onKey = (event) => {
      if (event.key === 'Escape') closeCheckout()
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('is-locked')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
    }
  }, [isCheckoutOpen, closeCheckout])

  if (!isCheckoutOpen) return null

  const { shipping, total } = getTotals(bagSubtotal)

  const placeDemoOrder = () => {
    const id = `VN-${Math.floor(100000 + Math.random() * 899999)}`
    setOrderId(id)
    clearBag()
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Checkout preview" onClick={closeCheckout}>
      <div className="modal__card" onClick={(event) => event.stopPropagation()}>
        <div className="modal__head">
          <h3>{orderId ? 'Order Confirmed' : 'Checkout Preview'}</h3>
          <button className="icon-btn" aria-label="Close checkout" onClick={closeCheckout}>
            <X size={19} strokeWidth={1.5} />
          </button>
        </div>

        <div className="modal__body">
          {orderId ? (
            <div className="checkout-success">
              <div className="checkout-success__icon">
                <Check size={24} strokeWidth={2} />
              </div>
              <h4>Thank you — your demo order is placed.</h4>
              <p>
                This is a frontend demonstration only. No payment was taken and no order will be
                dispatched.
              </p>
              <div className="checkout-success__meta">Order reference · {orderId}</div>
              <Link to="/clothing" className="btn btn--ghost btn--sm" onClick={closeCheckout}>
                Continue shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="checkout-lines">
                {bag.map((item) => {
                  const product = getProductById(item.productId)
                  if (!product) return null
                  return (
                    <div className="checkout-line" key={item.key}>
                      <img src={product.image} alt={product.name} />
                      <div>
                        {product.name}
                        <span>
                          Size {item.size} · Qty {item.quantity}
                        </span>
                      </div>
                      <span style={{ color: 'var(--ink)', fontSize: 12.5 }}>
                        {formatPrice(product.price * item.quantity)}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="checkout-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(bagSubtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping {shipping === 0 ? `(over ${formatPrice(FREE_SHIPPING_THRESHOLD)})` : '(demo)'}</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="summary-row summary-row--total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="checkout-demo">
                <Info size={15} style={{ flex: 'none', marginTop: 2 }} />
                <span>
                  Demo checkout. No card details are collected and no real transaction will be
                  processed.
                </span>
              </div>

              <button className="btn btn--block" onClick={placeDemoOrder}>
                Place demo order
              </button>
              <button
                className="btn btn--ghost btn--block"
                style={{ marginTop: 8 }}
                onClick={closeCheckout}
              >
                Back to shopping
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
