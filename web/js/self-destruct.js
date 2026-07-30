// File: self-destruct.js Path: web/js/self-destruct.js

import { elements } from './dom.js';

const FLY_OUT_SELECTORS = [
  '.post-title',
  '.hibiscus-logo-top-btn',
  '#division-badge',
  '.photo-container',
  '.info-section',
  '.message-container',
  '.progress-bar-container',
  '#claim-button',
  '#back-button',
  '#self-destruct-button'
];

const STAGGER_MS = 200;
const FLY_DURATION_MS = 700;

let destructing = false;

function getTargets() {
  const container = elements.postInputContent;
  return FLY_OUT_SELECTORS
    .map((selector) => container.querySelector(selector))
    .filter(Boolean);
}

function applyFlyOut(el) {
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.max(window.innerWidth, window.innerHeight) * 1.3;

  el.style.setProperty('--fx', `${Math.cos(angle) * distance}px`);
  el.style.setProperty('--fy', `${Math.sin(angle) * distance}px`);
  el.style.setProperty('--frot', `${(Math.random() - 0.5) * 720}deg`);
  el.classList.add('fly-out');
}

export function triggerSelfDestruct() {
  if (destructing) return;
  destructing = true;

  const targets = getTargets();

  targets.forEach((el, index) => {
    setTimeout(() => applyFlyOut(el), index * STAGGER_MS);
  });

  const cardFlyStart = targets.length * STAGGER_MS;

  setTimeout(() => {
    applyFlyOut(elements.postInputContent);
  }, cardFlyStart);

  setTimeout(() => {
    elements.refreshPrompt.classList.remove('hidden');
  }, cardFlyStart + FLY_DURATION_MS);
}

export function resetSelfDestruct() {
  destructing = false;

  elements.refreshPrompt.classList.add('hidden');

  const allTargets = [...getTargets(), elements.postInputContent];
  allTargets.forEach((el) => {
    el.classList.remove('fly-out');
    el.style.removeProperty('--fx');
    el.style.removeProperty('--fy');
    el.style.removeProperty('--frot');
  });
}