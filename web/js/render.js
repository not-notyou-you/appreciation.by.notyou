// File: render.js Path: web/js/render.js

import { elements } from './dom.js';
import { DIVISI_COLORS, BG_IMAGES } from './constants.js';
import { appState, updateProgressBar } from './state.js';
import { divisionCardBackground } from './color-utils.js';

export function renderPanitiaData(panitia) {
  const nama = (panitia.nama || '').toString().trim();
  const divisiRaw = (panitia.divisi || '').toString().trim();
  const divisi = divisiRaw.toUpperCase();
  const pesan = (panitia.pesan || '').toString().trim();
  const fotoPath = (panitia.foto_path || '').toString().trim();

  elements.panitiaNama.textContent = nama;
  elements.panitiaDivisi.textContent = divisiRaw;
  elements.panitiaMessage.textContent = pesan || 'Pesan tidak tersedia untuk kode ini.';

  elements.panitiaPhoto.src = fotoPath;
  elements.panitiaPhoto.onerror = () => {
    console.warn('Foto gagal dimuat, cek path:', fotoPath);
  };

  const divisiColor = DIVISI_COLORS[divisi] || '#999DA0';
  elements.divisionBadge.style.borderColor = divisiColor;

  const divisionLogoPath = `./assets/divisions/${divisi}.webp`;
  elements.divisionLogo.src = divisionLogoPath;
  elements.divisionLogo.onerror = () => {
    console.warn('Logo divisi gagal dimuat, cek nama divisi di data.json:', divisiRaw, '-> path dicoba:', divisionLogoPath);
  };

  elements.postInputContent.style.backgroundColor = divisionCardBackground(divisiColor);

  const randomBg = BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)];
  document.body.style.backgroundImage = `linear-gradient(rgba(10, 10, 10, 0.55), rgba(10, 10, 10, 0.75)), url('${randomBg}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundAttachment = 'fixed';

  appState.lastDivisiColor = divisiColor;
  updateProgressBar();
}