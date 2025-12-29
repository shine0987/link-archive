import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy
  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
  
  import { db } from "./firebase.js";
  
  const colRef = collection(db, "linkArchives");
  
  export function listenSites(callback) {
    const q = query(colRef, orderBy("createdAt", "asc"));
    return onSnapshot(q, snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(data);
    });
  }
  
  export function addSite(data) {
    return addDoc(colRef, { ...data, createdAt: serverTimestamp() });
  }
  
  export function updateSite(id, data) {
    return updateDoc(doc(db, "linkArchives", id), data);
  }
  
  export function deleteSite(id) {
    return deleteDoc(doc(db, "linkArchives", id));
  }
  