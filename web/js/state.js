// File: state.js Path: web/js/state.js

import { STORAGE_PROGRESS_KEY } from './constants.js';
import { elements } from './dom.js';

export const appState = {
  mode: 'pre-input',
  data: null,
  currentPanitia: null,
  progress: { ee1: false, ee2: false, ee3: false, ee4: false },
  currentQuestionIndex: 0,
  bungaClickCount: 0,
  currentPhotoIndex: 0,
  lastDivisiColor: null
};

export function saveProgress() {
  localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(appState.progress));
}

export function initializeState() {
  const stored = localStorage.getItem(STORAGE_PROGRESS_KEY);
  if (stored) {
    try {
      appState.progress = JSON.parse(stored);
    } catch {
      appState.progress = { ee1: false, ee2: false, ee3: false, ee4: false };
    }
  }
  updateProgressBar();
}

export function updateProgressBar() {
  const count = Object.values(appState.progress).filter(Boolean).length;
  const barColor = appState.lastDivisiColor || '#ffffff';

  elements.progressCount.textContent = count;
  elements.progressCountPost.textContent = count;

  const percentage = (count / 4) * 100;
  elements.progressBarInner.style.width = percentage + '%';
  elements.progressBarInner.style.backgroundColor = barColor;
  elements.progressBarInnerPost.style.width = percentage + '%';
  elements.progressBarInnerPost.style.backgroundColor = barColor;

  if (count === 4) {
    elements.claimButton.classList.remove('hidden');
  } else {
    elements.claimButton.classList.add('hidden');
  }
}