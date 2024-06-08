import { useQuery } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

const useInternetStatus = () => {
  return useQuery({
    queryKey: ['internetStatus'],
    queryFn: () => NetInfo.fetch(),
    staleTime: 0,
    refetchInterval: 5000,
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
