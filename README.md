# 유현주 포트폴리오 — 단일 HTML

실행용 HTML은 `index.html` 하나입니다. 기존 디자인, 이미지, 반응형 CSS, 한영 전환, 전시 필터와 이미지 확대를 유지했습니다. 라이브러리나 API 키 없이 HTML/CSS/Vanilla JavaScript로 작동합니다.

사이트: https://yuhyunju.netlify.app/
저장소: https://github.com/silverk-dev/yuhyunju
Netlify: https://app.netlify.com/projects/yuhyunju

## 실행

VS Code에서 이 폴더를 열고 `index.html`을 브라우저로 엽니다. 수정 중 자동 새로고침이 필요하면 Live Server에서 index.html을 실행하세요. Python이 있다면 이 폴더에서 `python3 -m http.server 8000` 후 http://localhost:8000 에 접속할 수 있습니다. Windows는 `py -m http.server 8000`도 가능합니다. 서버 종료: Ctrl+C.

## 화면 주소

모든 화면은 같은 index.html을 사용하며 `page` 값에 따라 본문만 선택합니다. 평범한 링크를 이용하므로 새 탭, 새로고침, 뒤로/앞으로 가기가 작동합니다.

| 화면 | 주소 예시 |
|---|---|
| 홈 | `index.html` |
| 전시 목록 | `index.html?page=exhibitions` |
| 전시 상세 | `index.html?page=exhibition&id=two-rivers` |
| 소개 | `index.html?page=about` |
| 연구 | `index.html?page=research` |
| 영어 소개 | `index.html?page=about&lang=en` |

`lang=ko` 또는 `lang=en`으로 언어를 지정할 수 있습니다. 언어 선택은 브라우저에 저장되고, URL 값이 저장된 설정보다 우선합니다. 언어를 바꾸어도 화면·전시 id·해시 위치는 유지됩니다.

기존 `/about`, `/research`, `/exhibitions`, `/exhibition.html?id=…` 링크는 Netlify가 index.html로 연결합니다. 언어와 id를 보존하고 브라우저 주소를 새 구분값 방식으로 정리합니다. 이 호환 처리는 Netlify에서 동작하며, 로컬에서는 새 index.html 주소를 사용하세요.

## 수정할 파일

- `index.html`: 공통 헤더·푸터, 홈, 다른 화면의 `<template id="view-…">`. 화면 구조를 바꿀 때 이 파일만 수정합니다.
- `css/common.css`, `css/style.css`, `css/responsive.css`: 기존 공통·화면·반응형 디자인. HTML 통합 작업에서는 수정하지 않았습니다.
- `js/router.js`: page 값으로 본문 선택, 한국어 페이지 제목, 기존 주소 호환.
- `js/data.js`: 한국어 전시·연구 정보와 이미지 경로.
- `js/translations.js`: 영어 화면 문구·전시·연구 번역.
- `js/i18n.js`: 언어 선택, 언어별 콘텐츠·링크·접근성 레이블.
- `js/main.js`: 메뉴, 현재 메뉴 표시, 연구 목록.
- `js/exhibitions.js`: 전시 카드·필터·상세·이미지 확대.
- `images/`: 기존 1920×1080 배너, 1200×1200 대표 이미지, 상세 이미지.
- `scripts/build.mjs`: 웹사이트 파일만 dist로 복사하고 기존 주소 호환 규칙 생성.
- `CONTENT-SOURCES.md`: 자료 출처와 연도 확인 사항.
- `QA.md`: 확인 기록.

헤더와 푸터는 index.html에 한 번만 작성됩니다. 홈은 main에, 목록·상세·소개·연구는 같은 파일 하단의 template에 들어 있습니다. 기존 분리 HTML 파일은 제거했습니다.

## 전시·연구 관리

전시는 `data.js`의 exhibitions 배열에서 수정합니다. 새 항목은 기존 항목을 복사하고 중복 없는 id를 지정합니다. 배열 순서대로 표시되며, 9개가 넘으면 홈의 행이 늘어납니다. `year`는 필터용 숫자, 미확정은 null, `yearLabel`은 화면 문구입니다. `title`, `subtitle`, `date`, `venue`, `description`, `source`, `note`를 수정하고 대표 이미지 경로를 image, 상세 사진 경로들을 gallery에 넣습니다.

영어는 translations.js의 exhibitions에서 같은 id로 추가합니다. 연구 자료는 data.js의 research와 translations.js의 research를 함께 수정합니다. 영어 연구 번역의 키는 한국어 원제입니다. 자료 순서를 바꾸어도 번역은 원제에 연결됩니다.

소개문·학력은 index.html의 view-about 및 홈에서 수정합니다. 영문 문구도 translations.js에서 같이 수정합니다. 이름·이메일은 index.html과 data.js의 profile을 함께 확인합니다.

공식 영문명이 확인되지 않은 제목은 참고용 번역입니다. 사진·포스터 내부 글자는 원본 그대로입니다. 꽃 V의 기간은 사용자 확인에 따라 2025.10.22~11.01, 장소는 스페이스 테미로 반영했습니다. 상세 출처는 CONTENT-SOURCES.md를 참고하세요.

## 배포

GitHub main 브랜치 변경 사항을 저장하면 Netlify가 자동 배포합니다.

- Build: `node scripts/build.mjs`
- Publish directory: `dist`
- Node.js: 22
- Base directory: 비워 둠

로컬 빌드도 위 명령으로 확인할 수 있습니다. dist는 자동 생성되므로 직접 수정하지 않습니다. 배포물에는 HTML 하나와 css/js/images, 헤더·호환 주소 설정만 들어갑니다. 원본 PPT, README, 출처·검사 문서는 사이트 배포물에 포함하지 않습니다. `.netlify/`, dist, 환경변수 파일은 Git에서 제외합니다.

## 접근성과 제한

본문 건너뛰기, 메뉴 확장 상태, 키보드 포커스, 이미지 대체 텍스트, 필터 결과 알림, Esc로 닫는 네이티브 dialog, 모션 감소를 지원합니다. 활성 화면만 DOM에 삽입해 숨겨진 화면의 제목·버튼이 읽히지 않게 했습니다.

JavaScript가 꺼지면 한국어 홈과 안내만 표시됩니다. Contact는 이메일 프로그램을 여는 링크이며 전송 서버는 없습니다. 기기별·스크린리더 전수 검증을 완료한 것은 아닙니다.
