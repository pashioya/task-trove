import initMondayClient from 'monday-sdk-js';
import {
  getMondayAPIErrorMessage,
  isSuccessResponse,
  prepareItemQueryRules,
  prepareMondayMutationValues,
} from '@/lib/monday/utils';
import type {
  CreateItemInBoardParams,
  CreateItemInBoardResponse,
  FetchAppSubscriptionOperationsParams,
  FetchAppSubscriptionOperationsResponse,
  FetchItemByColumnValueParams,
  FetchItemByColumnValueResponse,
  FetchItemByColumnValuesParams,
  FetchItemByColumnValuesResponse,
  FetchLocationValueParams,
  FetchLocationValueResponse,
  FetchLocationValuesParams,
  FetchLocationValuesResponse,
  FetchTextColumnValueParams,
  FetchTextColumnValueResponse,
  UpdateAppSubscriptionOperationsParams,
  UpdateAppSubscriptionOperationsResponse,
  UpdateColumnValueParams,
  UpdateColumnValueResponse,
  UpdateItemInBoardParams,
  UpdateItemsInBoardResponse,
  UpdateLocationColumnValueParams,
  UpdateLocationColumnValueResponse,
  UpdateNumbersColumnValueParams,
  UpdateNumbersColumnValueResponse,
} from '@/lib/monday/types';
import { MondayAPIErrorMessages } from './enums';
import { env } from '@/lib/env';

export const createItemInBoard = async ({
  token,
  boardId,
  name,
  columnValues,
}: CreateItemInBoardParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    mutation ($boardId: ID!, $name: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId
        item_name: $name
        column_values: $columnValues
      ) {
        id
      }
    }
  `;

  const variables = {
    boardId,
    name,
    columnValues: JSON.stringify(prepareMondayMutationValues(columnValues)),
  };
  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<CreateItemInBoardResponse>(query, {
    variables,
    apiVersion,
  });

  if (isSuccessResponse(response)) {
    return response.data.create_item.id;
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const fetchAppSubscriptionOperations = async ({
  token,
}: FetchAppSubscriptionOperationsParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    query {
      app_subscription_operations {
        counter_value
        kind
        period_key
      }
    }
  `;

  const apiVersion = '2024-04';

  const response =
    await mondayClient.api<FetchAppSubscriptionOperationsResponse>(query, {
      apiVersion,
    });

  if (isSuccessResponse(response)) {
    return response.data.app_subscription_operations;
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const fetchItemByColumnValue = async ({
  boardId,
  columnId,
  columnValue,
  token,
}: FetchItemByColumnValueParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    query ($boardId: [ID!], $columnId: ID!, $columnValue: CompareValue!) {
      boards(ids: $boardId) {
        items_page(
          limit: 1
          query_params: {
            rules: [{ column_id: $columnId, compare_value: $columnValue }]
          }
        ) {
          items {
            id
            name
          }
        }
      }
    }
  `;

  const variables = { boardId, columnId, columnValue: String(columnValue) };
  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<FetchItemByColumnValueResponse>(
    query,
    {
      variables,
      apiVersion,
    },
  );

  if (isSuccessResponse(response)) {
    const items = response.data.boards[0].items_page.items;
    return !items.length ? null : items[0];
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const fetchItemByColumnValues = async ({
  token,
  boardId,
  columnIdValueCombinations,
}: FetchItemByColumnValuesParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    query ($boardId: [ID!], $rules: [ItemsQueryRule!]) {
      boards(ids: $boardId) {
        items_page(limit: 1, query_params: { rules: $rules }) {
          items {
            id
            name
          }
        }
      }
    }
  `;

  const variables = {
    boardId,
    rules: prepareItemQueryRules(columnIdValueCombinations),
  };

  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<FetchItemByColumnValuesResponse>(
    query,
    { variables, apiVersion },
  );

  if (isSuccessResponse(response)) {
    const items = response.data.boards[0].items_page.items;
    return !items.length ? null : items[0];
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const fetchLocationValue = async ({
  token,
  itemId,
  columnId,
}: FetchLocationValueParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    query ($itemId: [ID!], $columnId: [String!]) {
      items(ids: $itemId) {
        column_values(ids: $columnId) {
          ... on LocationValue {
            country
            street
            street_number
            city
            city_short
            lat
            lng
            place_id
            text
            value
          }
        }
      }
    }
  `;

  const variables = { columnId, itemId };
  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<FetchLocationValueResponse>(query, {
    variables,
    apiVersion,
  });

  if (isSuccessResponse(response)) {
    const { items = [] } = response.data;

    if (!items.length) {
      throw new Error(MondayAPIErrorMessages.ITEM_ID_DOESNT_EXIST);
    }

    if (items[0].column_values.length === 0) {
      throw new Error(MondayAPIErrorMessages.COLUMN_ID_DOESNT_EXIST);
    }

    return response.data.items[0].column_values[0];
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const fetchLocationValues = async ({
  token,
  itemId,
  columnIds,
}: FetchLocationValuesParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    query ($itemId: [ID!], $columnIds: [String!]) {
      items(ids: $itemId) {
        column_values(ids: $columnIds) {
          ... on LocationValue {
            country
            street
            street_number
            city
            city_short
            lat
            lng
            place_id
          }
        }
      }
    }
  `;

  const variables = { columnIds, itemId };
  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<FetchLocationValuesResponse>(query, {
    variables,
    apiVersion,
  });

  if (isSuccessResponse(response)) {
    const columnValues = response.data.items[0].column_values;

    if (columnValues.length !== 2) {
      throw new Error(MondayAPIErrorMessages.MISSING_LOCATION_COLUMN);
    }

    if (
      !columnValues[0].lat ||
      !columnValues[0].lng ||
      !columnValues[1].lat ||
      !columnValues[1].lng
    ) {
      throw new Error(MondayAPIErrorMessages.MISSING_LAT_LONG_VALUES);
    }

    return {
      originLocation: {
        lat: columnValues[0].lat,
        lng: columnValues[0].lng,
      },
      destinationLocation: {
        lat: columnValues[1].lat,
        lng: columnValues[1].lng,
      },
    };
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const fetchTextColumnValue = async ({
  token,
  itemId,
  textColumnId,
}: FetchTextColumnValueParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    query ($itemId: [ID!], $columnId: [String!]) {
      items(ids: $itemId) {
        column_values(ids: $columnId) {
          ... on TextValue {
            text
          }
        }
      }
    }
  `;

  const variables = { columnId: textColumnId, itemId };
  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<FetchTextColumnValueResponse>(query, {
    variables,
    apiVersion,
  });

  if (isSuccessResponse(response)) {
    return response.data.items[0].column_values[0];
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const updateAppSubscriptionOperations = async ({
  token,
  incrementBy,
}: UpdateAppSubscriptionOperationsParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    mutation ($incrementBy: Int!) {
      increase_app_subscription_operations(increment_by: $incrementBy) {
        counter_value
        kind
        period_key
      }
    }
  `;

  const apiVersion = '2024-04';
  const variables = { incrementBy };

  const response =
    await mondayClient.api<UpdateAppSubscriptionOperationsResponse>(query, {
      variables,
      apiVersion,
    });

  if (isSuccessResponse(response)) {
    return response.data.increase_app_subscription_operations;
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const updateColumnValue = async ({
  token,
  boardId,
  itemId,
  columnId,
  value,
}: UpdateColumnValueParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    mutation change_simple_column_value(
      $boardId: ID!
      $itemId: ID!
      $columnId: String!
      $value: String!
    ) {
      change_simple_column_value(
        board_id: $boardId
        item_id: $itemId
        column_id: $columnId
        value: $value
      ) {
        id
      }
    }
  `;

  const variables = { boardId, columnId, itemId, value };
  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<UpdateColumnValueResponse>(query, {
    variables,
    apiVersion,
  });

  if (isSuccessResponse(response)) {
    return response.data.change_simple_column_value;
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const updateItemInBoard = async ({
  token,
  boardId,
  itemId,
  columnValues,
}: UpdateItemInBoardParams) => {
  const mondayClient = initMondayClient({ token });

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
    boardId,
    itemId,
    columnValues: JSON.stringify(prepareMondayMutationValues(columnValues)),
  };

  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<UpdateItemsInBoardResponse>(query, {
    variables,
    apiVersion,
  });

  if (isSuccessResponse(response)) {
    return response.data.change_multiple_column_values.id;
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const updateLocationColumnValue = async ({
  token,
  boardId,
  itemId,
  locationColumnId,
  location,
}: UpdateLocationColumnValueParams) => {
  const mondayClient = initMondayClient({ token });

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
    boardId,
    itemId,
    columnValues: JSON.stringify({
      [locationColumnId]: {
        lat: location.lat,
        lng: location.lng,
        address: location.address,
        placeId: location.placeId,
        city: {
          long_name: location.city?.long_name ?? null,
          short_name: location.city?.short_name ?? null,
        },
        street: {
          long_name: location.street?.long_name ?? null,
          short_name: location.street?.short_name ?? null,
        },
        streetNumber: {
          long_name: location.streetNumber?.long_name ?? null,
          short_name: location.streetNumber?.short_name ?? null,
        },
        country: {
          long_name: location.country?.long_name ?? null,
          short_name: location.country?.short_name ?? null,
        },
      },
    }),
  };

  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<UpdateLocationColumnValueResponse>(
    query,
    { variables, apiVersion },
  );

  if (isSuccessResponse(response)) {
    return response.data.change_simple_column_value;
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};

export const updateNumbersColumnValue = async ({
  token,
  boardId,
  itemId,
  columnId,
  value,
}: UpdateNumbersColumnValueParams) => {
  const mondayClient = initMondayClient({ token });

  const query = /* GraphQL */ `
    mutation change_simple_column_value(
      $boardId: ID!
      $itemId: ID!
      $columnId: String!
      $value: String!
    ) {
      change_simple_column_value(
        board_id: $boardId
        item_id: $itemId
        column_id: $columnId
        value: $value
      ) {
        id
      }
    }
  `;

  const variables = { boardId, columnId, itemId, value };
  const apiVersion = env.MONDAY_API_VERSION;

  const response = await mondayClient.api<UpdateNumbersColumnValueResponse>(
    query,
    { variables, apiVersion },
  );

  if (isSuccessResponse(response)) {
    return response.data.change_simple_column_value;
  }

  const errorMessage = getMondayAPIErrorMessage(response);

  throw new Error(errorMessage);
};
