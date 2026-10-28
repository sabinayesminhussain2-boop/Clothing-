import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
    window.setTimeout(() => setSubscribed(false), 6000)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__brand">VANTA</div>
            <p className="footer__tagline">
              Considered essentials for modern life. Designed in small runs, made to be worn for
              years.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <div className="footer__links">
              <Link to="/">Home</Link>
              <Link to="/clothing">Clothing</Link>
              <Link to="/new-arrivals">New Arrivals</Link>
              <Link to="/sale">Sale</Link>
              <Link to="/wishlist">Wishlist</Link>
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <div className="footer__links">
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/clothing">Collections</Link>
              <Link to="/contact">Stockists</Link>
            </div>
          </div>

          <div>
            <h4>Support</h4>
            <div className="footer__links">
              <Link to="/shipping">Shipping Information</Link>
              <Link to="/returns">Return Policy</Link>
              <Link to="/returns">Size Guide</Link>
              <Link to="/contact">Care Guide</Link>
            </div>
          </div>

          <div className="newsletter">
            <h4>Newsletter</h4>
            <p>Early access to new drops, restocks and private sales. No noise.</p>
            {subscribed ? (
              <p className="newsletter__success">
                <Check size={15} /> You are on the list. Welcome to VANTA.
              </p>
            ) : (
              <form className="newsletter__form" onSubmit={handleSubmit}>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  <ArrowRight size={17} strokeWidth={1.5} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} VANTA. Frontend demonstration store.</span>
          <div>
            <Link to="/shipping">Shipping</Link>
            <Link to="/returns">Returns</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
