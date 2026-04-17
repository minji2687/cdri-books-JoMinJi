import { useState } from 'react'

const STORAGE_KEY = 'search-history'
const MAX_COUNT = 8

function loadHistory(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveHistory(history: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(loadHistory)

  const addHistory = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    setHistory((prev) => {
      // 중복 제거 후 맨 앞에 추가
      const filtered = prev.filter((item) => item !== trimmed)
      const next = [trimmed, ...filtered].slice(0, MAX_COUNT)
      saveHistory(next)
      return next
    })
  }

  const removeHistory = (query: string) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item !== query)
      saveHistory(next)
      return next
    })
  }

  return { history, addHistory, removeHistory }
}
