// File: swipe.js Path: web/js/swipe.js

import { elements } from './dom.js';
import { appState } from './state.js';

let currentOffset = 0;

function applyOffset(offset) {
  currentOffset = offset;
  elements.panitiaPhoto.style.transform = `translateX(${offset}px)`;
}

export function resetPhotoPosition() {
  applyOffset(0);
}

export function setupSwipeGesture(onDangerTrigger) {
  const photoContainer = elements.panitiaPhoto.parentElement;
  let startX = 0;
  let currentX = 0;
  let dragStartOffset = 0;
  let isDragging = false;

  photoContainer.addEventListener('pointerdown', (e) => {
    if (e.target === elements.dangerLabel) return;

    startX = e.clientX;
    currentX = startX;
    dragStartOffset = currentOffset;
    isDragging = true;
    photoContainer.setPointerCapture(e.pointerId);
  });

  photoContainer.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    applyOffset(dragStartOffset + (currentX - startX));
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    applyOffset(dragStartOffset + (currentX - startX));
  };

  photoContainer.addEventListener('pointerup', endDrag);
  photoContainer.addEventListener('pointercancel', endDrag);
  photoContainer.addEventListener('pointerleave', endDrag);

  elements.dangerLabel.addEventListener('click', () => {
    onDangerTrigger();
  });

  document.addEventListener('keydown', (e) => {
    if (appState.mode !== 'post-input') return;
    if (e.key === 'ArrowLeft') {
      applyOffset(currentOffset - 30);
    } else if (e.key === 'ArrowRight') {
      const containerWidth = photoContainer.clientWidth;
      applyOffset(containerWidth + 10);
    }
  });
}