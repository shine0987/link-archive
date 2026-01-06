import { auth, githubProvider, signInWithPopup, signOut, onAuthStateChanged } from './firebase.js';

import { getAdminBtn } from './dom.js';
import { setAdmin } from './state/authState.js';
import { isAdmin } from './state/adminState.js'; 

export function initAuth() {
  const adminBtn = getAdminBtn();
  if (!adminBtn) return;

  // 버튼 클릭으로 로그인 / 로그아웃
  adminBtn.addEventListener("click", async () => {
    if (auth.currentUser) {
      await signOut(auth);
    } else {
      await signInWithPopup(auth, githubProvider);
    }
  });

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setAdmin(false);
      document.body.classList.remove('admin-mode');
      adminBtn.textContent = '관리자 모드';
      return;
    }

    const admin = await isAdmin();

    if (admin) {
      setAdmin(true);
      document.body.classList.add('admin-mode');
      adminBtn.textContent = '로그아웃';
    } else {
      setAdmin(false);
      document.body.classList.remove('admin-mode');
      adminBtn.textContent = '관리자 모드';
    }

  })

}
