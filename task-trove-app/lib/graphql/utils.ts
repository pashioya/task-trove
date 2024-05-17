import type { TadaDocumentNode } from 'gql.tada';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQueryName = <Result = any, Variables = any>(
  query: TadaDocumentNode<Result, Variables>,
) => {
  const operationDefinition = query.definitions.find(def => def.kind === 'OperationDefinition');

  type OperationDefinition = typeof operationDefinition & {
    name: {
      value: string;
    };
  };

  return (operationDefinition as OperationDefinition).name.value;
};
