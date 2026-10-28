import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getProductById } from '../data/products'

const StoreContext = createContext(null)

const readStore = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

const writeStore = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — state stays in memory */
  }
}

export function StoreProvider({ children }) {
  const [bag, setBag] = useState(() => readStore('vanta.bag', []))
  const [wishlist, setWishlist] = useState(() => readStore('vanta.wishlist', []))
  const [recentlyViewed, setRecentlyViewed] = useState(() => readStore('vanta.recent', []))
  const [preferredSizes, setPreferredSizes] = useState({})
  const [toasts, setToasts] = useState([])
  const [isBagOpen, setBagOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)
  const toastId = useRef(0)

  useEffect(() => writeStore('vanta.bag', bag), [bag])
  useEffect(() => writeStore('vanta.wishlist', wishlist), [wishlist])
  useEffect(() => writeStore('vanta.recent', recentlyViewed), [recentlyViewed])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback(
    (message, options = {}) => {
      const id = ++toastId.current
      setToasts((current) => [...current.slice(-2), { id, message, tone: options.tone ?? 'default' }])
      window.setTimeout(() => dismissToast(id), options.duration ?? 3000)
    },
    [dismissToast]
  )

  const addToBag = useCallback(
    (productId, size, quantity = 1, options = {}) => {
      const product = getProductById(productId)
      if (!product) return
      setBag((current) => {
        const key = `${productId}-${size}`
        const existing = current.find((item) => item.key === key)
        if (existing) {
          return current.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + quantity } : item
          )
        }
        return [...current, { key, productId, size, quantity }]
      })
      setPreferredSizes((current) => ({ ...current, [productId]: size }))
      notify(`${product.name} · Size ${size} added to bag`)
      if (options.openBag) setBagOpen(true)
    },
    [notify]
  )

  const updateBagQuantity = useCallback((key, quantity) => {
    setBag((current) =>
      quantity <= 0
        ? current.filter((item) => item.key !== key)
        : current.map((item) => (item.key === key ? { ...item, quantity } : item))
    )
  }, [])

  const removeFromBag = useCallback(
    (key) => {
      setBag((current) => current.filter((item) => item.key !== key))
      notify('Item removed from your bag')
    },
    [notify]
  )

  const clearBag = useCallback(() => setBag([]), [])

  const toggleWishlist = useCallback(
    (productId) => {
      const product = getProductById(productId)
      setWishlist((current) => {
        const exists = current.includes(productId)
        notify(
          exists ? `${product?.name ?? 'Item'} removed from wishlist` : `${product?.name ?? 'Item'} saved to wishlist`
        )
        return exists ? current.filter((id) => id !== productId) : [...current, productId]
      })
    },
    [notify]
  )

  const removeFromWishlist = useCallback(
    (productId) => {
      const product = getProductById(productId)
      setWishlist((current) => current.filter((id) => id !== productId))
      notify(`${product?.name ?? 'Item'} removed from wishlist`)
    },
    [notify]
  )

  const trackView = useCallback((productId) => {
    setRecentlyViewed((current) => [productId, ...current.filter((id) => id !== productId)].slice(0, 4))
  }, [])

  const bagCount = useMemo(() => bag.reduce((total, item) => total + item.quantity, 0), [bag])

  const bagSubtotal = useMemo(
    () =>
      bag.reduce((total, item) => {
        const product = getProductById(item.productId)
        return total + (product ? product.price * item.quantity : 0)
      }, 0),
    [bag]
  )

  const value = useMemo(
    () => ({
      bag,
      bagCount,
      bagSubtotal,
      addToBag,
      updateBagQuantity,
      removeFromBag,
      clearBag,
      wishlist,
      toggleWishlist,
      removeFromWishlist,
      isWishlisted: (id) => wishlist.includes(id),
      recentlyViewed,
      trackView,
      preferredSizes,
      toasts,
      notify,
      dismissToast,
      isBagOpen,
      openBag: () => setBagOpen(true),
      closeBag: () => setBagOpen(false),
      isSearchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      isCheckoutOpen,
      openCheckout: () => {
        setBagOpen(false)
        setCheckoutOpen(true)
      },
      closeCheckout: () => setCheckoutOpen(false),
    }),
    [
      bag,
      bagCount,
      bagSubtotal,
      addToBag,
      updateBagQuantity,
      removeFromBag,
      clearBag,
      wishlist,
      toggleWishlist,
      removeFromWishlist,
      recentlyViewed,
      trackView,
      preferredSizes,
      toasts,
      notify,
      dismissToast,
      isBagOpen,
      isSearchOpen,
      isCheckoutOpen,
    ]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
