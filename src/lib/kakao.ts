import axios from 'axios'

export const kakaoApi = axios.create({
  baseURL: 'https://dapi.kakao.com',
  timeout: 10000,
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
  },
})
