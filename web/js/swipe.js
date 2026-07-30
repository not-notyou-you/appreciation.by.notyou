// File: swipe.js Path: web/js/swipe.js

import { elements } from './dom.js';
import { appState } from './state.js';

export function setupSwipeGesture(onDangerTrigger) {
  const photoContainer = elements.panitiaPhoto.parentElement;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  elements.panitiaPhoto.draggable = false;

  photoContainer.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    currentX = startX;
    isDragging = true;
    photoContainer.setPointerCapture(e.pointerId);
  });

  photoContainer.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const diff = currentX - startX;
    elements.panitiaPhoto.style.transform = `translateX(${diff}px)`;

    if (Math.abs(diff) > 80) {
      elements.dangerButton.classList.add('visible');
    } else {
      elements.dangerButton.classList.remove('visible');
    }
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;

    const diff = currentX - startX;
    const threshold = 100;

    if (Math.abs(diff) > threshold) {
      elements.dangerButton.classList.add('visible');
      if (diff > 0) {
        onDangerTrigger();
      }
    } else {
      elements.dangerButton.classList.remove('visible');
    }

    elements.panitiaPhoto.style.transform = 'translateX(0)';
  };

  photoContainer.addEventListener('pointerup', endDrag);
  photoContainer.addEventListener('pointercancel', endDrag);
  photoContainer.addEventListener('pointerleave', endDrag);

  document.addEventListener('keydown', (e) => {
    if (appState.mode !== 'post-input') return;
    if (e.key === 'ArrowLeft') {
      elements.panitiaPhoto.style.transform = 'translateX(-50px)';
      setTimeout(() => {
        elements.panitiaPhoto.style.transform = 'translateX(0)';
      }, 200);
    } else if (e.key === 'ArrowRight') {
      onDangerTrigger();
    }
  });
}
