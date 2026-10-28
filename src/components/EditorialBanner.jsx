import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function EditorialBanner({
  image = '/images/editorial-new-season.jpg',
  eyebrow = 'The new season',
  title = 'The new season',
  text = 'Everyday essentials. Timeless style.',
  cta = 'Discover collection',
  to = '/new-arrivals',
}) {
  return (
    <section className="editorial" aria-label={title}>
      <div className="editorial__media">
        <img src={image} alt="VANTA new season editorial" loading="lazy" />
      </div>
      <div className="editorial__body">
        <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {eyebrow}
        </span>
        <h2>{title}</h2>
        <p>{text}</p>
        <Link to={to} className="btn btn--light">
          {cta} <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
