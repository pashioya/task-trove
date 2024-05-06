import mondaySdk from 'monday-sdk-js';
import { Alert } from 'react-native';

export async function updateLocation(
  boardId: string,
  itemId: string,
  lat: number,
  long: number,
  task: string,
): Promise<void> {
  const token: string | undefined =
    'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM1NDczNDc4OCwiYWFpIjoxMSwidWlkIjo2MDA3MzYxNiwiaWFkIjoiMjAyNC0wNS0wMlQxMjo0NTo1NC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY1NTUwNTAsInJnbiI6ImV1YzEifQ.5qLJ_CEwNWoibLIF_jVCwHIbYCSSg4xTiLTeGGkooFc';
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

  const variables = {
    boardId: String(boardId),
    itemId: String(itemId),
    columnValues: JSON.stringify({
      realtime_location: {
        lat: lat,
        lng: long,
        address: task,
      },
    }),
  };

  const showTrackingErrorAlert = () => {
    Alert.alert('Location Tracking Error', 'There was an error starting location tracking', [
      { text: 'OK' },
    ]);
  };

  const { data } = await monday.api(query, { variables });
  if (!data) {
    console.error('Error updating location');
    showTrackingErrorAlert();
    throw new Error('Error updating location');
  }
}
