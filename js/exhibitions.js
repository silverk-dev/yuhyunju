/* 전시 카드, 연도 필터, 상세 페이지, 키보드로 닫을 수 있는 이미지 확대. */
(() => {
  'use strict';
  const items = PORTFOLIO.exhibitions;
  const {t, link} = window.I18N || {t: ko => ko, link: href => href};
  const count = document.querySelector('.count'); if (count) count.textContent = String(items.length).padStart(2, '0');
  const el = window.makeElement;
  const grid = document.querySelector('[data-exhibitions]');
  const card = item => {
    const article = el('article', undefined, 'card');
    const a = el('a'); a.href = link('exhibition.html?id=' + encodeURIComponent(item.id));
    const frame = el('div', undefined, 'card-image');
    const img = el('img'); img.src = item.image; img.alt = item.title + t(' 대표 이미지', ' — cover image'); img.width = 1200; img.height = 1200; img.loading = 'lazy';
    frame.append(img); a.append(frame, el('h3', item.title), el('p', item.yearLabel)); article.append(a); return article;
  };
  const render = filter => {
    const results = items.filter(item => filter === 'all' || (filter === 'unknown' ? item.year === null : String(item.year) === filter));
    grid.replaceChildren(...results.map(card));
    const status = document.querySelector('#result-count'); if (status) status.textContent = t(results.length + '개의 전시', results.length + (results.length === 1 ? ' exhibition' : ' exhibitions'));
  };
  if (grid) {
    render('all');
    const select = document.querySelector('#year');
    if (select) {
      [...new Set(items.map(i => i.year).filter(Boolean))].sort((a,b) => b-a).forEach(year => { const option = el('option', String(year)); option.value = String(year); select.append(option); });
      if (items.some(i => i.year === null)) { const option = el('option', t('연도 확인 중', 'Year to be confirmed')); option.value = 'unknown'; select.append(option); }
      select.addEventListener('change', () => render(select.value));
    }
  }
  const detail = document.querySelector('#exhibition-detail'); if (!detail) return;
  const id = new URLSearchParams(location.search).get('id');
  const item = items.find(i => i.id === id);
  const back = el('a', t('← 전시 목록', '← All exhibitions'), 'text-link'); back.href = link('exhibitions.html'); detail.append(back);
  if (!item) { detail.append(el('h1', t('전시를 찾을 수 없습니다.', 'Exhibition not found.'), 'detail-head'), el('p', t('전시 목록에서 다시 선택해 주세요.', 'Please choose an exhibition from the archive.'))); return; }
  document.title = item.title + t(' | 유현주', ' | Yu Hyunju');
  document.querySelector('meta[name="description"]').content = item.description;
  const head = el('header', undefined, 'detail-head'); head.append(el('p', item.yearLabel + ' / EXHIBITION', 'eyebrow'), el('h1', item.title), el('p', item.subtitle, 'subtitle')); detail.append(head);
  const info = el('div', undefined, 'detail-info'); const dl = el('dl');
  [[t('기간', 'Dates'), item.date], [t('장소', 'Venue'), item.venue], [t('자료 출처', 'Source'), item.source]].forEach(([label,value]) => dl.append(el('dt',label),el('dd',value)));
  const text = el('div'); text.append(el('h2', t('전시 소개', 'About the exhibition')), el('p', item.description, 'body-copy'));
  if (item.note) text.append(el('p', item.note, 'note'));
  if (window.I18N?.en) text.append(el('p', 'English titles translated from Korean are provided for reference; they are not necessarily official titles.', 'translation-note'));
  info.append(dl,text); detail.append(info,el('p',t('이미지를 선택하면 크게 볼 수 있습니다. Esc 키로 닫을 수 있습니다.', 'Select an image to enlarge it. Press Esc to close.'),'image-hint'));
  const gallery = el('div', undefined, 'gallery'); const dialog = document.querySelector('#lightbox');
  item.gallery.forEach((src, index) => {
    const button = el('button'); button.type='button'; button.setAttribute('aria-label',t(item.title+' 이미지 '+(index+1)+' 확대', 'Enlarge '+item.title+' image '+(index+1)));
    const img = el('img'); img.src=src; img.alt=item.title+t(' — 포트폴리오 수록 이미지 ', ' — portfolio image ')+(index+1); img.loading='lazy';button.append(img);
    button.addEventListener('click', () => { const large=dialog.querySelector('img');large.src=src;large.alt=img.alt;dialog.querySelector('p').textContent=(index+1)+' / '+item.gallery.length+' · '+item.source;dialog.showModal(); });
    gallery.append(button);
  });
  detail.append(gallery);
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect=dialog.getBoundingClientRect(); if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) dialog.close(); } });
  const next=el('nav',undefined,'detail-nav'); next.setAttribute('aria-label',t('다른 전시', 'Other exhibitions'));
  const index=items.indexOf(item);
  [[index-1,t('← 이전 전시','← Previous exhibition')],[index+1,t('다음 전시 →','Next exhibition →')]].forEach(([n,label]) => { if(items[n]) {const a=el('a',label+' · '+items[n].title);a.href=link('exhibition.html?id='+encodeURIComponent(items[n].id));next.append(a);} });
  detail.append(next);
})();
