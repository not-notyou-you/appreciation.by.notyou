// File: semangat-video.js Path: web/js/semangat-video.js

import { elements } from './dom.js';

const MAX_DURATION_MS = 60000;

let hideTimer = null;

export function playSemangatVideo() {
  const video = elements.appreciationVideo;

  video.loop = true;
  video.muted = false;
  video.currentTime = 0;
  video.classList.remove('hidden');
  video.play().catch(() => {});

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    stopSemangatVideo();
  }, MAX_DURATION_MS);
}

export function stopSemangatVideo() {
  clearTimeout(hideTimer);
  hideTimer = null;

  const video = elements.appreciationVideo;
  video.pause();
  video.loop = false;
  video.classList.add('hidden');
}