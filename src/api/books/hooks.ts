import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { searchBooks } from './service'
import type { SearchParams, KakaoBookResponse } from './types'

export const QUERY_KEYS = {
  books: (params: SearchParams) => ['books', params] as const,
}

export const useSearchBooks = (
  params: SearchParams,
  options?: Omit<UseQueryOptions<KakaoBookResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.books(params),
    queryFn: () => searchBooks(params),
    enabled: !!params.query,
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}
