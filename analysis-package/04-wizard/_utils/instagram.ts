type InstagramAnalysis = {
  suggestedPalette: { primary: string; secondary: string; accent: string };
  themes: string[];
};

export async function analyzeInstagram(usernameOrUrl: string): Promise<InstagramAnalysis> {
  // Mock previsível; integração real deve usar endpoint externo configurável via env
  await new Promise((r) => setTimeout(r, 400));
  return {
    suggestedPalette: { primary: '#111827', secondary: '#374151', accent: '#2563eb' },
    themes: ['moderno', 'clean', 'visual']
  };
}



