import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <Fragment key={`${item.label}-${index}`}>
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span className={isLast ? 'current' : undefined}>{item.label}</span>
            )}
            {!isLast && <span className="sep">/</span>}
          </Fragment>
        )
      })}
    </nav>
  )
}
