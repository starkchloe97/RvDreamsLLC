import { createRouter, createWebHistory } from 'vue-router';
import pages from '../data/pages.json';
import HomePage from '../pages/HomePage.vue';
import CatalogPage from '../pages/CatalogPage.vue';
import ProductPage from '../pages/ProductPage.vue';
import CartPage from '../pages/CartPage.vue';
import CheckoutPage from '../pages/CheckoutPage.vue';
import ThankYouPage from '../pages/ThankYouPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ContactPage from '../pages/ContactPage.vue';
import ShippingPolicyPage from '../pages/ShippingPolicyPage.vue';
import ReturnsPolicyPage from '../pages/ReturnsPolicyPage.vue';
import WarrantyPolicyPage from '../pages/WarrantyPolicyPage.vue';
import FaqPage from '../pages/FaqPage.vue';
import TermsPage from '../pages/TermsPage.vue';
import PrivacyPage from '../pages/PrivacyPage.vue';
import AccessibilityPage from '../pages/AccessibilityPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const pageComponents = {
  home: HomePage,
  shop: CatalogPage,
  product: ProductPage,
  cart: CartPage,
  checkout: CheckoutPage,
  'thank-you': ThankYouPage,
  about: AboutPage,
  contact: ContactPage,
  shipping: ShippingPolicyPage,
  returns: ReturnsPolicyPage,
  warranty: WarrantyPolicyPage,
  faq: FaqPage,
  terms: TermsPage,
  privacy: PrivacyPage,
  accessibility: AccessibilityPage,
  '404': NotFoundPage
};

const routes = Object.entries(pages).map(([path, page], index) => ({
  path,
  name: `${page.page}-${index}`,
  component: pageComponents[page.page] || NotFoundPage,
  props: () => ({
    pageInfo: page,
    category: page.page === 'shop' ? (page.cat || 'All') : undefined,
    slug: page.page === 'product' ? page.product : undefined
  })
}));
routes.push({ path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage });

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0, behavior: 'auto' };
  }
});

function upsertMeta(selector, tagName, attrs) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(tagName);
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
}

router.afterEach(to => {
  const page = pages[to.path];
  const title = page?.title || 'Page Not Found | ONE 10 GLOBAL LLC';
  const description = page?.description || "The page you're looking for doesn't exist.";
  document.title = title;
  upsertMeta('meta[name="description"]', 'meta', { name: 'description', content: description });
  upsertMeta('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', 'meta', { property: 'og:description', content: description });
  const canonical = page?.canonical || new URL(to.fullPath, window.location.origin).href;
  upsertMeta('meta[property="og:url"]', 'meta', { property: 'og:url', content: canonical });
  upsertMeta('link[rel="canonical"]', 'link', { rel: 'canonical', href: canonical });

  const previousStructuredData = document.head.querySelector('#site-structured-data');
  if (page?.structuredData) {
    upsertMeta('#site-structured-data', 'script', {
      id: 'site-structured-data', type: 'application/ld+json'
    }).textContent = JSON.stringify(page.structuredData);
  } else {
    previousStructuredData?.remove();
  }
  if (!page) {
    upsertMeta('meta[name="robots"]', 'meta', { name: 'robots', content: 'noindex,follow' });
  } else {
    document.head.querySelector('meta[name="robots"]')?.remove();
  }
});

export default router;
