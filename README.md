# Link Archive

자주 사용하는 웹사이트와 자료 링크를 카테고리별로 정리해 두기 위한 개인 링크 관리 사이트입니다.  
단순한 북마크가 아니라, 한 화면에서 시각적으로 정리된 링크 목록을 확인하고 관리하는 것을 목표로 합니다.

## 주요 기능

- 카테고리별 링크 정리
- 카드/서랍형 UI로 링크 목록 표시
- 대표 이미지가 있는 링크는 카테고리 미리보기로 표시
- 로컬 스토리지 기반 데이터 저장
- 관리자 모드에서 링크 추가 / 수정 / 삭제
- GitHub 계정 기반 관리자 로그인 (Firebase Authentication)

## 관리자 모드

관리자 권한은 GitHub 로그인 후 특정 UID와 일치할 경우에만 활성화됩니다.

관리자 모드에서 가능한 작업:
- 링크 추가
- 링크 수정
- 링크 삭제

일반 사용자는 링크 열람만 가능합니다.

## 사용 기술

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)

### Authentication
- Firebase Authentication
- GitHub OAuth 로그인

### Hosting
- GitHub Pages


