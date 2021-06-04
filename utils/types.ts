import { PROJECT } from "./constants";

export interface Question {
  question: string;
  image?: string;
  answers: Answer[];
}

export interface Answer {
  answer: string;
  projects: PROJECT[];
}

export interface ProjectScores {
  [PROJECT.LARK]: number;
  [PROJECT.AR_UX]: number;
  [PROJECT.MOVING_ON]: number;
  [PROJECT.LETS_TAKE_A_WALK]: number;
  [PROJECT.BUY_SMALL]: number;
  [PROJECT.E_MOTION]: number;
}
