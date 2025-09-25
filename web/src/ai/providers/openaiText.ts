import { loadSecrets } from '@/integrations/secrets';
import OpenAI from 'openai';

/**
 * Adapter de texto: usa OpenAI se houver chave; senão, volta ao modo determinístico.
 */
export async function generateCopy({ prompt }: { prompt: string }): Promise<string> {
  const secrets = await loadSecrets();
  const apiKey = secrets.OPENAI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const clean = prompt.replace(/\s+/g, ' ').trim();
    const base = clean.slice(0, 48);
    return base.length > 0 ? base.normalize('NFC') : 'Título gerado';
  }

  const normalizePtText = (value: string): string => {
    let out = (value || '').trim();
    out = out.replace(/^"|"$/g, '').replace(/^'|'$/g, '').trim();
    out = out.normalize('NFC');
    out = out.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ');
    return out;
  };

  try {
    const client = new OpenAI({ apiKey });
    const res = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Responda apenas em PT-BR com um título curto (máx. 6 palavras), direto e SEM aspas.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 24,
    });
    let text = res.choices?.[0]?.message?.content?.trim();
    if (text) {
      return normalizePtText(text);
    }
  } catch {
    // fallback silencioso
  }

  const clean = prompt.replace(/\s+/g, ' ').trim();
  const base = clean.slice(0, 48);
  return base.length > 0 ? normalizePtText(base) : 'Título gerado';
}


