import { auth, githubProvider, signInWithPopup, signOut, onAuthStateChanged } from './firebase.js';
import { getAdminBtn } from './dom.js';
import { setAdmin } from './state.js';

const ADMIN_UID = "lQjtpzU7p5Ws8gHDAOGR8AwGofi2";

export function initAuth() {
  const adminBtn = getAdminBtn();
  if (!adminBtn) return;

  adminBtn.onclick = async () => {
    if (auth.currentUser) {
      await signOut(auth);
    } else {
      await signInWithPopup(auth, githubProvider);
    }
  };

  onAuthStateChanged(auth, user => {
    if (user && user.uid === ADMIN_UID) {
      setAdmin(true);
      document.body.classList.add('admin-mode');
      adminBtn.textContent = '로그아웃';
    } else {
      setAdmin(false);
      document.body.classList.remove('admin-mode');
      adminBtn.textContent = '관리자 모드';
    }
  });
}
