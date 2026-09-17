'use strict';
(() => {
  const roles = {
    home: ['Domestic help / maid','Cook','Nanny / babysitter','Non-medical elder support','Driver','Pet care','Other household requirement'],
    business: ['Guest services / front-of-house','Housekeeping support','Banquet / event staffing','Reception / resident services','Other business requirement']
  };
  let mode = 'home';
  const form = document.getElementById('brief');
  const role = document.getElementById('role');
  const panel = document.getElementById('message-panel');
  const locationInput = document.getElementById('location');
  function resetPreview() { panel.hidden = true; document.getElementById('send').href = 'https://wa.me/919015483968'; }
  function setMode(next) {
    mode = next;
    document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
    role.replaceChildren(new Option('Choose a service', ''), ...roles[mode].map(r => new Option(r, r)));
    document.querySelectorAll('.business-only').forEach(box => {
      box.hidden = mode !== 'business';
      box.querySelectorAll('input').forEach(input => { input.disabled = mode !== 'business'; input.required = mode === 'business'; });
    });
    resetPreview();
  }
  document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
  document.querySelectorAll('[data-service]').forEach(b => b.addEventListener('click', () => {
    setMode('home'); role.value = b.dataset.service;
    window.location.hash = 'enquiry'; role.focus({preventScroll:true});
  }));
  document.getElementById('business-cta').addEventListener('click', () => {
    setMode('business'); window.location.hash = 'enquiry'; role.focus({preventScroll:true});
  });
  form.addEventListener('input', () => {
    locationInput.setCustomValidity('');
    document.getElementById('property').setCustomValidity('');
    resetPreview();
  });
  form.addEventListener('change', resetPreview);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const area = locationInput.value.trim();
    locationInput.setCustomValidity(!area ? 'Please enter your area or PIN code.' : /^\d+$/.test(area) && !/^[1-9]\d{5}$/.test(area) ? 'Enter a six-digit Indian PIN code, or an area name.' : '');
    const property = document.getElementById('property');
    property.setCustomValidity(mode === 'business' && !property.value.trim() ? 'Please enter the business or property name.' : '');
    if (!form.reportValidity()) return;
    const lines = [mode === 'home' ? 'Hello H2W Home Care, I would like to discuss a requirement.' : 'Hello H2W Hospitality, I would like to discuss staffing.', '', 'Service: ' + role.value, 'Schedule: ' + document.getElementById('schedule').value, 'Area / PIN: ' + area];
    if (mode === 'business') lines.push('Property / business: ' + property.value.trim(), 'People required: ' + document.getElementById('headcount').value);
    const date = document.getElementById('start').value;
    if (date) lines.push('Preferred start: ' + date);
    const notes = document.getElementById('notes').value.trim();
    if (notes) lines.push('Additional details: ' + notes);
    lines.push('', 'Please confirm availability, candidate checks and applicable charges / terms.');
    const message = lines.join('\n');
    document.getElementById('message').textContent = message;
    document.getElementById('send').href = 'https://wa.me/919015483968?text=' + encodeURIComponent(message);
    panel.hidden = false;
  });
  setMode('home');
})();
