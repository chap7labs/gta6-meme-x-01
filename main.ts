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

function buildUsdcCoin(cx: number, cy: number, r: number): string {
  const fontSize = Math.max(24, Math.round(r * 1.15));
  const dy = Math.round(r * 0.4);
  return [
    `<g>`,
    `<circle cx="${cx}" cy="${cy}" r="${r + 2}" fill="#191419"/>`,
    `<circle cx="${cx}" cy="${cy}" r="${r - 2}" fill="#10B981" stroke="#FACC15" stroke-width="3.6"/>`,
    `<text x="${cx}" y="${cy + dy}" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="${fontSize}" fill="#FFFFFF" stroke="#064E3B" stroke-width="2.5" paint-order="stroke fill">$</text>`,
    `</g>`,
  ].join("");
}

function buildSparkle(cx: number, cy: number, size: number, color: string): string {
  const s = size;
  return `<path d="M${cx} ${cy - s} Q${cx + s * 0.16} ${cy - s * 0.16} ${cx + s} ${cy} Q${cx + s * 0.16} ${cy + s * 0.16} ${cx} ${cy + s} Q${cx - s * 0.16} ${cy + s * 0.16} ${cx - s} ${cy} Q${cx - s * 0.16} ${cy - s * 0.16} ${cx} ${cy - s} Z" fill="${color}"/>`;
}

function buildPalmTree(baseX: number, baseY: number, leanX: number, scale: number): string {
  const topX = baseX + leanX;
  const topY = baseY - 270 * scale;
  const ctrlX = baseX + leanX * 0.35;
  const ctrlY = baseY - 140 * scale;
  const fronds = [
    [-115, -38, -62, -62],
    [-130, 12, -74, -22],
    [-95, 62, -48, 12],
    [118, -32, 64, -58],
    [132, 18, 76, -18],
    [92, 68, 46, 16],
    [-16, -98, -28, -58],
    [32, -92, 22, -52],
  ]
    .map(([dx, dy, cx1, cy1]) => {
      const ex = topX + dx * scale;
      const ey = topY + dy * scale;
      const qx = topX + cx1 * scale;
      const qy = topY + cy1 * scale;
      const qx2 = topX + cx1 * 0.72 * scale;
      const qy2 = topY + (cy1 + 26) * scale;
      return `<path d="M${topX} ${topY} Q${qx} ${qy} ${ex} ${ey} Q${qx2} ${qy2} ${topX} ${topY + 10 * scale} Z" fill="#100520"/>`;
    })
    .join("");

  return [
    `<g>`,
    `<path d="M${baseX - 13 * scale} ${baseY} Q${ctrlX - 8 * scale} ${ctrlY} ${topX - 4 * scale} ${topY} L${topX + 5 * scale} ${topY} Q${ctrlX + 10 * scale} ${ctrlY} ${baseX + 14 * scale} ${baseY} Z" fill="#100520"/>`,
    fronds,
    `</g>`,
  ].join("");
}

export function buildMemeSvg(): string {
  const stars = [
    [92, 58, 2.6],
    [168, 96, 2.2],
    [255, 42, 3.0],
    [340, 74, 2.0],
    [712, 48, 2.8],
    [820, 86, 2.4],
    [905, 52, 3.1],
    [955, 118, 2.2],
    [118, 210, 2.3],
    [888, 228, 2.5],
  ]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FEF3C7" opacity="0.65"/>`)
    .join("");

  const skyLineBuildings = [
    [76, 448, 58, 150],
    [138, 392, 64, 206],
    [206, 462, 52, 136],
    [262, 495, 56, 103],
    [682, 488, 56, 110],
    [742, 414, 68, 184],
    [814, 456, 58, 142],
    [876, 386, 74, 212],
  ]
    .map(([x, y, w, h], idx) => {
      const accent = idx % 2 === 0 ? "#22D3EE" : "#FF4DA6";
      return [
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#220B3B"/>`,
        `<rect x="${x + 8}" y="${y + 14}" width="${w - 16}" height="5" fill="${accent}" opacity="0.55"/>`,
        `<rect x="${x + 12}" y="${y + 30}" width="${w - 24}" height="4" fill="#FDE68A" opacity="0.35"/>`,
        `<rect x="${x + 12}" y="${y + 44}" width="${w - 24}" height="4" fill="${accent}" opacity="0.35"/>`,
      ].join("");
    })
    .join("");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-label="MISSION PASSED Vice City GTA 6 Meme on make.fun">`,
    `<defs>`,
    `<linearGradient id="viceSky" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#130624"/>`,
    `<stop offset="25%" stop-color="#4A1168"/>`,
    `<stop offset="45%" stop-color="#C41C83"/>`,
    `<stop offset="56%" stop-color="#FF6B4A"/>`,
    `<stop offset="63%" stop-color="#FFC65C"/>`,
    `<stop offset="100%" stop-color="#120724"/>`,
    `</linearGradient>`,
    `<radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">`,
    `<stop offset="0%" stop-color="#FFE066" stop-opacity="0.55"/>`,
    `<stop offset="65%" stop-color="#FF5E7E" stop-opacity="0.18"/>`,
    `<stop offset="100%" stop-color="#FF5E7E" stop-opacity="0"/>`,
    `</radialGradient>`,
    `<linearGradient id="sunDisc" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#FFF5A8"/>`,
    `<stop offset="48%" stop-color="#FF9F43"/>`,
    `<stop offset="100%" stop-color="#EC1C82"/>`,
    `</linearGradient>`,
    `<mask id="sunSlices">`,
    `<rect x="0" y="0" width="1024" height="1024" fill="#FFFFFF"/>`,
    `<rect x="290" y="476" width="444" height="8" fill="#000000"/>`,
    `<rect x="290" y="502" width="444" height="11" fill="#000000"/>`,
    `<rect x="290" y="530" width="444" height="14" fill="#000000"/>`,
    `<rect x="290" y="560" width="444" height="18" fill="#000000"/>`,
    `</mask>`,
    `<linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#1C0C33"/>`,
    `<stop offset="100%" stop-color="#0B0417"/>`,
    `</linearGradient>`,
    `<linearGradient id="goldHud" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#FFF7B2"/>`,
    `<stop offset="48%" stop-color="#FACC15"/>`,
    `<stop offset="100%" stop-color="#EA580C"/>`,
    `</linearGradient>`,
    `<linearGradient id="hudBorder" x1="0" y1="0" x2="1" y2="0">`,
    `<stop offset="0%" stop-color="#EC4899"/>`,
    `<stop offset="50%" stop-color="#38BDF8"/>`,
    `<stop offset="100%" stop-color="#EC4899"/>`,
    `</linearGradient>`,
    `<linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#FF66BE"/>`,
    `<stop offset="48%" stop-color="#E11D8B"/>`,
    `<stop offset="100%" stop-color="#83185E"/>`,
    `</linearGradient>`,
    `<linearGradient id="carHood" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#FF8AD0"/>`,
    `<stop offset="55%" stop-color="#EC2892"/>`,
    `<stop offset="100%" stop-color="#B0156F"/>`,
    `</linearGradient>`,
    `<linearGradient id="usdcCoinGrad" x1="0" y1="0" x2="1" y2="1">`,
    `<stop offset="0%" stop-color="#34D399"/>`,
    `<stop offset="100%" stop-color="#059669"/>`,
    `</linearGradient>`,
    `<linearGradient id="aviatorLens" x1="0" y1="0" x2="1" y2="1">`,
    `<stop offset="0%" stop-color="#67E8F9"/>`,
    `<stop offset="55%" stop-color="#06B6D4"/>`,
    `<stop offset="100%" stop-color="#0F172A"/>`,
    `</linearGradient>`,
    `<linearGradient id="headlightCone" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0%" stop-color="#A5F3FC" stop-opacity="0.6"/>`,
    `<stop offset="45%" stop-color="#38BDF8" stop-opacity="0.22"/>`,
    `<stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>`,
    `</linearGradient>`,
    `<radialGradient id="coinHalo" cx="50%" cy="50%" r="50%">`,
    `<stop offset="0%" stop-color="#FF33A8" stop-opacity="0.55"/>`,
    `<stop offset="55%" stop-color="#FACC15" stop-opacity="0.24"/>`,
    `<stop offset="100%" stop-color="#FACC15" stop-opacity="0"/>`,
    `</radialGradient>`,
    `</defs>`,

    // Layer 1: Background sky & retro synthwave sun
    `<rect width="1024" height="1024" fill="url(#viceSky)"/>`,
    stars,
    `<circle cx="512" cy="492" r="245" fill="url(#sunGlow)"/>`,
    `<circle cx="512" cy="492" r="188" fill="url(#sunDisc)" mask="url(#sunSlices)"/>`,

    // Layer 2: Art Deco Skyline & Highway Sign
    skyLineBuildings,
    // Distant horizon neon strip
    `<rect x="0" y="592" width="1024" height="6" fill="#FF66C4" opacity="0.65"/>`,

    // Florida / Vice City Highway Sign (right mid-ground, >= 24px crisp text, clear of palms)
    `<g>`,
    `<rect x="838" y="346" width="10" height="248" fill="#1D1230" stroke="#140B24" stroke-width="2"/>`,
    `<rect x="912" y="346" width="10" height="248" fill="#1D1230" stroke="#140B24" stroke-width="2"/>`,
    `<rect x="768" y="256" width="214" height="92" rx="12" fill="#0D5C5E" stroke="#140B24" stroke-width="4"/>`,
    `<rect x="775" y="263" width="200" height="78" rx="8" fill="none" stroke="#CCFBF1" stroke-width="2.5"/>`,
    `<text x="875" y="296" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="25" fill="#FFFFFF">VICE CITY</text>`,
    `<text x="875" y="328" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="24" fill="#99F6E4">LEONIDA</text>`,
    `</g>`,

    // Layer 3: Ocean Beach Boulevard Asphalt & Perspective Road Grid (full bottom bleed)
    `<rect x="0" y="596" width="1024" height="428" fill="url(#roadGrad)"/>`,
    `<polygon points="270,596 754,596 1024,848 1024,1024 0,1024 0,848" fill="#140829"/>`,
    `<line x1="270" y1="596" x2="-10" y2="848" stroke="#22D3EE" stroke-width="5"/>`,
    `<line x1="754" y1="596" x2="1034" y2="848" stroke="#EC4899" stroke-width="5"/>`,
    `<line x1="512" y1="596" x2="512" y2="624" stroke="#FDE047" stroke-width="5" stroke-linecap="round"/>`,
    `<line x1="512" y1="646" x2="512" y2="682" stroke="#FDE047" stroke-width="6" stroke-linecap="round"/>`,
    // Palm trees framing left & right edges (clear of highway sign)
    buildPalmTree(54, 622, 46, 1.05),
    buildPalmTree(18, 665, 22, 0.85),
    buildPalmTree(988, 632, -26, 0.72),
    buildPalmTree(950, 672, -16, 0.58),

    // Ground shadow + multi-layered warm-cyan headlight glow beams on asphalt
    `<ellipse cx="512" cy="792" rx="348" ry="30" fill="#05010D" opacity="0.82"/>`,
    `<polygon points="206,672 288,672 346,816 106,816" fill="url(#headlightCone)"/>`,
    `<polygon points="736,672 818,672 918,816 678,816" fill="url(#headlightCone)"/>`,
    `<ellipse cx="242" cy="776" rx="74" ry="18" fill="#67E8F9" opacity="0.22"/>`,
    `<ellipse cx="782" cy="776" rx="74" ry="18" fill="#67E8F9" opacity="0.22"/>`,

    // Layer 4: Hero Foreground Scene (Seats -> Ghost & Gator -> Convertible Front)
    // Convertible rear deck & plush seats
    `<path d="M214 526 Q218 476 266 476 L758 476 Q806 476 810 526 L824 574 L200 574 Z" fill="#4A1148" stroke="#191419" stroke-width="5"/>`,
    `<rect x="266" y="454" width="136" height="90" rx="22" fill="#3B0D38" stroke="#191419" stroke-width="5"/>`,
    `<rect x="278" y="464" width="112" height="68" rx="14" fill="#5E165A"/>`,
    `<rect x="614" y="454" width="136" height="90" rx="22" fill="#3B0D38" stroke="#191419" stroke-width="5"/>`,
    `<rect x="626" y="464" width="112" height="68" rx="14" fill="#5E165A"/>`,

    // Soft halo behind the ghost's raised magenta star coin + elevated Official make.fun Ghost Mascot
    `<circle cx="510" cy="361" r="96" fill="url(#coinHalo)"/>`,
    buildMarkGhostGroup("translate(218, 214) scale(11.0)"),

    // Passenger Seat: Leonida Florida Gator with Neon Aviators & Gamepad
    `<g>`,
    // Tropical shirt torso & collar
    `<path d="M598 552 L614 472 Q682 454 748 474 L768 552 Z" fill="#0F766E" stroke="#191419" stroke-width="5" stroke-linejoin="round"/>`,
    `<path d="M640 470 L682 528 L724 470 Z" fill="#F472B6" stroke="#191419" stroke-width="4" stroke-linejoin="round"/>`,
    // Gator head & snout
    `<path d="M636 332 Q650 302 686 306 Q724 308 738 338 Q766 376 756 426 Q742 478 682 478 Q610 478 588 430 Q574 398 598 378 Q618 364 636 332 Z" fill="#22C55E" stroke="#191419" stroke-width="5.5" stroke-linejoin="round"/>`,
    // Pale green jaw & belly highlight
    `<path d="M592 414 Q628 436 688 432 Q726 430 742 410 Q736 462 678 468 Q612 468 592 414 Z" fill="#BBF7D0" stroke="#191419" stroke-width="4"/>`,
    // Toothy grin
    `<path d="M596 404 Q648 426 708 408" fill="none" stroke="#191419" stroke-width="5" stroke-linecap="round"/>`,
    `<polygon points="610,410 618,426 626,412" fill="#FFFFFF" stroke="#191419" stroke-width="2.2"/>`,
    `<polygon points="634,415 642,432 650,416" fill="#FFFFFF" stroke="#191419" stroke-width="2.2"/>`,
    `<polygon points="658,416 666,433 674,416" fill="#FFFFFF" stroke="#191419" stroke-width="2.2"/>`,
    `<polygon points="682,414 690,430 698,412" fill="#FFFFFF" stroke="#191419" stroke-width="2.2"/>`,
    // Nostril dots
    `<circle cx="606" cy="388" r="3.5" fill="#14532D"/>`,
    `<circle cx="622" cy="386" r="3.5" fill="#14532D"/>`,
    // Neon-cyan Vice City aviator sunglasses
    `<path d="M622 342 L744 342" stroke="#FACC15" stroke-width="5" stroke-linecap="round"/>`,
    `<path d="M624 342 Q620 378 652 380 Q676 380 676 350 Q676 340 624 342 Z" fill="url(#aviatorLens)" stroke="#FACC15" stroke-width="4.5"/>`,
    `<path d="M686 350 Q686 380 710 380 Q742 378 738 342 Q686 340 686 350 Z" fill="url(#aviatorLens)" stroke="#FACC15" stroke-width="4.5"/>`,
    `<line x1="636" y1="348" x2="656" y2="370" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>`,
    `<line x1="698" y1="348" x2="718" y2="370" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>`,
    // Gator arm holding gamepad controller
    `<path d="M736 488 Q766 472 778 446" fill="none" stroke="#22C55E" stroke-width="24" stroke-linecap="round"/>`,
    `<path d="M736 488 Q766 472 778 446" fill="none" stroke="#191419" stroke-width="5" stroke-linecap="round" opacity="0.25"/>`,
    // Gamepad controller
    `<g transform="translate(734, 396) rotate(-14)">`,
    `<path d="M12 18 Q12 6 30 6 L72 6 Q90 6 90 18 L96 48 Q98 62 84 62 Q74 62 66 48 L36 48 Q28 62 18 62 Q4 62 6 48 Z" fill="#1E1B2E" stroke="#191419" stroke-width="4.5" stroke-linejoin="round"/>`,
    `<rect x="22" y="21" width="16" height="6" rx="2" fill="#22D3EE"/>`,
    `<rect x="27" y="16" width="6" height="16" rx="2" fill="#22D3EE"/>`,
    `<circle cx="70" cy="20" r="4" fill="#EC4899"/>`,
    `<circle cx="78" cy="27" r="4" fill="#FACC15"/>`,
    `<circle cx="62" cy="27" r="4" fill="#22D3EE"/>`,
    `<circle cx="70" cy="34" r="4" fill="#34D399"/>`,
    `</g>`,
    `</g>`,

    // Floating $ coins with shiny gold rims & sparkles (100% clear of faces, gamepad & sign)
    buildUsdcCoin(246, 282, 24),
    buildUsdcCoin(554, 274, 24),
    buildUsdcCoin(172, 366, 26),
    buildUsdcCoin(164, 462, 22),
    buildSparkle(492, 258, 13, "#FEF08A"),
    buildSparkle(538, 306, 10, "#FFFFFF"),
    buildSparkle(210, 318, 12, "#6EE7B7"),
    buildSparkle(602, 282, 11, "#F472B6"),

    // Steering Wheel (strictly below ghost sparkle eyes)
    `<circle cx="354" cy="530" r="42" fill="none" stroke="#191419" stroke-width="14"/>`,
    `<circle cx="354" cy="530" r="42" fill="none" stroke="#312E81" stroke-width="7"/>`,
    `<line x1="316" y1="530" x2="392" y2="530" stroke="#191419" stroke-width="8"/>`,
    `<circle cx="354" cy="530" r="11" fill="#EC4899" stroke="#191419" stroke-width="4"/>`,

    // Low-slung Convertible Windshield (100% below ghost's elevated round hand & star coin)
    `<path d="M214 556 L240 492 Q512 484 784 492 L810 556 Z" fill="#38BDF8" fill-opacity="0.22" stroke="#E2E8F0" stroke-width="9" stroke-linejoin="round"/>`,
    `<path d="M214 556 L240 492 Q512 484 784 492 L810 556" fill="none" stroke="#191419" stroke-width="4" stroke-linejoin="round"/>`,
    `<line x1="274" y1="500" x2="254" y2="546" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" opacity="0.55"/>`,
    `<line x1="296" y1="500" x2="280" y2="538" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.4"/>`,

    // Side Mirrors
    `<rect x="148" y="532" width="54" height="28" rx="12" fill="#E11D8B" stroke="#191419" stroke-width="4.5"/>`,
    `<rect x="822" y="532" width="54" height="28" rx="12" fill="#E11D8B" stroke="#191419" stroke-width="4.5"/>`,

    // Front Tires
    `<rect x="192" y="740" width="84" height="64" rx="16" fill="#181224" stroke="#090410" stroke-width="4"/>`,
    `<rect x="748" y="740" width="84" height="64" rx="16" fill="#181224" stroke="#090410" stroke-width="4"/>`,

    // Hot-Pink Vice City Convertible Hood & Front Bumper
    `<path d="M188 558 Q512 536 836 558 L860 658 Q868 748 824 776 L200 776 Q156 748 164 658 Z" fill="url(#carBody)" stroke="#191419" stroke-width="5.5" stroke-linejoin="round"/>`,
    // Sculpted hood panel + glossy Vice City specular sheen highlights
    `<path d="M242 558 Q512 542 782 558 L734 646 Q512 658 290 646 Z" fill="url(#carHood)" stroke="#191419" stroke-width="4" stroke-linejoin="round"/>`,
    `<polygon points="300,564 358,560 326,638 286,636" fill="#FFFFFF" opacity="0.18"/>`,
    `<polygon points="666,560 724,564 738,636 698,638" fill="#FFFFFF" opacity="0.14"/>`,
    `<path d="M254 562 Q512 547 770 562" fill="none" stroke="#FDE8F5" stroke-width="3.5" opacity="0.7" stroke-linecap="round"/>`,
    `<line x1="392" y1="560" x2="366" y2="634" stroke="#FBCFE8" stroke-width="3.5" opacity="0.7" stroke-linecap="round"/>`,
    `<line x1="632" y1="560" x2="658" y2="634" stroke="#FBCFE8" stroke-width="3.5" opacity="0.7" stroke-linecap="round"/>`,
    // Twin Headlights
    `<rect x="194" y="628" width="96" height="44" rx="14" fill="#0F172A" stroke="#191419" stroke-width="4.5"/>`,
    `<rect x="204" y="637" width="76" height="26" rx="8" fill="#E0F2FE" stroke="#38BDF8" stroke-width="3"/>`,
    `<rect x="734" y="628" width="96" height="44" rx="14" fill="#0F172A" stroke="#191419" stroke-width="4.5"/>`,
    `<rect x="744" y="637" width="76" height="26" rx="8" fill="#E0F2FE" stroke="#38BDF8" stroke-width="3"/>`,
    // Front Air Grille
    `<rect x="334" y="662" width="356" height="72" rx="16" fill="#180D29" stroke="#191419" stroke-width="4.5"/>`,
    `<line x1="354" y1="684" x2="670" y2="684" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>`,
    `<line x1="354" y1="708" x2="670" y2="708" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>`,
    // Chrome bumper lip
    `<rect x="218" y="756" width="588" height="16" rx="8" fill="#E2E8F0" stroke="#191419" stroke-width="4"/>`,

    // Front Vanity License Plate: GTA 6 (vertically centered in cream area)
    `<rect x="430" y="700" width="164" height="68" rx="10" fill="#FEF9C3" stroke="#191419" stroke-width="4.5"/>`,
    `<rect x="434" y="704" width="156" height="12" rx="4" fill="#10B981"/>`,
    `<text x="512" y="751" text-anchor="middle" font-family="'Arial Black', Impact, 'Segoe UI', sans-serif" font-weight="900" font-size="34" letter-spacing="2" fill="#140B24">GTA 6</text>`,

    // Layer 5: Top GTA "MISSION PASSED!" HUD Zone
    `<text x="516" y="100" text-anchor="middle" font-family="Impact, 'Arial Black', 'Segoe UI', sans-serif" font-weight="900" font-size="84" letter-spacing="2" fill="#090312">MISSION PASSED!</text>`,
    `<text x="512" y="94" text-anchor="middle" font-family="Impact, 'Arial Black', 'Segoe UI', sans-serif" font-weight="900" font-size="84" letter-spacing="2" fill="url(#goldHud)" stroke="#140B24" stroke-width="11" paint-order="stroke fill" stroke-linejoin="round">MISSION PASSED!</text>`,

    `<text x="512" y="146" text-anchor="middle" font-family="'Segoe UI', 'Arial Black', Arial, sans-serif" font-weight="900" font-size="31" letter-spacing="1.2" fill="#FFFFFF" stroke="#140B24" stroke-width="7" paint-order="stroke fill" stroke-linejoin="round"><tspan fill="#FFE066">RESPECT +</tspan>&#160;&#160;•&#160;&#160;CALLED IN SICK FOR GTA 6</text>`,

    // Reward Pill (920px wide centered, crisp #FF33A8 wordmark dot)
    `<rect x="52" y="168" width="920" height="68" rx="34" fill="#120A21" fill-opacity="0.94" stroke="#FF33A8" stroke-width="3.5"/>`,
    `<text x="688" y="212" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="27" letter-spacing="0.4" fill="#34D399">+$79.99 REAL MONEY<tspan fill="#FFFFFF">&#160;&#160;•&#160;&#160;AI AGENT ON</tspan></text>`,
    buildWordmarkGroup("translate(702, 163) scale(2.0)"),

    // Layer 6: Bottom GTA Mission Summary Bar (3 columns, every label >= 23px)
    `<rect x="32" y="818" width="960" height="172" rx="24" fill="#120A21" fill-opacity="0.95" stroke="url(#hudBorder)" stroke-width="3.5"/>`,
    `<line x1="352" y1="840" x2="352" y2="968" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="2"/>`,
    `<line x1="672" y1="840" x2="672" y2="968" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="2"/>`,

    // Column 1 (2025 strikethrough -> 2026)
    `<text x="192" y="886" text-anchor="middle" font-family="'Segoe UI', 'Arial Black', Arial, sans-serif" font-weight="900" font-size="36" fill="#FACC15">13-YR WAIT</text>`,
    `<text x="128" y="944" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="28" fill="#FDA4AF">2025</text>`,
    `<line x1="94" y1="946" x2="162" y2="922" stroke="#FB7185" stroke-width="4.5" stroke-linecap="round"/>`,
    `<text x="234" y="944" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF"><tspan fill="#FACC15">→ </tspan>2026</text>`,

    // Column 2
    `<text x="512" y="886" text-anchor="middle" font-family="'Segoe UI', 'Arial Black', Arial, sans-serif" font-weight="900" font-size="33" fill="#38BDF8">214 GB CLEARED</text>`,
    `<text x="512" y="944" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="23" fill="#FFFFFF">R.I.P. WORK FILES</text>`,

    // Column 3
    `<text x="832" y="886" text-anchor="middle" font-family="'Segoe UI', 'Arial Black', Arial, sans-serif" font-weight="900" font-size="33" fill="#FF66C4">JASON &amp; LUCIA</text>`,
    `<text x="832" y="944" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="23" fill="#FFFFFF">GATOR CALLED SHOTGUN</text>`,

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
