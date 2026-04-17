import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '@/components/Header/Header'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet />
    </div>
  ),
})
