import './server-only';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Apenas para DEV/LOCAL: armazena chaves cifradas em arquivo.
// Em produção, ler exclusivamente de process.env/Secret Manager.

const isProd = process.env.NODE_ENV === 'production';
const secretsFile = path.join(process.cwd(), 'secrets.local.enc.json');

function getKeyMaterial(): Buffer {
  // Usa uma chave derivada do hostname de desenvolvimento (melhor do que nada para local)
  const seed = process.env.SECRETS_LOCAL_KEY || require('os').hostname();
  return crypto.createHash('sha256').update(seed).digest();
}

function encryptJson(obj: unknown): string {
  const key = getKeyMaterial();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.from(JSON.stringify(obj), 'utf8');
  const enc = Buffer.concat([cipher.update(data), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString('base64');
}

function decryptJson(b64: string): any {
  const key = getKeyMaterial();
  const buff = Buffer.from(b64, 'base64');
  const iv = buff.subarray(0, 12);
  const tag = buff.subarray(12, 28);
  const enc = buff.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  return JSON.parse(dec.toString('utf8'));
}

export type StoredSecrets = {
  OPENAI_API_KEY?: string;
  GA4_PROPERTY_ID?: string;
  GOOGLE_APPLICATION_CREDENTIALS_JSON?: string;
  GA_OAUTH_CLIENT_ID?: string;
  GA_OAUTH_CLIENT_SECRET?: string;
  GA_OAUTH_REFRESH_TOKEN?: string;
};

export function loadSecrets(): StoredSecrets {
  if (isProd) {
    // Em produção, leitura direta de env (sem arquivo)
    return {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      GA4_PROPERTY_ID: process.env.GA4_PROPERTY_ID,
      GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
      GA_OAUTH_CLIENT_ID: process.env.GA_OAUTH_CLIENT_ID,
      GA_OAUTH_CLIENT_SECRET: process.env.GA_OAUTH_CLIENT_SECRET,
      GA_OAUTH_REFRESH_TOKEN: process.env.GA_OAUTH_REFRESH_TOKEN,
    };
  }
  try {
    if (!fs.existsSync(secretsFile)) return {};
    const b64 = fs.readFileSync(secretsFile, 'utf8');
    return decryptJson(b64) as StoredSecrets;
  } catch {
    return {};
  }
}

export function saveSecretsLocal(data: StoredSecrets) {
  if (isProd) {
    throw new Error('Saving secrets is disabled in production');
  }
  const b64 = encryptJson(data);
  fs.writeFileSync(secretsFile, b64, 'utf8');
}



