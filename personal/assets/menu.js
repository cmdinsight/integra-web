/* menú móvil */
(function () {
  'use strict';
  var btn = document.getElementById('btn-menu');
  var panel = document.getElementById('menu-movil');
  if (!btn || !panel) return;

  function set(abierto) {
    panel.hidden = !abierto;
    btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    set(panel.hidden);
  });
  // cerrar al elegir un destino, al tocar fuera, o con Escape
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) set(false);
  });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) set(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { set(false); btn.focus(); }
  });
})();
