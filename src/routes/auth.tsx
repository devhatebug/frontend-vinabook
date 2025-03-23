import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/__root.tsx";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { Outlet } from "@tanstack/react-router";

const _authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: () => (
    <div className="flex min-h-screen flex-col bg-gray-50 w-[99vw]">
      <main className="flex-1 p-4 mx-auto">
        <Outlet />
      </main>
    </div>
  ),
});

export const authRoute = _authRoute.addChildren([
  createRoute({
    getParentRoute: () => _authRoute,
    path: "/login",
    component: LoginPage,
  }),
  createRoute({
    getParentRoute: () => _authRoute,
    path: "/register",
    component: RegisterPage,
  }),
]);
