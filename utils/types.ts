export interface Question {
  question: string;
  image?: string;
  answers: Answer[];
}

export enum PROJECT {
  LARK='lark',
  AR_UX='AR/UX',
  MOVING_ON='moving (on)',
  LETS_TAKE_A_WALK='let\'s take a walk',
  BUY_SMALL='buy small',
  E_MOTION='e-motion',
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

