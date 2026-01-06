// state/adminState.js
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { auth, db } from "../firebase.js";

export async function isAdmin() {
  const user = auth.currentUser;
  if (!user) return false;

  const ref = doc(db, "admins", user.uid);
  const snap = await getDoc(ref);

  return snap.exists();
}
