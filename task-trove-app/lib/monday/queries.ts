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

export const fetchBoardsQuery = graphql(`
  query fetchBoards {
    boards(limit: 10, order_by: used_at) {
      id
      name
    }
  }
`);

export const fetchColumnsQuery = graphql(`
  query fetchColumns($boardId: ID!) {
    boards(ids: [$boardId]) {
      columns(types: location) {
        id
        title
      }
    }
  }
`);

export const fetchItemsQuery = graphql(`
  query fetchItems($boardId: ID!) {
    boards(ids: [$boardId]) {
      items_page(limit: 100) {
        items {
          id
          name
        }
      }
    }
  }
`);
