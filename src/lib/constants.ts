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
    "안녕하세요! 저는 더 편한 세상을 만들고 싶다는 비전을 가지고 사용자 경험에 초점을 맞추어 업무 환경 개선 및 최적화 플랫폼을 주로 개발하는 1인 개발자 이유비라고 합니다.",
  name: "이유비",
  role: "Web/Mobile Developer & Engineer",
};

export const TECH_STACK = {
  language: ["Javascript(TS)", "Python", "Dart"],
  frontend: ["React", "NextJS"],
  backend: ["Express", "NestJS", "FastAPI"],
  DB: ["PostgreSQL(Supabase/Neon)", "SQLite"],
  Mobile: ["React Native(Expo)", "Flutter"],
};

export const HISTORIES = [
  {
    name: "한양대학교",
    sub: "Department ov Chemical Engineering",
    description: "The Engine of Korea, 화학공학과 26학번 신입학",
  },
  {
    name: "FORIF",
    sub: "HYU - Programming study club Mentor",
    description: "Javascript Fullstack Architecture 스터디 멘토",
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
