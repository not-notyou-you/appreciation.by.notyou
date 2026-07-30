// File: easter-eggs.js Path: web/js/easter-eggs.js

import { elements } from './dom.js';
import { appState, saveProgress, updateProgressBar } from './state.js';
import { showModal, closeModal, setupModalDismiss } from './modal.js';
import { DIVISI_COLORS, EE3_QUESTIONS } from './constants.js';
import { resetBungaPosition } from './bunga.js';

export function triggerEE1Secret(input) {
  if (input === 'NOTYOU') {
    elements.preInputMode.style.backgroundColor = '#000000';
    showModal(elements.modalEE1Notyou);
    elements.notyouRefreshBtn.onclick = () => {
      location.reload();
    };
    return true;
  }

  const validSecrets = ['FAIQ', 'HAKIM', 'ULINNUHA'];
  if (validSecrets.includes(input)) {
    if (!appState.progress.ee1) {
      appState.progress.ee1 = true;
      saveProgress();
      updateProgressBar();
    }
    showModal(elements.modalEE1Secret);
    setupModalDismiss(elements.modalEE1Secret);
    return true;
  }

  return false;
}

export function triggerEE2() {
  if (!elements.modalEE2Danger.classList.contains('hidden')) return;

  if (!appState.progress.ee2) {
    appState.progress.ee2 = true;
    saveProgress();
    updateProgressBar();
  }

  showModal(elements.modalEE2Danger);

  const supergrafisImages = ['1.webp', '3.webp', '5.webp', '6.webp', '8.webp', '10.webp'];
  const chaosCount = 50;

  for (let i = 0; i < chaosCount; i++) {
    const img = document.createElement('img');
    const randomGrafis = supergrafisImages[Math.floor(Math.random() * supergrafisImages.length)];
    img.src = `./assets/supergrafis/${randomGrafis}`;
    img.classList.add('chaos-element');

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const endX = (Math.random() - 0.5) * window.innerWidth * 2;
    const endY = (Math.random() - 0.5) * window.innerHeight * 2;
    const rotation = Math.random() * 360;

    img.style.left = startX + 'px';
    img.style.top = startY + 'px';
    img.style.width = Math.random() * 60 + 20 + 'px';
    img.style.setProperty('--tx', endX + 'px');
    img.style.setProperty('--ty', endY + 'px');
    img.style.setProperty('--rot', rotation);

    elements.chaosContainer.appendChild(img);
  }

  setTimeout(() => {
    elements.chaosContainer.innerHTML = '';
  }, 5000);

  elements.dangerRefreshBtn.onclick = () => {
    closeModal(elements.modalEE2Danger);
    elements.chaosContainer.innerHTML = '';
  };
}

export function triggerEE3(onReject) {
  appState.currentQuestionIndex = 0;
  showEE3Question(onReject);
}

function showEE3Question(onReject) {
  if (appState.currentQuestionIndex >= EE3_QUESTIONS.length) {
    triggerEE3Final();
    return;
  }

  const question = EE3_QUESTIONS[appState.currentQuestionIndex];
  elements.modalQuestionText.textContent = question;

  showModal(elements.modalEE3Question);

  const yesHandler = () => {
    appState.currentQuestionIndex = 0;
    closeModal(elements.modalEE3Question);
    showModal(elements.modalEE3Reject);
    elements.rejectRedirectBtn.onclick = () => {
      closeModal(elements.modalEE3Reject);
      if (onReject) onReject();
    };
  };

  const noHandler = () => {
    appState.currentQuestionIndex++;
    closeModal(elements.modalEE3Question);
    showEE3Question(onReject);
  };

  elements.questionYesBtn.onclick = yesHandler;
  elements.questionNoBtn.onclick = noHandler;
}

function triggerEE3Final() {
  if (appState.progress.ee3) return;

  appState.progress.ee3 = true;
  saveProgress();
  updateProgressBar();

  closeModal(elements.modalEE3Question);
  showModal(elements.modalEE3Final);

  elements.finalRedirectBtn.onclick = () => {
    closeModal(elements.modalEE3Final);
    window.open('https://line.me/S/sticker/28036120/?lang=en', '_blank');
  };
}

export function triggerEE4() {
  if (appState.progress.ee4) return;

  appState.progress.ee4 = true;
  saveProgress();
  updateProgressBar();
  resetBungaPosition();

  showModal(elements.modalEE4Bunga);

  elements.bungaRedirectBtn.onclick = () => {
    closeModal(elements.modalEE4Bunga);
    window.open('https://omb.umn.ac.id', '_blank');
  };
}

export function triggerEE5(divisiName) {
  const validDivisi = Object.keys(DIVISI_COLORS);
  if (!validDivisi.includes(divisiName)) return false;

  const downloadLink = document.createElement('a');
  downloadLink.href = `./assets/divisions/${divisiName}2.webp`;
  downloadLink.download = `${divisiName}_CHARACTER.webp`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  return true;
}
