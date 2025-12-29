import { initAuth } from './auth.js';
import { render } from './ui.js';

// DOM 컨텐츠 로드 이후 DOM을 불러온다.
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    render();
});

  
