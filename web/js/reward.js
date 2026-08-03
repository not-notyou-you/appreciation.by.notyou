// File: reward.js Path: web/js/reward.js

import { appState } from './state.js';
import { findPanitia } from './data.js';
import { STORAGE_PROGRESS_KEY, STORAGE_LAST_KODE_KEY } from './constants.js';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function buildWavePattern(id) {
  return `
    <pattern id="${id}" width="46" height="70" patternUnits="userSpaceOnUse">
      <path d="M0,35 C11.5,10 34.5,60 46,35" fill="none" stroke="currentColor" stroke-width="1.2"/>
    </pattern>`;
}

function formatCertificateDate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

function generateRewardHTML(panitia) {
  const nama = escapeHtml((panitia && panitia.nama ? panitia.nama : 'Pejuang Kembang Sepatu').toString().trim());
  const divisi = escapeHtml((panitia && panitia.divisi ? panitia.divisi : '').toString().trim());
  const subtitleLine = divisi ? `PANITIA DIVISI ${divisi} &mdash; PEJUANG KEMBANG SEPATU` : 'PEJUANG KEMBANG SEPATU';
  const dateStr = formatCertificateDate();

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sertifikat Apresiasi - ${nama}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Montserrat:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      min-height: 100%;
      background-color: #0d0a0b;
    }
    body {
      color: #f5f5f5;
      font-family: 'Montserrat', -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }
    .certificate {
      position: relative;
      width: 100%;
      max-width: 900px;
      background-color: #17141a;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
      animation: fadeIn 900ms ease-out;
    }
    .side-pattern {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 130px;
      color: #EB1A3F;
      opacity: 0.45;
      pointer-events: none;
    }
    .side-pattern--left { left: 0; }
    .side-pattern--right { right: 0; transform: scaleX(-1); }
    .content {
      position: relative;
      z-index: 1;
      padding: 3.25rem 3rem 2.75rem;
    }
    .headline {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: clamp(2rem, 5.5vw, 3.4rem);
      letter-spacing: 10px;
      text-transform: uppercase;
    }
    .headline-sub {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 5px;
      color: #a8a8ae;
      text-transform: uppercase;
    }
    .presented-to {
      margin-top: 2.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 3px;
      color: #a8a8ae;
      text-transform: uppercase;
    }
    .name {
      font-family: 'Dancing Script', cursive;
      font-weight: 700;
      font-size: clamp(2.4rem, 7vw, 4.2rem);
      line-height: 1.1;
      margin-top: 0.5rem;
      background: linear-gradient(90deg, #EB1A3F, #F3819C);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      word-break: break-word;
    }
    .name-underline {
      margin-top: 0.75rem;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.18);
    }
    .name-subtitle {
      margin-top: 0.6rem;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    .description {
      margin-top: 1.25rem;
      max-width: 620px;
      font-size: 0.85rem;
      line-height: 1.7;
      color: #a8a8ae;
    }
    .footer-row {
      margin-top: 3rem;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .footer-block {
      flex: 1;
      min-width: 130px;
    }
    .footer-label {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 0.6rem;
    }
    .footer-value {
      font-size: 0.85rem;
      color: #a8a8ae;
      letter-spacing: 1px;
    }
    .stamp-block {
      flex: 1;
      min-width: 130px;
      display: flex;
      justify-content: flex-end;
    }
    .stamp {
      position: relative;
      width: 116px;
      height: 116px;
      border-radius: 50%;
      border: 3px solid #c23b3b;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-11deg);
      opacity: 0.85;
    }
    .stamp::before {
      content: '';
      position: absolute;
      inset: 7px;
      border: 1.5px solid #c23b3b;
      border-radius: 50%;
    }
    .stamp-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #c23b3b;
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 0.68rem;
      letter-spacing: 1.5px;
      text-align: center;
      line-height: 1.5;
      text-transform: uppercase;
    }
    .actions {
      margin-top: 2.5rem;
      text-align: center;
      display: flex;
      gap: 0.85rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .actions button {
      padding: 0.9rem 2.25rem;
      font-size: 0.85rem;
      font-weight: 700;
      border: 1.5px solid rgba(247, 206, 28, 0.5);
      background-color: rgba(247, 206, 28, 0.12);
      color: #F7CE1C;
      border-radius: 14px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      transition: 250ms ease-in-out;
      font-family: 'Montserrat', sans-serif;
    }
    .actions button:hover {
      background-color: #F7CE1C;
      color: #0d0a0b;
    }
    .actions button.secondary {
      border-color: rgba(255, 255, 255, 0.25);
      background-color: rgba(255, 255, 255, 0.05);
      color: #f5f5f5;
    }
    .actions button.secondary:hover {
      background-color: rgba(255, 255, 255, 0.9);
      color: #0d0a0b;
    }
    @page {
      size: A4 landscape;
      margin: 10mm;
    }
    @media print {
      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        animation: none !important;
      }
      html, body {
        width: 100%;
        height: auto;
        min-height: 0;
      }
      body {
        display: block;
        padding: 0;
        background-image: none;
      }
      .certificate {
        width: 100%;
        max-width: 100%;
        margin: 0;
        box-shadow: none;
        border-radius: 0;
        page-break-inside: avoid;
      }
      .content {
        padding: 1.5rem 2rem;
      }
      .headline {
        font-size: 2.1rem;
        letter-spacing: 6px;
      }
      .headline-sub {
        font-size: 0.7rem;
      }
      .presented-to {
        margin-top: 1.5rem;
        font-size: 0.68rem;
      }
      .name {
        font-size: 2.5rem;
      }
      .name-subtitle {
        font-size: 0.68rem;
      }
      .description {
        margin-top: 0.85rem;
        font-size: 0.75rem;
        line-height: 1.55;
      }
      .footer-row {
        margin-top: 1.5rem;
      }
      .stamp {
        width: 90px;
        height: 90px;
      }
      .actions {
        display: none;
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 640px) {
      .content { padding: 2.25rem 1.5rem 2rem; }
      .headline { letter-spacing: 5px; }
      .footer-row { justify-content: center; text-align: center; }
      .stamp-block { justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <svg class="side-pattern side-pattern--left" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${buildWavePattern('waveLeft')}</defs>
      <rect width="100%" height="100%" fill="url(#waveLeft)"/>
    </svg>
    <svg class="side-pattern side-pattern--right" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${buildWavePattern('waveRight')}</defs>
      <rect width="100%" height="100%" fill="url(#waveRight)"/>
    </svg>

    <div class="content">
      <div class="headline">Sertifikat</div>
      <div class="headline-sub">Apresiasi</div>

      <div class="presented-to">Sertifikat ini dengan bangga dipersembahkan untuk</div>
      <div class="name">${nama}</div>
      <div class="name-underline"></div>
      <div class="name-subtitle">${subtitleLine}</div>

      <p class="description">Sebagai bentuk apresiasi atas dedikasi, waktu, dan semangat yang telah diberikan selama menjadi bagian dari Pejuang Kembang Sepatu. Terima kasih telah menyelesaikan seluruh rangkaian easter egg dalam surat apresiasi ini.</p>

      <div class="footer-row">
        <div class="footer-block">
          <div class="footer-label">Tanggal</div>
          <div class="footer-value">${dateStr}</div>
        </div>

        <div class="stamp-block">
          <div class="stamp">
            <div class="stamp-text">
              <span>Approved</span>
              <span>by NOTYOU</span>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button onclick="window.print()" class="secondary">Cetak / Simpan sebagai PDF</button>
        <button onclick="window.location.href='https://omb.umn.ac.id'">Saya Bersemangat</button>
      </div>
    </div>
  </div>
</body>
</html>`;

  return html;
}

export function claimReward() {
  const lastKode = (appState.currentPanitia && appState.currentPanitia.kode) || localStorage.getItem(STORAGE_LAST_KODE_KEY);
  const panitia = lastKode ? findPanitia(lastKode) : null;

  const html = generateRewardHTML(panitia);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  window.open(url, '_blank');

  localStorage.removeItem(STORAGE_PROGRESS_KEY);
  localStorage.removeItem(STORAGE_LAST_KODE_KEY);
}