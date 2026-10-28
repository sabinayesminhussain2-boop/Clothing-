/**
 * VANTA — single source of truth for the catalog.
 * 10 products, reused across home, collection, search, wishlist and related products.
 */

export const CATEGORIES = [
  { name: 'T-Shirts', slug: 'tshirts', image: '/images/category-tshirts.jpg' },
  { name: 'Shirts', slug: 'shirts', image: '/images/category-shirts.jpg' },
  { name: 'Pants', slug: 'pants', image: '/images/category-pants.jpg' },
  { name: 'Hoodies', slug: 'hoodies', image: '/images/category-hoodies.jpg' },
]

export const SIZES = ['S', 'M', 'L', 'XL']

export const isSizeAvailable = (product, size) =>
  product.inStock && !(product.soldOutSizes ?? []).includes(size)

const base = {
  sizes: SIZES,
  inStock: true,
  isNew: false,
}

export const PRODUCTS = [
  {
    ...base,
    id: 'p1',
    slug: 'essential-black-t-shirt',
    soldOutSizes: [],
    name: 'Essential Black T-Shirt',
    category: 'T-Shirts',
    categorySlug: 'tshirts',
    price: 999,
    originalPrice: null,
    isNew: true,
    featuredRank: 1,
    image: '/images/p1-black-tee.jpg',
    secondaryImage: '/images/p1-black-tee-alt.jpg',
    colors: [
      { name: 'Black', hex: '#151515' },
      { name: 'Off White', hex: '#efece4' },
      { name: 'Stone', hex: '#b7b0a4' },
    ],
    tagline: 'The foundation of every wardrobe.',
    description:
      'A quiet essential cut from 240 GSM combed cotton. Straight through the body with a clean ribbed neckline, it holds its shape wash after wash and layers under everything you own.',
    fabricCare:
      '100% combed cotton jersey, 240 GSM. Machine wash cold with like colours. Do not bleach. Tumble dry low or dry flat in shade. Warm iron inside out.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499, otherwise a flat ₹99 shipping fee. Easy 30-day returns on unworn pieces with tags intact.',
  },
  {
    ...base,
    id: 'p2',
    slug: 'oversized-white-t-shirt',
    soldOutSizes: ['S'],
    name: 'Oversized White T-Shirt',
    category: 'T-Shirts',
    categorySlug: 'tshirts',
    price: 1199,
    originalPrice: null,
    featuredRank: 2,
    image: '/images/p2-white-tee.jpg',
    secondaryImage: '/images/p2-white-tee-alt.jpg',
    colors: [
      { name: 'Off White', hex: '#f2efe7' },
      { name: 'Black', hex: '#151515' },
    ],
    tagline: 'Dropped shoulders, effortless drape.',
    description:
      'Our signature boxy fit with a dropped shoulder and slightly longer body. The weighty cotton keeps the silhouette sharp rather than slouchy.',
    fabricCare: '100% cotton, 260 GSM. Machine wash cold. Reshape while damp and dry flat.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499. Easy 30-day returns.',
  },
  {
    ...base,
    id: 'p3',
    slug: 'premium-graphic-t-shirt',
    soldOutSizes: ['M'],
    name: 'Premium Graphic T-Shirt',
    category: 'T-Shirts',
    categorySlug: 'tshirts',
    price: 1299,
    originalPrice: 1699,
    isNew: true,
    featuredRank: 3,
    image: '/images/p3-graphic-tee.jpg',
    secondaryImage: '/images/p3-graphic-tee-alt.jpg',
    colors: [
      { name: 'Charcoal', hex: '#2b2b2b' },
      { name: 'Black', hex: '#151515' },
    ],
    tagline: 'A single line of art, printed to last.',
    description:
      'A minimal line-art print in a soft-hand water-based ink that sits inside the fabric instead of on top of it. Garment washed for a broken-in feel from the first wear.',
    fabricCare: '100% cotton, 250 GSM. Water-based pigment print. Wash cold, inside out. Do not iron print.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499. Easy 30-day returns.',
  },
  {
    ...base,
    id: 'p4',
    slug: 'classic-linen-shirt',
    soldOutSizes: [],
    name: 'Classic Linen Shirt',
    category: 'Shirts',
    categorySlug: 'shirts',
    price: 1799,
    originalPrice: null,
    isNew: true,
    featuredRank: 4,
    image: '/images/p4-linen-shirt.jpg',
    secondaryImage: '/images/p4-linen-shirt-alt.jpg',
    colors: [
      { name: 'Off White', hex: '#f1ede3' },
      { name: 'Sand', hex: '#c9bda6' },
    ],
    tagline: 'Breezy linen, softened by the season.',
    description:
      'Woven from European flax and washed twice for a lived-in softness. A relaxed collar and natural shell buttons keep it easy, dressed up or rolled at the wrist.',
    fabricCare: '100% European flax linen. Machine wash cold on gentle. Line dry. Warm iron while slightly damp.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499. Easy 30-day returns.',
  },
  {
    ...base,
    id: 'p5',
    slug: 'relaxed-fit-overshirt',
    soldOutSizes: ['XL'],
    name: 'Relaxed Fit Overshirt',
    category: 'Shirts',
    categorySlug: 'shirts',
    price: 2199,
    originalPrice: 2799,
    featuredRank: 5,
    image: '/images/p5-overshirt.jpg',
    secondaryImage: '/images/p5-overshirt-alt.jpg',
    colors: [
      { name: 'Slate', hex: '#5b5b58' },
      { name: 'Black', hex: '#1b1b1b' },
    ],
    tagline: 'The layer that does the work.',
    description:
      'A structured cotton-twill overshirt with a soft collar and patch pockets. Wear it open over a tee or buttoned as a light jacket in between seasons.',
    fabricCare: '100% cotton twill. Machine wash cold. Hang dry. Warm iron.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499. Easy 30-day returns.',
  },
  {
    ...base,
    id: 'p6',
    slug: 'essential-black-hoodie',
    soldOutSizes: [],
    name: 'Essential Black Hoodie',
    category: 'Hoodies',
    categorySlug: 'hoodies',
    price: 2499,
    originalPrice: null,
    isNew: true,
    featuredRank: 6,
    image: '/images/p6-black-hoodie.jpg',
    secondaryImage: '/images/p6-black-hoodie-alt.jpg',
    colors: [
      { name: 'Black', hex: '#141414' },
      { name: 'Heather Grey', hex: '#a9a7a3' },
    ],
    tagline: 'Heavyweight comfort, every day.',
    description:
      'A 420 GSM brushed-back fleece hoodie with a double-layer hood, ribbed cuffs and a deep kangaroo pocket. Substantial, but never bulky.',
    fabricCare: '80% cotton, 20% recycled polyester fleece, 420 GSM. Wash cold inside out. Dry flat.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499. Easy 30-day returns.',
  },
  {
    ...base,
    id: 'p7',
    slug: 'minimal-grey-sweatshirt',
    soldOutSizes: ['S', 'XL'],
    name: 'Minimal Grey Sweatshirt',
    category: 'Hoodies',
    categorySlug: 'hoodies',
    price: 1999,
    originalPrice: 2499,
    featuredRank: 7,
    image: '/images/p7-grey-sweatshirt.jpg',
    secondaryImage: '/images/p7-grey-sweatshirt-alt.jpg',
    colors: [
      { name: 'Heather Grey', hex: '#9e9c97' },
      { name: 'Black', hex: '#151515' },
    ],
    tagline: 'Quiet, warm, endlessly wearable.',
    description:
      'A crewneck sweatshirt in loopback cotton with set-in sleeves and a clean ribbed collar. Understated enough for the city, soft enough for the sofa.',
    fabricCare: '100% loopback cotton, 380 GSM. Machine wash cold. Dry flat in shade.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499. Easy 30-day returns.',
  },
  {
    ...base,
    id: 'p8',
    slug: 'relaxed-fit-black-pants',
    soldOutSizes: [],
    name: 'Relaxed Fit Black Pants',
    category: 'Pants',
    categorySlug: 'pants',
    price: 1899,
    originalPrice: null,
    featuredRank: 8,
    image: '/images/p8-black-pants.jpg',
    secondaryImage: '/images/p8-black-pants-alt.jpg',
    colors: [
      { name: 'Black', hex: '#161616' },
      { name: 'Stone', hex: '#b4ae9f' },
    ],
    tagline: 'Clean lines, full freedom of movement.',
    description:
      'Cut from a cotton-linen blend with a comfortable straight leg and a mid rise. A hook-and-bar closure keeps the front clean with no visible hardware.',
    fabricCare: '68% cotton, 32% linen. Machine wash cold. Line dry. Warm iron.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499. Easy 30-day returns.',
  },
  {
    ...base,
    id: 'p9',
    slug: 'everyday-cargo-pants',
    soldOutSizes: ['L'],
    name: 'Everyday Cargo Pants',
    category: 'Pants',
    categorySlug: 'pants',
    price: 2299,
    originalPrice: 2899,
    isNew: true,
    featuredRank: 9,
    image: '/images/p9-cargo-pants.jpg',
    secondaryImage: '/images/p9-cargo-pants-alt.jpg',
    colors: [
      { name: 'Olive', hex: '#6a6748' },
      { name: 'Black', hex: '#171717' },
    ],
    tagline: 'Utility, refined.',
    description:
      'Roomy through the thigh with low-profile bellowed pockets and a tapered ankle. Built in a dense cotton ripstop that softens with every wear.',
    fabricCare: '100% cotton ripstop. Machine wash cold. Tumble dry low.',
    shippingReturns:
      'Dispatched within 24 hours. Free delivery on orders above ₹2,499. Easy 30-day returns.',
  },
  {
    ...base,
    id: 'p10',
    slug: 'premium-straight-fit-trousers',
    soldOutSizes: ['S', 'M', 'L', 'XL'],
    name: 'Premium Straight-Fit Trousers',
    category: 'Pants',
    categorySlug: 'pants',
    price: 2499,
    originalPrice: null,
    isNew: true,
    inStock: false,
    featuredRank: 10,
    image: '/images/p10-trousers.jpg',
    secondaryImage: '/images/p10-trousers-alt.jpg',
    colors: [
      { name: 'Charcoal', hex: '#33322f' },
      { name: 'Black', hex: '#141414' },
    ],
    tagline: 'Tailoring for the everyday.',
    description:
      'A wool-blend trouser with a pressed crease, slant pockets and a straight leg that falls clean over the shoe. Our most considered piece of the season.',
    fabricCare: '70% wool, 28% polyester, 2% elastane. Dry clean only. Steam to refresh.',
    shippingReturns:
      'Made to order — dispatched in 3–5 working days. Free delivery. Easy 30-day returns.',
  },
]

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id)
export const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug)

export const discountedPrice = (product) => product.price
export const hasDiscount = (product) => Boolean(product.originalPrice && product.originalPrice > product.price)
export const discountPercent = (product) =>
  hasDiscount(product) ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

export const newArrivals = () => PRODUCTS.filter((p) => p.isNew)
export const saleProducts = () => PRODUCTS.filter(hasDiscount)

export const relatedProducts = (product, limit = 4) => {
  const sameCategory = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
  const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category)
  return [...sameCategory, ...others].slice(0, limit)
}

export const formatPrice = (value) =>
  `₹${Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`

export const searchProducts = (query) => {
  const term = query.trim().toLowerCase()
  if (!term) return []
  return PRODUCTS.filter((product) =>
    [product.name, product.category, product.tagline, product.description]
      .join(' ')
      .toLowerCase()
      .includes(term)
  )
}
