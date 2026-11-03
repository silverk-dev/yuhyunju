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
    if (target === page || (page === 'exhibition' && target === 'exhibitions') || (page === 'reading' && target === 'critique')) a.setAttribute('aria-current', 'page');
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
      const heading = makeElement('h3');
      const references = item.links || [];
      const referenceLink = (label, url) => {
        const a = makeElement('a', label + ' ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', label + window.I18N.t(' (새 탭에서 열기)', ' (opens in a new tab)')); return a;
      };
      if (references.length) heading.append(referenceLink(item.title, references[0].url));
      else heading.textContent = item.title;
      content.append(heading, makeElement('p', item.publication));
      if (references.length > 1) {
        const links = makeElement('div', undefined, 'research-links');
        references.forEach(reference => links.append(referenceLink(reference.label, reference.url)));
        content.append(links);
      }
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
        a.href = window.I18N.link(item.url); a.target = '_blank'; a.rel = 'noopener noreferrer';
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
  const reading = document.querySelector('#reading-view');
  if (reading) {
    const {t, link} = window.I18N;
    const item = (PORTFOLIO.critiques || []).find(entry => entry.id === new URLSearchParams(location.search).get('id') && entry.pages);
    const back = makeElement('a', t('← 비평 목록', '← All critiques'), 'text-link');
    back.href = link('index.html?page=critique'); reading.append(back);
    if (!item) { reading.append(makeElement('h1', t('문서를 찾을 수 없습니다.', 'Document not found.'))); return; }
    document.title = item.title + t(' | 유현주', ' | HyunJu Yu');
    const head = makeElement('header', undefined, 'detail-head');
    head.append(makeElement('p', item.year + ' / CRITIQUE', 'eyebrow'), makeElement('h1', item.title));
    head.append(makeElement('p', t('열람용 문서 · ', 'Reading copy · ') + item.pages.length + t('쪽', ' pages'), 'lead'));
    reading.append(head);
    const pages = makeElement('div', undefined, 'reading-pages');
    item.pages.forEach((page, i) => {
      const figure = makeElement('figure', undefined, 'reading-page');
      const img = makeElement('img'); img.src = page.image; img.alt = t('문서 ', 'Document page ') + (i + 1) + t('쪽', '');
      img.loading = i === 0 ? 'eager' : 'lazy'; img.draggable = false;
      const caption = makeElement('figcaption', (i + 1) + ' / ' + item.pages.length);
      figure.append(img, caption);
      if (page.text) {
        const text = makeElement('details', undefined, 'reading-text');
        text.append(makeElement('summary', t('텍스트로 읽기', 'Read as text')), makeElement('p', page.text)); figure.append(text);
      }
      pages.append(figure);
    });
    reading.append(pages);
  }
})();
