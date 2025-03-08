import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/__root.tsx";
import AdminLayout from "@/layout/admin.layout.tsx";
import AdminPage from "@/pages/admin-page.tsx";
import BooksAdminPage from "@/pages/books-admin-page.tsx";
import OrdersAdminPage from "@/pages/orders-admin-page.tsx";

const _adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});

export const adminRoute = _adminRoute.addChildren([
  createRoute({
    getParentRoute: () => _adminRoute,
    path: "/",
    component: AdminPage,
  }),
  createRoute({
    getParentRoute: () => _adminRoute,
    path: "/books",
    component: BooksAdminPage,
  }),
  createRoute({
    getParentRoute: () => _adminRoute,
    path: "/orders",
    component: OrdersAdminPage,
  }),
]);
