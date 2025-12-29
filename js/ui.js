import { sites, isAdmin } from './state.js';
import { getMainContainer, getCatList } from './dom.js';
import { openModal, deleteSite } from './modal.js';

export function render() {
  const mainContainer = getMainContainer();
  const catList = getCatList();

  if (!mainContainer || !catList) {
    console.error('DOM 요소를 찾을 수 없습니다.');
    return;
  }

  mainContainer.innerHTML = '';
  catList.innerHTML = '';

  const grouped = {};
  sites.forEach(site => {
    if (!grouped[site.category]) grouped[site.category] = [];
    grouped[site.category].push(site);

    if (!catList.querySelector(`option[value="${site.category}"]`)) {
      const opt = document.createElement('option');
      opt.value = site.category;
      catList.appendChild(opt);
    }
  });

  Object.entries(grouped).forEach(([cat, items]) => {
    const row = document.createElement('div');
    row.className = 'category-row';

    const imgBox = document.createElement('div');
    imgBox.className = 'row-image-box';

    const repItem = items.find(i => i.img);
    if (repItem) {
      imgBox.innerHTML = `<img src="${repItem.img}" alt="${cat}">`;
      imgBox.onclick = () => !isAdmin && window.open(repItem.url, '_blank');
    } else {
      imgBox.innerHTML = `<div class="no-image-placeholder">${cat[0]}</div>`;
    }

    const drawerBox = document.createElement('div');
    drawerBox.className = 'row-drawer-box';

    const header = document.createElement('div');
    header.className = 'drawer-header';
    header.textContent = cat;
    header.onclick = () => drawerBox.classList.toggle('open');

    const content = document.createElement('div');
    content.className = 'drawer-content';

    items.forEach(site => {
      const item = document.createElement('div');
      item.className = 'site-item';

      const info = document.createElement('a');
      info.className = 'site-info';
      info.href = isAdmin ? '#' : site.url;
      info.target = '_blank';
      info.innerHTML = `
        <div class="site-name">${site.name}</div>
        <div class="site-desc">${site.desc || site.url}</div>
      `;

      const btns = document.createElement('div');
      btns.className = 'action-btns';

      // 수정 버튼
      const edit = document.createElement('button');
      edit.className = 'btn-edit';
      edit.textContent = '수정';
      edit.onclick = () => openModal(site.id);

      // 삭제 버튼
      const del = document.createElement('button');
      del.className = 'btn-del';
      del.textContent = '삭제';
      del.onclick = () => deleteSite(site.id);

      btns.append(edit, del);
      item.append(info, btns);
      content.appendChild(item);
    });

    drawerBox.append(header, content);
    row.append(imgBox, drawerBox);
    mainContainer.appendChild(row);
  });
}
