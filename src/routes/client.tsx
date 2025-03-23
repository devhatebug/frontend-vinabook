import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/__root.tsx";
import ClientLayout from "@/layout/client.layout.tsx";
import HomePage from "@/pages/home.page.tsx";
import ContactPage from "@/pages/contact-page.tsx";
import AboutPage from "@/pages/about-page.tsx";
import SearchPage from "@/pages/search-page.tsx";
import { CartPage } from "@/pages/cart-page";
import { BillingPage } from "@/pages/billing-page";

const _clientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/client",
  component: ClientLayout,
});

export const clientRoute = _clientRoute.addChildren([
  createRoute({
    getParentRoute: () => _clientRoute,
    path: "/home",
    component: HomePage,
  }),
  createRoute({
    getParentRoute: () => _clientRoute,
    path: "/contact",
    component: ContactPage,
  }),
  createRoute({
    getParentRoute: () => _clientRoute,
    path: "/about",
    component: AboutPage,
  }),
  createRoute({
    getParentRoute: () => _clientRoute,
    path: "/search",
    component: SearchPage,
  }),
  createRoute({
    getParentRoute: () => _clientRoute,
    path: "/cart",
    component: CartPage,
  }),
  createRoute({
    getParentRoute: () => _clientRoute,
    path: "/billing",
    component: BillingPage,
  }),
]);
