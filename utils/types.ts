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

export const project2Blurb = (proj: PROJECT) => {
  switch(proj) {
    case PROJECT.LARK:
      return 'You\'re the friend that\'s just... different. Not in a "I\'m not like the other girls" kind of way, but in the way that everyone thinks you\'re stylish and you\'re doing something cool. In reality, you\'re just doing what you want, but they don\'t know that.';
    case PROJECT.AR_UX:
      return 'You\'ve got an opinion about pretty much any subject. Friends like to go to you for advice on essay help because you know exactly what to say or what\'s wrong with a specific vocabulary word.';
    case PROJECT.MOVING_ON:
      return 'You\'re the sentimental type. Everything from Spotify playlists to polaroids to friends, you can\'t let go of any of it. When you do, your coping mechanism is probably listening to sad music and writing poetry.';
    case PROJECT.LETS_TAKE_A_WALK:
      return 'You hate the term, but you\'re an extroverted introvert. You really want to get to know new people, but sometimes you\'re just not sure how or you\'re too tired to. But still, you try your best.';
    case PROJECT.BUY_SMALL:
      return 'You\'re the mom friend of the group, and you\'re always prepared. Someone fell down? First-aid kit on its way. Someone hungry? You\'ve got some fruit from the local farmer\'s market on hand.';
    case PROJECT.E_MOTION:
      return 'You don\'t say much but that makes you a great listener who shows people a lot of compassion and understanding. You keep a journal both for yourself and so you can remember to check in on your friends.';
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
