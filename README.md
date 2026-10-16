# 유현주 전시기획자 포트폴리오

HTML / CSS / Vanilla JavaScript 정적 웹사이트. 별도 설치, 빌드, API 키, 외부 폰트가 필요하지 않습니다. 모든 이미지가 로컬에 포함되어 있습니다.

## 실행

1. ZIP을 압축 해제합니다.
2. VS Code에서 `yu-hyunju-portfolio` 폴더를 엽니다.
3. `index.html`을 브라우저로 열면 바로 실행됩니다.
4. 수정하면서 확인하려면 VS Code의 Live Server 확장을 설치한 후 `index.html`에서 **Open with Live Server**를 선택합니다.

Python이 설치되어 있다면 이 폴더의 터미널에서 `python3 -m http.server 8000`을 실행하고 http://localhost:8000 으로 접속해도 됩니다. Windows에서는 `py -m http.server 8000`을 사용할 수 있습니다. 종료는 Ctrl+C입니다.

Chrome, Edge, Safari, Firefox 최신 버전 권장. Contact는 이메일 프로그램을 여는 링크이며, 폼 전송 서버는 없습니다.

## 파일 구성

- `index.html`: HERO / Selected Exhibitions 9개 / About / Research / 푸터
- `exhibitions.html`: 전체 전시 및 연도 필터
- `exhibition.html?id=…`: data.js의 id로 표시하는 공통 전시 상세 페이지
- `about.html`: 소개와 학력·경력
- `research.html`: 연구·저술 기록
- `js/data.js`: 전시 제목·연도·이미지·기간·장소·설명·출처 및 연구 목록
- `js/main.js`: 메뉴, 현재 메뉴 표시, 연구 목록
- `js/exhibitions.js`: 전시 카드, 필터, 상세, 이미지 확대
- `css/common.css`: 색상, 글꼴, 공통 요소
- `css/style.css`: 페이지 레이아웃
- `css/responsive.css`: 태블릿·모바일·모션 감소 설정
- `images/banner/main-banner.webp`: 1920×1080 배너
- `images/exhibitions/*.webp`: 1200×1200 대표 이미지와 원본 비율 상세 이미지
- `CONTENT-SOURCES.md`: 출처 및 확인할 정보
- `QA.md`: 동작 확인 기록

## 전시 수정 / 추가

`js/data.js`에서 `exhibitions` 배열의 항목을 수정합니다. 파일은 JavaScript이므로 쉼표·따옴표를 유지해 주세요. 기존 항목 하나를 복사해 배열에 추가하면 목록과 홈에 자동 표시되고 상세 페이지도 생성됩니다. 배열 순서가 표시 순서입니다. 최신순으로 배치하되, 연도 미확정인 꽃 V는 기존 기획에 따라 첫 번째입니다. 홈은 현재 전시 전체를 표시하므로, 9개를 넘기면 행이 늘어납니다.

- `id`: 중복 없는 영문 식별자. 기존 링크 유지를 위해 변경하지 않는 것이 좋습니다.
- `title`, `subtitle`: 전시명, 부제
- `year`: 필터용 숫자. 미확정은 `null` (따옴표 없음)
- `yearLabel`: 화면에 보이는 연도 문자열
- `image`: 정사각형 대표 이미지 경로
- `gallery`: 상세 이미지 경로 배열
- `date`, `venue`, `description`: 기간, 장소, 소개
- `source`, `note`: 출처와 불확실한 정보 안내

예: 새 이미지 파일을 images/exhibitions에 저장하고 해당 경로를 `image`나 `gallery`에 적습니다. 대표 이미지는 1200×1200, 배너는 1920×1080 WebP 권장. 포스터는 글자가 잘리지 않도록 정사각형 여백 안에 배치하세요. 원본 해상도가 작은 경우 1200px로 변환해도 실제 디테일이 증가하지는 않습니다.

연구·저술은 `research` 배열에서 추가합니다. 홈은 최근 3개, 연구 페이지는 전체 항목을 표시합니다. 연구 링크는 원문 URL이 검증되지 않아 제공하지 않습니다.

소개문과 학력은 `index.html`, `about.html`에서 수정합니다. 메뉴·푸터는 각 HTML에 들어 있어 변경 시 모든 페이지에 반영해 주세요. `profile`은 프로필 정보를 모아둔 참조 항목이며, 이름·이메일 변경은 각 HTML의 텍스트·mailto 링크와 메타 정보도 함께 수정해야 합니다.

## 디자인과 접근성

콘텐츠 최대 너비 1280px, 1440px 화면에서 여백 80px. 1000px 초과는 3열, 601–1000px는 2열, 600px 이하는 1열. 카드 간격 32px. 흰 배경, 얇은 선, 올리브색 포인트, 그림자 없는 카드로 구성했습니다. kimjeesoo.com은 분위기 참고이며 코드·문구·이미지는 복제하지 않았습니다.

본문 건너뛰기, 키보드 포커스, 메뉴 확장 상태, 필터 결과 알림, 이미지 대체 텍스트, Esc로 닫는 네이티브 dialog, 모션 감소 설정을 적용했습니다. 확대창에서는 Tab 키로 닫기 버튼에 접근할 수 있고 닫으면 원래 이미지 버튼으로 포커스가 돌아갑니다.

상세 페이지는 JS로 렌더링됩니다. JS를 끄면 공통 안내만 표시됩니다. 검색 유입이 중요해지면 개별 전시 HTML과 전시별 공유 메타 이미지 생성 방식을 추가할 수 있습니다.

## 정적 호스팅

직접 HTML을 여는 로컬 실행에는 빌드가 필요하지 않습니다. Netlify에서는 아래 빌드 명령으로 웹사이트 파일만 dist에 모아 배포합니다. sources 원본, 주거지 주소, 개인 사무실 주소는 포함하지 않았습니다.

## GitHub → Netlify 자동 배포

저장소 루트는 이 `yu-hyunju-portfolio` 폴더입니다. `sources/`나 외부 원본 자료는 저장소에 올리지 않습니다.

`netlify.toml`에 배포 설정을 추가했습니다. Netlify에서 GitHub 저장소의 `main` 브랜치를 연결하면, 변경 내용을 GitHub에 push할 때마다 배포됩니다.

- Build command: `node scripts/build.mjs`
- Publish directory: `dist`
- Node.js: 22
- Base directory: 비워 둠 (저장소 루트)

빌드 스크립트는 HTML/CSS/JS/이미지만 dist에 복사합니다. README, QA 문서, 출처 메모, 로컬 검사 페이지는 공개 사이트에서 제외됩니다. `.netlify/`의 로컬 연결 정보와 환경변수 파일도 Git에서 제외했습니다.

로컬에서 빌드를 검사하려면 Node.js가 있는 환경에서 `node scripts/build.mjs`를 실행합니다. dist는 자동 생성되므로 직접 수정하지 않습니다. 수정은 원본 HTML/CSS/JS에서 진행한 후 GitHub에 반영합니다. 브라우저에 열린 사이트는 새 배포가 끝나면 새로고침해 확인합니다.

GitHub 저장소: https://github.com/silverk-dev/yuhyunju

Netlify 관리: https://app.netlify.com/projects/yuhyunju

사이트 주소: https://yuhyunju.netlify.app

2026-10-16 main 브랜치에서 첫 배포 성공을 확인했습니다. 변경 사항을 main에 저장하면 Netlify가 자동으로 새 배포를 시작합니다. 배포 완료 후 사이트를 새로고침하면 수정 내용을 볼 수 있습니다.

## 한국어 / 영어

상단 KO / EN 링크로 전환합니다. `?lang=ko`와 `?lang=en`으로 언어를 지정한 링크를 공유할 수 있습니다. 전시 상세의 id와 페이지 내 위치도 언어 전환 시 유지됩니다. 선택 언어는 브라우저에 저장되며, 저장을 허용하지 않는 환경에서는 URL의 언어 값을 사용합니다. 언어가 지정되지 않고 저장된 설정도 없으면 한국어로 시작합니다.

- 한국어 콘텐츠: 기존 HTML 및 `js/data.js`
- 영어 콘텐츠: `js/translations.js` (`static`은 화면 문구, `exhibitions`는 전시 id별 번역, `research`는 한국어 원제별 번역)
- 전환 처리: `js/i18n.js`

새 전시를 추가하면 data.js와 같은 id로 translations.js의 exhibitions에도 영어 제목·설명·장소·기간·출처를 추가합니다. 연구 자료는 한국어 원제를 키로 사용하므로 목록 순서를 바꾸어도 번역이 다른 자료에 붙지 않습니다. 원제 변경 시 해당 키도 함께 수정합니다. 공식 영문명이 확인되지 않은 제목은 참고용 번역이라는 안내를 표시합니다. 포스터 등 원본 사진 안의 문자는 이미지 기록을 보존하기 위해 번역하지 않았습니다.

한국어 바로가기: https://yuhyunju.netlify.app/?lang=ko
영어 바로가기: https://yuhyunju.netlify.app/?lang=en
