import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  thumbnail: z.string(),
  slug: z.string(),
});

export const accessTokenSchema = z.string();

export const SessionSchema = z.object({
  accessToken: accessTokenSchema.min(1),
  user: UserSchema.nullable(),
});

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export const RawUserSchema = z.object({
  me: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    photo_thumb_small: z.string(),
    account: z.object({
      slug: z.string(),
    }),
  }),
});
