# 📚 CERTICOS BOOKS - 도서 검색 플랫폼

Kakao 도서 검색 API를 활용한 도서 검색 및 찜하기 기능을 제공하는 React 애플리케이션입니다.

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
├── api/                      # API 계층
│   ├── config/
│   │   └── client.ts        # axios 클라이언트 설정
│   └── books/               # 도서 API (도메인별 구조)
│       ├── service.ts       # API 호출 함수
│       ├── hooks.ts         # React Query hooks
│       └── types.ts         # 타입 정의
│
├── components/              # 컴포넌트 (기능별 분류)
│   ├── ui/                  # 재사용 가능한 기본 UI
│   │   ├── Button.tsx       # 버튼 (primary, outline, ghost)
│   │   ├── Input.tsx        # 입력 필드 (default, underline)
│   │   └── icons.tsx        # 아이콘 컴포넌트
│   ├── book/                # 도서 관련 컴포넌트
│   │   ├── BookCard.tsx     # 도서 카드 (상태 관리)
│   │   ├── BookCardCompact.tsx    # 리스트 뷰
│   │   ├── BookCardExpanded.tsx   # 상세 뷰
│   │   └── BookList.tsx     # 도서 목록
│   ├── search/              # 검색 관련 컴포넌트
│   │   ├── SearchBar.tsx    # 검색바 (조합 컴포넌트)
│   │   ├── SearchInput.tsx  # 검색 입력
│   │   ├── SearchHistory.tsx      # 검색 기록
│   │   ├── DetailSearchButton.tsx # 상세 검색 버튼
│   │   └── DetailSearchPopup.tsx  # 상세 검색 팝업
│   └── layout/              # 레이아웃 컴포넌트
│       ├── Header.tsx       # 헤더
│       └── EmptyState.tsx   # 빈 상태 UI
│
├── routes/                  # TanStack Router 라우트
│   ├── __root.tsx          # 루트 레이아웃
│   ├── index.tsx           # 도서 검색 페이지
│   └── favorites.tsx       # 찜한 책 페이지
│
├── hooks/                  # 커스텀 훅
│   └── useSearchHistory.ts # 검색 기록 관리
│
├── lib/                    # 라이브러리 및 설정
│   └── favoriteStore.ts   # Zustand 찜하기 스토어
│
├── types/                  # 공통 타입
│   └── book.ts            # 도서 타입 정의
│
├── mocks/                  # 목업 데이터
│   └── books.ts           # 테스트용 도서 데이터
│
├── assets/                 # 정적 자산
│   └── icon_book.png      # 아이콘 이미지
│
├── main.tsx               # 앱 진입점
└── index.css              # 글로벌 스타일
```

### 주요 설계 원칙

#### 1. **컴포넌트 분리 전략**
- **ui/**: 범용 UI 컴포넌트 (Button, Input)
- **book/**: 도서 도메인 컴포넌트
- **search/**: 검색 기능 컴포넌트
- **layout/**: 레이아웃 컴포넌트

#### 2. **API 계층 구조**
- **config/**: 인프라 설정 (axios 클라이언트)
- **books/**: 도메인별 API (service, hooks, types 응집)

#### 3. **성능 최적화**
- React.memo, useCallback, useMemo 활용
- SVG Sprite 방식으로 아이콘 관리
- React Query로 자동 캐싱

#### 4. **컴포넌트 조합 패턴**
- BookCard = BookCardCompact + BookCardExpanded
- SearchBar = SearchInput + SearchHistory + DetailSearchButton

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

## 🔧 환경 설정

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Kakao API 키를 설정하세요.

```bash
VITE_KAKAO_API_KEY=your_kakao_api_key_here
```

**Kakao API 키 발급 방법:**
1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 애플리케이션 등록
3. REST API 키 복사
4. `.env` 파일에 추가

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
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

## 💡 주요 기능

### 1. 도서 검색
- 통합 검색 (제목, 저자, 출판사)
- 상세 검색 (검색 대상 지정)
- 검색 기록 관리 (최대 8개)

### 2. 찜하기
- 도서 찜하기/취소
- 찜한 책 목록 보기
- localStorage 영구 저장

### 3. 반응형 UI
- 리스트 뷰 (간단한 정보)
- 상세 뷰 (책 소개 포함)
- 토글 기능

## 🔍 코드 예시

### API 호출 (React Query)

```typescript
import { useSearchBooks } from '@/api/books/hooks'

function SearchPage() {
  const { data, isLoading, isError } = useSearchBooks({
    query: '리액트',
    target: 'title',
    size: 50,
  })

  const books = data?.documents ?? []
  const totalCount = data?.meta.total_count ?? 0

  return <div>{/* UI */}</div>
}
```

### 재사용 가능한 컴포넌트

```typescript
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

function Example() {
  return (
    <>
      <Button variant="primary" size="md">구매하기</Button>
      <Button variant="outline" size="sm">상세보기</Button>
      <Input 
        value={value} 
        onChange={setValue}
        onEnter={handleSubmit}
        variant="underline"
      />
    </>
  )
}
```

### 찜하기 상태 관리 (Zustand)

```typescript
import { useFavoriteStore } from '@/lib/favoriteStore'

function BookCard({ book }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore()
  const favorited = isFavorite(book.isbn)

  const toggleFavorite = () => {
    favorited ? removeFavorite(book.isbn) : addFavorite(book)
  }

  return <button onClick={toggleFavorite}>♥</button>
}
```

## 🎯 향후 개선 사항

1. ✅ 페이지네이션 구현
2. ✅ 무한 스크롤 적용
3. ✅ 도서 상세 페이지 추가
4. ✅ 로딩 스켈레톤 UI
5. ✅ 에러 바운더리
6. ✅ 테스트 코드 작성 (Vitest)

## 📝 프로젝트 특징

- ✨ **최신 기술 스택**: React 19, Vite 8, TypeScript 6
- 🎨 **컴포넌트 설계**: 단일 책임 원칙, 재사용성, 조합 패턴
- ⚡ **성능 최적화**: useMemo, useCallback, SVG Sprite
- 📦 **도메인 주도 설계**: API와 컴포넌트를 도메인별로 구조화
- 🔄 **상태 관리**: React Query (서버), Zustand (클라이언트)
- 💅 **스타일링**: Tailwind CSS 4

## 👨‍💻 개발자

조민지 (JoMinJi)
