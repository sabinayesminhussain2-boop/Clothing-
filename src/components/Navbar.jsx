import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Clothing', to: '/clothing' },
  { label: 'T-Shirts', to: '/clothing?category=tshirts' },
  { label: 'Pants', to: '/clothing?category=pants' },
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Sale', to: '/sale' },
]

export default function Navbar() {
  const { bagCount, wishlist, openBag, openSearch } = useStore()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setScrolled] = useState(false)
  const [isBump, setBump] = useState(false)
  const previousCount = useRef(bagCount)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    document.body.classList.toggle('is-locked', isMenuOpen)
    return () => document.body.classList.remove('is-locked')
  }, [isMenuOpen])

  useEffect(() => {
    if (bagCount > previousCount.current) {
      setBump(true)
      const timer = window.setTimeout(() => setBump(false), 500)
      previousCount.current = bagCount
      return () => window.clearTimeout(timer)
    }
    previousCount.current = bagCount
  }, [bagCount])

  const isActive = (to) => {
    const [path, query] = to.split('?')
    if (path !== location.pathname) return false
    const current = new URLSearchParams(location.search)
    if (!query) return !current.get('category')
    const params = new URLSearchParams(query)
    return params.get('category') === current.get('category')
  }

  return (
    <>
      <div className="announcement">
        Complimentary shipping on orders above ₹2,499 · 30-day easy returns
      </div>
      <header className={`navbar${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="container navbar__inner">
          <button
            className="icon-btn navbar__menu"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          <Link to="/" className="navbar__brand" aria-label="VANTA home">
            VANTA
          </Link>

          <nav className="navbar__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`navbar__link${isActive(link.to) ? ' is-active' : ''}`}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <button className="icon-btn" aria-label="Search products" onClick={openSearch}>
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart size={19} strokeWidth={1.5} />
              {wishlist.length > 0 && <span className="navbar__badge">{wishlist.length}</span>}
            </Link>
            <button
              className="icon-btn"
              aria-label={`Shopping bag, ${bagCount} items`}
              onClick={openBag}
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {bagCount > 0 && (
                <span className={`navbar__badge${isBump ? ' is-bump' : ''}`}>{bagCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-menu__top">
            <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
              VANTA
            </Link>
            <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="mobile-menu__links">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              Wishlist ({wishlist.length})
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </nav>
          <div className="mobile-menu__foot">
            <button
              className="btn btn--ghost btn--block"
              onClick={() => {
                setMenuOpen(false)
                window.setTimeout(openSearch, 120)
              }}
            >
              <Search size={15} /> Search
            </button>
            <button
              className="btn btn--block"
              onClick={() => {
                setMenuOpen(false)
                window.setTimeout(openBag, 120)
              }}
            >
              <ShoppingBag size={15} /> Bag ({bagCount})
            </button>
          </div>
        </div>
      )}
    </>
  )
}
