import firebase from 'firebase';
import {PROJECT} from './types';

export const FIREBASE_DEV = {
  apiKey: 'AIzaSyC-2MLU3Q02juzp7z3WcprfAjzby9EXH4A',
  authDomain: 'marfans-quiz-dev.firebaseapp.com',
  projectId: 'marfans-quiz-dev',
  storageBucket: 'marfans-quiz-dev.appspot.com',
  messagingSenderId: '1061747901205',
  appId: '1:1061747901205:web:22fee5912a8973fdd21f1c',
  measurementId: 'G-2X770Z8408',
};

// const app = firebase.initializeApp(process.env.NODE_ENV === 'production'
//   ? FIREBASE_DEV
//   : FIREBASE_DEV);

export interface UserInfo {
  [PROJECT.LARK]: number;
  [PROJECT.AR_UX]: number;
  [PROJECT.MOVING_ON]: number;
  [PROJECT.LETS_TAKE_A_WALK]: number;
  [PROJECT.BUY_SMALL]: number;
  [PROJECT.E_MOTION]: number;
}

export class _Firebase {
  public user?: UserInfo

  constructor() {

  }
}