// File: bunga.js Path: web/js/bunga.js

import { elements } from './dom.js';
import { appState } from './state.js';

export function handleBungaClick(onThreshold) {
  appState.bungaClickCount++;

  const btn = elements.hibiscusLogoTopBtn;

  if (appState.bungaClickCount === 1) {
    const rect = btn.getBoundingClientRect();
    btn.style.position = 'fixed';
    btn.style.top = rect.top + 'px';
    btn.style.left = rect.left + 'px';
    btn.style.margin = '0';
    btn.style.zIndex = '500';
  }

  const currentRect = btn.getBoundingClientRect();
  const elSize = currentRect.width;
  const padding = 16;
  const maxX = Math.max(padding, window.innerWidth - elSize - padding);
  const maxY = Math.max(padding, window.innerHeight - elSize - padding);
  const randomX = padding + Math.random() * (maxX - padding);
  const randomY = padding + Math.random() * (maxY - padding);

  const scale = Math.max(0.35, 1 - appState.bungaClickCount * 0.1);

  btn.style.transition = 'top 0.4s ease, left 0.4s ease, transform 0.4s ease';
  btn.style.top = randomY + 'px';
  btn.style.left = randomX + 'px';
  btn.style.transform = `scale(${scale})`;

  if (appState.bungaClickCount >= 6) {
    appState.bungaClickCount = 0;
    if (onThreshold) onThreshold();
  }
}

export function resetBungaPosition() {
  const btn = elements.hibiscusLogoTopBtn;
  btn.style.position = '';
  btn.style.top = '';
  btn.style.left = '';
  btn.style.margin = '';
  btn.style.zIndex = '';
  btn.style.transform = '';
  btn.style.transition = '';
}
