# React 프로젝트 (2026 최신 스택)

## 🚀 기술 스택

### 핵심
- **Vite 8** - 차세대 프론트엔드 빌드 도구
- **React 19** - UI 라이브러리
- **TypeScript 6** - 정적 타입 검사
- **Tailwind CSS 4** - 유틸리티 우선 CSS 프레임워크

### 상태 관리 & 데이터 패칭
- **TanStack Query v5** - 서버 상태 관리
- **TanStack Router v1** - 타입 세이프 라우팅
- **Zustand** - 클라이언트 상태 관리

### 폼 & 검증
- **React Hook Form** - 성능 최적화된 폼 라이브러리
- **Zod** - TypeScript 우선 스키마 검증

### HTTP 클라이언트
- **Axios** - HTTP 요청 라이브러리

### 개발 도구
- **ESLint** - 코드 품질
- **Prettier** - 코드 포맷팅

## 📁 프로젝트 구조

```
src/
├── routes/          # TanStack Router 라우트
│   ├── __root.tsx   # 루트 레이아웃
│   └── index.tsx    # 홈 페이지
├── components/      # 재사용 가능한 컴포넌트
├── hooks/          # 커스텀 React 훅
├── api/            # API 호출 함수
├── lib/            # 유틸리티 및 설정
│   ├── axios.ts    # Axios 인스턴스
│   └── store.ts    # Zustand 스토어
├── main.tsx        # 앱 진입점
└── index.css       # 글로벌 스타일
```

## 🛠️ 설치 및 실행

### 개발 서버 시작
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 미리보기
```bash
npm run preview
```

### 코드 포맷팅
```bash
npm run format
```

### 린트 검사
```bash
npm run lint
```

## 🔧 환경 변수

`.env.example` 파일을 `.env` 파일로 복사하고 필요한 환경 변수를 설정하세요.

```bash
cp .env.example .env
```

## 📚 주요 라이브러리 문서

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## 💡 사용 예시

### TanStack Query로 데이터 패칭

```typescript
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/users')
      return data
    },
  })
}
```

### React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function LoginForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })
  
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('email')} />
      <input {...register('password')} type="password" />
      <button type="submit">로그인</button>
    </form>
  )
}
```

### Zustand 스토어 사용

```typescript
import { useUserStore } from '@/lib/store'

function Profile() {
  const { user, setUser } = useUserStore()
  
  return <div>{user?.name}</div>
}
```

## 🎯 다음 단계

1. 프로젝트 요구사항에 맞게 라우트 추가
2. API 엔드포인트 설정
3. 공통 컴포넌트 개발
4. 전역 스타일 커스터마이징
5. 테스트 코드 작성 (Vitest 추가 권장)
