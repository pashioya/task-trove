import { graphql } from "@/lib/graphql";

export const fetchItemsQuery = graphql(`
  query fetchColumnValue($itemId: ID!, $columnId: String!) {
    items(ids: [$itemId]) {
      column_values(ids: [$columnId]) {
        id
        text
      }
    }
  }
`);

export const updateSimpleColumnValue = graphql(`
  mutation updateSimpleColumnValue(
    $itemId: ID!
    $boardId: ID!
    $columnId: String!
    $value: String!
  ) {
    change_simple_column_value(
      item_id: $itemId
      board_id: $boardId
      column_id: $columnId
      value: $value
    ) {
      id
    }
  }
`);
