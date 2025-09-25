import { z } from 'zod';

export const identitySchema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  slogan: z.string().optional(),
});

export const sectionsSchema = z.object({
  hero: z.boolean(),
  contacts: z.boolean(),
});

export const contactsSchema = z.object({
  whatsapp: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('E-mail inválido').optional(),
  instagram: z.string().optional(),
  address: z.string().optional(),
});

export type IdentityInput = z.infer<typeof identitySchema>;
export type SectionsInput = z.infer<typeof sectionsSchema>;
export type ContactsInput = z.infer<typeof contactsSchema>;



