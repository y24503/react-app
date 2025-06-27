// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';//認証機能用
// Firebase構成オブジェクト(コンソールからコピペ)
const firebaseConfig = {
  apiKey: "AIzaSyChXeQHLHLp_ThD1tRJq2Yr3kf2bWMumLc",
  authDomain: "y24503-20250519.firebaseapp.com",
  projectId: "y24503-20250519",
  storageBucket: "y24503-20250519.firebasestorage.app",
  messagingSenderId: "145823556200",
  appId: "1:145823556200:web:27b7412f4fd6f7e4c311dd"
};
// 初期化
const app = initializeApp(firebaseConfig);
// Firestoreデータベースを使う準備
const db = getFirestore(app);
// Firebase認証(Auth)を使う準備
const auth = getAuth(app); // 認証サービス本体
const provider = new GoogleAuthProvider(); // Googleログイン専用の「認証プロバイダ」
// 他のファイルでも使えるように、エクスポート
export { db, auth, provider };
