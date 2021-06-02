export interface Question {
  question: string;
  image?: string;
  answers: Answer[];
}

export enum PROJECT {
  LARK='LARK',
  AR_UX='AR_UX',
  MOVING_ON='MOVING_ON',
  LETS_TAKE_A_WALK='LETS_TAKE_A_WALK',
  BUY_SMALL='BUY_SMALL',
  E_MOTION='E_MOTION',
}

export const project2String = (proj: PROJECT) => {
  switch(proj) {
    case PROJECT.LARK:
      return 'lark';
    case PROJECT.AR_UX:
      return 'AR/UX';
    case PROJECT.MOVING_ON:
      return 'moving (on)';
    case PROJECT.LETS_TAKE_A_WALK:
      return 'Let\'s Take a Walk';
    case PROJECT.BUY_SMALL:
      return 'BuySmall';
    case PROJECT.E_MOTION:
      return 'e-motion';
  }
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
