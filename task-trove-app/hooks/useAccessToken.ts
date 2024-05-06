import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '~/utils/authApiMethods';

export function useAccessToken(tempCode: string, storageKey: string) {
  const {
    data: accessToken,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery<string>({
    queryKey: ['accessToken'],
    queryFn: async () => {
      const response = await getAccessToken(tempCode, storageKey);
      return response.data.access_token;
    },
  });

  return { accessToken, isLoading, isError, isSuccess, error };
}
