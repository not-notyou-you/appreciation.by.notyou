// File: modal.js Path: web/js/modal.js

export function showModal(modal) {
  modal.classList.remove('hidden');

  const backdrop = modal.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.onclick = () => closeModal(modal);
  }
}

export function closeModal(modal) {
  modal.classList.add('hidden');
}

export function setupModalDismiss(modal) {
  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = modal.querySelector('.modal-close-btn');

  if (backdrop) backdrop.onclick = () => closeModal(modal);
  if (closeBtn) closeBtn.onclick = () => closeModal(modal);
}
