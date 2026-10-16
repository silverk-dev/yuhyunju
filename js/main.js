/* 공통 메뉴, 연구 목록. 외부 라이브러리와 서버 요청 없이 작동합니다. */
(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
  nav.querySelectorAll('a').forEach(a => { const target = new URL(a.href, location.href).pathname.split('/').pop().replace(/\.html$/, ''); if (target === page || (page === 'exhibition' && target === 'exhibitions')) a.setAttribute('aria-current', 'page'); });
  // 안전한 텍스트 삽입에 쓰는 공통 헬퍼.
  window.makeElement = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  document.querySelectorAll('[data-research]').forEach(container => {
    const limit = Number(container.dataset.limit) || PORTFOLIO.research.length;
    PORTFOLIO.research.slice(0, limit).forEach(item => {
      const row = makeElement('article', undefined, 'research-row');
      const content = makeElement('div');
      content.append(makeElement('h3', item.title), makeElement('p', item.publication));
      row.append(makeElement('p', item.year, 'year'), content, makeElement('small', item.source));
      container.append(row);
    });
  });
})();
