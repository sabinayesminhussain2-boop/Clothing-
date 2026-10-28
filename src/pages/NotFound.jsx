import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '110px 0 130px', textAlign: 'center' }}>
      <span className="eyebrow">Error 404</span>
      <h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: 500, letterSpacing: '-0.03em', margin: '10px 0 12px' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--muted)', maxWidth: '44ch', margin: '0 auto 28px' }}>
        The page you are looking for has moved or never existed. The collection, however, is right
        where you left it.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn--sm">
          Back to home
        </Link>
        <Link to="/clothing" className="btn btn--ghost btn--sm">
          Shop clothing
        </Link>
      </div>
    </div>
  )
}
