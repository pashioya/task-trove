import { expect, describe, it } from 'vitest';
import {
  getOperationsByPlanId,
  extractLocationValue,
  convertDistanceInMetersTo,
  prepareItemQueryRules,
  stringifyAppVersion,
  convertDateToMondayColumnValue,
  prepareMondayMutationValues,
  isSuccessResponse,
  getMondayAPIErrorMessage,
} from '../utils';
import type { PlanId, SuccessResponse, ErrorResponse } from '../types';
import { LocationParameters, MeasuringUnits } from '../../app/enums';
import { OperationCounts } from '../enums';

/**
 * getOperationsByPlanId
 */

describe('getOperationsByPlanId', () => {
  it('returns 500 for trial plans', () => {
    const result = getOperationsByPlanId({ planId: 'small', isTrial: true });
    expect(result).toBe(OperationCounts.TRIAL);
  });

  it('returns 50 for free plans', () => {
    const result = getOperationsByPlanId({ planId: 'free', isTrial: false });
    expect(result).toBe(OperationCounts.FREE);
  });

  it('returns 1000 for small plans', () => {
    const result = getOperationsByPlanId({ planId: 'small', isTrial: false });
    expect(result).toBe(OperationCounts.SMALL);
  });

  it('returns 2500 for medium plans', () => {
    const result = getOperationsByPlanId({ planId: 'medium', isTrial: false });
    expect(result).toBe(OperationCounts.MEDIUM);
  });

  it('returns 5000 for large plans', () => {
    const result = getOperationsByPlanId({ planId: 'large', isTrial: false });
    expect(result).toBe(OperationCounts.LARGE);
  });

  const invalidPlanCases = [
    { description: 'planId is unknown', planId: 'unknown' },
    { description: 'planId is undefined', planId: undefined },
    { description: 'planId is null', planId: null },
  ];

  invalidPlanCases.forEach(({ description, planId }) => {
    it(`returns 0 if ${description}`, () => {
      const result = getOperationsByPlanId({
        planId: planId as any,
        isTrial: false,
      });
      expect(result).toBe(OperationCounts.NONE);
    });
  });
});

describe('getOperationsByPlanId with isTrial null or undefined', () => {
  const planIdsWithExpectedCounts: {
    planId: PlanId;
    expectedCount: OperationCounts;
  }[] = [
    { planId: 'free', expectedCount: OperationCounts.FREE },
    { planId: 'small', expectedCount: OperationCounts.SMALL },
    { planId: 'medium', expectedCount: OperationCounts.MEDIUM },
    { planId: 'large', expectedCount: OperationCounts.LARGE },
  ];

  planIdsWithExpectedCounts.forEach(({ planId, expectedCount }) => {
    it(`returns ${expectedCount} for ${planId} plans when isTrial is null`, () => {
      const result = getOperationsByPlanId({ planId, isTrial: null as any });
      expect(result).toBe(expectedCount);
    });

    it(`returns ${expectedCount} for ${planId} plans when isTrial is undefined`, () => {
      const result = getOperationsByPlanId({
        planId,
        isTrial: undefined as any,
      });
      expect(result).toBe(expectedCount);
    });
  });
});

/**
 * extractLocationValue
 */
describe('extractLocationValue', () => {
  const mockLocationValue = {
    country: 'TestCountry',
    street: 'TestStreet',
    street_number: '123',
    city: 'TestCity',
    city_short: 'TC',
    place_id: 'TestPlaceId',
    lat: 10.123456,
    lng: 20.123456,
  };

  it('should extract city correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.CITY,
    });
    expect(result).toBe(mockLocationValue.city);
  });

  it('should extract country correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.COUNTRY,
    });
    expect(result).toBe(mockLocationValue.country);
  });

  it('should extract street correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.STREET,
    });
    expect(result).toBe(mockLocationValue.street);
  });

  it('should extract house number correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.HOUSENUMBER,
    });
    expect(result).toBe(mockLocationValue.street_number);
  });

  it('should extract lat correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.LAT,
    });
    expect(result).toBe(mockLocationValue.lat.toString());
  });

  it('should extract long correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.LONG,
    });
    expect(result).toBe(mockLocationValue.lng.toString());
  });

  it('should extract lat and long correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.LATLONG,
    });
    expect(result).toBe(mockLocationValue.lat + ', ' + mockLocationValue.lng);
  });

  it('should extract street and house number correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.STREETNUMBER,
    });
    expect(result).toBe(
      mockLocationValue.street + ', ' + mockLocationValue.street_number,
    );
  });

  it('should extract street and city correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.STREETCITY,
    });
    expect(result).toBe(
      mockLocationValue.street + ', ' + mockLocationValue.city,
    );
  });

  it('should extract city and country correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.CITYCOUNTRY,
    });
    expect(result).toBe(
      mockLocationValue.city + ', ' + mockLocationValue.country,
    );
  });

  it('should extract streetnumber and street correctly', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: LocationParameters.USSTREETNUMBERSTREET,
    });
    expect(result).toBe(
      mockLocationValue.street_number + ' ' + mockLocationValue.street,
    );
  });

  it('should return empty string for unknown location parameter', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: 'UNKNOWN' as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string for undefined location parameter', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: undefined as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string for null location parameter', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue,
      locationParameter: null as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string for null location value', () => {
    const result = extractLocationValue({
      locationValue: null as any,
      locationParameter: LocationParameters.CITY,
    });
    expect(result).toBe('');
  });

  it('should return empty string for undefined location value', () => {
    const result = extractLocationValue({
      locationValue: undefined as any,
      locationParameter: LocationParameters.CITY,
    });
    expect(result).toBe('');
  });

  it('should return empty string for null location value and null location parameter', () => {
    const result = extractLocationValue({
      locationValue: null as any,
      locationParameter: null as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string for undefined location value and undefined location parameter', () => {
    const result = extractLocationValue({
      locationValue: undefined as any,
      locationParameter: undefined as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string for null location value and undefined location parameter', () => {
    const result = extractLocationValue({
      locationValue: null as any,
      locationParameter: undefined as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string for undefined location value and null location parameter', () => {
    const result = extractLocationValue({
      locationValue: undefined as any,
      locationParameter: null as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string for unknown location value', () => {
    const result = extractLocationValue({
      locationValue: { unknown: 'unknown' } as any,
      locationParameter: LocationParameters.CITY,
    });
    expect(result).toBe('');
  });

  it('should return empty string for unknown location parameter', () => {
    const result = extractLocationValue({
      locationValue: mockLocationValue as any,
      locationParameter: 'UNKNOWN' as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string for unknown location value and unknown location parameter', () => {
    const result = extractLocationValue({
      locationValue: { unknown: 'unknown' } as any,
      locationParameter: 'UNKNOWN' as any,
    });
    expect(result).toBe('');
  });

  it('should return empty string an empty location value', () => {
    const result = extractLocationValue({
      locationValue: {} as any,
      locationParameter: LocationParameters.CITY,
    });
    expect(result).toBe('');
  });
});

/**
 * convertDistanceInMetersTo
 */
describe('convertDistanceInMetersTo', () => {
  it('converts meters to kilometers correctly', () => {
    const result = convertDistanceInMetersTo({
      distanceInMeters: 1000,
      measuringUnit: MeasuringUnits.KILOMETERS,
    });
    expect(result).toBe(1); // 1000 meters = 1 kilometer
  });

  it('converts meters to miles correctly', () => {
    const result = convertDistanceInMetersTo({
      distanceInMeters: 1609.34, // approximately one mile in meters
      measuringUnit: MeasuringUnits.MILES,
    });
    expect(result).toBeCloseTo(1, 2); // The result should be close to 1 mile, allowing for slight rounding differences. if result is between 0.9999 and 1.004, the test will pass because result is close to 1
  });

  it('converts meters to feet correctly', () => {
    const result = convertDistanceInMetersTo({
      distanceInMeters: 1,
      measuringUnit: MeasuringUnits.FEET,
    });
    expect(result).toBeCloseTo(3.281, 2); // 1 meter = 3.28084 feet, rounded to 3.281
  });

  it('returns meters when measuring unit is meters', () => {
    const result = convertDistanceInMetersTo({
      distanceInMeters: 100,
      measuringUnit: MeasuringUnits.METERS,
    });
    expect(result).toBe(100);
  });

  it('throws an error when measuringUnit is unsupported', () => {
    const unsupportedUnit = () =>
      convertDistanceInMetersTo({
        distanceInMeters: 100,
        measuringUnit: 'UNSUPPORTED_UNIT' as MeasuringUnits,
      });
    expect(unsupportedUnit).toThrow(
      'Unsupported measuring unit: UNSUPPORTED_UNIT',
    );
  });

  it('throws an error when measuringUnit is undefined', () => {
    const undefinedUnit = () =>
      convertDistanceInMetersTo({
        distanceInMeters: 100,
        measuringUnit: undefined as any,
      });
    expect(undefinedUnit).toThrow('Unsupported measuring unit: undefined');
  });

  it('throws an error when measuringUnit is null', () => {
    const nullUnit = () =>
      convertDistanceInMetersTo({
        distanceInMeters: 100,
        measuringUnit: null as any,
      });
    expect(nullUnit).toThrow('Unsupported measuring unit: null');
  });

  it('Returns 0 when distanceInMeters is 0', () => {
    const result = convertDistanceInMetersTo({
      distanceInMeters: 0,
      measuringUnit: MeasuringUnits.METERS,
    });
    expect(result).toBe(0);
  });

  it('Returns 0 when distanceInMeters is null', () => {
    const result = convertDistanceInMetersTo({
      distanceInMeters: null as any,
      measuringUnit: MeasuringUnits.METERS,
    });
    expect(result).toBe(0);
  });

  it('Returns 0 when distanceInMeters is undefined', () => {
    const result = convertDistanceInMetersTo({
      distanceInMeters: undefined as any,
      measuringUnit: MeasuringUnits.METERS,
    });
    expect(result).toBe(0);
  });
});

/**
 * prepareItemQueryRules
 */
describe('prepareItemQueryRules', () => {
  it('transforms columnIdValueCombinations to query rules format', () => {
    const columnIdValueCombinations = {
      connect_boards: 10000,
    };

    const expected = [{ column_id: 'connect_boards', compare_value: [10000] }];

    expect(prepareItemQueryRules(columnIdValueCombinations)).toEqual(expected);
  });

  it('handles an empty object', () => {
    const columnIdValueCombinations = {};
    const expected = [];
    expect(prepareItemQueryRules(columnIdValueCombinations)).toEqual(expected);
  });

  it('ensures compare_value is always an array', () => {
    const columnIdValueCombinations = {
      connect_boards4: 10000,
    };
    const expected = [{ column_id: 'connect_boards4', compare_value: [10000] }];
    expect(prepareItemQueryRules(columnIdValueCombinations)).toEqual(expected);
  });
});

/**
 * stringifyAppVersion
 */
describe('stringifyAppVersion', () => {
  it('correctly formats version data into a string', () => {
    const mockVersionData = {
      major: 3,
      minor: 18,
      patch: 0,
      type: 'type',
    };
    const expectedVersionString = '3.18.0';
    expect(stringifyAppVersion(mockVersionData)).toBe(expectedVersionString);
  });
});

/**
 * convertDateToMondayColumnValue
 */
describe('convertDateToMondayColumnValue', () => {
  it('converts Date objects to Monday column values correctly', () => {
    const date = new Date('2023-01-01T12:00:00Z');
    const result = convertDateToMondayColumnValue(date);
    expect(result).toEqual({ date: '2023-01-01', time: '12:00:00' });
  });
});

/**
 * prepareMondayMutationValues
 */
describe('prepareMondayMutationValues', () => {
  it('converts Date objects, booleans, and other non-objects correctly', () => {
    const date = new Date('2023-01-01T12:00:00Z');
    const columnValues = {
      aDate: date,
      aBoolean: true,
      aString: 'test',
      aNumber: 42,
      anObject: { key: 'value' },
    };

    const expected = {
      aDate: {
        date: '2023-01-01',
        time: '12:00:00',
      },
      aBoolean: { checked: 'true' },
      aString: 'test',
      aNumber: '42',
      anObject: { key: 'value' },
    };

    const result = prepareMondayMutationValues(columnValues);

    expect(result).toEqual(expected);
  });
});

/**
 * isSuccessResponse
 */
describe('isSuccessResponse', () => {
  it('returns true for success responses', () => {
    const successResponse: SuccessResponse<{ someData: string }> = {
      data: { someData: 'example' },
    };
    expect(isSuccessResponse(successResponse)).toBe(true);
  });

  it('returns false for error responses', () => {
    const errorResponse = {
      error_code: 'error_code',
      error_message: 'error_message',
    };
    expect(isSuccessResponse(errorResponse as ErrorResponse)).toBe(false);
  });

  it('returns false for empty or unrelated objects', () => {
    const emptyObject = {};
    const someDataObject = { someData: 'example' };
    expect(isSuccessResponse(emptyObject as any)).toBe(false);
    expect(isSuccessResponse(someDataObject as any)).toBe(false);
  });
});

/**
 * getMondayAPIErrorMessage
 */
describe('getMondayAPIErrorMessage', () => {
  it('returns the error_message for ErrorCodeTypeSchema errors', () => {
    const errorCodeErrorResponse = {
      error_code: 'SOME_ERROR_CODE',
      status_code: 400,
      error_message: 'Some error message',
      error_data: {},
    };
    expect(getMondayAPIErrorMessage(errorCodeErrorResponse)).toBe(
      'Some error message',
    );
  });

  it('returns the error_message for ErrorMessageTypeSchema errors', () => {
    const errorMessageErrorResponse = {
      error_message: 'Another error message',
      status_code: 500,
    };
    expect(getMondayAPIErrorMessage(errorMessageErrorResponse)).toBe(
      'Another error message',
    );
  });

  it('returns concatenated error messages for ErrorsTypeSchema errors', () => {
    const errorsErrorResponse = {
      errors: [
        {
          message: 'First error message',
          locations: [],
          extensions: {
            code: 'SOME_ERROR_CODE',
          },
          path: [],
        },
        {
          message: 'Second error message',
          locations: [],
          extensions: {
            code: 'SOME_ERROR_CODE',
          },
          path: [],
        },
      ],
      account_id: 123,
    };
    expect(getMondayAPIErrorMessage(errorsErrorResponse)).toBe(
      'First error message, Second error message',
    );
  });

  it('returns stringified response for error responses not matching any schema', () => {
    const unknownErrorResponse = { someKey: 'someValue' };
    expect(getMondayAPIErrorMessage(unknownErrorResponse as any)).toBe(
      JSON.stringify(unknownErrorResponse),
    );
  });
});
