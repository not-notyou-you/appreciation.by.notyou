// File: data.js Path: web/js/data.js

import { elements } from './dom.js';
import { appState } from './state.js';

export async function loadData() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    appState.data = await response.json();
    return true;
  } catch (error) {
    console.error('Error loading data.json:', error);

    if (location.protocol === 'file:') {
      elements.inputError.textContent = 'Website ini harus dibuka lewat local server, tidak bisa dibuka langsung dari file. Jalankan server lokal lalu buka via http://localhost.';
    } else if (error instanceof SyntaxError) {
      elements.inputError.textContent = 'data.json rusak atau tidak valid (JSON error). Cek isi filenya.';
    } else {
      elements.inputError.textContent = 'Gagal memuat data.json. Pastikan file ada di folder yang sama dengan index.html, lalu refresh.';
    }

    elements.startButton.disabled = true;
    return false;
  }
}

export function validateInput(value) {
  const trimmed = value.trim().toUpperCase();
  const isValid = /^[A-Z]+$/.test(trimmed);
  return { isValid, value: trimmed };
}

export function findPanitia(kode) {
  if (!appState.data || !appState.data.panitia) return null;
  return appState.data.panitia.find(p => p.kode === kode);
}
