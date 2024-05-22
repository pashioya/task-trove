import { graphql } from '~/lib/graphql';

export const changeMultipleColumnValuesMutation = graphql(`
  mutation changeMultipleColumnValues($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
    change_multiple_column_values(
      board_id: $boardId
      item_id: $itemId
      column_values: $columnValues
    ) {
      id
    }
  }
`);
