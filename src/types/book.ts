export interface Book {
  title: string
  authors: string[]
  thumbnail: string
  price: number
  sale_price: number
  publisher: string
  contents: string
  url: string
  isbn: string
  datetime: string
  status: string
  translators: string[]
}

export interface BookSearchMeta {
  total_count: number
  pageable_count: number
  is_end: boolean
}

export interface BookSearchResponse {
  documents: Book[]
  meta: BookSearchMeta
}
