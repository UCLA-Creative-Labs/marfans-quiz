export interface Question {
  question: string;
  answers: Answer[];
}

export enum PROJECT {
  LARK='LARK',
  AR_UX='ARUX',
  MOVING_ON='MOVING_ON',
  LETS_TAKE_A_WALK='LETS_TAKE_A_WALK',
  BUY_SMALL='BUY_SMALL',
  E_MOTION='E_MOTION',
}

export interface Answer {
  answer: string;
  projects: PROJECT[];
}