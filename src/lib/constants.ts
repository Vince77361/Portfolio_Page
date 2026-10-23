import type { StaticImageData } from "next/image";
import highschoolcid from "../../public/images/highschoolcid.jpeg";
import junctionasia from "../../public/images/junctionasia.jpeg";
import highschoolsw from "../../public/images/highschoolsw.jpeg";
import atm from "../../public/images/atm.png";
import silkroad from "../../public/images/silkroad.png";
import starthub from "../../public/images/starthub.png";
import AIdealize from "../../public/images/AIdealize.png";
import voah from "../../public/images/voah.png";

export const IMAGES = {
  junctionasia,
  highschoolcid,
  highschoolsw,
  atm,
  silkroad,
  starthub,
  AIdealize,
  voah,
};

export const HERO = {
  greeting:
    "안녕하세요! 저는 더 편한 세상을 만들고 싶다는 비전을 가지고 사용자 경험에 초점을 맞추어 업무 환경 개선 및 최적화 플랫폼을 주로 개발하는 1인 개발자 이유비라고 합니다.",
  name: "이유비",
  role: "Web/Mobile Developer & Engineer",
};

export const TECH_STACK = {
  language: ["Javascript(TS)", "Python", "Dart", "Go"],
  frontend: ["React", "NextJS"],
  backend: ["Express", "NestJS", "FastAPI", "Fiber"],
  DB: ["PostgreSQL(Supabase/Neon)", "SQLite"],
  Mobile: ["React Native(Expo)", "Flutter"],
};

export const HISTORIES = [
  {
    name: "한양대학교",
    sub: "Department ov Chemical Engineering",
    description: "The Engine of Korea, 화학공학과 26학번 신입학",
  },
  // 숨김 처리 — 다시 보여주려면 주석 해제
  // {
  //   name: "FORIF",
  //   sub: "HYU - Programming study club Mentor",
  //   description: "Javascript Fullstack Architecture 스터디 멘토",
  // },
  // {
  //   name: "#IMPLUDE",
  //   sub: "Make as You Think",
  //   description:
  //     "임플루드 개발 및 교육 팀장 (2023, 2024년도 비즈쿨 창업동아리 1위 선정)",
  // },
  // {
  //   name: "한국디지털미디어고등학교",
  //   sub: "Korea Digital Media High School",
  //   description: "2023년 신입학, 2026년 졸업 (22기)",
  // },
];

export type PortfolioProject = {
  slug: string; // URL segment — ASCII so links stay readable
  title: string;
  subTitle: string;
  description: string;
  image: string | StaticImageData;
  date: string;
  stack: string[];
  nodes: SystemNode[];
  links: SystemLink[];
};

export const PORTFOLIO: PortfolioProject[] = [
  {
    slug: "voah",
    title: "VOAH",
    subTitle: "차세대 업무 관리 플랫폼",
    description:
      "Notion, Discord, Slack 등의 여러 툴을 하나의 환경에서 쓸 수 있으면 얼마나 편할까요? VOAH는 이러한 다양한 기능들을 모두 구현해, 모듈을 선택적으로 사용할 수 있습니다. 저는 VOAH의 메신저 모듈 개발 담당을 맡았습니다.",
    image: voah,
    date: "2023.11",
    stack: ["Typescript", "React"],
    nodes: [
      {
        id: "shell",
        label: "워크스페이스",
        tech: "React",
        role: "필요한 모듈만 골라 켜고 끄는 하나의 작업 환경",
        x: 50,
        y: 14,
      },
      {
        id: "messenger",
        label: "메신저 모듈",
        tech: "React · TypeScript (담당)",
        role: "팀 대화와 채널을 다루는 메신저 모듈. 이 부분의 개발을 맡았습니다.",
        x: 50,
        y: 56,
      },
      {
        id: "docs",
        label: "문서 모듈",
        tech: "Notion 대체",
        role: "팀 문서와 노트를 정리하는 모듈",
        x: 14,
        y: 56,
      },
      {
        id: "voice",
        label: "음성·커뮤니티",
        tech: "Discord 대체",
        role: "음성 채널과 커뮤니티 기능을 담당하는 모듈",
        x: 86,
        y: 56,
      },
      {
        id: "user",
        label: "팀원",
        tech: "사용자",
        role: "여러 툴을 오가지 않고 한 화면에서 모든 협업을 처리합니다.",
        x: 50,
        y: 92,
      },
    ],
    links: [
      ["shell", "messenger"],
      ["shell", "docs"],
      ["shell", "voice"],
      ["user", "messenger"],
    ],
  },
  {
    slug: "silkroad",
    title: "SilkRoad",
    subTitle: "모든 학습의 시작, 당신을 위한 로드맵",
    description:
      "새로운 것을 배울때 가장 어려운 점은 바로 어떤 방향으로 학습해야 할지를 정하는 것입니다. SilkRoad는 AI 에이전트가 여러분이 어떻게 학습할지에 대한 로드맵을 제공해 주는 서비스입니다. 저는 SilkRoad에서 로드맵 제작 관련 부분을 개발했습니다.",
    image: silkroad,
    date: "2024.07",
    stack: ["Typescript", "React", "Styled-Components"],
    nodes: [
      {
        id: "goal",
        label: "학습 목표",
        tech: "사용자 입력",
        role: "배우고 싶은 분야와 현재 수준을 입력합니다.",
        x: 12,
        y: 50,
      },
      {
        id: "agent",
        label: "AI 에이전트",
        tech: "학습 경로 설계",
        role: "목표와 수준을 바탕으로 어떤 순서로 학습할지 설계합니다.",
        x: 40,
        y: 18,
      },
      {
        id: "builder",
        label: "로드맵 제작",
        tech: "React · TypeScript (담당)",
        role: "에이전트 결과를 단계별 로드맵으로 구성하는 부분. 이 부분의 개발을 맡았습니다.",
        x: 62,
        y: 54,
      },
      {
        id: "view",
        label: "로드맵 화면",
        tech: "Styled-Components",
        role: "단계별 학습 경로를 한눈에 보고 따라갈 수 있는 화면",
        x: 88,
        y: 82,
      },
    ],
    links: [
      ["goal", "agent"],
      ["agent", "builder"],
      ["builder", "view"],
    ],
  },
  {
    slug: "hanbyeol",
    title: "한별",
    subTitle: "개인 맞춤형 변호사 매칭 플랫폼",
    description:
      "절차가 복잡하여 파산/회생 신청을 어려워하시는 분들이 많이 계십니다. 그런 사람들을 구제하기 위해 유저 맞춤형 변호사 매칭 플랫폼, 한별이 등장했습니다. 저는 한별의 모든 분야 개발 및 프로젝트 총괄을 담당했습니다.",
    image: "",
    date: "2024.11",
    stack: [
      "Typescript",
      "React",
      "NestJS",
      "Prisma",
      "PostgreSQL(Neon)",
      "Zustand",
    ],
    nodes: [
      {
        id: "client",
        label: "의뢰인 웹",
        tech: "React · Zustand",
        role: "파산·회생 상황을 입력하고 맞춤 변호사를 추천받는 화면",
        x: 14,
        y: 30,
      },
      {
        id: "lawyer",
        label: "변호사 화면",
        tech: "React",
        role: "매칭된 상담 요청을 확인하고 응답하는 변호사용 화면",
        x: 14,
        y: 74,
      },
      {
        id: "api",
        label: "API 서버",
        tech: "NestJS",
        role: "회원·상담 요청·매칭을 처리하는 서버",
        x: 50,
        y: 50,
      },
      {
        id: "matching",
        label: "매칭",
        tech: "NestJS 모듈",
        role: "의뢰인 상황에 맞는 변호사를 골라 연결합니다.",
        x: 86,
        y: 22,
      },
      {
        id: "db",
        label: "데이터",
        tech: "Prisma · PostgreSQL(Neon)",
        role: "회원, 상담, 매칭 기록을 보관합니다.",
        x: 86,
        y: 78,
      },
    ],
    links: [
      ["client", "api"],
      ["lawyer", "api"],
      ["api", "matching"],
      ["api", "db"],
    ],
  },
];

export type SystemNode = {
  id: string;
  label: string;
  tech: string;
  role: string;
  x: number;
  y: number;
};

export type SystemLink = [string, string];

export type OutsourceProject = {
  id: string;
  title: string;
  subTitle: string;
  client: string;
  period: string;
  myRole: string;
  description: string;
  highlights: string[];
  stack: string[];
  nodes: SystemNode[];
  links: SystemLink[];
};

export const OUTSOURCE: OutsourceProject[] = [
  {
    id: "mindlens",
    title: "MindLens",
    subTitle: "실제 패널 설문 + AI 심층 인터뷰 리서치 SaaS",
    client: "한양대학교 빅데이터마케팅랩",
    period: "2026.08 – 2026.09",
    myRole: "풀스택 개발 · 서비스 분리 및 인프라 구성",
    description:
      "AI가 만든 가상 응답이 아니라 신원이 확인된 실제 패널이 답하는 리서치 서비스입니다. AI는 문항 설계와 인터뷰 진행·요약만 맡고, 의뢰자용 설문 제작 도구와 응답자용 모바일 웹앱, 그리고 검수·보상·정산을 담당하는 백오피스가 한 흐름으로 이어집니다. 4개 솔루션이 섞인 모노레포에서 서베이/인터뷰 기능만 독립 서비스로 분리했습니다.",
    highlights: [
      "응답자 앱 4개 국어 지원 (한·영·일·중)",
      "AI 모더레이터의 인터뷰 꼬리질문과 음성 답변(STT/TTS)",
      "응답 기반 6-Lens 채점과 페르소나 1:1 채팅",
      "기프티콘 보상 발송과 제휴 마케터 정산",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Claude API",
      "GCP",
      "Firebase",
    ],
    nodes: [
      {
        id: "client",
        label: "의뢰자 웹",
        tech: "Next.js · Tailwind",
        role: "설문 작성·AI 문항 생성·응답 분석과 CSV/PDF 리포트를 만드는 의뢰자용 도구",
        x: 14,
        y: 26,
      },
      {
        id: "respondent",
        label: "응답자 앱",
        tech: "Next.js · 4개 국어",
        role: "객관식·주관식·음성으로 답하는 모바일 웹앱. 참여 이력과 적립금을 확인합니다.",
        x: 14,
        y: 74,
      },
      {
        id: "api",
        label: "API 서버",
        tech: "FastAPI · SQLAlchemy",
        role: "설문·응답·보상·제휴·운영자 도메인을 담당하는 REST 서버",
        x: 50,
        y: 50,
      },
      {
        id: "ai",
        label: "AI 레이어",
        tech: "Claude · Google Speech",
        role: "문항 생성·번역·요약, 인터뷰 모더레이션, 음성 인식과 읽어주기",
        x: 86,
        y: 22,
      },
      {
        id: "db",
        label: "데이터",
        tech: "PostgreSQL · GCS",
        role: "Cloud SQL에 응답 데이터를, Cloud Storage에 자극물·음성·리포트를 보관",
        x: 86,
        y: 78,
      },
      {
        id: "admin",
        label: "백오피스",
        tech: "Admin · Solapi",
        role: "설문 검수·발행, 보상 일괄 발송, 응답자 조회와 문자 알림",
        x: 50,
        y: 92,
      },
    ],
    links: [
      ["client", "api"],
      ["respondent", "api"],
      ["api", "ai"],
      ["api", "db"],
      ["admin", "api"],
    ],
  },
  {
    id: "hanmin",
    title: "Hanmin",
    subTitle: "건설 현장 사진·업무 자료 자동 분류 플랫폼",
    client: "토목건설 기업",
    period: "2026.05 – 2026.08",
    myRole: "모바일 · 서버 · 데스크탑 3개 앱 전체 개발",
    description:
      "현장 작업자가 모바일로 사진과 메타데이터를 올리면, 관리자의 PC에 현장·업무 분류별 폴더로 자동 정리되는 사내 플랫폼입니다. 관리자는 데스크탑 앱에서 자료를 검토하고 사진별 피드백을 남기며, 작업자는 인앱 알림과 채팅으로 바로 확인합니다. 향후 통합 인트라넷으로 확장할 1차 범위를 맡았습니다.",
    highlights: [
      "통신이 끊기는 현장을 위한 오프라인 업로드 큐",
      "현장 › 업무 분류 › 날짜 폴더로 자동 동기화",
      "사진별 피드백과 인앱 알림, 실시간 채팅",
      "사무실 서버 자체 운영 (JWT 인증, HTTPS)",
    ],
    stack: [
      "Flutter",
      "Riverpod",
      "Go",
      "Fiber",
      "PostgreSQL",
      "Electron",
      "React",
    ],
    nodes: [
      {
        id: "mobile",
        label: "현장 앱",
        tech: "Flutter · Riverpod",
        role: "사진 촬영과 메타데이터 입력. drift 큐와 workmanager로 네트워크가 돌아오면 자동 업로드합니다.",
        x: 14,
        y: 50,
      },
      {
        id: "server",
        label: "API 서버",
        tech: "Go · Fiber",
        role: "사진 원본과 메타데이터 저장, 피드백과 알림을 한 트랜잭션으로 생성하는 사내 서버",
        x: 50,
        y: 50,
      },
      {
        id: "db",
        label: "데이터",
        tech: "PostgreSQL · 파일시스템",
        role: "메타데이터는 PostgreSQL에, 사진 원본은 서버 로컬 디스크에 보관",
        x: 50,
        y: 88,
      },
      {
        id: "desktop",
        label: "관리자 앱",
        tech: "Electron · React",
        role: "새 사진을 주기적으로 받아 검증 후 폴더에 원자적으로 저장하고, 피드백을 작성합니다.",
        x: 86,
        y: 50,
      },
      {
        id: "folder",
        label: "업무 폴더",
        tech: "SQLite 동기화 로그",
        role: "D:\\업무자료\\현장\\분류\\날짜_파일명 구조로 자동 정리되는 관리자 PC 폴더",
        x: 86,
        y: 12,
      },
      {
        id: "chat",
        label: "알림·채팅",
        tech: "WebSocket",
        role: "관리자의 피드백을 작업자에게 알리고, 현장과 실시간으로 대화합니다.",
        x: 14,
        y: 12,
      },
    ],
    links: [
      ["mobile", "server"],
      ["server", "db"],
      ["server", "desktop"],
      ["desktop", "folder"],
      ["chat", "mobile"],
      ["server", "chat"],
    ],
  },
  {
    id: "cora",
    title: "Cora",
    subTitle: "AI 에이전트가 운영하는 콘텐츠 제작실",
    client: "한양대학교 연구실 창업팀",
    period: "2026.10 – 진행 중",
    myRole: "제작실 기능 개발 · 출시 준비",
    description:
      "Content Operations Run by Agents. 브랜드 설정과 자료만 넣으면 AI가 카드뉴스·블로그 글·영상 대본·아이디어를 만들고, 편집해서 PNG·MP4로 내보낼 수 있는 콘텐츠 운영 도구입니다. 팀원에게 결과물을 공유해 버전별로 승인받는 검토 흐름까지 이어집니다.",
    highlights: [
      "공개 URL·RSS 수집에서 AI 카드·글·대본 생성까지 한 흐름",
      "카드 비율 3종 · 디자인 3종 · 서체 선택 편집기",
      "저장한 카드를 MP4 슬라이드 영상으로 변환 (FFmpeg)",
      "버전이 바뀌면 재검토로 돌아가는 승인 워크플로",
    ],
    stack: ["Next.js", "React", "TypeScript", "SQLite", "FFmpeg", "LLM Gateway"],
    nodes: [
      {
        id: "source",
        label: "자료 수집",
        tech: "URL · RSS",
        role: "직접 입력한 자료나 공개 URL·RSS 피드를 브랜드별 소재로 모읍니다.",
        x: 12,
        y: 50,
      },
      {
        id: "agent",
        label: "AI 에이전트",
        tech: "LLM Gateway",
        role: "브랜드 톤에 맞춰 카드뉴스·블로그·영상 대본·아이디어를 생성합니다. 중복 요청은 캐시합니다.",
        x: 38,
        y: 22,
      },
      {
        id: "studio",
        label: "제작실",
        tech: "Next.js · React",
        role: "카드 편집·저장·필터·사본·JSON 복원을 지원하는 메인 작업 공간",
        x: 62,
        y: 50,
      },
      {
        id: "export",
        label: "내보내기",
        tech: "PNG · MP4 · FFmpeg",
        role: "카드를 이미지로, 혹은 카드별 3초 슬라이드 영상으로 렌더링",
        x: 88,
        y: 22,
      },
      {
        id: "review",
        label: "검토함",
        tech: "버전별 승인",
        role: "다른 계정에 공유해 승인·수정 의견을 받고, 새 버전이 나오면 재검토로 돌립니다.",
        x: 88,
        y: 78,
      },
      {
        id: "db",
        label: "계정별 저장소",
        tech: "SQLite",
        role: "사용자별로 격리된 소재·글·영상·운영 달력·반복 지시 보관",
        x: 38,
        y: 82,
      },
    ],
    links: [
      ["source", "agent"],
      ["agent", "studio"],
      ["studio", "export"],
      ["studio", "review"],
      ["studio", "db"],
      ["source", "db"],
    ],
  },
  {
    id: "tamguro",
    title: "Tamguro",
    subTitle: "학종 입시 멘토링·자료 구독 플랫폼",
    client: "교육 스타트업",
    period: "2026.08 – 진행 중",
    myRole: "모바일 앱 · 관리자 웹 · 백엔드 개발",
    description:
      "학생과 학부모가 멘토를 찾아 상담을 신청하고 결제한 뒤 멘토링을 받으며, 학생부종합전형 준비 자료를 구독해 볼 수 있는 플랫폼입니다. 학생·학부모·멘토 역할별 모바일 앱과 운영자용 관리자 웹, Supabase 기반 백엔드를 함께 만들었습니다.",
    highlights: [
      "학생·학부모·멘토 역할별 앱 (휴대폰·iPad 대응)",
      "상담 신청 → 승인 → 결제 → 4회 멘토링 진행도 관리",
      "학종 자료 정기 구독과 멘토링 결제·환불",
      "업로드 파일 바이러스 검사와 보호된 PDF 뷰어",
    ],
    stack: [
      "Flutter",
      "Supabase",
      "PostgreSQL",
      "Deno",
      "Next.js",
      "TanStack Query",
      "Toss Payments",
      "ClamAV",
    ],
    nodes: [
      {
        id: "app",
        label: "모바일 앱",
        tech: "Flutter",
        role: "학생·학부모·멘토 역할별 화면. 멘토 찾기, 상담 신청, 채팅, 자료 열람, 부모–자녀 연결을 제공합니다.",
        x: 14,
        y: 30,
      },
      {
        id: "admin",
        label: "관리자 웹",
        tech: "Next.js · TanStack Query",
        role: "운영자가 회원·멘토·자료·결제를 관리하는 웹",
        x: 14,
        y: 76,
      },
      {
        id: "api",
        label: "API",
        tech: "Supabase Edge Functions",
        role: "계정, 멘토링, 결제, 커뮤니티, 자료 도메인을 처리하는 Deno 함수들",
        x: 50,
        y: 50,
      },
      {
        id: "db",
        label: "데이터·실시간",
        tech: "PostgreSQL · Realtime",
        role: "데이터 보관과 함께, 알림·채팅 변경을 앱에 실시간으로 전달합니다.",
        x: 86,
        y: 78,
      },
      {
        id: "pay",
        label: "결제",
        tech: "Toss Payments",
        role: "자료 구독 정기결제와 멘토링 1회 결제, 환불 요청을 처리합니다.",
        x: 86,
        y: 22,
      },
      {
        id: "scanner",
        label: "파일 검사",
        tech: "ClamAV",
        role: "업로드된 PDF·이미지를 공개 전에 바이러스 검사하는 별도 서비스",
        x: 50,
        y: 10,
      },
    ],
    links: [
      ["app", "api"],
      ["admin", "api"],
      ["api", "db"],
      ["api", "pay"],
      ["api", "scanner"],
    ],
  },
];

export const AWARDS = [
  {
    title: "2024 전국 고등학교 동아리 소프트웨어 경진대회",
    prize: "동상 (3위)",
    description:
      "다수의 소프트웨어 마이스터 고등학교, 과학고등학교 학생들이 참여한 대회에서 3위를 차지했습니다.",
    image: highschoolsw,
    date: "2024.11",
  },
  {
    title: "2024 한양대학교 ERICA 고교 CID 대회",
    prize: "도전상 (3위)",
    description:
      "안산의 많은 고등학교 창업동아리 팀에서 출전한 대회로, 이 대회에서 3위를 차지했습니다.",
    image: highschoolcid,
    date: "2024.08",
  },
  {
    title: "2024 JUNCTION ASIA",
    prize: "2위",
    description: `처음으로 입상한 해커톤으로, 아시아 단위의 대다수의 성인 참가자가 포진해 있는 대회에서 저희 고등학생 팀이 2위를 차지했습니다.`,
    image: junctionasia,
    date: "2024.07",
  },
  {
    title: "2023 공개 소프트웨어 개발자 대회",
    prize: "특별상",
    description:
      "처음으로 입상한 SW 경진대회로, 고등학생, 그리고 대학(원)생들이 많이 포진해 있는 대회에서 특별상을 차지했습니다.",
    image: "",
    date: "2023.11",
  },
];

export const FOOTER_ITEM = {
  email: {
    name: "vince77361@gmail.com",
    href: "mailto:vince77361@gmail.com",
  },
  instagram: {
    name: "@dev_v1nce",
    href: "https://www.instagram.com/dev_v1nce/",
  },
  discord: {
    name: "vince77361",
    href: "",
  },
  github: {
    name: "Vince77361",
    href: "https://github.com/Vince77361",
  },
};
