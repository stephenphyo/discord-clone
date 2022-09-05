import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDUYCCG2UBjajcm27WqwI91XOgbSLIv8NI",
  authDomain: "discord-cad2f.firebaseapp.com",
  projectId: "discord-cad2f",
  storageBucket: "discord-cad2f.appspot.com",
  messagingSenderId: "170185407443",
  appId: "1:170185407443:web:f2c9c92e26895bc6b14d26",
  measurementId: "G-QG4VM6T078"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;