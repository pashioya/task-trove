import mondaySdk from 'monday-sdk-js';
import { Alert } from 'react-native';
import type { Board } from '~/model/Board';
import type { Column } from '~/model/Column';
import type { Item } from '~/model/Item';

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

  console.log('boardId', boardId);
    console.log('itemId', itemId);
    console.log('columnId', columnId);

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
    columnValues: JSON.stringify({ ...columnValues}),
  };

  const showTrackingErrorAlert = () => {
    Alert.alert('Location Tracking Error', 'There was an error starting location tracking', [
      { text: 'OK' },
    ]);
  };

  const response = await monday.api(query, { variables });
  console.log('response', response);

  if ('error_message' in response && typeof response.error_message === 'string') {
    throw new Error(response.error_message);
  }

  const { data = null } = response;

  if (!data) {
    console.error('Error updating location');
    showTrackingErrorAlert();
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

  const response = await monday.api(query);
  const { data = null } = response;
  return data.boards;
}

export async function fetchLocationColumns(boardId: string): Promise<Column[]> {
  const token: string | undefined = process.env.EXPO_PUBLIC_MONDAY_API_TOKEN;
  const monday = mondaySdk();
  monday.setApiVersion('2024-04');
  if (token) {
    monday.setToken(token);
  } else {
    throw new Error('Monday API token not found');
  };

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

  const variables = {boardId: String(boardId)};
  const response = await monday.api(query, {variables});
  const { data = null } = response;
  const columns = data.boards[0].columns;
  return columns;
}

export async function fetchItems(boardId: string): Promise<Item[]> {
  const token: string | undefined = process.env.EXPO_PUBLIC_MONDAY_API_TOKEN
  const monday = mondaySdk();
  monday.setApiVersion('2024-04');
  if (token) {
    monday.setToken(token);
  } else {
    throw new Error('Monday API token not found');
  };

  const query = /* GraphQL */ `
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        items_page(limit: 100) {
          cursor
          items {
            id
            name
          }
        }
      }
    }
  `;

  const variables = {boardId: String(boardId)};
  const response = await monday.api(query, {variables});
  const { data = null } = response;
  const items = data.boards[0].items_page.items;
  return items;
}
