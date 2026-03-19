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

export const SLOGAN = [
  "To the Topclass Engineer",
  "Optimization ov Industry",
  "The Relentless Growth",
  "New Industrial Paradigm",
];

export const HERO = {
  slogan: SLOGAN[0],
  greeting:
    "안녕하세요! 저는 시스템 최적화 및 자동화를 통해 더 활력 넘치는 세상을 만들기 위해 업무 최적화 플랫폼을 주로 개발하고 있는 이유비라고 합니다.",
  name: "이유비",
  role: "Web/Mobile Developer & Engineer",
};

export const TECH_STACK = {
  language: ["Javascript(TS)", "Python", "Dart"],
  frontend: ["React", "NextJS"],
  backend: ["Express", "NestJS", "FastAPI"],
  DB: ["PostgreSQL(Supabase/Neon)", "SQLite"],
  Mobile: ["React Native(Expo)", "Flutter"],
  etc: ["TailwindCSS", "Zustand", "Prisma", "Tanstack Query", "Clerk"],
};

export const HISTORIES = [
  {
    name: "한양대학교",
    sub: "Department ov Chemical Engineering",
    description: "The Engine of Korea, 화학공학과 26학번 신입학",
  },
  {
    name: "#IMPLUDE",
    sub: "Make as You Think",
    description:
      "임플루드 개발 및 교육 팀장 (2023, 2024년도 비즈쿨 창업동아리 1위 선정)",
  },
  {
    name: "한국디지털미디어고등학교",
    sub: "Korea Digital Media High School",
    description: "2023년 신입학, 2026년 졸업 (22기)",
  },
];

export const PORTFOLIO = [
  {
    title: "VOAH",
    subTitle: "차세대 업무 관리 플랫폼",
    description:
      "Notion, Discord, Slack 등의 여러 툴을 하나의 환경에서 쓸 수 있으면 얼마나 편할까요? VOAH는 이러한 다양한 기능들을 모두 구현해, 모듈을 선택적으로 사용할 수 있습니다. 저는 VOAH의 메신저 모듈 개발 담당을 맡았습니다.",
    image: voah,
    date: "2023.11",
    stack: ["Typescript", "React"],
  },
  {
    title: "StartHub",
    subTitle: "공동의 목표를 가진 예비창업가들의 네트워크",
    description:
      "나와 비슷한 창업 아이템을 가진 사람들이 있을지 궁금하지 않으신가요? StartHub은 비슷한 목표를 가진 사람들을 모아 함께 프로젝트에 대해 논의하고, 프로젝트를 진행할 수 있도록 도와주는 서비스입니다. 저는 StartHub의 프로젝트 총괄과 UI/UX 디자인을 담당했습니다.",
    image: starthub,
    date: "2024.05",
    stack: ["Typescript", "NextJS", "Supabase", "Zustand", "TailwindCSS"],
  },
  {
    title: "SilkRoad",
    subTitle: "모든 학습의 시작, 당신을 위한 로드맵",
    description:
      "새로운 것을 배울때 가장 어려운 점은 바로 어떤 방향으로 학습해야 할지를 정하는 것입니다. SilkRoad는 AI 에이전트가 여러분이 어떻게 학습할지에 대한 로드맵을 제공해 주는 서비스입니다. 저는 SilkRoad에서 로드맵 제작 관련 부분을 개발했습니다.",
    image: silkroad,
    date: "2024.07",
    stack: ["Typescript", "React", "Styled-Components"],
  },
  {
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
  },
  {
    title: "AIdealize",
    subTitle: "AI를 통한 사업 아이디어 분석 플랫폼",
    description:
      "AIdealize는 제 Side Project로, 사업 아이템을 AI에게 설명하면, AI가 사업 아이템의 위험성, 시장 규모, 경쟁력 등을 분석하여, 각각의 장단점을 분석하고 도와주는 서비스입니다. 저는 AIdealize의 모든 분야 개발을 담당하였고, 추후 서비스를 프로덕션 환경에 배포할 예정입니다.",
    image: AIdealize,
    date: "2026.03",
    stack: ["Typescript", "NextJS", "Supabase", "Zustand", "TailwindCSS"],
  },
  {
    title: "ATM - Attendance Table Manager",
    subTitle: "학원을 위한 출석 관리 플랫폼",
    description:
      "학원에 등원하지 못하여 개인적으로 선생님께 연락을 하는 학생들이 많아지면 선생님들은 관리가 어려워집니다. ATM은 이러한 문제를 해결하기 위해, 학생들의 출결 상태를 시각화하여 쉽게 관리할 수 있도록 도와주는 서비스입니다. 저는 ATM의 모든 분야 개발을 담당하였습니다.",
    image: atm,
    date: "2026.03",
    stack: [
      "Typescript",
      "NextJS",
      "Supabase",
      "Zustand",
      "TailwindCSS",
      "RadixUI",
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
    title: "2024 JUNCTION ASIA — Apple Developer Academy @POSTECH track",
    prize: "2위",
    description:
      "처음으로 입상한 해커톤으로, 아시아 단위의 대다수의 성인 참가자가 포진해 있는 대회에서 저희 고등학생 팀이 2위를 차지했습니다.",
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
    href: "",
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
