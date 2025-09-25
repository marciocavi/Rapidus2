// Pequeno guard para evitar uso client-side.
// Em RSC/Edge/Node, o import é permitido; no cliente, avisa.
if (typeof window !== 'undefined') {
  throw new Error('Integrations facade is server-only');
}



