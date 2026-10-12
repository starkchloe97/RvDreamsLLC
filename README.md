# ONE 10 GLOBAL LLC — Vue 3 + Vite storefront

This project refactors the supplied ONE 10 GLOBAL website into Vue 3 Single-File Components with Vite and Vue Router. It keeps the supplied page copy, product records, route URLs, page metadata, design tokens, responsive layouts, and the original external product-image URLs. Pages and interactions are rendered with Vue templates and Composition API state; there is no legacy page renderer, HTML-string injection, or `v-html` usage.

## Requirements

- Node.js 22.12 or newer (or Node 20.19 or newer)
- npm 10 or newer

## Local development

From this directory run:

```bash
npm install
npm run dev
```

Vite prints the local development URL. Use the direct routes too, for example `/shop/`, `/cart/`, `/checkout/`, `/about/`, `/policies/shipping/`, and any `/products/<slug>/` path.

## Quality checks and production build

```bash
npm run check
npm run build
npm run preview
```

`npm run check` is dependency-light and verifies the route/product records, policy blocks, Vue SFC block order and tag nesting, setup-script JavaScript syntax, local relative imports, the mount point, and absence of HTML-injection patterns. `npm run build` runs the Vite/Vue compiler and produces `dist/` for deployment.

## Source layout

```text
src/
  components/
    catalog/       Product cards, grids, rails, hero and merchandising sections
    layout/        Announcement bar, header, footer and mobile navigation
    overlays/      Cart drawer, search, quick view, lightbox, cookie consent and toast
    shared/        Breadcrumbs, page heroes, inline legal runs and policy renderer
  composables/     Shared reactive cart, wishlist, cookie, toast and order state
  data/            Route/SEO manifest, product catalog and legal page content
  directives/      Lifecycle-managed scroll-reveal directive
  pages/           Route-level Vue Single-File Components
  router/          Vue Router route table and page metadata
  styles/          Shared design tokens, reset and base styles only
  utils/           Catalog lookup, product-image URLs and money formatting
scripts/           Structural/static project validator
public/             Robots, sitemap and SPA rewrite configuration
```

Page-specific and component-specific styles live in each SFC's `<style scoped>` block. `src/styles/global.css` contains the shared tokens, reset, type defaults, utility classes, and shared reveal state only. Product images continue to use the source website's `m.media-amazon.com` URLs; the provided ZIP did not include local image files to bundle.

## Order/contact configuration

Checkout is invoice-oriented and posts a JSON order to `VITE_ORDER_ENDPOINT` when one is configured. Copy `.env.example` to `.env.local`, then set the variable to a **real, HTTPS order-receiver endpoint** before accepting production orders. The endpoint must accept a `POST` request with JSON and return a 2xx response; it must also allow requests from the deployed site's origin. The request contains an order number, customer contact/address details, shipping choice, line items, subtotal, total, notes, and invoice payment method. Configure the server-side receiver to validate and store the order, send confirmation/invoice communications, and apply any tax, inventory, fraud, and privacy requirements.

**Without `VITE_ORDER_ENDPOINT`, checkout intentionally only stores a local order confirmation in that browser. It does not transmit an order, send email, take payment, reserve inventory, or notify staff. Do not treat local-only checkout as production order processing.** The front end does not collect card details or implement a payment gateway. Contact form submission opens the visitor's email app through a `mailto:` link rather than posting directly to a server.

## Deployment

Build with `npm run build` and publish the contents of `dist/`. The `public/.htaccess` file is copied to the build root for Apache/cPanel history-mode fallback, and `public/_redirects` provides the equivalent catch-all for Netlify. For another static host, configure unknown application routes to serve `index.html` while leaving real asset files and `robots.txt` / `sitemap.xml` untouched.

Before going live, configure the order endpoint, verify it from the production domain, ensure direct product/collection URLs resolve through the host's SPA rewrite, and run both `npm run check` and `npm run build` in an environment that can install npm dependencies.
