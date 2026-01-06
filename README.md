# Link Archive

자주 사용하는 웹사이트와 자료 링크를 **카테고리별로 시각화하여 관리**하는 개인 링크 아카이브 서비스입니다.  
단순 북마크가 아닌, 한 화면에서 구조적으로 정리된 링크 목록을 제공하는 것을 목표로 합니다.

---

## 주요 기능

- Firestore 기반 링크 데이터 조회 (Read)
- 카테고리별 링크 그룹화 및 서랍형 UI 표시
- 대표 이미지가 있는 링크를 카테고리 미리보기로 표시
- Firebase Authentication + GitHub OAuth 로그인
- 관리자 권한 기반 UI 분기
- 관리자 모드에서 링크 CRUD 지원
  - 링크 추가
  - 링크 수정
  - 링크 삭제
- 데이터가 없을 경우 안내 UI 표시 (관리자 / 일반 사용자 분기)

---

## 관리자 모드

- GitHub 계정으로 로그인
- Firestore `admins` 컬렉션에 등록된 사용자만 관리자 권한 부여
- 관리자 모드 활성화 시:
  - 링크 추가 버튼 노출
  - 링크 수정 / 삭제 버튼 활성화
- 일반 사용자는 링크 열람만 가능

---

## 사용 기술

### Frontend
- HTML
- CSS
- Vanilla JavaScript (ES Modules)

### Backend / Infra
- Firebase Firestore (데이터 저장)
- Firebase Authentication (GitHub OAuth)
- Firestore Security Rules 기반 접근 제어

### Hosting
- GitHub Pages

---

## 특징

- 클라이언트 상태(state) 기반 렌더링 구조
- Firestore Rules와 프론트 관리자 로직 분리
- 인증 여부와 권한에 따른 UI/기능 명확 분리
