(() => {
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (!button || !nav) return;
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    button.textContent = open ? '×' : '☰';
    document.querySelectorAll('main, footer').forEach(el => { el.inert = open; });
  }
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setMenu(false); button.focus(); }
    if (event.key === 'Tab' && button.getAttribute('aria-expanded') === 'true') {
      const last = nav.querySelector('a:last-child');
      if (event.shiftKey && document.activeElement === button) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); button.focus(); }
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });
})();
