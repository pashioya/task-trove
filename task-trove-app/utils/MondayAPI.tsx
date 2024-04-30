import mondaySdk from 'monday-sdk-js';

export async function updateLocation(
  boardId: string,
  itemId: string,
  lat: number,
  long: number,
  task: string,
): Promise<void> {
  const token: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM1MzM1NTA2NSwiYWFpIjoxMSwidWlkIjo2MDA3MzYxNiwiaWFkIjoiMjAyNC0wNC0yOVQxNTozODozNy4wMzdaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY1NTUwNTAsInJnbiI6ImV1YzEifQ.0Q6zPqqTJsZIH4oDkEmpwEtQU4-PgjDbGdBta92gkcQ';
  const monday = mondaySdk();
  monday.setApiVersion('2024-04');
  monday.setToken(token);

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

  const response = await monday.api(query, { variables });
  console.log(response);
  return;
}
