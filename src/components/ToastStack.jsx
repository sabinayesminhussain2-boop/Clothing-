import { Check } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function ToastStack() {
  const { toasts } = useStore()
  if (!toasts.length) return null
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id}>
          <Check size={14} strokeWidth={2} />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
