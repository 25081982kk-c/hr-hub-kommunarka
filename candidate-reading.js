// Mirror the existing section controls on narrow screens. Their click handlers
// own draft validation, confirmations and navigation.
const narrow = window.matchMedia('(max-width: 800px)');
let currentMenu;
let currentButton;
let signature;
const select = document.createElement('select');
select.className = 'candidate-mobile-section';
select.setAttribute('aria-label', 'Раздел карточки');
function updateSections() {
  const menu = document.querySelector('.candidate-modal > .candidate-back-bar ~ .modal-tabs');
  if (!menu) {
    currentMenu = currentButton = signature = undefined;
    return;
  }
  const buttons = Array.from(menu.querySelectorAll(':scope > button'));
  const active = buttons.find(button => button.classList.contains('selected'));
  if (menu === currentMenu && active !== currentButton) {
    const body = menu.parentElement.querySelector(':scope > .modal-body');
    if (body) body.scrollTop = 0;
  }
  currentMenu = menu;
  currentButton = active;
  if (!narrow.matches) {
    if (select.isConnected) select.remove();
    return;
  }
  const names = buttons.map(button => button.textContent.trim());
  const nextSignature = JSON.stringify(names);
  if (signature !== nextSignature) {
    select.replaceChildren(...names.map((name,index) => new Option(name,String(index))));
    signature = nextSignature;
  }
  select.selectedIndex = buttons.indexOf(active);
  if (select.parentElement !== menu) menu.append(select);
}
select.addEventListener('change', () => {
  currentMenu?.querySelectorAll(':scope > button')[select.selectedIndex]?.click();
  requestAnimationFrame(updateSections);
});
let frame;
function scheduleUpdate() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    updateSections();
  });
}
new MutationObserver(scheduleUpdate).observe(document.getElementById('root'), {
  childList: true, subtree: true, attributes: true, attributeFilter: ['class'], characterData: true
});
narrow.addEventListener('change', scheduleUpdate);
updateSections();
