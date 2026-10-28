import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShoppingBagDrawer from './components/ShoppingBagDrawer'
import SearchOverlay from './components/SearchOverlay'
import CheckoutModal from './components/CheckoutModal'
import ToastStack from './components/ToastStack'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
import NewArrivals from './pages/NewArrivals'
import Sale from './pages/Sale'
import Info from './pages/Info'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothing" element={<Collection />} />
          <Route path="/clothing/:slug" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/about" element={<Info page="about" />} />
          <Route path="/contact" element={<Info page="contact" />} />
          <Route path="/shipping" element={<Info page="shipping" />} />
          <Route path="/returns" element={<Info page="returns" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ShoppingBagDrawer />
      <CheckoutModal />
      <SearchOverlay />
      <ToastStack />
      <BackToTop />
    </>
  )
}
