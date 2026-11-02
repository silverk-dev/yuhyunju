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
  const page = window.CURRENT_PAGE || (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
  nav.querySelectorAll('a').forEach(a => {
    const url = new URL(a.href, location.href);
    const target = url.searchParams.get('page') || url.pathname.split('/').pop().replace(/\.html$/, '');
    if (target === page || (page === 'exhibition' && target === 'exhibitions')) a.setAttribute('aria-current', 'page');
  });
  // 안전한 텍스트 삽입에 쓰는 공통 헬퍼.
  window.makeElement = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  document.querySelectorAll('[data-research], [data-collection]').forEach(container => {
    const collection = container.dataset.collection || 'research';
    const items = PORTFOLIO[collection] || [];
    const limit = Number(container.dataset.limit) || items.length;
    items.slice(0, limit).forEach(item => {
      const row = makeElement('article', undefined, 'research-row');
      const content = makeElement('div');
      content.append(makeElement('h3', item.title), makeElement('p', item.publication));
      row.append(makeElement('p', item.year, 'year'), content);
      if (item.source) row.append(makeElement('small', item.source));
      container.append(row);
    });
  });
  // Add future critiques in data.js; the year options are generated automatically.
  const critiques = document.querySelector('[data-critiques]');
  if (critiques) {
    const {t} = window.I18N;
    const items = [...(PORTFOLIO.critiques || [])].sort((a, b) => b.year - a.year);
    const select = document.querySelector('#critique-year');
    [...new Set(items.map(item => item.year))].forEach(year => {
      const option = makeElement('option', String(year)); option.value = String(year); select.append(option);
    });
    const render = year => {
      const results = items.filter(item => year === 'all' || String(item.year) === year);
      critiques.replaceChildren(...results.map(item => {
        const row = makeElement('article', undefined, 'research-row critique-row');
        const heading = makeElement('h2');
        const a = makeElement('a', item.title);
        a.href = item.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.append(makeElement('span', ' ↗', 'external-arrow'));
        a.setAttribute('aria-label', item.title + t(' (새 탭에서 열기)', ' (opens in a new tab)'));
        heading.append(a); row.append(makeElement('p', String(item.year), 'year'), heading); return row;
      }));
      if (!results.length) critiques.append(makeElement('p', t('해당 연도의 비평이 없습니다.', 'No critiques for this year.'), 'archive-empty'));
      document.querySelector('#critique-count').textContent = t(results.length + '개의 비평', results.length + (results.length === 1 ? ' critique' : ' critiques'));
    };
    select.addEventListener('change', () => render(select.value));
    render('all');
  }
})();
