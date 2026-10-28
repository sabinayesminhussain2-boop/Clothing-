import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'

const CONTENT = {
  about: {
    eyebrow: 'Our story',
    title: 'About VANTA',
    intro:
      'VANTA is a small, independent label making considered essentials. We design a short list of pieces each season, focus on fabric and fit, and keep everything else quiet.',
    blocks: [
      {
        heading: 'Designed to be worn, not noticed',
        body: 'We build around a tight palette of black, white and warm neutrals. Nothing in the collection needs to shout — the aim is clothing you reach for without thinking, season after season.',
      },
      {
        heading: 'Made in small runs',
        body: 'Every style is produced in limited quantities with mills and makers we know by name. Fewer pieces, better made, and far less waste at the end of the line.',
      },
      {
        heading: 'A note on this store',
        body: 'This site is a frontend demonstration built for a design portfolio. There is no backend, no payment processing and no live inventory — everything is mock data stored in your browser.',
      },
    ],
  },
  contact: {
    eyebrow: 'Client care',
    title: 'Contact',
    intro:
      'Questions about sizing, an order or a fabric? Our team replies within one working day, Monday to Friday.',
    blocks: [
      {
        heading: 'Client care',
        body: 'care@vanta.example · +91 90000 00000 · Monday to Friday, 10:00–18:00 IST.',
      },
      {
        heading: 'Press & wholesale',
        body: 'studio@vanta.example — we work with a small number of stockists each season.',
      },
      {
        heading: 'Studio',
        body: 'VANTA Studio, 2nd Floor, 14 Assam Road, Guwahati 781001, India. Visits by appointment only.',
      },
    ],
  },
  shipping: {
    eyebrow: 'Delivery',
    title: 'Shipping Information',
    intro:
      'We dispatch from our studio within 24 hours on business days. Delivery times below are indicative — this is a demo store and no real shipments are made.',
    blocks: [
      {
        heading: 'Rates & timing',
        body: 'Metro cities: 2–3 working days (₹99, complimentary over ₹2,499). Rest of India: 3–5 working days. International: 7–10 working days.',
      },
      {
        heading: 'Tracking',
        body: 'A tracking link is emailed the moment your parcel leaves the studio. You can also follow it from your order confirmation.',
      },
      {
        heading: 'Packaging',
        body: 'Orders arrive in recycled mailers with a reusable cotton dust bag for knitwear. No plastic, no unnecessary inserts.',
      },
    ],
  },
  returns: {
    eyebrow: 'Exchanges',
    title: 'Return Policy',
    intro:
      'If a piece does not feel right, send it back within 30 days. It should be unworn, unwashed and with original tags attached.',
    blocks: [
      {
        heading: 'How to start a return',
        body: 'Email care@vanta.example with your order reference and the item you would like to return. We will arrange a pickup where available.',
      },
      {
        heading: 'Refunds',
        body: 'Refunds are processed to the original payment method within 5–7 working days of the parcel reaching us. Sale items are eligible for exchange or store credit.',
      },
      {
        heading: 'Size guide',
        body: 'Tops run true to size with a relaxed cut — take your usual size for the intended fit. Bottoms are sized by waist; the straight-leg trousers sit slightly higher.',
      },
    ],
  },
}

export default function Info({ page }) {
  const content = CONTENT[page] ?? CONTENT.about
  return (
    <div className="container">
      <div className="info-page">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: content.title }]} />
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p style={{ fontSize: 15.5, color: 'var(--ink-soft)' }}>{content.intro}</p>
        {content.blocks.map((block) => (
          <div key={block.heading}>
            <h3>{block.heading}</h3>
            <p>{block.body}</p>
          </div>
        ))}
        <div style={{ marginTop: 40, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/clothing" className="btn btn--sm">
            Shop clothing
          </Link>
          <Link to="/contact" className="btn btn--ghost btn--sm">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
