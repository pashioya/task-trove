import mondaySdk from 'monday-sdk-js';
import type { Board, Column, Item } from '~/model/types';
import { handleMondayErrorCode, handleMondayErrorStatusCode } from './MondayErrorHandling';

export async function updateLocation(
  boardId: string,
  columnId: string,
  itemId: string,
  lat: number,
  long: number,
  task: string,
): Promise<void> {
  const token: string | undefined = process.env.EXPO_PUBLIC_MONDAY_API_TOKEN;
  const monday = mondaySdk();
  monday.setApiVersion('2024-04');
  if (token) {
    monday.setToken(token);
  } else {
    throw new Error('Monday API token not found');
  }

  const query = /* GraphQL */ `
    mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
      change_multiple_column_values(
        board_id: $boardId
        item_id: $itemId
        column_values: $columnValues
      ) {
        id
      }
    }
  `;

  const columnValues = {
    [columnId]: {
      lat,
      lng: long,
      address: task,
    },
  };

  const variables = {
    boardId: String(boardId),
    itemId: String(itemId),
    columnValues: JSON.stringify({ ...columnValues }),
  };

  const response = await monday.api(query, { variables });

  if ('error_code' in response && typeof response.error_code === 'string') {
    handleMondayErrorCode(response.error_code);
  } else if (
    'error_message' in response &&
    typeof response.error_message === 'string' &&
    'status_code' in response &&
    typeof response.status_code === 'number'
  ) {
    handleMondayErrorStatusCode(response.status_code);
  } else if ('errors' in response) {
    throw new Error('hello');
  }

  const { data = null } = response;

  if (!data) {
    throw new Error('Error updating location');
  }
}

export async function fetchBoards(): Promise<Board[]> {
  const token: string | undefined = process.env.EXPO_PUBLIC_MONDAY_API_TOKEN;
  const monday = mondaySdk();
  monday.setApiVersion('2024-04');
  if (token) {
    monday.setToken(token);
  } else {
    throw new Error('Monday API token not found');
  }

  const query = /* GraphQL */ `
    {
      boards(limit: 100, order_by: used_at) {
        id
        name
      }
    }
  `;

  const response = await monday.api<{
    boards: Board[];
  }>(query);

  if ('error_code' in response && typeof response.error_code === 'string') {
    handleMondayErrorCode(response.error_code);
  } else if (
    'error_message' in response &&
    typeof response.error_message === 'string' &&
    'status_code' in response &&
    typeof response.status_code === 'number'
  ) {
    handleMondayErrorStatusCode(response.status_code);
  } else if ('errors' in response) {
    throw new Error('hello');
  }

  const { data = null } = response;
  if (!data) {
    throw new Error('Error fetching boards');
  } else {
    return data.boards;
  }
}

export async function fetchLocationColumns(boardId: string): Promise<Column[]> {
  const token: string | undefined = process.env.EXPO_PUBLIC_MONDAY_API_TOKEN;
  const monday = mondaySdk();
  monday.setApiVersion('2024-04');
  if (token) {
    monday.setToken(token);
  } else {
    throw new Error('Monday API token not found');
  }

  const query = /* GraphQL */ `
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        columns(types: location) {
          id
          title
          type
        }
      }
    }
  `;

  type columnsType = {
    columns: Column[];
  };

  const variables = { boardId: String(boardId) };
  const response = await monday.api<{
    boards: columnsType[];
  }>(query, { variables });

  if ('error_code' in response && typeof response.error_code === 'string') {
    handleMondayErrorCode(response.error_code);
  } else if (
    'error_message' in response &&
    typeof response.error_message === 'string' &&
    'status_code' in response &&
    typeof response.status_code === 'number'
  ) {
    handleMondayErrorStatusCode(response.status_code);
  } else if ('errors' in response) {
    throw new Error('hello');
  }

  const { data = null } = response;
  if (!data) {
    throw new Error('Error fetching columns');
  } else {
    return data.boards[0].columns;
  }
}

export async function fetchItems(boardId: string): Promise<Item[]> {
  const token: string | undefined = process.env.EXPO_PUBLIC_MONDAY_API_TOKEN;
  const monday = mondaySdk();
  monday.setApiVersion('2024-04');
  if (token) {
    monday.setToken(token);
  } else {
    throw new Error('Monday API token not found');
  }

  const query = /* GraphQL */ `
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        items_page(limit: 100) {
          items {
            id
            name
          }
        }
      }
    }
  `;

  type itemsPageType = {
    items_page: {
      items: Item[];
    };
  };

  const variables = { boardId: String(boardId) };
  const response = await monday.api<{
    boards: itemsPageType[];
  }>(query, { variables });

  if ('error_code' in response && typeof response.error_code === 'string') {
    handleMondayErrorCode(response.error_code);
  } else if (
    'error_message' in response &&
    typeof response.error_message === 'string' &&
    'status_code' in response &&
    typeof response.status_code === 'number'
  ) {
    handleMondayErrorStatusCode(response.status_code);
  } else if ('errors' in response) {
    throw new Error('hello');
  }

  const { data = null } = response;
  if (!data) {
    throw new Error('Error fetching items');
  }
  const items = data.boards[0].items_page.items;
  return items;
}
