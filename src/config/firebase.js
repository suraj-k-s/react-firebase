import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyChtgAc2TBkpjL2JZMOFqahNRypBbClBZ0',
  authDomain: 'react-firebase-1999.firebaseapp.com',
  projectId: 'react-firebase-1999',
  storageBucket: 'react-firebase-1999.appspot.com',
  messagingSenderId: '529963168403',
  appId: '1:529963168403:web:2b9472a07b506be5a69366',
  measurementId: 'G-M2ZL1KQWKX',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
