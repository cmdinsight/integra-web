(function () {
  'use strict';

  var PORTAL_ID = '51155155';
  var FORM_ID = 'b56f1de2-4a38-4f27-807f-bf9dafa297d6';
  var ENDPOINT =
    'https://api.hsforms.com/submissions/v3/integration/submit/' + PORTAL_ID + '/' + FORM_ID;

  var ERROR_GENERICO =
    'No pudimos enviar tu consulta. Escribinos a contacto@integramedicalgroup.uy o por WhatsApp al 096 276 998.';

  var form = document.getElementById('contacto-form');
  if (!form) return;

  var exito = document.getElementById('f-exito');
  var errBox = document.getElementById('f-error');
  var errText = document.getElementById('f-error-text');
  var btn = document.getElementById('f-submit');
  var reset = document.getElementById('f-reset');
  var enviando = false;

  function val(n) {
    var el = form.elements[n];
    return el && el.value ? el.value.trim() : '';
  }

  function mostrarError(msg) {
    errText.textContent = msg;
    errBox.hidden = false;
  }

  function limpiarError() {
    errBox.hidden = true;
  }

  function setEnviando(on) {
    enviando = on;
    btn.disabled = on;
    btn.textContent = on ? 'Enviando…' : 'Enviar consulta';
    btn.style.background = on ? '#6E8BA8' : '#0E4F8B';
    btn.style.cursor = on ? 'not-allowed' : 'pointer';
  }

  function hutk() {
    var m = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return m ? m[1] : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (enviando) return;
    limpiarError();

    var nombre = val('nombre');
    var email = val('email');
    var mensaje = val('mensaje');

    if (!nombre || !email || !mensaje) {
      mostrarError('Completá tu nombre, tu email y el mensaje.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      mostrarError('Revisá el email: no parece una dirección válida.');
      form.elements['email'].focus();
      return;
    }

    var partes = nombre.split(/\s+/);
    var firstname = partes.shift() || '';
    var lastname = partes.join(' ');

    var fields = [
      { objectTypeId: '0-1', name: 'firstname', value: firstname },
      { objectTypeId: '0-1', name: 'lastname', value: lastname },
      { objectTypeId: '0-1', name: 'email', value: email },
      { objectTypeId: '0-1', name: 'phone', value: val('celular') },
      { objectTypeId: '0-1', name: 'unidad_de_interes', value: val('unidad') },
      { objectTypeId: '0-1', name: 'message', value: mensaje }
    ].filter(function (c) {
      return c.value;
    });

    var context = { pageName: document.title, pageUri: window.location.href };
    var k = hutk();
    if (k) context.hutk = k;

    setEnviando(true);

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: fields, context: context })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.hidden = true;
        exito.hidden = false;
        exito.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(function () {
        mostrarError(ERROR_GENERICO);
      })
      .then(function () {
        setEnviando(false);
      });
  });

  reset.addEventListener('click', function () {
    form.reset();
    limpiarError();
    exito.hidden = true;
    form.hidden = false;
    form.elements['nombre'].focus();
  });
})();

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
