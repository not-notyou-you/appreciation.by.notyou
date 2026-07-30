// File: app.js Path: web/js/app.js

import { loadData, findPanitia } from './data.js';
import { appState, initializeState } from './state.js';
import { STORAGE_LAST_KODE_KEY, DIVISI_COLORS } from './constants.js';
import { setupPreInputEventListeners } from './mode.js';
import { setupSwipeGesture } from './swipe.js';
import { triggerEE2 } from './easter-eggs.js';

async function initialize() {
  const dataLoaded = await loadData();
  if (!dataLoaded) return;

  const lastKode = localStorage.getItem(STORAGE_LAST_KODE_KEY);
  if (lastKode) {
    const panitia = findPanitia(lastKode);
    if (panitia && panitia.divisi) {
      const divisiKey = panitia.divisi.toString().trim().toUpperCase();
      appState.lastDivisiColor = DIVISI_COLORS[divisiKey] || null;
    }
  }

  initializeState();
  setupPreInputEventListeners();
  setupSwipeGesture(triggerEE2);
}

initialize();