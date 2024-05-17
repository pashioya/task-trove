import type { z } from 'zod';
import type { UserSchema, SessionSchema, accessTokenSchema, TokenResponseSchema } from './schema';

export type User = z.infer<typeof UserSchema>;
export type AccessToken = z.infer<typeof accessTokenSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;

export type Session = z.infer<typeof SessionSchema>;
export type SessionContextType = {
  session: Session | null;
  signIn: () => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
};
