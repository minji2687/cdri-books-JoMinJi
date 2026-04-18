import { kakaoClient } from '../config/client'
import type { SearchParams, KakaoBookResponse } from './types'

export const searchBooks = async (params: SearchParams): Promise<KakaoBookResponse> => {
  const { data } = await kakaoClient.get('', { params })
  return data
}
