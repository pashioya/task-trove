import { useQuery } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

const useInternetStatus = () => {
  return useQuery({
    queryKey: ['internetStatus'],
    queryFn: () => NetInfo.fetch(),
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

const useInternetAccess = () => {
  const {
    data: internetStatus,
    error: internetError,
    isLoading: internetLoading,
  } = useInternetStatus();

  return {
    internetStatus,
    internetError,
    internetLoading,
  };
};

export default useInternetAccess;
