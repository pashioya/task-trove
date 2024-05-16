import { getQueryName } from '~/lib/graphql/utils';
import { print } from 'graphql';
import { getMondaySdk } from './sdk';
import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  MondayAPIOptions,
  UseMondayMutationOptions,
  UseMondayQueryOptions,
  Errors,
} from './types';
import { MondayAPIError } from './error';

async function fetchMondayApi<Result, Variables>({
  query,
  variables,
  apiVersion = '2024-04',
}: MondayAPIOptions<Variables>): Promise<Result> {
  const monday = await getMondaySdk();
  const res = await monday.api<Result>(query, {
    variables: variables || {},
    apiVersion,
  });

  if (res.data) {
    return res.data;
  }

  throw new MondayAPIError(res);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMondayQuery = <Result = any, Variables = any>({
  query,
  variables,
  queryKey,
  ...props
}: UseMondayQueryOptions<Result, Variables>) => {
  const queryString = print(query);
  const queryName = getQueryName(query);

  return useQuery<Result, MondayAPIError>({
    queryKey: queryKey ? queryKey : [queryName],
    queryFn: async () => await fetchMondayApi<Result, Variables>({ query: queryString, variables }),
    ...props,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMondayMutation = <Result = any, Variables = any>({
  mutation,
  ...props
}: UseMondayMutationOptions<Result, Variables>) => {
  const queryString = print(mutation);
  const mutationName = getQueryName(mutation);

  return useMutation<Result, MondayAPIError, Variables>({
    mutationKey: [mutationName],
    mutationFn: async variables =>
      await fetchMondayApi<Result, Variables>({
        query: queryString,
        variables,
      }),
    ...props,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isErrorCode = (error: any): error is MondayAPIError & { errorCode: string } => {
  return error != null && 'errorCode' in error;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isErrorMessage = (error: any): error is MondayAPIError & { errorMessage: string } => {
  return error != null && 'error_message' in error;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isErrorsArray = (error: any): error is MondayAPIError & { errors: Errors } => {
  return error != null && 'errors' in error;
};
