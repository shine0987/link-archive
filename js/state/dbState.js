import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { db } from "../firebase.js";

const sitesCol = collection(db, "sites");

// 조회 (read)
export async function fetchSites() {
  try {
    const snapshot = await getDocs(sitesCol);

    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error('Firestore 조회 실패: ', err)
    return [];
  }
}

// 추가 (create)
export async function addSite(data) {
  await addDoc(sitesCol, {
    ...data,
    createdAt: serverTimestamp() // 생성된 날짜에 현재 서버 시간을 넘겨준다.
  });
}

// 수정 (update)
export async function updateSite(id, data) {
  const ref = doc(db, "sites", id); // 대상 인스턴스(reference)를 가져온다.
  await updateDoc(ref, data);
}

// 삭제 (delete)
export async function deleteSite(id) {
  const ref = doc(db, "sites", id); // 대상 인스턴스(reference)를 가져온다.
  await deleteDoc(ref);
}