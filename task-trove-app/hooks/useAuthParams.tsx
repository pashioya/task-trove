import * as Linking from 'expo-linking';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

const AuthParamsSchema = z.object({
  code: z.string(),
  region: z.string().optional(),
  scope: z.string().optional(),
  state: z.string().optional(),
});

export type AuthParams = z.infer<typeof AuthParamsSchema>;

export function useAuthParams() {
  const [authParams, setAuthParams] = useState<AuthParams | null>(null);
  const url = Linking.useURL();

  const parsedAuthParams = useMemo(() => {
    if (url) {
      const { queryParams = null } = Linking.parse(url);

      if (queryParams && 'code' in queryParams) {
        const result = AuthParamsSchema.safeParse(queryParams);
        if (result.success) {
          return result.data;
        }
      }
    }
    return null;
  }, [url]);

  useEffect(() => {
    if (parsedAuthParams && (!authParams || parsedAuthParams.code !== authParams.code)) {
      setAuthParams(parsedAuthParams);
    }
  }, [parsedAuthParams, authParams]);

  return authParams;
}
