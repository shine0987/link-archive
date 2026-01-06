import { isAdmin } from './state/authState.js';
import { getMainContainer, getCatList } from './dom.js';
import { openModal, deleteSite } from './modal.js';

export function render(sites) {
  const mainContainer = getMainContainer();
  const catList = getCatList();

  if (!mainContainer || !catList) {
    console.error('DOM 요소를 찾을 수 없습니다.');
    return;
  }

  mainContainer.innerHTML = '';
  catList.innerHTML = '';

  // [exception] 데이터(sites) 없음
  if (!sites.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <p>등록된 사이트가 없습니다.</p>
      ${
        isAdmin
          ? `<button class="empty-add-btn">+ 사이트 추가</button>`
          : `<p class="empty-sub">관리자가 사이트를 추가할 예정입니다.</p>`
      }
    `;

    mainContainer.appendChild(empty);

    if (isAdmin) {
      empty
        .querySelector('.empty-add-btn')
        .onclick = () => openModal();
    }

    return;
  } // [exception] end

  // 카테고리 그룹화
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

  // 렌더링
  Object.entries(grouped).forEach(([cat, items]) => {
    const row = document.createElement('div');
    row.className = 'category-row';

    // 왼쪽 이미지
    const imgBox = document.createElement('div');
    imgBox.className = 'row-image-box';

    const bgColor = pastelColorFromString(cat);

    imgBox.innerHTML = `
      <div 
        class="color-placeholder"
        style="background-color: ${bgColor}"
      >
      </div>
    `;

    imgBox.onclick = () => {
      if (!isAdmin) window.open(items[0].url, '_blank');
    };

    // 오른쪽 드로어
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

      // 사이트 정보
      const info = document.createElement('a');
      info.className = 'site-info';
      info.href = isAdmin ? '#' : site.url;
      info.target = '_blank';
      info.innerHTML = `
        <div class="site-name">${site.name}</div>
        <div class="site-desc">${site.description || site.url}</div>
      `;

      item.appendChild(info);

      // --------------- 관리자 버튼 ---------------
      if (isAdmin) {
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
        content.appendChild(btns);
        }
        content.appendChild(item);
    });

    drawerBox.append(header, content);
    row.append(imgBox, drawerBox);
    mainContainer.appendChild(row);
  });
}

// [Util] 파스텔 컬러 생성 함수
function pastelColorFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 85%)`; // 파스텔톤
}
