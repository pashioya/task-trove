import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { TadaDocumentNode } from 'gql.tada';
import type { ErrorSchema } from './schema';
import type { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MondayAPIOptions<Variables = any> = {
  query: string;
  variables: Variables;
  apiVersion?: '2024-04';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseMondayQueryOptions<Result = any, Variables = any> = Omit<
  UseQueryOptions<Result>,
  'queryFn' | 'queryKey'
> & {
  query: TadaDocumentNode<Result, Variables>;
  variables: Variables;
  queryKey?: UseQueryOptions['queryKey'];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseMondayMutationOptions<Result = any, Variables = any> = Omit<
  UseMutationOptions<Result, Error, Variables>,
  'mutationKey' | 'mutationFn'
> & {
  mutation: TadaDocumentNode<Result, Variables>;
};

export type Errors = z.infer<typeof ErrorSchema>[];
