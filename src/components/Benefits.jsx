import { PackageCheck, RefreshCcw, ShieldCheck, Truck } from 'lucide-react'

const ITEMS = [
  { icon: Truck, title: 'Fast Delivery', text: 'Dispatched within 24 hours' },
  { icon: RefreshCcw, title: 'Easy Returns', text: '30 days, no questions asked' },
  { icon: PackageCheck, title: 'Premium Quality', text: 'Considered fabrics, small runs' },
  { icon: ShieldCheck, title: 'Secure Checkout', text: 'Safe, simple, transparent' },
]

export default function Benefits() {
  return (
    <section className="benefits" aria-label="Store benefits">
      {ITEMS.map(({ icon: Icon, title, text }) => (
        <div className="benefit" key={title}>
          <Icon size={22} strokeWidth={1.25} aria-hidden="true" />
          <div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
