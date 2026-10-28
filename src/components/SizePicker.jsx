import { X } from 'lucide-react'
import { isSizeAvailable } from '../data/products'

export default function SizePicker({ product, onSelect, onCancel, label = 'Select a size' }) {
  return (
    <div className="size-picker">
      <div className="size-picker__label">
        <span>{label}</span>
        <button type="button" aria-label="Cancel size selection" onClick={onCancel}>
          <X size={13} />
        </button>
      </div>
      <div className="size-picker__options">
        {product.sizes.map((size) => {
          const available = isSizeAvailable(product, size)
          return (
            <button
              key={size}
              type="button"
              disabled={!available}
              aria-label={available ? `Add size ${size}` : `Size ${size} sold out`}
              onClick={() => onSelect(size)}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}
