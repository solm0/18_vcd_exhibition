import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBefb2aaDSo_qhnbppRDdpQ-5bppEXBF2Q",
  authDomain: "vcd-exhibition-cc487.firebaseapp.com",
  databaseURL: "https://vcd-exhibition-cc487-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vcd-exhibition-cc487",
  storageBucket: "vcd-exhibition-cc487.firebasestorage.app",
  messagingSenderId: "455105853787",
  appId: "1:455105853787:web:3ff9013a04d5be892bc27e"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); // Initialize database once
export const auth = getAuth(app); // Initialize auth once