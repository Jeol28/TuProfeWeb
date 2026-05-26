import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCF1wYHpcSv5vBYhguPfCUR7SV7BIRWXdU',
  authDomain: 'tuprofe-89d43.firebaseapp.com',
  projectId: 'tuprofe-89d43',
  storageBucket: 'tuprofe-89d43.firebasestorage.app',
  messagingSenderId: '1043975331593',
  appId: '1:1043975331593:web:298d3aca04f0f3be653dd8',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
