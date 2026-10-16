/* All views live in index.html. Normal links preserve back/forward and file:// support. */
(() => {
  'use strict';
  const url = new URL(location.href);
  const names = ['index', 'exhibitions', 'exhibition', 'about', 'research'];
  const legacy = url.pathname.split('/').filter(Boolean).pop()?.replace(/\.html$/, '');
  const requested = url.searchParams.get('page') || (names.includes(legacy) ? legacy : 'index');
  const page = names.includes(requested) ? requested : 'index';
  window.CURRENT_PAGE = page;
  const main = document.querySelector('#main');
  if (page !== 'index') {
    const template = document.querySelector('#view-' + page);
    main.replaceChildren(template.content.cloneNode(true));
  }
  const titles = {index:'전시와 생태미학',exhibitions:'전시 목록',exhibition:'전시 상세',about:'소개',research:'연구와 저술'};
  document.title = titles[page] + ' | 유현주';
  // Netlify serves old shared URLs through a rewrite. Keep every query parameter and hash.
  if (legacy && legacy !== 'index' && names.includes(legacy) && location.protocol !== 'file:') {
    url.pathname = '/'; url.searchParams.set('page', page);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
})();
