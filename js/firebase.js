import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDi_WXlQoQsY2L7EQHZo-gHc2qxGNUjl_U",
  authDomain: "link-archive-71bbd.firebaseapp.com",
  projectId: "link-archive-71bbd",
  storageBucket: "link-archive-71bbd.firebasestorage.app",
  messagingSenderId: "762987195816",
  appId: "1:762987195816:web:511255b8c61bc8247a419d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();

export {
  signInWithPopup,
  signOut,
  onAuthStateChanged
};
