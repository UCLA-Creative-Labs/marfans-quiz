import firebase from 'firebase';
import { ProjectScores } from '.';

const FIREBASE_DEV = {
  apiKey: 'AIzaSyC-2MLU3Q02juzp7z3WcprfAjzby9EXH4A',
  authDomain: 'marfans-quiz-dev.firebaseapp.com',
  projectId: 'marfans-quiz-dev',
  storageBucket: 'marfans-quiz-dev.appspot.com',
  messagingSenderId: '1061747901205',
  appId: '1:1061747901205:web:22fee5912a8973fdd21f1c',
  measurementId: 'G-2X770Z8408',
};

const FIREBASE_PROD = {
  apiKey: 'AIzaSyAhZHDNuy30rH-k59Cz1Km6kHQqtQxB4tQ',
  authDomain: 'marfans-3b2fe.firebaseapp.com',
  projectId: 'marfans-3b2fe',
  storageBucket: 'marfans-3b2fe.appspot.com',
  messagingSenderId: '22687257895',
  appId: '1:22687257895:web:02b46ca0071862fda20502',
  measurementId: 'G-SR0ZYYS7C8',
};

const app =
  !firebase.apps.length
    ? (firebase.initializeApp(process.env.env === 'production'
      ? FIREBASE_PROD
      : FIREBASE_DEV))
    : firebase.app();

export class _Firebase {
  protected auth_user?: firebase.User;

  public load(success: (...args: any[]) => void, fail: (...args: any[]) => void): void {
    void firebase
      .auth(app)
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth(app).onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        this.auth_user = user;
        const projectsDoc = firebase
          .firestore(app)
          .collection((process.env.env === 'production')
            ? 'marfans-quiz'
            : 'marfans-quiz-dev')
          .doc('PROJECTS');
        void projectsDoc.get().then((doc) => {
          if (!doc.exists) void projectsDoc.set({});
          success();
        });
      } else {
        fail();
      }
    });
  }

  public auth(): firebase.auth.Auth {
    return firebase.auth(app);
  }

  public signOut(): Promise<any> {
    return firebase
      .auth(app)
      .signOut();
  }

  public updateProjectCount(project: string): Promise<void> {
    if (!this.auth_user) return Promise.resolve();
    return firebase
      .firestore(app)
      .collection((process.env.env === 'production')
        ? 'marfans-quiz'
        : 'marfans-quiz-dev')
      .doc('PROJECTS')
      .update({
        [project]: firebase.firestore.FieldValue.increment(1),
      });
  }

  public getProjectCounts(): Promise<ProjectScores | void> {
    if (!this.auth_user) return Promise.resolve();
    return firebase
      .firestore(app)
      .collection((process.env.env === 'production')
        ? 'marfans-quiz'
        : 'marfans-quiz-dev')
      .doc('PROJECTS')
      .get()
      .then(doc => doc.data() as ProjectScores);
  }

  public addRaffleEntry(name: string, handle: string): Promise<void> {
    if (!this.auth_user) return Promise.resolve();
    const rand = Math.floor(Math.random() * 200);
    return firebase
      .firestore(app)
      .collection('raffle-entries')
      .doc(rand.toString())
      .set({ name, handle });
  }
}
