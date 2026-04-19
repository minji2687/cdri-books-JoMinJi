# 📚 CERTICOS BOOKS - 도서 검색 플랫폼

## 프로젝트 개요

Kakao 도서 검색 API를 연동한 도서 검색 웹 애플리케이션입니다.

- 통합 검색 및 상세 검색(제목 / 저자 / 출판사 / ISBN) 지원
- 검색 기록 자동 저장 (최대 8개, localStorage 유지)
- 찜하기 기능 및 찜한 책 목록 페이지 제공
- React 19, Vite 8, TypeScript, Tailwind CSS 기반으로 구현

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
│   │   └── icons.tsx        # 아이콘 컴포넌트 (SVG Sprite)
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
│   │   └── DetailSearchPopup.tsx  # 상세 검색 팝업 (제어 컴포넌트)
│   └── layout/              # 레이아웃 컴포넌트
│       ├── Header.tsx       # 헤더
│       └── EmptyState.tsx   # 빈 상태 UI
│
├── routes/                  # TanStack Router 라우트
│   ├── __root.tsx          # 루트 레이아웃
│   ├── index.tsx           # / → /search 리다이렉트
│   ├── search.tsx          # 도서 검색 페이지
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
├── assets/                 # 정적 자산
│   └── icon_book.png      # 아이콘 이미지
│
├── main.tsx               # 앱 진입점
└── index.css              # 글로벌 스타일
```

### 폴더 구조 설명

#### **API 계층 (`/api`)**
API 관련 코드를 기능별로 나눠서 관리합니다.

```typescript
api/
├── config/client.ts      // axios 인스턴스, 공통 헤더 설정
└── books/                // 도서 검색 관련 API 코드 모음
    ├── service.ts        // API 호출 함수
    ├── hooks.ts          // useQuery 훅
    └── types.ts          // 요청/응답 타입 정의
```

**이렇게 나눈 이유:**
- API 설정(`config`)과 실제 호출 로직(`books`)을 분리해서 수정 범위를 좁힘
- 도서 관련 코드가 한 폴더에 모여 있어서 어디를 고쳐야 할지 바로 찾을 수 있음
- 나중에 다른 API가 생기면 `api/[이름]/` 폴더를 똑같은 구조로 추가하면 됨

**예시:**
```typescript
// service.ts - 순수 API 호출
export const searchBooks = (params: SearchBooksParams) => 
  apiClient.get<KakaoBookResponse>('/v3/search/book', { params })

// hooks.ts - React Query 통합
export const useSearchBooks = (params: SearchBooksParams) =>
  useQuery({
    queryKey: ['books', 'search', params],
    queryFn: () => searchBooks(params),
  })
```

#### **컴포넌트 계층 (`/components`)**
기능과 도메인에 따라 4개 계층으로 분리된 구조입니다.

```
components/
├── ui/        # 범용 UI 컴포넌트 (프로젝트 전반에서 재사용)
├── book/      # 도서 도메인 컴포넌트
├── search/    # 검색 기능 컴포넌트
└── layout/    # 레이아웃 컴포넌트
```

**1. `ui/` - 재사용 가능한 기본 UI**

프로젝트 전반에서 사용되는 범용 컴포넌트입니다.

```typescript
// Button.tsx - variant와 size를 props로 받는 범용 버튼
<Button variant="primary" size="md">구매하기</Button>
<Button variant="outline" size="sm">상세보기</Button>

// Input.tsx - onEnter 등 편의 기능 제공
<Input 
  value={query}
  onChange={setQuery}
  onEnter={handleSearch}  // Enter키 처리 내장
  variant="underline"
/>
```

**2. `book/` - 도서 도메인**

`BookCard`를 역할에 따라 세 개로 나눴습니다.

```typescript
// BookCard.tsx - 상태 관리 및 조합
// → 펼침/접힘 상태만 관리하고 UI는 하위 컴포넌트에 위임
export default function BookCard({ book }: BookCardProps) {
  const [expanded, setExpanded] = useState(false)
  return expanded ? 
    <BookCardExpanded book={book} onToggle={() => setExpanded(false)} /> :
    <BookCardCompact book={book} onToggle={() => setExpanded(true)} />
}

// BookCardCompact.tsx - 리스트 뷰 UI만 담당
// BookCardExpanded.tsx - 상세 뷰 UI만 담당
```

**3. `search/` - 검색 기능**

`SearchBar` 하나에 모든 기능을 넣지 않고 역할별로 컴포넌트를 쪼갠 뒤 조합했습니다.

```typescript
// SearchBar.tsx - 조합 컴포넌트 (상태 조율만 담당)
<SearchBar>
  <SearchInput />        // 검색어 입력
  <SearchHistory />      // 검색 기록
  <DetailSearchButton /> // 상세 검색
</SearchBar>
```

**재사용성과 테스트 용이성이 높아집니다:**
- `SearchInput`만 단독으로 다른 페이지에서 사용 가능
- 각 컴포넌트를 독립적으로 테스트 가능


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

## 📦 라이브러리 선택 이유

### TanStack Query
서버에서 받아오는 데이터(API 응답)는 클라이언트 상태와 성격이 다릅니다. TanStack Query는 로딩/에러 상태, 캐싱, 중복 요청 제거를 자동으로 처리해줘서 API 연동 코드를 훨씬 간결하게 만들 수 있습니다. 같은 키로 여러 컴포넌트에서 호출해도 요청이 한 번만 발생하는 점도 선택 이유 중 하나입니다.

### TanStack Router
타입스크립트를 기반으로 라우트를 파일 구조로 관리할 수 있어서 라우트 이름을 문자열로 직접 치지 않아도 됩니다. 오타로 인한 버그가 줄고, IDE에서 자동완성도 지원돼서 개발 편의성이 높습니다.

### Zustand
Redux에 비해 설정이 거의 없고 코드가 간결합니다. 찜하기처럼 여러 컴포넌트에서 공유하는 클라이언트 상태를 관리하기에 충분하고, `persist` 미들웨어를 붙이면 localStorage 연동도 한 줄로 끝납니다.

### Tailwind CSS
클래스명만으로 스타일을 완성할 수 있어서 별도의 CSS 파일을 오가지 않아도 됩니다. 디자인 시스템의 색상, 간격 등을 `tailwind.config`에서 토큰으로 관리하면 일관된 스타일을 유지하기 쉽습니다.

### Axios
fetch API에 비해 요청/응답 인터셉터, 타임아웃, 에러 핸들링이 간편합니다. API 클라이언트를 한 곳(`config/client.ts`)에서 설정하고 공통 헤더(Kakao API 키 등)를 일괄 적용하는 데 유용합니다.

## 📚 주요 라이브러리 문서

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)
## 💡 주요 기능

### 1. 도서 검색
- **통합 검색**: 제목, 저자, 출판사를 모두 검색
- **상세 검색**: 검색 대상(제목/저자/출판사/ISBN)을 지정하여 정확한 검색
- **검색 기록 관리**: 최근 검색어 최대 8개 저장 및 재검색

### 2. 찜하기
- 도서 찜하기/취소 토글
- 찜한 책 목록 페이지 (`/favorites`)
- localStorage를 통한 영구 저장 (브라우저 재시작 후에도 유지)

### 3. 반응형 UI
- **리스트 뷰**: 간단한 도서 정보 (제목, 저자, 가격)
- **상세 뷰**: 책 소개 및 출판사 정보 포함
- 클릭으로 뷰 전환 가능

## ✨ 강조하고 싶은 기능

### 1. **제어 컴포넌트 패턴 (Controlled Component)**

상세 검색 팝업(`DetailSearchPopup`)을 제어 컴포넌트로 구현하여 **부모 컴포넌트가 상태를 완전히 제어**합니다.

**문제 상황:**
- 상세 검색 도중 전체 검색을 수행하면 상세 검색 입력값이 초기화되어야 함
- 하지만 `DetailSearchPopup`이 내부 상태(`useState`)를 사용하면 외부에서 제어 불가능

**해결 방법:**
```typescript
// ❌ 비제어 컴포넌트 (내부 상태 사용)
function DetailSearchPopup({ onSearch }) {
  const [query, setQuery] = useState('')  // 부모가 제어 불가
  return <Input value={query} onChange={setQuery} />
}

// ✅ 제어 컴포넌트 (props로 상태 전달)
function DetailSearchPopup({ 
  query,           // 부모로부터 받음
  onQueryChange,   // 부모가 상태 업데이트
  onSearch 
}) {
  return <Input value={query} onChange={onQueryChange} />
}

// 부모 컴포넌트에서 상태 관리
function SearchPage() {
  const [detailQuery, setDetailQuery] = useState('')
  
  const handleSearch = () => {
    setDetailQuery('')  // 전체 검색 시 상세 검색 입력 초기화 가능!
  }
  
  return (
    <DetailSearchPopup 
      query={detailQuery}
      onQueryChange={setDetailQuery}
    />
  )
}
```

**장점:**
- 상태가 한 곳에서만 관리되어 어디서 바뀌었는지 추적하기 쉬움
- 부모에서 자식 상태를 자유롭게 초기화하거나 바꿀 수 있음
- 버그가 생겼을 때 상태 흐름을 따라가기가 훨씬 편함

**구현 파일:**
- `src/components/search/DetailSearchPopup.tsx` (제어 컴포넌트)
- `src/components/search/DetailSearchButton.tsx` (props 전달)
- `src/routes/search.tsx` (상태 관리 주체)

### 2. **React 성능 최적화**

불필요한 리렌더링을 방지하기 위해 `useMemo`와 `useCallback`을 전략적으로 사용합니다.

```typescript
// BookCard.tsx
export default function BookCard({ book }: BookCardProps) {
  // ✅ 계산 비용이 큰 로직은 useMemo로 메모이제이션
  const price = useMemo(
    () => (book.sale_price > 0 ? book.sale_price : book.price),
    [book.sale_price, book.price]
  )

  // ✅ 하위 컴포넌트에 전달하는 함수는 useCallback으로 참조 유지
  const toggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      favorited ? removeFavorite(book.isbn) : addFavorite(book)
    },
    [favorited, book.isbn, addFavorite, removeFavorite]
  )

  return <button onClick={toggleFavorite}>♥</button>
}
```

**왜 필요한가?**
- JavaScript에서 객체/함수는 매 렌더마다 새로운 참조를 생성
- 자식 컴포넌트는 props의 참조가 바뀌면 불필요하게 리렌더링
- `useCallback`은 의존성이 변경될 때만 새 함수를 생성

### 3. **SVG Sprite 방식 아이콘 관리**

여러 SVG 아이콘을 하나의 파일(`public/icons.svg`)로 통합하여 HTTP 요청을 최소화합니다.

```xml
<!-- public/icons.svg -->
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="heart-icon" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5..." />
  </symbol>
  <symbol id="search-icon" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11..." />
  </symbol>
</svg>
```

```typescript
// src/components/ui/icons.tsx
export function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20">
      <use href="/icons.svg#heart-icon" />  // Sprite 참조
    </svg>
  )
}
```

**장점:**
- 단일 HTTP 요청으로 모든 아이콘 로드
- CSS로 색상/크기 제어 가능
- 인라인 SVG 대비 HTML 크기 감소

### 4. **TanStack Query를 활용한 서버 상태 관리**

API 호출, 캐싱, 로딩/에러 처리를 선언적으로 관리합니다.

```typescript
// src/api/books/hooks.ts
export const useSearchBooks = (params: SearchBooksParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.search(params),
    queryFn: () => searchBooks(params),
    enabled: !!params.query,  // query가 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  })
}

// 사용
const { data, isLoading, isError } = useSearchBooks({ 
  query: '리액트', 
  target: 'title' 
})
```

**장점:**
- 중복 요청 자동 제거 (동일한 queryKey)
- 백그라운드 데이터 갱신
- 로딩/에러 상태를 컴포넌트에서 선언적으로 처리

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
- 🎨 **컴포넌트 설계**: 역할별로 잘게 나눠서 재사용과 수정이 쉽도록 구성
- ⚡ **성능 최적화**: useMemo, useCallback, SVG Sprite
- 📦 **폴더 구조**: API와 컴포넌트를 기능 단위로 묶어서 관리
- 🔄 **상태 관리**: React Query (API 데이터), Zustand (찜하기 등 앱 상태)
- 💅 **스타일링**: Tailwind CSS 4

## 👨‍💻 개발자

조민지 (JoMinJi)
