# VANTA — Clothing Storefront (Frontend Only)

A premium, minimalist fashion storefront built with **React + Vite**. VANTA is a frontend-only
demonstration: no backend, no database, no authentication and no real payment processing. All data
is mock data (10 products) and all persistent state lives in `localStorage`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the production build
```

## Stack

- React 18 + React Router 6
- Vite 5
- lucide-react icons
- Self-hosted Inter (variable) and Instrument Serif via `@fontsource`
- Plain CSS design system in `src/styles/index.css` (no CSS framework)

## Pages & routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, categories, trending grid, editorial banner, benefits, sale band, recently viewed |
| `/clothing` | Full collection with category chips, filters, sorting, empty state |
| `/clothing?category=tshirts\|shirts\|hoodies\|pants` | Pre-filtered category views (used by navbar + category cards) |
| `/clothing/:slug` | Product details — gallery, colours, sizes, quantity, accordion, related products |
| `/wishlist` | Saved products |
| `/new-arrivals` | New-in edit with NEW badges |
| `/sale` | Discounted products with original + sale price |
| `/about`, `/contact`, `/shipping`, `/returns` | Informational pages linked from the footer |
| `*` | 404 page |

## Features

- **Catalog** — 10 products defined once in `src/data/products.js`, reused by every page, search,
  wishlist and related-product lists.
- **Shopping bag** — right-side drawer with quantity controls, remove, subtotal, free-shipping
  threshold, persisted in `localStorage` (`vanta.bag`), badge with animation in the navbar.
- **Demo checkout** — order summary modal with demo shipping fee and a "Place demo order" button
  that shows a confirmation reference. No payment fields, no transactions.
- **Wishlist** — heart toggle on every card and product page, persisted (`vanta.wishlist`), with a
  dedicated page (remove, view product, add to bag with size picker).
- **Search** — full-screen overlay, live filtering by name/category/description, thumbnails,
  prices, clear button and "No products found" state.
- **Filters & sorting** — category, price range, size, availability; sort by featured, price
  (asc/desc) and name. Filters live in the URL so views are shareable; reset clears everything.
- **Recently viewed** — up to four products tracked in `localStorage` (`vanta.recent`).
- **Quick add** — size picker on the product card; remembers the last size added per product.
- **Extras** — secondary image on hover, toast notifications, breadcrumbs, back-to-top button,
  mobile menu and filter drawer, newsletter success states.
- **Responsive** — 4 / 3 / 2 product columns, stacked product page, viewport-sized drawers, no
  horizontal overflow at any breakpoint.

## Project structure

```
src/
  components/   Navbar, Footer, ProductCard, FilterBar, HeroBanner, CategoryCards,
                EditorialBanner, Benefits, ShoppingBagDrawer, CheckoutModal, SearchOverlay,
                SizePicker, ToastStack, RecentlyViewed, Breadcrumbs, BackToTop
  context/      StoreContext — bag, wishlist, recently viewed, toasts, UI state
  data/         products.js — the 10-product catalog + helpers
  pages/        Home, Collection, ProductDetails, Wishlist, NewArrivals, Sale, Info, NotFound
  styles/       index.css — design tokens and all component styles
public/images/  Art-directed editorial and product imagery
```

## Notes

Prices are in Indian rupees (₹) and include tax. Availability, discounts and stock are static
mock data intended for design demonstration only.
