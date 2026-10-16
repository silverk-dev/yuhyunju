/* Query-string language wins over the saved preference; no API or translation service. */
(() => {
  'use strict';
  const url = new URL(location.href);
  let saved;
  try { saved = localStorage.getItem('portfolio-language'); } catch { /* Storage may be blocked. */ }
  const requested = url.searchParams.get('lang');
  const lang = ['ko', 'en'].includes(requested) ? requested : (saved === 'en' ? 'en' : 'ko');
  try { localStorage.setItem('portfolio-language', lang); } catch { /* URLs still work. */ }
  const en = lang === 'en';
  const t = (ko, english) => en ? english : ko;
  const link = href => {
    const target = new URL(href, location.href);
    if (target.origin !== location.origin || !['http:', 'https:', 'file:'].includes(target.protocol)) return href;
    target.searchParams.set('lang', lang);
    const path = target.protocol === 'file:' ? target.pathname.split('/').pop() : target.pathname;
    return path + target.search + target.hash;
  };
  window.I18N = { lang, en, t, link };
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const copy = TRANSLATIONS.static[node.dataset.i18n];
    if (copy) node.innerHTML = copy[lang]; // Only locally authored static copy, never user input.
  });
  document.querySelectorAll('.brand').forEach(node => {
    node.replaceChildren(document.createTextNode(t('유현주', 'Yu Hyunju')), Object.assign(document.createElement('span'), {textContent:t('YU HYUNJU', 'CURATOR & RESEARCHER')}));
  });
  const titles = {index:'Art & Ecological Aesthetics',exhibitions:'Exhibitions',exhibition:'Exhibition',about:'About',research:'Research & Writings'};
  const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
  if (en) document.title = (titles[page] || titles.index) + ' | Yu Hyunju';
  document.querySelector('meta[name="description"]').content = t('유현주 전시기획자와 미학 연구자의 전시, 생태미학 연구 및 저술 아카이브.', 'Exhibitions, ecological aesthetics research and writings by curator and aesthetics researcher Yu Hyunju.');
  document.querySelector('#navigation').setAttribute('aria-label', t('주 메뉴', 'Main navigation'));
  document.querySelector('.language-switch').setAttribute('aria-label', t('언어 선택', 'Select language'));
  document.querySelectorAll('[data-language]').forEach(a => {
    const target = new URL(location.href); target.searchParams.set('lang', a.dataset.language);
    a.href = target.href;
    if (a.dataset.language === lang) a.setAttribute('aria-current', 'true');
  });
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!a.hasAttribute('data-language') && !href.startsWith('#') && !/^[a-z]+:/i.test(href)) a.setAttribute('href', link(href));
  });
  const banner = document.querySelector('.hero img');
  if (banner) banner.alt = t('제주 야외에 원형으로 펼쳐진 박봉기의 설치작품 호흡', 'Park Bonggi’s outdoor installation Breathing, arranged in a circle in Jeju');
  const dialog = document.querySelector('#lightbox');
  if (dialog) {
    dialog.setAttribute('aria-label', t('전시 이미지 크게 보기', 'Enlarged exhibition image'));
    dialog.querySelector('.close').setAttribute('aria-label', t('이미지 닫기', 'Close image'));
  }
  if (en) {
    PORTFOLIO.exhibitions = PORTFOLIO.exhibitions.map(item => ({...item, ...TRANSLATIONS.exhibitions[item.id], yearLabel:item.year === null ? 'Year to be confirmed' : item.yearLabel}));
    PORTFOLIO.research = PORTFOLIO.research.map(item => ({...item, ...TRANSLATIONS.research[item.title]}));
  }
})();
