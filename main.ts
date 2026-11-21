import fs from "node:fs";
import path from "node:path";

const DEFAULT_BOT_DIR = "/bot";
const DEFAULT_OUTPUT_DIR = "/output";

function buildMarkGhostGroup(transform: string): string {
  // Official make.fun mascot vector paths from press/mark.svg (unobstructed sparkle eyes + magenta star coin)
  return [
    `<g transform="${transform}">`,
    `<path d="M6.2 13a8.2 8.2 0 0 1 16.4 0v4.6c1 .2 1.8.8 2 2-.2 1.2-1 1.9-2 2.2V25a2.6 2.6 0 0 1-2.6 2.6c-2 0-4.6 0-5.7-.7-1.1.7-3.7.7-5.5.7A2.6 2.6 0 0 1 6.2 25v-.7c-1.2.3-3.5.1-3.6-1.9-.1-2.1 1.3-4.8 3.6-6.2z" fill="#191419" stroke="#191419" stroke-width="3.4" stroke-linejoin="round"/>`,
    `<path d="M6.2 13a8.2 8.2 0 0 1 16.4 0v4.6c1 .2 1.8.8 2 2-.2 1.2-1 1.9-2 2.2V25a2.6 2.6 0 0 1-2.6 2.6c-2 0-4.6 0-5.7-.7-1.1.7-3.7.7-5.5.7A2.6 2.6 0 0 1 6.2 25v-.7c-1.2.3-3.5.1-3.6-1.9-.1-2.1 1.3-4.8 3.6-6.2z" fill="#ffffff"/>`,
    `<path d="M6.3 24.1v-2.5m8 5.8v-1.5" fill="none" stroke="#191419" stroke-width="1.25" stroke-linecap="round"/>`,
    `<path d="M13.2 10.6Q13.632 11.968 15 12.4Q13.632 12.832 13.2 14.2Q12.768 12.832 11.4 12.4Q12.768 11.968 13.2 10.6z" fill="#191419"/>`,
    `<path d="M19.3 9.8Q19.732 11.168 21.1 11.6Q19.732 12.032 19.3 13.4Q18.868 12.032 17.5 11.6Q18.868 11.168 19.3 9.8z" fill="#191419"/>`,
    `<circle cx="26.5" cy="13.4" r="5.5" fill="#191419"/>`,
    `<circle cx="26.5" cy="13.4" r="3.8" fill="#c41c83"/>`,
    `<path d="M26.926 11.395L27.154 12.811L28.539 13.186L27.262 13.84L27.334 15.273L26.317 14.261L24.977 14.772L25.625 13.492L24.725 12.375L26.142 12.596z" fill="#ffffff" stroke="#ffffff" stroke-width="0.5" stroke-linejoin="round"/>`,
    `<circle cx="24.9" cy="19.6" r="4" fill="#191419"/>`,
    `<circle cx="24.9" cy="19.6" r="2.3" fill="#ffffff"/>`,
    `</g>`,
  ].join("");
}

function buildWordmarkGroup(transform: string): string {
  // Official make.fun wordmark paths from press/wordmark.svg rendered in white + luminous #FF33A8 dot
  return [
    `<g transform="${transform}">`,
    `<path fill="#ffffff" d="M1.22 24.73V12.36H4.55V15.14H4.34Q4.66 14.11 5.26 13.43Q5.86 12.77 6.64 12.43Q7.43 12.1 8.3 12.1Q9.71 12.1 10.76 12.92Q11.8 13.73 12.02 15.14H11.66Q11.89 14.2 12.49 13.52Q13.09 12.84 13.96 12.46Q14.81 12.1 15.82 12.1Q17.02 12.1 17.95 12.61Q18.9 13.13 19.44 14.13Q19.98 15.11 19.98 16.53V24.73H16.54V17.16Q16.54 16.05 15.94 15.5Q15.33 14.95 14.44 14.95Q13.78 14.95 13.29 15.24Q12.8 15.53 12.54 16.06Q12.27 16.57 12.27 17.28V24.73H8.94V17.07Q8.94 16.11 8.37 15.52Q7.79 14.95 6.88 14.95Q6.27 14.95 5.77 15.24Q5.27 15.52 4.97 16.07Q4.68 16.63 4.68 17.43V24.73ZM25.72 24.94Q24.49 24.94 23.53 24.53Q22.57 24.12 22.02 23.3Q21.47 22.47 21.47 21.24Q21.47 20.2 21.86 19.49Q22.24 18.8 22.91 18.37Q23.59 17.95 24.46 17.72Q25.34 17.5 26.3 17.42Q27.44 17.3 28.1 17.2Q28.77 17.09 29.06 16.89Q29.36 16.69 29.36 16.29V16.21Q29.36 15.75 29.11 15.4Q28.87 15.06 28.42 14.86Q27.96 14.66 27.33 14.66Q26.7 14.66 26.21 14.86Q25.72 15.06 25.44 15.43Q25.16 15.79 25.12 16.27H21.87Q21.95 14.99 22.63 14.05Q23.3 13.12 24.52 12.61Q25.74 12.1 27.44 12.1Q28.7 12.1 29.7 12.39Q30.69 12.67 31.37 13.22Q32.06 13.77 32.42 14.56Q32.77 15.34 32.77 16.34V24.73H29.39V22.98H29.35Q29.02 23.59 28.54 24.03Q28.06 24.46 27.37 24.71Q26.67 24.94 25.72 24.94ZM26.69 22.54Q27.52 22.54 28.13 22.23Q28.72 21.93 29.05 21.4Q29.38 20.88 29.38 20.21V18.96Q29.23 19.05 28.98 19.12Q28.74 19.2 28.41 19.26Q28.08 19.33 27.69 19.4Q27.31 19.47 26.9 19.53Q26.3 19.62 25.82 19.81Q25.34 20.01 25.06 20.32Q24.78 20.65 24.78 21.14Q24.78 21.58 25.01 21.89Q25.24 22.21 25.68 22.38Q26.11 22.54 26.69 22.54ZM37.84 21.17V17.09H38.21L42.54 12.36H46.6L40.98 18.58H40.19ZM34.72 24.73V7.27H38.17V24.73ZM42.81 24.73 38.9 19.34 41.18 16.94 46.86 24.73ZM52.54 25.01Q50.67 25.01 49.27 24.18Q47.89 23.36 47.12 21.89Q46.35 20.43 46.35 18.55Q46.35 16.66 47.13 15.2Q47.91 13.74 49.28 12.91Q50.66 12.07 52.42 12.07Q53.8 12.07 54.91 12.54Q56.02 13 56.83 13.87Q57.64 14.72 58.08 15.89Q58.52 17.07 58.52 18.48V19.41H47.58V17.21H56.85L55.3 17.73Q55.3 16.8 54.96 16.12Q54.62 15.44 53.99 15.07Q53.36 14.7 52.49 14.7Q51.64 14.7 51.02 15.07Q50.4 15.44 50.06 16.12Q49.72 16.8 49.72 17.73V19.23Q49.72 20.2 50.06 20.91Q50.41 21.64 51.07 22.02Q51.72 22.42 52.65 22.42Q53.33 22.42 53.85 22.22Q54.37 22.04 54.73 21.67Q55.08 21.32 55.24 20.84H58.39Q58.17 22.07 57.35 23.01Q56.53 23.95 55.28 24.48Q54.04 25.01 52.54 25.01Z"/>`,
    `<path fill="#FF33A8" d="M61.59 24.94Q60.77 24.94 60.18 24.36Q59.61 23.78 59.61 22.95Q59.61 22.12 60.18 21.54Q60.77 20.96 61.59 20.96Q62.42 20.96 63.01 21.54Q63.58 22.12 63.58 22.95Q63.58 23.78 63.01 24.36Q62.42 24.94 61.59 24.94Z"/>`,
    `<path fill="#ffffff" d="M72.47 12.36V15.06H64.25V12.36ZM66.49 24.73V10.75Q66.49 9.59 66.94 8.82Q67.39 8.04 68.28 7.66Q69.18 7.27 70.51 7.27Q71.13 7.27 71.69 7.27Q72.26 7.27 72.47 7.27V9.98Q72.33 9.98 71.94 9.98Q71.55 9.98 71.28 9.98Q70.56 9.98 70.24 10.29Q69.94 10.6 69.94 11.34V24.73ZM78.01 24.99Q76.7 24.99 75.73 24.43Q74.74 23.85 74.2 22.76Q73.67 21.66 73.67 20.1V12.36H77.12V19.47Q77.12 20.71 77.72 21.36Q78.32 22.01 79.4 22.01Q80.11 22.01 80.66 21.72Q81.2 21.43 81.52 20.8Q81.82 20.18 81.82 19.23V12.36H85.27V24.73H81.88V21.51H82.47Q81.88 23.15 80.79 24.07Q79.71 24.99 78.01 24.99ZM90.68 17.85V24.73H87.23V12.36H90.62V15.58H90.04Q90.62 13.94 91.71 13.01Q92.8 12.1 94.49 12.1Q95.82 12.1 96.79 12.66Q97.76 13.23 98.3 14.32Q98.83 15.41 98.83 16.98V24.73H95.38V17.62Q95.38 16.36 94.8 15.72Q94.2 15.07 93.11 15.07Q92.39 15.07 91.84 15.37Q91.29 15.66 90.99 16.28Q90.68 16.89 90.68 17.85Z"/>`,
    `</g>`,
  ].join("");
}

function buildStripPalm(baseX: number, baseY: number, leanX: number, scale: number): string {
  const topX = baseX + leanX;
  const topY = baseY - 175 * scale;
  const ctrlX = baseX + leanX * 0.35;
  const ctrlY = baseY - 92 * scale;
  const fronds = [
    [-92, -28, -50, -48],
    [-105, 10, -60, -16],
    [-76, 48, -38, 10],
    [94, -24, 52, -46],
    [106, 14, 62, -14],
    [74, 52, 36, 12],
    [-12, -78, -22, -46],
    [26, -74, 18, -42],
  ]
    .map(([dx, dy, cx1, cy1]) => {
      const ex = topX + dx * scale;
      const ey = topY + dy * scale;
      const qx = topX + cx1 * scale;
      const qy = topY + cy1 * scale;
      const qx2 = topX + cx1 * 0.72 * scale;
      const qy2 = topY + (cy1 + 20) * scale;
      return `<path d="M${topX} ${topY} Q${qx} ${qy} ${ex} ${ey} Q${qx2} ${qy2} ${topX} ${topY + 8 * scale} Z" fill="#1E0833"/>`;
    })
    .join("");

  return [
    `<g>`,
    `<path d="M${baseX - 9 * scale} ${baseY} Q${ctrlX - 6 * scale} ${ctrlY} ${topX - 3 * scale} ${topY} L${topX + 4 * scale} ${topY} Q${ctrlX + 7 * scale} ${ctrlY} ${baseX + 10 * scale} ${baseY} Z" fill="#1E0833"/>`,
    fronds,
    `</g>`,
  ].join("");
}

export function buildMemeSvg(): string {
  const skyline = [
    [104, 422, 46, 118],
    [154, 386, 54, 154],
    [212, 434, 44, 106],
    [422, 412, 50, 128],
    [476, 378, 56, 162],
    [536, 432, 46, 108],
    [796, 404, 52, 136],
    [852, 376, 58, 164],
  ]
    .map(([x, y, w, h], idx) => {
      const accent = idx % 2 === 0 ? "#67E8F9" : "#FF85C0";
      return [
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2E0B42" opacity="0.82"/>`,
        `<rect x="${x + 7}" y="${y + 12}" width="${w - 14}" height="4" fill="${accent}" opacity="0.65"/>`,
        `<rect x="${x + 10}" y="${y + 24}" width="${w - 20}" height="3" fill="#FFE066" opacity="0.45"/>`,
      ].join("");
    })
    .join("");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-label="Leonida Family Court Divorce Decree - He chose GTA VI - make.fun">`,
    `<defs>`,
    `<clipPath id="stripClip">`,
    `<rect x="56" y="262" width="912" height="326" rx="18"/>`,
    `</clipPath>`,
    `<linearGradient id="stripSky" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#3B0E54"/>`,
    `<stop offset="38%" stop-color="#B8257A"/>`,
    `<stop offset="74%" stop-color="#FF6B4A"/>`,
    `<stop offset="100%" stop-color="#FFD166"/>`,
    `</linearGradient>`,
    `<linearGradient id="stripSun" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#FFF3A8"/>`,
    `<stop offset="55%" stop-color="#FFAA4C"/>`,
    `<stop offset="100%" stop-color="#EC4899"/>`,
    `</linearGradient>`,
    `<mask id="stripSunSlices">`,
    `<rect x="0" y="0" width="1024" height="1024" fill="#FFFFFF"/>`,
    `<rect x="300" y="458" width="420" height="6" fill="#000000"/>`,
    `<rect x="300" y="478" width="420" height="9" fill="#000000"/>`,
    `<rect x="300" y="500" width="420" height="12" fill="#000000"/>`,
    `</mask>`,
    `<linearGradient id="gatorShades" x1="0" y1="0" x2="1" y2="1">`,
    `<stop offset="0%" stop-color="#67E8F9"/>`,
    `<stop offset="55%" stop-color="#06B6D4"/>`,
    `<stop offset="100%" stop-color="#0F172A"/>`,
    `</linearGradient>`,
    `</defs>`,

    // 1. Outer Warm Cream Court Document Card (100% Opaque)
    `<rect width="1024" height="1024" fill="#FDFBF4"/>`,
    `<rect x="24" y="24" width="976" height="976" rx="16" fill="none" stroke="#191419" stroke-width="3"/>`,
    `<rect x="34" y="34" width="956" height="956" rx="12" fill="none" stroke="#6B1D45" stroke-opacity="0.25" stroke-width="1.5"/>`,

    // 2. Top Court Header (y: 44..104)
    `<text x="60" y="80" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="23" letter-spacing="2.2" fill="#6B1D45">LEONIDA FAMILY COURT</text>`,
    `<text x="964" y="80" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="23" letter-spacing="2.2" fill="#6B1D45">DIVORCE DECREE</text>`,
    `<line x1="56" y1="98" x2="968" y2="98" stroke="#191419" stroke-width="2"/>`,
    `<line x1="56" y1="104" x2="968" y2="104" stroke="#6B1D45" stroke-opacity="0.65" stroke-width="1"/>`,

    // 3. Headline Gag (1-Second Laugh)
    `<text x="512" y="190" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="88" letter-spacing="-1.5" fill="#191419">He chose GTA VI.</text>`,
    `<text x="512" y="236" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="26" letter-spacing="2.4" fill="#881337">MARRIED 2013–2026&#160;&#160;•&#160;&#160;13 YEARS</text>`,

    // 4. Center Illustrated Strip (y: 262..588, clipped)
    `<g clip-path="url(#stripClip)">`,
    `<rect x="56" y="262" width="912" height="326" fill="url(#stripSky)"/>`,
    `<circle cx="508" cy="462" r="142" fill="url(#stripSun)" mask="url(#stripSunSlices)"/>`,
    skyline,
    buildStripPalm(88, 540, 28, 1.05),
    buildStripPalm(936, 540, -26, 0.98),
    // Warm courtroom/living-room floor strip
    `<rect x="56" y="534" width="912" height="54" fill="#F3E7D3"/>`,
    `<line x1="56" y1="534" x2="968" y2="534" stroke="#191419" stroke-width="2.5"/>`,

    // Left Half: Official make.fun Ghost Mascot as the Judge (large, unobstructed sparkle eyes & magenta star coin)
    buildMarkGhostGroup("translate(136, 294) scale(8.8)"),

    // Powdered White Judge's Wig perched strictly ABOVE ghost's sparkle eyes & clear of star coin
    `<g>`,
    `<path d="M188 340 Q180 302 220 296 Q240 282 262 288 Q284 282 304 296 Q340 302 332 340 Q338 362 324 374 Q314 352 308 326 Q262 316 216 326 Q210 358 194 388 Q174 376 178 352 Z" fill="#F8FAFC" stroke="#191419" stroke-width="4" stroke-linejoin="round"/>`,
    `<path d="M222 306 Q262 296 302 306" fill="none" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>`,
    `<path d="M184 352 Q196 348 206 356 M182 368 Q194 364 202 372" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>`,
    `<path d="M318 350 Q328 346 334 354" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>`,
    `</g>`,

    // Warm Mahogany Judge's Bench + Wooden Gavel
    `<g>`,
    // Sound block + Gavel on left of bench with comic impact ticks
    `<ellipse cx="144" cy="492" rx="22" ry="6" fill="#78350F" stroke="#191419" stroke-width="3"/>`,
    `<line x1="118" y1="438" x2="106" y2="424" stroke="#FEF08A" stroke-width="3.5" stroke-linecap="round"/>`,
    `<line x1="172" y1="430" x2="184" y2="416" stroke="#FEF08A" stroke-width="3.5" stroke-linecap="round"/>`,
    `<g transform="translate(132, 434) rotate(-28)">`,
    `<rect x="16" y="16" width="10" height="44" rx="4" fill="#B45309" stroke="#191419" stroke-width="3"/>`,
    `<rect x="0" y="0" width="42" height="18" rx="6" fill="#92400E" stroke="#191419" stroke-width="3"/>`,
    `<line x1="8" y1="2" x2="8" y2="16" stroke="#FDE68A" stroke-width="2" opacity="0.65"/>`,
    `<line x1="34" y1="2" x2="34" y2="16" stroke="#FDE68A" stroke-width="2" opacity="0.65"/>`,
    `</g>`,
    // Bench body
    `<rect x="86" y="492" width="376" height="18" rx="5" fill="#9A4E24" stroke="#191419" stroke-width="3.5"/>`,
    `<rect x="100" y="510" width="348" height="78" fill="#6F3416" stroke="#191419" stroke-width="3.5"/>`,
    `<rect x="118" y="524" width="312" height="50" rx="4" fill="#5C2910" stroke="#3B1808" stroke-width="2"/>`,
    `</g>`,

    // Official Tilted Rubber Stamp Badge: GRANTED
    `<g transform="translate(466, 318) rotate(-11)">`,
    `<rect x="-86" y="-27" width="172" height="54" rx="8" fill="#FDFBF4" fill-opacity="0.96" stroke="#BE123C" stroke-width="4"/>`,
    `<rect x="-80" y="-21" width="160" height="42" rx="5" fill="none" stroke="#C41C83" stroke-width="1.5"/>`,
    `<text x="0" y="10" text-anchor="middle" font-family="'Segoe UI', 'Arial Black', Arial, sans-serif" font-weight="900" font-size="30" letter-spacing="2.2" fill="#BE123C">GRANTED</text>`,
    `</g>`,

    // Right Half: Retro Vice City Living-Room Sofa + Happy Leonida Gator + GTA VI Case + Keys
    `<g>`,
    // Sofa legs
    `<line x1="544" y1="542" x2="536" y2="568" stroke="#191419" stroke-width="6" stroke-linecap="round"/>`,
    `<line x1="844" y1="542" x2="852" y2="568" stroke="#191419" stroke-width="6" stroke-linecap="round"/>`,
    // Sofa back & cushions
    `<rect x="526" y="392" width="340" height="114" rx="24" fill="#0F766E" stroke="#191419" stroke-width="4"/>`,
    `<rect x="546" y="406" width="300" height="72" rx="14" fill="#14B8A6" stroke="#191419" stroke-width="2.5"/>`,

    // Happy Leonida Gator lounging on the sofa
    `<g>`,
    // Gator torso & scaly belly
    `<path d="M642 496 L654 416 Q708 398 762 418 L774 496 Z" fill="#16A34A" stroke="#191419" stroke-width="4" stroke-linejoin="round"/>`,
    `<path d="M676 420 Q708 412 740 420 L746 496 L670 496 Z" fill="#BBF7D0" stroke="#191419" stroke-width="3"/>`,
    // Gator head & wide toothy grin
    `<path d="M666 322 Q680 296 714 298 Q750 300 764 328 Q788 362 778 404 Q762 442 708 442 Q644 442 626 402 Q614 374 636 356 Q652 344 666 322 Z" fill="#22C55E" stroke="#191419" stroke-width="4.5" stroke-linejoin="round"/>`,
    `<path d="M630 390 Q662 410 714 406 Q748 404 762 386 Q756 432 706 436 Q648 436 630 390 Z" fill="#BBF7D0" stroke="#191419" stroke-width="3.5"/>`,
    `<path d="M634 382 Q682 400 734 384" fill="none" stroke="#191419" stroke-width="4" stroke-linecap="round"/>`,
    `<polygon points="646,388 653,402 660,389" fill="#FFFFFF" stroke="#191419" stroke-width="2"/>`,
    `<polygon points="668,392 675,406 682,393" fill="#FFFFFF" stroke="#191419" stroke-width="2"/>`,
    `<polygon points="690,393 697,407 704,393" fill="#FFFFFF" stroke="#191419" stroke-width="2"/>`,
    `<polygon points="712,390 719,404 726,389" fill="#FFFFFF" stroke="#191419" stroke-width="2"/>`,
    `<circle cx="642" cy="368" r="3" fill="#14532D"/>`,
    `<circle cx="656" cy="366" r="3" fill="#14532D"/>`,
    // Cyan Vice City aviator shades
    `<path d="M656 328 L768 328" stroke="#FACC15" stroke-width="4.5" stroke-linecap="round"/>`,
    `<path d="M658 328 Q655 360 684 362 Q706 362 706 336 Q706 326 658 328 Z" fill="url(#gatorShades)" stroke="#FACC15" stroke-width="4"/>`,
    `<path d="M716 336 Q716 362 738 362 Q766 360 762 328 Q716 326 716 336 Z" fill="url(#gatorShades)" stroke="#FACC15" stroke-width="4"/>`,
    `<line x1="668" y1="334" x2="686" y2="352" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75"/>`,
    `<line x1="726" y1="334" x2="744" y2="352" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.75"/>`,
    // Gator arms hugging gaming controller
    `<path d="M654 446 Q664 476 686 476" fill="none" stroke="#22C55E" stroke-width="18" stroke-linecap="round"/>`,
    `<path d="M760 446 Q750 476 728 476" fill="none" stroke="#22C55E" stroke-width="18" stroke-linecap="round"/>`,
    `<g transform="translate(668, 448)">`,
    `<path d="M10 14 Q10 4 26 4 L60 4 Q76 4 76 14 L82 40 Q84 52 72 52 Q62 52 56 40 L30 40 Q24 52 14 52 Q2 52 4 40 Z" fill="#1E1B2E" stroke="#191419" stroke-width="3.5" stroke-linejoin="round"/>`,
    `<rect x="18" y="17" width="14" height="5" rx="2" fill="#22D3EE"/>`,
    `<rect x="22.5" y="12.5" width="5" height="14" rx="2" fill="#22D3EE"/>`,
    `<circle cx="60" cy="16" r="3.5" fill="#FF33A8"/>`,
    `<circle cx="67" cy="22" r="3.5" fill="#FACC15"/>`,
    `<circle cx="53" cy="22" r="3.5" fill="#22D3EE"/>`,
    `<circle cx="60" cy="28" r="3.5" fill="#34D399"/>`,
    `</g>`,
    `</g>`,

    // GTA VI Game Case propped on left couch cushion (clean margin around GTA VI)
    `<g transform="translate(546, 422) rotate(-8)">`,
    `<rect x="0" y="0" width="58" height="70" rx="5" fill="#FF66B2" stroke="#191419" stroke-width="3"/>`,
    `<rect x="4" y="4" width="50" height="16" rx="2" fill="#3B0E54"/>`,
    `<rect x="4" y="22" width="50" height="44" rx="2" fill="#FFD166"/>`,
    `<text x="29" y="49" text-anchor="middle" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="11.5" letter-spacing="0.2" fill="#191419">GTA VI</text>`,
    `</g>`,

    // Sofa armrests & front base (coral Vice City piping)
    `<rect x="514" y="454" width="38" height="88" rx="14" fill="#0F766E" stroke="#191419" stroke-width="4"/>`,
    `<rect x="840" y="454" width="38" height="88" rx="14" fill="#0F766E" stroke="#191419" stroke-width="4"/>`,
    `<rect x="546" y="490" width="300" height="24" rx="8" fill="#FF6B8B" stroke="#191419" stroke-width="3.5"/>`,
    `<rect x="542" y="512" width="308" height="32" rx="8" fill="#0D5C5E" stroke="#191419" stroke-width="4"/>`,
    `</g>`,

    // Side Table on Far Right + House Keys with SPOUSE'S Tag
    `<g>`,
    `<rect x="888" y="486" width="66" height="12" rx="4" fill="#9A4E24" stroke="#191419" stroke-width="3"/>`,
    `<line x1="900" y1="498" x2="896" y2="564" stroke="#191419" stroke-width="5" stroke-linecap="round"/>`,
    `<line x1="942" y1="498" x2="946" y2="564" stroke="#191419" stroke-width="5" stroke-linecap="round"/>`,
    // Gold key ring + 2 unmistakable notched house keys resting on the side table
    `<circle cx="916" cy="472" r="9" fill="none" stroke="#FACC15" stroke-width="4"/>`,
    `<circle cx="916" cy="472" r="9" fill="none" stroke="#191419" stroke-width="1.2"/>`,
    `<g transform="translate(912, 478) rotate(16)">`,
    `<path d="M-3 0 L3 0 L3 15 L9 15 L9 19 L4 19 L4 22 L8 22 L8 26 L4 26 L4 29 L9 29 L9 33 L-3 33 Z" fill="#FACC15" stroke="#191419" stroke-width="1.8" stroke-linejoin="round"/>`,
    `</g>`,
    `<g transform="translate(920, 478) rotate(-14)">`,
    `<path d="M-3 0 L3 0 L3 34 L-9 34 L-9 30 L-4 30 L-4 27 L-8 27 L-8 23 L-4 23 L-4 19 L-9 19 L-9 15 L-3 15 Z" fill="#FDE047" stroke="#191419" stroke-width="1.8" stroke-linejoin="round"/>`,
    `</g>`,
    // Crisp cream luggage tag reading SPOUSE'S with generous grommet clearance
    `<g transform="translate(846, 418)">`,
    `<line x1="70" y1="36" x2="70" y2="46" stroke="#191419" stroke-width="2.5"/>`,
    `<rect x="0" y="0" width="114" height="36" rx="7" fill="#FDFBF4" stroke="#191419" stroke-width="3"/>`,
    `<circle cx="12" cy="18" r="3.5" fill="#C41C83"/>`,
    `<text x="66" y="24" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="15.5" letter-spacing="0.4" fill="#191419">SPOUSE'S</text>`,
    `</g>`,
    `</g>`,
    `</g>`,
    // Crisp outer border of center strip
    `<rect x="56" y="262" width="912" height="326" rx="18" fill="none" stroke="#191419" stroke-width="3"/>`,

    // 5. Deadpan Court Findings (ONLY 3 crisp single-line punches)
    `<text x="64" y="646" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="27" fill="#191419"><tspan fill="#881337" font-weight="900">1.</tspan>&#160;&#160;He deleted 214 GB of wedding photos for Vice City.</text>`,
    `<text x="64" y="694" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="26" fill="#27202B"><tspan fill="#881337" font-weight="900">2.</tspan>&#160;&#160;Called in sick 5 days with “Vice City flu.”</text>`,
    `<text x="64" y="742" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="24" fill="#27202B"><tspan fill="#881337" font-weight="900">3.</tspan>&#160;&#160;Spouse gets the house. He keeps the couch, gator, and Jason &amp; Lucia.</text>`,

    // 6. Delay Strikeout Line
    `<line x1="56" y1="764" x2="968" y2="764" stroke="#6B1D45" stroke-opacity="0.3" stroke-width="1.5"/>`,
    `<text x="192" y="802" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="23" letter-spacing="1.1" fill="#6B1D45">HEARING MOVED:</text>`,
    `<text x="410" y="802" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="24" fill="#78716C">FALL 2025</text>`,
    `<line x1="342" y1="794" x2="478" y2="794" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round"/>`,
    `<text x="588" y="802" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="24" fill="#78716C">MAY 2026</text>`,
    `<line x1="522" y1="794" x2="654" y2="794" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round"/>`,
    `<rect x="688" y="775" width="218" height="38" rx="8" fill="#FEF08A" stroke="#191419" stroke-width="2"/>`,
    `<text x="797" y="802" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="24" letter-spacing="0.8" fill="#191419">19 NOV 2026</text>`,

    // 7. Bottom 18% Dark Settlement Payoff Bar (y: 826..976, optically centered)
    `<rect x="56" y="826" width="912" height="150" rx="16" fill="#1C1226" stroke="#C41C83" stroke-width="2.5"/>`,
    `<text x="84" y="889" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="30" fill="#FFFFFF">My AI agent paid with real money</text>`,
    `<text x="84" y="939" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="30" fill="#FFFFFF">it won in</text>`,
    buildWordmarkGroup("translate(222, 889) scale(2.04)"),
    `<text x="436" y="939" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="30" fill="#FFFFFF">bounties.</text>`,
    `<line x1="698" y1="850" x2="698" y2="952" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="1.5"/>`,
    `<text x="833" y="879" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="19" letter-spacing="1.6" fill="#F0ABFC">SETTLEMENT + GAME</text>`,
    `<text x="833" y="945" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="58" fill="#FFFFFF">$79.99</text>`,

    `</svg>`,
  ].join("\n");
}

function handleRenderSvg(outPath: string): void {
  const resolved = path.resolve(outPath);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, buildMemeSvg(), "utf8");
}

function validateAndCopyPost(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR || DEFAULT_BOT_DIR;
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || DEFAULT_OUTPUT_DIR;
  const srcPath = path.join(botDir, "POST.json");

  if (!fs.existsSync(srcPath)) {
    throw new Error(`Missing POST.json at ${srcPath}`);
  }

  const raw = fs.readFileSync(srcPath, "utf8");
  const normalized = raw.replace(/^\uFEFF/, "");
  let parsed: unknown;
  try {
    parsed = JSON.parse(normalized);
  } catch (err) {
    throw new Error(`Invalid JSON in ${srcPath}: ${(err as Error).message}`);
  }

  if (
    parsed === null ||
    typeof parsed !== "object" ||
    Array.isArray(parsed) ||
    typeof (parsed as { url?: unknown }).url !== "string" ||
    (parsed as { url: string }).url.trim().length === 0
  ) {
    throw new Error(`POST.json must be a JSON object with a non-empty string "url"`);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  const destPath = path.join(outputDir, "POST.json");
  fs.writeFileSync(destPath, raw, "utf8");
}

function run(): void {
  const args = process.argv.slice(2);
  const renderFlagIndex = args.indexOf("--render-svg");
  if (renderFlagIndex !== -1) {
    const outPath = args[renderFlagIndex + 1];
    if (!outPath) {
      process.stderr.write("Usage: node main.ts --render-svg <outPath>\n");
      process.exit(1);
    }
    handleRenderSvg(outPath);
    return;
  }

  validateAndCopyPost();
}

try {
  run();
} catch (err) {
  process.stderr.write(`${(err as Error).message}\n`);
  process.exit(1);
}
