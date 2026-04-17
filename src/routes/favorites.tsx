import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
})

function FavoritesPage() {
  return (
    <main className="mx-auto max-w-[1920px] px-10 py-8">
      <h1 className="text-xl font-semibold text-text-primary">내가 찜한 책</h1>
      <p className="mt-4 text-text-subtitle">준비 중입니다.</p>
    </main>
  )
}
