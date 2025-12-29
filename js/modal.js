import { sites } from './state.js';
import { render } from './ui.js';

const overlay = document.getElementById('modalOverlay');

// 입력란
const nameInput = document.getElementById('modalNameInput');
const urlInput = document.getElementById('modalUrlInput');
const catInput = document.getElementById('modalCatInput');
const descInput = document.getElementById('modalDescInput');

const saveBtn = document.getElementById('modalSave');
const cancelBtn = document.getElementById('modalCancel');

let editingId = null;

export function openModal(id) {
  const site = sites.find(s => s.id === id);
  if (!site) return;

  editingId = id;

  nameInput.value = site.name;
  urlInput.value = site.url;
  catInput.value = site.category;
  descInput.value = site.desc;

  overlay.classList.remove('hidden');
}

// 변경사항 저장
saveBtn.onclick = () => {
  const site = sites.find(s => s.id === editingId);
  if (!site) return;

  site.name = nameInput.value;
  site.url = urlInput.value;
  site.category = catInput.value;
  site.desc = descInput.value;

  closeModal();
  render();
};

// 취소
cancelBtn.onclick = closeModal;

// 닫기
function closeModal() {
  editingId = null;
  overlay.classList.add('hidden');
}

// 삭제
export function deleteSite(id) {
  if (!confirm('삭제할까요?')) return;
  setSites(sites.filter(s => s.id !== id));
  render();
}
