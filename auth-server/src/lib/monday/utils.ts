import type {
  GetOperationsByPlanIdParams,
  ExtractLocationValueParams,
  LocationValue,
  ConvertDistanceInMetersToParams,
  ColumnIdValueCombinations,
  VersionData,
  ColumnMutationValues,
  MondayAPIResponse,
  SuccessResponse,
  IncreaseOperationsCounterParams,
  ErrorResponse,
} from './types';
import {
  ErrorCodeTypeSchema,
  ErrorMessageTypeSchema,
  ErrorsTypeSchema,
} from './schemas/error';
import { OperationCounts } from './enums';
import {
  fetchAppSubscriptionOperations,
  updateAppSubscriptionOperations,
} from './api';
import { DistanceConversionRatios, MeasuringUnits } from '../app/enums';
import { removeLeadingTrailingCommas } from '@/lib/utils';
import { OperationsCountStatus } from '@/lib/monday/enums';

export const getOperationsByPlanId = ({
  planId,
  isTrial,
}: GetOperationsByPlanIdParams) => {
  if (isTrial) return OperationCounts.TRIAL;

  switch (planId) {
    case 'free':
      return OperationCounts.FREE;
    case 'small':
      return OperationCounts.SMALL;
    case 'medium':
      return OperationCounts.MEDIUM;
    case 'large':
      return OperationCounts.LARGE;
    default:
      return OperationCounts.NONE;
  }
};

export const extractLocationValue = ({
  locationValue,
  locationParameter,
}: ExtractLocationValueParams) => {
  if (!locationValue) return '';

  const getLocationValue = (key: keyof LocationValue) => {
    const val = locationValue[key];
    if (typeof val === 'number') {
      return val.toString();
    }
    return val || '';
  };

  switch (locationParameter) {
    case 'CITY':
      return getLocationValue('city');
    case 'COUNTRY':
      return getLocationValue('country');
    case 'STREET':
      return getLocationValue('street');
    case 'HOUSENUMBER':
      return getLocationValue('street_number');
    case 'LAT':
      return getLocationValue('lat').toString();
    case 'LONG':
      return getLocationValue('lng').toString();
    case 'LATLONG':
      return removeLeadingTrailingCommas(
        `${getLocationValue('lat')}, ${getLocationValue('lng')}`,
      );
    case 'STREETNUMBER':
      return removeLeadingTrailingCommas(
        `${getLocationValue('street')}, ${getLocationValue('street_number')}`,
      );
    case 'STREETCITY':
      return removeLeadingTrailingCommas(
        `${getLocationValue('street')}, ${getLocationValue('city')}`,
      );
    case 'CITYCOUNTRY':
      return removeLeadingTrailingCommas(
        `${getLocationValue('city')}, ${getLocationValue('country')}`,
      );
    case 'USSTREETNUMBERSTREET':
      return removeLeadingTrailingCommas(
        `${getLocationValue('street_number')} ${getLocationValue('street')}`,
      );
    default:
      return '';
  }
};

export const convertDistanceInMetersTo = ({
  distanceInMeters,
  measuringUnit,
}: ConvertDistanceInMetersToParams) => {
  if (!distanceInMeters) {
    return 0;
  }

  const convertAndRound = (distance: number, ratio: number): number => {
    return Number((distance * ratio).toFixed(2));
  };

  switch (measuringUnit) {
    case MeasuringUnits.KILOMETERS:
      return convertAndRound(
        distanceInMeters,
        DistanceConversionRatios.KILOMETER_RATIO,
      );
    case MeasuringUnits.MILES:
      return convertAndRound(
        distanceInMeters,
        DistanceConversionRatios.MILE_RATIO,
      );
    case MeasuringUnits.FEET:
      return convertAndRound(
        distanceInMeters,
        DistanceConversionRatios.FEET_RATIO,
      );
    case MeasuringUnits.METERS:
      return distanceInMeters;
    default:
      throw new Error(`Unsupported measuring unit: ${measuringUnit}`);
  }
};

export const prepareItemQueryRules = (
  columnIdValueCombinations: ColumnIdValueCombinations,
) =>
  Object.entries(columnIdValueCombinations).map(([key, value]) => ({
    column_id: String(key),
    compare_value: [value],
  }));

export const stringifyAppVersion = (versionData: VersionData) => {
  return `${versionData.major}.${versionData.minor}.${versionData.patch}`;
};

export const convertDateToMondayColumnValue = (dateObject: Date) => {
  if (dateObject === null) return null;

  const date = dateObject.toISOString().split('T')[0];
  const timeMatches = dateObject.toUTCString().match(/(\d{2}:\d{2}:\d{2})/);

  const time = timeMatches ? timeMatches[0] : '';

  return { date, time };
};

export const prepareMondayMutationValues = (
  columnValues: ColumnMutationValues,
) => {
  for (const key in columnValues) {
    if (
      typeof columnValues[key] === 'object' &&
      columnValues[key] instanceof Date
    ) {
      columnValues[key] = convertDateToMondayColumnValue(
        columnValues[key] as Date,
      );
    } else if (typeof columnValues[key] === 'boolean') {
      switch (columnValues[key]) {
        case true:
          columnValues[key] = { checked: String(columnValues[key]) };
          break;
        case false:
          columnValues[key] = null;
          break;
      }
    } else if (typeof columnValues[key] !== 'object') {
      columnValues[key] = String(columnValues[key]);
    }
  }

  return columnValues;
};

export const isSuccessResponse = <T>(
  response: MondayAPIResponse<T>,
): response is SuccessResponse<T> => {
  return 'data' in response;
};

export const getMondayAPIErrorMessage = (errorResponse: ErrorResponse) => {
  if (typeof errorResponse === 'object' && errorResponse !== null) {
    if ('error_code' in errorResponse) {
      const parsedErrorCode = ErrorCodeTypeSchema.safeParse(errorResponse);
      if (parsedErrorCode.success) {
        return parsedErrorCode.data.error_message;
      }
    }

    if ('error_message' in errorResponse) {
      const parsedErrorMessage =
        ErrorMessageTypeSchema.safeParse(errorResponse);
      if (parsedErrorMessage.success) {
        return parsedErrorMessage.data.error_message;
      }
    }

    if ('errors' in errorResponse) {
      const parsedErrors = ErrorsTypeSchema.safeParse(errorResponse);
      if (parsedErrors.success) {
        return parsedErrors.data.errors.map(e => e.message).join(', ');
      }
    }
  }

  return JSON.stringify(errorResponse);
};

export const increaseOperationsCounter = async ({
  token,
  subscription,
  customOperationsLimit,
}: IncreaseOperationsCounterParams) => {
  const appSubscriptionOperations = await fetchAppSubscriptionOperations({
    token,
  });

  const {
    counter_value: usedOperationsCount,
    kind,
    period_key,
  } = appSubscriptionOperations;

  const maxOperationsCount =
    customOperationsLimit?.operationsLimit ??
    getOperationsByPlanId({
      planId: subscription.plan_id,
      isTrial: subscription.is_trial,
    });

  if (usedOperationsCount >= maxOperationsCount) {
    throw new Error(OperationsCountStatus.OUT_OF_OPERATIONS);
  }

  const newAppSubscriptionOperations = await updateAppSubscriptionOperations({
    token,
    incrementBy: 1,
  });

  const { counter_value: newOperationsCount } = newAppSubscriptionOperations;

  return {
    usedOperationsCount: newOperationsCount,
    kind,
    periodKey: period_key,
  };
};
