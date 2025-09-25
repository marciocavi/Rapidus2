/** Moderação mínima para entradas de texto. Lança erro em casos proibidos. */
export async function moderateText(text: string): Promise<void> {
  const banned = [/\b(api[_-]?key|senha|password)\b/i, /<script/i];
  for (const rx of banned) {
    if (rx.test(text)) {
      const err = new Error('Conteúdo não permitido pelo moderador');
      // @ts-expect-error statusCode para camada de API
      err.statusCode = 400;
      throw err;
    }
  }
}



