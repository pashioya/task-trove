import { z } from 'zod';
import type { Request } from 'express';
import type { EventTypes, InstallStatus, SubscriptionStatus } from './enums';
import type { LocationParameters, MeasuringUnits } from '../app/enums';
import { convertGeoCodeToLocation } from '@/lib/app/utils';
import {
  ErrorCodeTypeSchema,
  ErrorMessageTypeSchema,
  ErrorsTypeSchema,
} from './schemas/error';
import { CustomOperationsLimit } from '../app/types';

export type PlanId = 'free' | 'small' | 'medium' | 'large';
export type IsTrial = boolean;
export type Token = string;
export type BoardId = number;
export type ItemId = number;
export type ColumnId = string;

export type Subscription = {
  billing_period: string | null;
  days_left: number;
  is_trial: IsTrial;
  plan_id: PlanId;
  pricing_version: number;
  renewal_date: string;
};

export type LocationValue = {
  country: string | null;
  street: string | null;
  street_number: string | null;
  city: string | null;
  city_short: string | null;
  lat: number | null;
  lng: number | null;
  place_id: string | null;
};

/**
 * Util types
 */

export type ColumnIdValueCombinations = {
  [key: string]: number;
};

export type ColumnMutationValues = {
  [key: string]: unknown;
};

export type ConvertDistanceInMetersToParams = {
  distanceInMeters: number;
  measuringUnit: MeasuringUnits;
};

export type ExtractLocationValueParams = {
  locationValue: LocationValue;
  locationParameter: LocationParameters;
};

/**
 * Middleware types
 */
export type TotalOperations = number;

export type GetOperationsByPlanIdParams = {
  planId: PlanId;
  isTrial: IsTrial;
};

export type IncreaseOperationsCounterParams = {
  token: Token;
  subscription: Subscription;
  customOperationsLimit?: CustomOperationsLimit;
};

/**
 * Webhook types
 */

export type VersionData = {
  major: number;
  minor: number;
  patch: number;
  type: string;
};

type BaseEventData = {
  app_id: number;
  user_id: number;
  user_email: string;
  user_name: string;
  user_cluster: string;
  account_tier: string;
  account_max_users: number;
  account_id: number;
  account_name: string;
  account_slug: string;
  version_data: VersionData;
  timestamp: string;
  subscription: Subscription;
};

type InstallationStatusPayload = {
  type: EventTypes.INSTALL | EventTypes.UNINSTALL;
  data: BaseEventData & {
    user_country: string;
  };
};

type SubscriptionStatusPayload = {
  type:
    | EventTypes.SUBSCRIPTION_CHANGED
    | EventTypes.SUBSCRIPTION_CREATED
    | EventTypes.SUBSCRIPTION_CANCELLED
    | EventTypes.SUBSCRIPTION_CANCELLED_BY_USER
    | EventTypes.SUBSCRIPTION_CANCELLATION_REVOKED_BY_USER
    | EventTypes.SUBSCRIPTION_RENEWED
    | EventTypes.SUBSCRIPTION_RENEWAL_FAILED
    | EventTypes.SUBSCRIPTION_TRIAL_ENDED
    | EventTypes.SUBSCRIPTION_TRIAL_STARTED;
  data: BaseEventData;
};

export type ProcessEventParams = {
  payload: WebhookPayload;
  installStatus: InstallStatus;
  subscriptionStatus: SubscriptionStatus;
};

export type WebhookData = SubscriptionStatusPayload | InstallationStatusPayload;
export type WebhookPayload = WebhookData['data'];

/**
 * Monday API Parameter types
 */

export type CreateItemInBoardParams = {
  token: Token;
  boardId: BoardId;
  name: string;
  columnValues: ColumnMutationValues;
};

export type FetchAppSubscriptionOperationsParams = {
  token: Token;
};

export type FetchItemByColumnValueParams = {
  token: Token;
  boardId: BoardId;
  columnId: ColumnId;
  columnValue: string;
};

export type FetchItemByColumnValuesParams = {
  token: Token;
  boardId: BoardId;
  columnIdValueCombinations: ColumnIdValueCombinations;
};

export type FetchLocationValueParams = {
  token: Token;
  itemId: ItemId;
  columnId: ColumnId;
};

export type FetchLocationValuesParams = {
  token: Token;
  itemId: ItemId;
  columnIds: ColumnId[];
};

export type FetchTextColumnValueParams = {
  token: Token;
  itemId: ItemId;
  textColumnId: ColumnId;
};

export type UpdateAppSubscriptionOperationsParams = {
  token: Token;
  incrementBy: number;
};

export type UpdateColumnValueParams = {
  token: Token;
  boardId: BoardId;
  itemId: ItemId;
  columnId: ColumnId;
  value: string;
};

export type UpdateItemInBoardParams = {
  token: Token;
  boardId: BoardId;
  itemId: ItemId;
  columnValues: ColumnMutationValues;
};

export type UpdateLocationColumnValueParams = {
  token: Token;
  boardId: BoardId;
  itemId: ItemId;
  locationColumnId: ColumnId;
  location: ReturnType<typeof convertGeoCodeToLocation>;
};

export type UpdateNumbersColumnValueParams = {
  token: Token;
  boardId: BoardId;
  itemId: ItemId;
  columnId: ColumnId;
  value: string;
};

/**
 * Common Monday generic API types
 */

/* Request types */
export interface MondayRequest<T = any> extends Request {
  body: {
    payload: T;
  };
}

export interface MondayWebhookRequest<T = any> extends Request {
  body: T;
}

/* Response types */
export type SuccessResponse<T> = {
  data: T;
};

export type ErrorResponse =
  | z.infer<typeof ErrorsTypeSchema>
  | z.infer<typeof ErrorCodeTypeSchema>
  | z.infer<typeof ErrorMessageTypeSchema>;

export type MondayAPIResponse<T = any> = SuccessResponse<T> | ErrorResponse;

/* Payload types */
type Boards<T> = {
  boards: T[];
};

type ItemsPage<T> = {
  items_page: T;
};

type Items<T> = {
  items: T[];
};

type ItemByColumnValue = {
  id: string;
  name: string;
};

type CreateItem<T> = {
  create_item: T;
};

type AppSubscriptionOperations<T> = {
  app_subscription_operations: T;
};

type IncreaseAppSubscriptionOperations<T> = {
  increase_app_subscription_operations: T;
};

type ColumnValues<T> = {
  column_values: T[];
};

type ChangeMultipleColumnValues<T> = {
  change_multiple_column_values: T;
};

type ChangeSimpleColumnValue<T> = {
  change_simple_column_value: T;
};

type SubscriptionOperations = {
  counter_value: number;
  kind: 'string';
  period_key: string;
};

/**
 * API response types
 */

export type CreateItemInBoardResponse = MondayAPIResponse<
  CreateItem<{ id: string }>
>;

export type FetchAppSubscriptionOperationsResponse = MondayAPIResponse<
  AppSubscriptionOperations<SubscriptionOperations>
>;

export type FetchItemByColumnValueResponse = MondayAPIResponse<
  Boards<ItemsPage<Items<ItemByColumnValue>>>
>;

export type FetchItemByColumnValuesResponse = MondayAPIResponse<
  Boards<ItemsPage<Items<ItemByColumnValue>>>
>;

export type FetchLocationValueResponse = MondayAPIResponse<
  Items<ColumnValues<LocationValue>>
>;

export type FetchLocationValuesResponse = MondayAPIResponse<
  Items<ColumnValues<LocationValue>>
>;

export type FetchTextColumnValueResponse = MondayAPIResponse<
  Items<ColumnValues<{ text: string }>>
>;

export type UpdateAppSubscriptionOperationsResponse = MondayAPIResponse<
  IncreaseAppSubscriptionOperations<SubscriptionOperations>
>;

export type UpdateColumnValueResponse = MondayAPIResponse<
  ChangeSimpleColumnValue<{ id: string }>
>;

export type UpdateItemsInBoardResponse = MondayAPIResponse<
  ChangeMultipleColumnValues<{
    id: string;
  }>
>;

export type UpdateLocationColumnValueResponse = MondayAPIResponse<
  ChangeSimpleColumnValue<{
    id: string;
  }>
>;

export type UpdateNumbersColumnValueResponse = MondayAPIResponse<
  ChangeSimpleColumnValue<{
    id: string;
  }>
>;
