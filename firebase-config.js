// Firebase SDK を読み込む (CDN形式)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKwxyTvBbja8-2TdKPbuRXV8BHUyw46Y4",
  authDomain: "character-core.firebaseapp.com",
  projectId: "character-core",
  storageBucket: "character-core.firebasestorage.app",
  messagingSenderId: "29881526104",
  appId: "1:29881526104:web:dc1194a2ce221c3047272d",
  measurementId: "G-0DXD4BYB8E"
};

// 初期化
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);