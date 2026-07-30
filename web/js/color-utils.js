// File: color-utils.js Path: web/js/color-utils.js

export function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

export function divisionCardBackground(hex) {
  const { r, g, b } = hexToRgb(hex);
  const dr = Math.round(r * 0.2);
  const dg = Math.round(g * 0.2);
  const db = Math.round(b * 0.2);
  return `rgba(${dr}, ${dg}, ${db}, 0.8)`;
}