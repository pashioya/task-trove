import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '~/utils/authApiMethods';

export function useAccessToken() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { temporaryCode: string; storageKey: string }) => {
      const { temporaryCode, storageKey } = data;
      return await getAccessToken(temporaryCode, storageKey);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['auth-token'] }),
  });

  return mutation;
}
