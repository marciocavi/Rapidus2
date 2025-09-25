/**
 * Extração simples de paleta a partir de uma imagem local (File) ou URL.
 * Não usa dependências externas; calcula médias por amostragem em canvas.
 */
export type BrandPalette = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function luminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export async function extractPaletteFromImage(src: File | string): Promise<BrandPalette> {
  const imageUrl = typeof src === 'string' ? src : URL.createObjectURL(src);
  try {
    const img = await loadImage(imageUrl);
    const { primary, secondary, background, text } = sampleImage(img);
    return { primary, secondary, background, text };
  } finally {
    if (typeof src !== 'string') URL.revokeObjectURL(imageUrl);
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function sampleImage(img: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return defaultPalette();
  const w = (canvas.width = 200);
  const h = (canvas.height = Math.max(1, Math.floor((img.height / img.width) * 200)));
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  let rSum = 0, gSum = 0, bSum = 0, count = 0;
  const samples: Array<{ r: number; g: number; b: number } > = [];
  for (let y = 0; y < h; y += 4) {
    for (let x = 0; x < w; x += 4) {
      const i = (y * w + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      if (a < 64) continue; // ignora pixels muito transparentes
      rSum += r; gSum += g; bSum += b; count++;
      samples.push({ r, g, b });
    }
  }
  if (count === 0) return defaultPalette();
  const avgR = Math.round(rSum / count);
  const avgG = Math.round(gSum / count);
  const avgB = Math.round(bSum / count);
  const avgHex = rgbToHex(avgR, avgG, avgB);

  // Escolhe cor de texto com base em luminância média
  const text = luminance(avgR, avgG, avgB) > 140 ? '#111111' : '#FFFFFF';

  // Encontra uma segunda cor: pixel mais distante da média (na amostra)
  let far = samples[0];
  let farDist = -1;
  for (const s of samples) {
    const d = (s.r - avgR) ** 2 + (s.g - avgG) ** 2 + (s.b - avgB) ** 2;
    if (d > farDist) { far = s; farDist = d; }
  }
  const secondary = rgbToHex(far.r, far.g, far.b);

  return { primary: avgHex, secondary, background: avgHex, text };
}

function defaultPalette(): BrandPalette {
  return { primary: '#2E6BD6', secondary: '#2AAA48', background: '#0a0a0a', text: '#ffffff' };
}



