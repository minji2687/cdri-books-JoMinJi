import type { Book } from '@/types/book'

export interface SearchParams {
  query: string
  target?: 'title' | 'isbn' | 'publisher' | 'person'
  page?: number
  size?: number
}

export interface KakaoBookResponse {
  meta: {
    total_count: number
    pageable_count: number
    is_end: boolean
  }
  documents: Book[]
}
