import './server-only';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';

// Apenas para DEV/LOCAL: armazena chaves cifradas em arquivo.
// Em produção, ler exclusivamente de process.env/Secret Manager.

const isProd = process.env.NODE_ENV === 'production';
const secretsFile = path.join(process.cwd(), 'secrets.local.enc.json');

function getKeyMaterial(): Buffer {
  // Usa uma chave derivada do hostname de desenvolvimento (melhor do que nada para local)
  const seed = process.env.SECRETS_LOCAL_KEY || os.hostname();
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
  GA4_SA_EMAIL?: string;
  GA4_SA_KEY_BASE64?: string;
  GA4_CLIENT_ID?: string;
  GA4_CLIENT_SECRET?: string;
  GA4_REFRESH_TOKEN?: string;
};

type LegacySecrets = {
  GOOGLE_APPLICATION_CREDENTIALS_JSON?: string;
  GA_OAUTH_CLIENT_ID?: string;
  GA_OAUTH_CLIENT_SECRET?: string;
  GA_OAUTH_REFRESH_TOKEN?: string;
};

type RawSecrets = Partial<StoredSecrets & LegacySecrets>;

type ServiceAccountInfo = {
  email?: string;
  keyBase64?: string;
};

const clean = (value?: string): string | undefined => {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

function parseServiceAccount(input?: string): ServiceAccountInfo {
  const value = clean(input);
  if (!value) return {};

  const fromJson = (jsonStr: string): ServiceAccountInfo | null => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        return {
          email:
            typeof (parsed as { client_email?: unknown }).client_email === 'string'
              ? (parsed as { client_email?: string }).client_email
              : undefined,
          keyBase64: Buffer.from(jsonStr, 'utf8').toString('base64'),
        };
      }
    } catch {
      // ignore
    }
    return null;
  };

  if (value.startsWith('{')) {
    const info = fromJson(value);
    if (info) return info;
  }

  try {
    const decoded = Buffer.from(value, 'base64').toString('utf8');
    const info = fromJson(decoded);
    if (info) {
      return {
        email: info.email,
        keyBase64: Buffer.from(decoded, 'utf8').toString('base64'),
      };
    }
    if (decoded) {
      return { keyBase64: value };
    }
  } catch {
    // ignore
  }

  return { keyBase64: Buffer.from(value, 'utf8').toString('base64') };
}

function normalizeSecrets(data: RawSecrets): StoredSecrets {
  const saFromNew = parseServiceAccount(data.GA4_SA_KEY_BASE64);
  const saFromLegacy = parseServiceAccount(data.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  const keyBase64 = clean(saFromNew.keyBase64) || clean(saFromLegacy.keyBase64);

  return {
    OPENAI_API_KEY: clean(data.OPENAI_API_KEY),
    GA4_PROPERTY_ID: clean(data.GA4_PROPERTY_ID),
    GA4_SA_EMAIL: clean(data.GA4_SA_EMAIL) || clean(saFromNew.email) || clean(saFromLegacy.email),
    GA4_SA_KEY_BASE64: keyBase64,
    GA4_CLIENT_ID: clean(data.GA4_CLIENT_ID) || clean(data.GA_OAUTH_CLIENT_ID),
    GA4_CLIENT_SECRET: clean(data.GA4_CLIENT_SECRET) || clean(data.GA_OAUTH_CLIENT_SECRET),
    GA4_REFRESH_TOKEN: clean(data.GA4_REFRESH_TOKEN) || clean(data.GA_OAUTH_REFRESH_TOKEN),
  };
}

export function loadSecrets(): StoredSecrets {
  if (isProd) {
    // Em produção, leitura direta de env (sem arquivo)
    const raw: RawSecrets = {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      GA4_PROPERTY_ID: process.env.GA4_PROPERTY_ID,
      GA4_SA_EMAIL: process.env.GA4_SA_EMAIL,
      GA4_SA_KEY_BASE64: process.env.GA4_SA_KEY_BASE64,
      GA4_CLIENT_ID: process.env.GA4_CLIENT_ID,
      GA4_CLIENT_SECRET: process.env.GA4_CLIENT_SECRET,
      GA4_REFRESH_TOKEN: process.env.GA4_REFRESH_TOKEN,
      GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
      GA_OAUTH_CLIENT_ID: process.env.GA_OAUTH_CLIENT_ID,
      GA_OAUTH_CLIENT_SECRET: process.env.GA_OAUTH_CLIENT_SECRET,
      GA_OAUTH_REFRESH_TOKEN: process.env.GA_OAUTH_REFRESH_TOKEN,
    };
    return normalizeSecrets(raw);
  }
  try {
    if (!fs.existsSync(secretsFile)) return {};
    const b64 = fs.readFileSync(secretsFile, 'utf8');
    const raw = decryptJson(b64) as RawSecrets;
    return normalizeSecrets(raw);
  } catch {
    return {};
  }
}

export function saveSecretsLocal(data: RawSecrets) {
  if (isProd) {
    throw new Error('Saving secrets is disabled in production');
  }
  const normalized = normalizeSecrets(data);
  const serializable = Object.fromEntries(
    Object.entries(normalized).filter(([, value]) => value !== undefined)
  );
  const b64 = encryptJson(serializable);
  fs.writeFileSync(secretsFile, b64, 'utf8');
}
