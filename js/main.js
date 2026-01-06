import { initAuth } from './auth.js';
import { fetchSites } from './state/dbState.js';
import { render } from './ui.js';

// DOM 컨텐츠 로드 이후 DOM을 불러온다.
document.addEventListener('DOMContentLoaded', async () => {
    // firestore에서 DB(= sites) 가져오기
    const  sites = await fetchSites();
    initAuth();
    render(sites);
});

  
