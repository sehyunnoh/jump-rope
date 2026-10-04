# 음악줄넘기 레퍼런스 사이트 — 개발 계획

> 상태: **설계 확정 — 개발 착수**. 레벨·기술 목록 1차 리서치 완료(2장), 와이어프레임 확정, 핵심 결정사항 확정.
> 작성일: 2026-10-04 · 수정: 2026-10-04

---

## 0. 확정된 결정 사항

| 항목 | 결정 |
|---|---|
| 참고 프로젝트 | `D:\workspace\tap-dance` — 기능 구성·기술 스택을 참고하되 **디자인은 완전히 다르게** (3장 참고) |
| 사용 목적 | 캐나다에 있는 아이들과 **함께 배우며 연습**하는 레퍼런스 사이트 (옆에 띄워두고 따라 하기) |
| 언어 | **영어 중심** — 화면 문구·설명은 영어, 기술 이름은 한국어 원어를 **별칭(aka)** 으로 함께 표기 (예: `Criss-Cross (aka 엇걸었다풀기)`) — 한국 커뮤니티 자료·영상 검색에도 바로 쓸 수 있게 |
| 사용자 구성 | 성인(사용자) + 아이들, 여러 명이 함께 레벨별로 진행 |
| **진행 상태 추적** | **1차에는 넣지 않음** (익힘/배우는 중 체크, 사람별 프로필 전환 모두 제외 — 2026-10-04 결정) |
| **기준 자료 (레벨·기술)** | JUMPSCHOOL 같은 특정 단체의 공식 급수표를 따르지 않기로 함 — 2장의 4개 채널 리서치를 기준으로 자체 큐레이션 (2026-10-04 결정) |
| 디자인 톤 | tap-dance와 **의도적으로 다르게** — "연습장 스코어보드" 컨셉 (오프화이트 대신 쿨톤 chalk, 손글씨 폰트 대신 Big Shoulders Display, 레벨 색은 난이도=온도 램프, 메트로놈은 BPM 펄스 독). 확정 와이어프레임: [RopeBeat Wireframes](https://claude.ai/code/artifact/628dd38a-0b8a-4205-9b49-632f6784704c) |
| **사이트 이름** | **RopeBeat** (2026-10-04 확정) |
| **배포** | **GitHub Pages**, 공개 저장소 **`sehyunnoh/jump-rope`** (2026-10-04 확정) |

---

## 1. 목표

1. 한국에서 유행 중인 **음악줄넘기(리듬 줄넘기/프리스타일 줄넘기)** 기술을 **난이도별로 정리**한 레퍼런스 사이트
2. 기술을 클릭하면 **설명 + 레벨 + 카운트/타이밍 + 참고 영상 2~3개**
3. 영상은 tap-dance처럼 **느리게 보기 · 구간 반복(A-B 루프) · 좌우 반전(미러)** 지원 → 보면서 바로 따라 하기
4. **박자/점프 속도 맞추기 도구** (아래 1.1 참고) — 줄넘기는 탭댄스보다 "리듬에 맞춰 반복"하는 성격이 강해서 중요도가 더 높음
5. **Level 1부터 순서대로** 가족이 같이 따라가기 쉬운 구성, 모바일(연습 공간에서 폰으로 보기) 우선

### 1.1 "메트로놈" 대신 무엇을 쓸까
tap-dance의 메트로놈은 손/발 박자를 맞추는 용도였는데, 줄넘기는:
- 기술 하나가 보통 **한 바퀴(rotation) = 한 박** 단위로 반복되고
- 음악에 맞추는 음악줄넘기 특성상 **BPM 맞추기**가 탭댄스보다 더 핵심 기능이 될 수 있음

→ 같은 메트로놈 컴포넌트를 재사용하되, 표시를 **"Jumps per minute"** 로 바꾸고, 기술마다 **추천 연습 BPM(느리게/보통/음악 템포)** 를 데이터에 넣는 방식을 제안. (탭댄스의 `bpm: { slow, normal }` 구조 그대로 재사용 가능)

### 1.2 열어둔 질문 → 확정됨 (2026-10-04)
- 진행 상태(연습 중/익힘) 추적, 사람별 프로필 전환 → **1차에서 완전히 제외**. 나중 후보로만 남김
- **음악줄넘기 특유의 "루틴/안무"**(여러 기술을 음악에 맞춘 조합)도 다룰지 → 1차는 tap-dance와 동일하게 **개별 기술** 중심, 루틴 조합은 "나중 후보"로 유지 (5.2 참고)

---

## 2. 레벨·기술 목록 리서치 (기준 자료: 유튜브 채널 4곳)

사용자가 지정한 4개 채널을 조사했습니다. tap-dance의 `tapdancesyllabus.com`처럼 하나의 완결된 공식 급수표는 아니지만, 채널들의 성격이 서로 다른 역할(입문 뼈대 / 전제조건 설계 / 한국어·음악줄넘기 색깔 / 최고난도 참고)을 맡아줄 수 있어서, 이번 리서치로 **Level 1~3은 구체적인 기술 목록**을, **Level 4~5는 방향성**을 확정했습니다. (조사일: 2026-10-04)

### 2.1 채널별 역할

| 채널 | 성격 | 언어 | 난이도 구조 | 이 사이트에서의 역할 |
|---|---|---|---|---|
| **[JUMPSCHOOL](https://www.youtube.com/@JUMPSCHOOL)** (점프스쿨_OFFICIAL, jumpschool.co.kr) | 2008년부터 운영된 한국 **K-POP 음악줄넘기 전문 아카데미**, 아동 대상, 자체 "레벨업 트레이닝" 승급 시스템 존재 | 한국어 | 자체 급수 체계 있음 (세부 명칭 미확인 — jumpschool.co.kr 접속 실패) | **"음악줄넘기" 장르의 기준점** + 한국어 용어·공연/루틴 참고. 급수표 세부는 추가 확인 필요 (2.3) |
| **[hajumpoo](https://www.youtube.com/@hajumpoo)** (jumpooTV, 하준우) | 초등학생 국가대표(2024 주니어 아시안챔피언, 2025 주니어 월드챔피언)의 퍼포먼스/챌린지 채널 | 한국어 | 체계적 튜토리얼 아님, 고난도 시범·공연 위주 | **Level 4~5 "이렇게까지 할 수 있다" 참고 영상** — 입문 자료로는 부적합 |
| **[LaurenJumps](https://www.youtube.com/@LaurenJumps)** | 영어권 프리스타일/피트니스 줄넘기. 자체 앱 Fancy Feats에 **Beginner → Intermediate → Advanced + 기술별 전제조건(prerequisite) 스킬맵** 운영 | 영어 | 명확함 (전제조건 기반) | tap-dance의 `prerequisites`/`nextSteps` 구조와 가장 유사 — **전제조건 설계의 모델** |
| **[JumpRopeDudes](https://www.youtube.com/@JumpRopeDudes)** | 영어권 대형 피트니스 줄넘기 채널. 블로그에 Beginner → Advanced 명시적 트릭 목록, "START HERE" 입문 재생목록 | 영어 | 명확함 (Beginner/Advanced 라벨 직접 표기) | **Level 1~2 기술명·순서의 1차 출처**로 바로 쓰기 좋음 |

### 2.2 레벨 체계 (5단계로 재조정)

4개 채널의 실제 콘텐츠 구조를 보면 **7단계보다 5단계**가 지금 확보한 자료량에 맞습니다. 영어권 두 채널이 Level 1~3(기초~더블언더)의 뼈대를 주고, JUMPSCHOOL이 한국어 용어·음악줄넘기 색깔을, hajumpoo가 Level 4~5(최고난도 프리스타일)의 참고 영상을 줍니다.

> 한글 별칭은 **이번 리서치로 확실히 확인된 것만** 표시합니다. "확인 필요"로 표시한 것은 한국 커뮤니티에서 통용되는 번역이 있을 가능성이 높지만, 이번 조사에서 직접 출처를 확인하지 못했다는 뜻입니다 — 실제 데이터 작성 시 반드시 재확인합니다.

**Level 1 — Foundations (기본 뛰기)**
| 기술 | 한글 별칭 | 참고 채널/영상 |
|---|---|---|
| Basic Jump | 양발모아뛰기 (확인됨) | JumpRopeDudes "START HERE – Beginner Jump Rope Basics" 재생목록 |
| Run-In-Place / Speed Step | 번갈아뛰기 (확인됨) | JumpRopeDudes "Fast Skip / Run-In-Place", LaurenJumps "How To Jump Rope For Beginners" |
| Side Swing (점프 없이 줄만 좌우로) | 확인 필요 | 트릭 전환용 기본기로 여러 채널에 공통 등장 |
| Skier (좌우로 모아 뛰기) | 확인 필요 | JumpRopeDudes "Skiers" |
| Front and Side Straddle | 확인 필요 | JumpRopeDudes "Front and Side Straddle" |

**Level 2 — Core Footwork & Crossover (교차·풋워크)**
| 기술 | 한글 별칭 | 참고 채널/영상 |
|---|---|---|
| Boxer Step/Skip | 확인 필요 | JumpRopeDudes·EliteJumps 공통 (난이도 체감 표기가 채널마다 다름 — 실제 영상 보고 재조정 필요) |
| Crossover | 확인 필요 (커뮤니티 번역 "엇걸어뛰기(크로스)"가 있으나 이번 조사로 직접 확인 못함) | LaurenJumps "JUMP ROPE 101 – Swings & Crossovers Tutorial" |
| Criss-Cross / Double Criss-Cross | 확인 필요 | JumpRopeDudes "Criss Cross" / "Double Criss Cross" |
| 360° Turn | 확인 필요 | EliteJumps "Top 10 Fundamental Jump Rope Tricks" |

**Level 3 — Double Unders (이단뛰기 계열)**
- **Double Under** — 이단뛰기 (확인됨, 한국에서 통용되는 표준 번역) — JumpRopeDudes·EliteJumps 공통 (단, LaurenJumps Fancy Feats는 이걸 Beginner 단계로 분류 — 채널 간 난이도 체감 차이 있음, 실제 적용 시 조정)
- Double Under Criss-Cross — JumpRopeDudes
- 이 레벨부터 "회전 수(rotations per jump)"가 핵심 데이터 필드가 됨 (6.2 데이터 형식과 연결)

**Level 4 — Freestyle Basics (프리스타일 기초, 방향성만)**
- EB(엘보우/바디크로스), Side Swing Criss-Cross, Mummy Kicks, Toad류, Wraps 등 — 영어권 프리스타일 자료에서 "기초 프리스타일"로 분류되는 트릭군. 한글 명칭은 이번 리서치로 확인 못해 전부 "확인 필요"
- LaurenJumps Fancy Feats의 "Advanced" 단계(프리스타일 트릭·스윙·레그크로스·랩) 설명과 방향 일치

**Level 5 — Performance & Routines (공연/경연, 방향성만)**
- 여러 기술을 음악에 맞춰 연결하는 조합/루틴. **JUMPSCHOOL**(음악줄넘기 대회·공연)과 **hajumpoo**(고난도 퍼포먼스)가 이 레벨의 참고 영상으로 가장 적합
- JUMPSCHOOL의 실제 급수/레벨업 체계는 이번 리서치로 확정 못함 (2.3)

### 2.3 남은 공백 — 다음 액션
- **JUMPSCHOOL 급수표는 따르지 않기로 함** (2026-10-04 결정) — 특정 단체의 공식 체계에 종속되지 않고, 4개 채널 리서치를 기준으로 자체 큐레이션. 따라서 `jumpschool.co.kr` 접속 재시도는 더 이상 필요 없음
- **Boxer Step, Crossover 등 난이도 체감 불일치**: 채널마다 같은 기술을 다른 레벨로 분류 — 실제 영상을 보면서 체감 난이도로 재조정 필요
- **한글 별칭 대량 미확인**: Level 2~5 대부분의 "확인 필요" 항목은 데이터 작성 시(4단계 진행 때) 한국어 줄넘기 자료로 개별 검증 필요

---

## 3. 화면 구성 (tap-dance 와이어프레임 참고)

`D:\workspace\tap-dance\wireframes\`의 `Main.dc.html`(목록), `StepDetail.dc.html`(상세)을 참고해 아래처럼 변형합니다.

### 3.1 디자인 톤 (tap-dance에서 그대로 가져올 것)
- 배경 `#fbfaf7`, 텍스트 `#262521` 느낌의 **따뜻한 오프화이트 + 잉크 블랙**
- 제목/기술 이름은 손글씨 느낌 폰트(예: Gaegu), 본문은 깔끔한 산세리프(예: Nunito)
- **레벨 배지**: 레벨마다 고정 색 (1=초록 … 7=검정), 동그란/각진 배지에 숫자
- **태그 칩**(category, count 등), 점선 테두리 = 선택/보조 요소
- 하단 **고정 바** = 연습 도구(줄넘기에서는 "Jumps per minute" 카운터, 3.3 참고)

### 3.2 목록 화면 (List)
tap-dance의 Main 화면과 동일한 틀, 라벨만 교체:
- 상단: 검색창("Search moves") + 필터 버튼
- "Jump to level" — 1~7 색상 배지 바로가기
- 레벨 섹션별 카드 리스트: **기술 이름(영어) + 한글 별칭 + 카테고리 태그 + 카운트(바퀴 수/박자 수)**
- 필수/선택 구분은 음악줄넘기에 바로 적용되는 개념인지 리서치 후 결정 (급수표에 "필수 기술"이 있으면 그대로 사용)

### 3.3 상세 화면 (Detail)
tap-dance의 StepDetail 화면 틀을 그대로 재사용, 아래만 교체:
| tap-dance | jump-rope 버전 |
|---|---|
| Sounds (소리 수) | **Rotations / Count** (바퀴 수, 예: "2회전" 이단뛰기) |
| Breakdown (Brush→Spank→…) | **동작 분해** (예: Jump → Cross → Open) — 해당되는 기술만 |
| BPM (손/발 박자) | **Jumps per minute** (추천 연습 속도: 느리게/보통/음악 템포) |
| 속도·A-B 루프·미러 플레이어 | **그대로 유지** — 줄넘기 영상도 느리게/반복/미러가 똑같이 유용 |
| Prerequisites / Next steps | **그대로 유지** — 기술 간 선행 관계 (예: 이단뛰기 → 이단 엇걸어뛰기) |

### 3.4 새로 추가할 요소 (줄넘기 특성상)
- **"줄 길이 맞추기" 안내** (선택) — 기술 설명에 "줄 길이: 양발로 밟았을 때 손잡이가 가슴~어깨 높이" 같은 일반 팁을 사이트 어딘가(예: 처음 보는 사람용 안내 페이지)에 한 번 정리
- **아이 난이도 표시** (선택) — 7단계 레벨 외에, "우리 아이가 할 수 있는지" 감을 잡기 쉽게 레벨 1~2에 "초등 저학년도 가능" 같은 짧은 코멘트 (리서치 후 필요성 재검토)

---

## 4. 기능 (1차 범위 — tap-dance 기준으로 재구성)

1. **기술 목록 화면** — 레벨별 섹션, 필터(레벨/카테고리), 검색(이름+별칭, 한글 포함)
2. **기술 상세 화면** — 이름/별칭/레벨/카테고리, 설명, 동작 분해, 연습 팁·흔한 실수, 선행/다음 기술, 같은 레벨 이전/다음 버튼, 고유 URL
3. **연습용 영상 플레이어** — 속도(0.25~1x), A-B 구간 반복, ±5초, **좌우 반전(미러)**, 모바일 큰 버튼 (tap-dance와 동일)
4. **Jumps-per-minute 카운터** — BPM 슬라이더+탭 템포, 시작/정지, 기술별 추천 속도(느리게→보통→음악 템포), 하단 고정 바
5. **모바일 우선 반응형**
6. (선택, tap-dance에 이미 있던 것 재사용 가능) 방문 통계, 다크 모드, 진행 상태 체크, 로드맵 뷰 — 1차 완료 후 필요하면 추가

### 5.2 나중 후보 (1차 제외)
- **음악 루틴 빌더**: 여러 기술을 골라 음악 박자에 맞춰 순서를 짜보는 기능 (음악줄넘기의 "안무" 성격을 살리는 기능이지만 범위가 커서 후순위)
- 사람별(아이별) 진행 상태 프로필 전환
- 레벨별 "이 영상 그대로 따라 하기" 추천 루틴(기존 유튜브 안무 영상 연결)

---

## 5. 영상·설명 자료 수집 (tap-dance 방식 재사용)

1. 기술마다 `"<move name> 줄넘기 강좌"` / `"<move name> jump rope tutorial"` 로 검색 → 튜토리얼 1개 + 느린 시범 1개(가능하면) 선정
2. YouTube oEmbed로 **존재 여부·임베드 허용 여부** 자동 검증 (tap-dance의 `scripts/verify-videos.mjs` 재사용 가능)
3. 자료가 부족한 고난도/창작 기술은 tap-dance와 동일하게 **"설명 준비 중"** 표시, 추측 설명 금지
4. 가능하면 **한국어 강좌 영상 위주**로 모아서(사용자가 한국어도 이해 가능하다면) 설명과 실제 동작이 어긋나지 않게 확인

---

## 6. 기술 스택 (tap-dance와 동일하게 제안)

| 항목 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Vite + React + TypeScript | tap-dance와 동일 구조 재사용 가능 (컴포넌트 많이 그대로 포팅 가능) |
| 스타일 | Tailwind CSS | 반응형·모바일 레이아웃 |
| 라우팅 | React Router (`/moves/:id`) + 빌드 시 프리렌더 | 검색 노출, tap-dance와 동일 |
| 영상 | YouTube IFrame Player API | 속도 조절, 구간 반복 |
| 데이터 | `src/data/moves/level-1.json` ~ `level-N.json` | 레벨별 파일 분리 |
| 배포 | GitHub Pages (제안) | tap-dance와 동일 패턴, 저장소명은 착수 시 확인 |

### 6.1 tap-dance에서 거의 그대로 재사용 가능한 컴포넌트
`Shell.tsx`, `LevelSection.tsx`, `StepList.tsx`→`MoveList`, `StepRow.tsx`, `StepDetail.tsx`, `VideoPanel.tsx`, `PracticeControl.tsx`(속도/루프/미러), `MetronomeBar.tsx`→`JpmBar`(이름만 교체), `FilterSheet.tsx`, `ThemeToggle.tsx`, `Timeline.tsx`(선행/다음 관계 있으면), `lib/metronomeEngine.ts`, `lib/youtube.ts`, `lib/seo.ts`, `lib/analytics.ts`, `lib/storage.ts` — 로직 대부분 도메인에 안 묶여 있어 복붙 후 이름/라벨만 바꿔도 될 가능성이 높음

### 6.2 데이터 형식 (예시, tap-dance 형식 변형)
```json
{
  "id": "double-under",
  "name": "Double Under",
  "aliases": ["이단뛰기"],
  "level": 3,
  "essential": true,
  "category": "jump-rotation",
  "rotationsPerJump": 2,
  "jpm": { "slow": 60, "normal": 100, "music": 120 },
  "breakdown": ["Jump", "Double spin"],
  "description": "Jump slightly higher than a basic jump and spin the rope twice underneath before landing.",
  "tips": ["Keep elbows close to the body and spin with the wrists, not the arms", "Land softly on the balls of your feet"],
  "prerequisites": ["basic-jump"],
  "nextSteps": ["double-under-cross", "triple-under"],
  "videos": [
    { "youtubeId": "xxxxxxxxxxx", "title": "(자동 기록)", "channel": "(자동 기록)", "type": "tutorial" }
  ],
  "status": "complete"
}
```

---

## 7. 진행 순서 (제안)

| 단계 | 작업 | 결과물 |
|---|---|---|
| **1** | ~~레벨·기술 목록 리서치~~ (2장) — **완료**: 4개 채널 기반 5단계 체계, Level 1~3 기술 목록 확정, Level 4~5 방향 설정 | Level 1~3 목록 (2.2) — Level 4~5는 JUMPSCHOOL 급수표 확인 후 구체화 (2.3) |
| **2** | 프로젝트 세팅 — tap-dance 구조 포팅, 이름/라벨 교체 | 빈 사이트 틀 |
| **3** | 화면 개발 — 목록·필터·검색·상세·연습용 플레이어·jumps-per-minute 바 | 동작하는 틀 |
| **4** | **Level 1 데이터** (설명·팁·영상) | Level 1 완성 → 확인 요청 |
| **5** | 나머지 레벨 데이터 | 순서대로 추가 |
| **6** | 전체 영상 재검증, 모바일 점검 | 최종 버전 |
| **7** | 배포 (GitHub Pages) + 검색 노출 | 실제 주소 |

> **tap-dance와 같은 방식**: 1단계(리서치)가 끝나고 레벨표가 나오면 한 번 같이 보고 확정, Level 1이 끝나면 다시 한 번 보여드리고 설명/영상 선정 기준이 괜찮은지 확인 후 나머지 레벨에 동일 적용.

---

## 8. 결정 완료 (2026-10-04)

사이트 이름·배포·진행 상태 추적·기준 자료 모두 확정됨 (0장 참고). 개발 착수.

남은 유일한 공백: **Level 2~5의 한글 별칭 다수**, **Boxer Step/Crossover 등 난이도 재조정** — 둘 다 각 레벨 데이터 작성 시점에 처리 (2.3 참고).
