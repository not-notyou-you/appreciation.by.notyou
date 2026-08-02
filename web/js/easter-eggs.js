// File: easter-eggs.js Path: web/js/easter-eggs.js

import { elements } from './dom.js';
import { appState, saveProgress, updateProgressBar } from './state.js';
import { showModal, closeModal, setupModalDismiss } from './modal.js';
import { DIVISI_COLORS, EE3_QUESTIONS } from './constants.js';
import { resetBungaPosition } from './bunga.js';
import { playSemangatVideo } from './semangat-video.js';

export function triggerEE1Secret(input) {
  if (input === 'NOTYOU') {
    showModal(elements.modalEE1Notyou);

    const toggleFlip = () => {
      elements.app.classList.toggle('flipped');
      closeModal(elements.modalEE1Notyou);
    };

    elements.notyouRefreshBtn.onclick = toggleFlip;
    elements.notyouFlipBtn.onclick = toggleFlip;

    return true;
  }

  const validSecrets = ['FAIQ', 'HAKIM', 'ULINNUHA'];
  if (validSecrets.includes(input)) {
    showEE1Question();
    return true;
  }

  return false;
}

function showEE1Question() {
  elements.ee1Checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.onchange = () => {
      const allChecked = elements.ee1Checkboxes.every((cb) => cb.checked);
      elements.ee1ConfirmBtn.disabled = !allChecked;
    };
  });

  elements.ee1ConfirmBtn.disabled = true;

  elements.ee1ConfirmBtn.onclick = () => {
    closeModal(elements.modalEE1Question);

    if (!appState.progress.ee1) {
      appState.progress.ee1 = true;
      saveProgress();
      updateProgressBar();
    }

    showModal(elements.modalEE1Secret);
    setupModalDismiss(elements.modalEE1Secret);
  };

  showModal(elements.modalEE1Question);
}

let ee2Active = false;

function spawnChaosElement(supergrafisImages) {
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
  img.style.width = Math.random() * 84 + 28 + 'px';
  img.style.setProperty('--tx', endX + 'px');
  img.style.setProperty('--ty', endY + 'px');
  img.style.setProperty('--rot', rotation);

  elements.chaosContainer.appendChild(img);
}

export function triggerEE2() {
  if (ee2Active) return;
  ee2Active = true;

  elements.chaosContainer.innerHTML = '';

  const modalContent = elements.modalEE2Danger.querySelector('.modal-content');
  const backdrop = elements.modalEE2Danger.querySelector('.modal-backdrop');

  modalContent.classList.add('pending');
  elements.modalEE2Danger.classList.remove('hidden');
  backdrop.onclick = null;

  const supergrafisImages = ['1.webp', '3.webp', '5.webp', '6.webp', '8.webp', '10.webp'];
  const totalCount = 75;
  let spawned = 0;

  const interval = setInterval(() => {
    spawnChaosElement(supergrafisImages);
    spawned++;

    if (spawned >= totalCount) {
      clearInterval(interval);
      finishEE2(modalContent);
    }
  }, 100);
}

function finishEE2(modalContent) {
  if (!appState.progress.ee2) {
    appState.progress.ee2 = true;
    saveProgress();
    updateProgressBar();
  }

  modalContent.classList.remove('pending');

  elements.dangerRefreshBtn.onclick = () => {
    closeModal(elements.modalEE2Danger);
    elements.chaosContainer.innerHTML = '';
    ee2Active = false;
  };
}

export function triggerEE3(onReject) {
  appState.currentQuestionIndex = 0;
  showEE3Question(onReject);
}

function triggerWrongFeedback(modalContent) {
  elements.flashOverlay.classList.remove('active');
  void elements.flashOverlay.offsetWidth;
  elements.flashOverlay.classList.add('active');

  modalContent.classList.remove('shake');
  void modalContent.offsetWidth;
  modalContent.classList.add('shake');
}

function showEE3Question(onReject) {
  if (appState.currentQuestionIndex >= EE3_QUESTIONS.length) {
    triggerEE3Final();
    return;
  }

  const question = EE3_QUESTIONS[appState.currentQuestionIndex];
  elements.modalQuestionText.textContent = question;

  elements.questionYesBtn.disabled = false;
  elements.questionNoBtn.disabled = false;

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
    elements.questionYesBtn.disabled = true;
    elements.questionNoBtn.disabled = true;

    const modalContent = elements.modalEE3Question.querySelector('.modal-content');
    triggerWrongFeedback(modalContent);

    setTimeout(() => {
      appState.currentQuestionIndex++;
      closeModal(elements.modalEE3Question);
      showEE3Question(onReject);
    }, 350);
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
  if (!appState.progress.ee4) {
    appState.progress.ee4 = true;
    saveProgress();
    updateProgressBar();
  }

  resetBungaPosition();
  showModal(elements.modalEE4Bunga);

  elements.bungaRedirectBtn.onclick = () => {
    closeModal(elements.modalEE4Bunga);
    playSemangatVideo();
  };
}

export function triggerEE5(divisiName) {
  const validDivisi = Object.keys(DIVISI_COLORS);
  if (!validDivisi.includes(divisiName)) return false;

  const fileName = `${divisiName.toLowerCase()}2.png`;

  const downloadLink = document.createElement('a');
  downloadLink.href = `./assets/divisions/${fileName}`;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  return true;
}