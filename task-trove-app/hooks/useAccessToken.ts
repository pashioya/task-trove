import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '~/utils/authApiMethods';

export function useAccessToken() {
  //   const mutation = useMutation({
  //     mutationFn: getAccessToken,
  //     onSucc,
  //   });
  //   const mutation = useMutation({
  //     mutationFn: getAccessToken,
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: ['todos'] });
  //     },
  //   });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { temporaryCode: string; storageKey: string }) => {
      const { temporaryCode, storageKey } = data; // Destructuring for clarity
      return await getAccessToken(temporaryCode, storageKey);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['access-token'] }),
  });

  return mutation;
}
