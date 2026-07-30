// File: mode.js Path: web/js/mode.js

import { elements } from './dom.js';
import { appState, updateProgressBar } from './state.js';
import { renderPanitiaData } from './render.js';
import { resetBungaPosition, handleBungaClick } from './bunga.js';
import { triggerEE1Secret, triggerEE2, triggerEE3, triggerEE4, triggerEE5 } from './easter-eggs.js';
import { claimReward } from './reward.js';
import { findPanitia, validateInput } from './data.js';
import { STORAGE_LAST_KODE_KEY } from './constants.js';

export function switchToPostInput(panitia) {
  appState.mode = 'post-input';
  appState.currentPanitia = panitia;
  appState.currentPhotoIndex = 0;
  appState.bungaClickCount = 0;

  elements.preInputMode.classList.add('hidden');
  elements.postInputMode.classList.remove('hidden');

  localStorage.setItem(STORAGE_LAST_KODE_KEY, panitia.kode);

  resetBungaPosition();
  renderPanitiaData(panitia);
  setupPostInputEventListeners();
}

export function switchToPreInput() {
  appState.mode = 'pre-input';
  appState.currentPanitia = null;
  appState.bungaClickCount = 0;

  elements.postInputMode.classList.add('hidden');
  elements.preInputMode.classList.remove('hidden');
  elements.preInputMode.style.backgroundColor = '';

  elements.codeInput.value = '';
  elements.inputError.textContent = '';
  elements.startButton.disabled = true;
  elements.dangerButton.classList.remove('visible');
  resetBungaPosition();

  document.body.style.backgroundImage = '';
  document.body.style.backgroundSize = '';
  document.body.style.backgroundPosition = '';
  document.body.style.backgroundAttachment = '';
}

function setupPostInputEventListeners() {
  elements.dangerButton.onclick = () => triggerEE2();
  elements.hibiscusLogoTopBtn.onclick = () => handleBungaClick(triggerEE4);
  elements.backButton.onclick = () => switchToPreInput();
  elements.claimButton.onclick = () => {
    claimReward();
    setTimeout(() => {
      switchToPreInput();
      appState.progress = { ee1: false, ee2: false, ee3: false, ee4: false };
      updateProgressBar();
    }, 500);
  };
}

export function setupPreInputEventListeners() {
  elements.codeInput.addEventListener('input', (e) => {
    const input = e.target.value;
    const { isValid } = validateInput(input);

    if (!isValid && input) {
      elements.inputError.textContent = 'Hanya huruf UPPERCASE (A-Z)';
      elements.startButton.disabled = true;
    } else {
      elements.inputError.textContent = '';
      elements.startButton.disabled = !isValid || !input;
    }
  });

  elements.codeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !elements.startButton.disabled) {
      handleStartClick();
    }
  });

  elements.startButton.addEventListener('click', handleStartClick);
}

function handleStartClick() {
  const input = elements.codeInput.value.trim().toUpperCase();

  const secretTriggered = triggerEE1Secret(input);
  if (secretTriggered) {
    elements.startButton.disabled = true;
    return;
  }

  const ee5Triggered = triggerEE5(input);
  if (ee5Triggered) {
    return;
  }

  const panitia = findPanitia(input);

  if (panitia) {
    switchToPostInput(panitia);
  } else {
    triggerEE3(switchToPreInput);
  }
}