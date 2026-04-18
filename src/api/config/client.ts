import axios from 'axios'

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY

export const kakaoClient = axios.create({
  baseURL: 'https://dapi.kakao.com/v3/search/book',
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
})
