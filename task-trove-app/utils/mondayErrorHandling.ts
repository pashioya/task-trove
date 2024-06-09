import type { MondayAPIError } from '~/lib/monday/error';
import { showGeneralAlert } from './alert';

export function handleMondayErrorCode(code: string): string {
  switch (code) {
    case 'InvalidBoardIdException':
      return 'The board you chose is invalid';
    case 'InvalidColumnIdException':
      return 'The column you chose is invalid';
    case 'InvalidItemIdException':
      return 'The item you chose is invalid';
    case 'missingRequiredPermissions':
      return 'The required permissions for the TaskTrove app are not met';
    case 'InvalidArgumentException':
      return 'The arguments you provided are invalid';
    case 'ResourceNotFoundException':
      return 'The resource you are trying to access does not exist';
    case 'UserUnauthorizedException':
      return 'You are not authorized to access the Monday server';
    default:
      return 'An Internal Server Error occurred';
  }
}

export function handleMondayErrorStatusCode(code: number): string {
  switch (code) {
    case 500:
      return 'The Monday server is having issues at the moment, please try again in a few minutes';
    case 401:
      return 'An admin on the Monday server has restricted your account or you are trying to access data that you are not allowed to';
    case 400:
      return 'The request to the Monday server was not done correctly';
    case 403:
      return 'You are not allowed to access the Monday server';
    case 404:
      return 'The Monday server could not find the resource you are looking for';
    default:
      return 'An Internal Server Error occurred';
  }
}

export const showMondayAlert = (error: MondayAPIError) => {
  if (error.errors && error.errorMessage) {
    showGeneralAlert('Error', error.errorMessage);
  } else if (error.errorCode) {
    const errorMessage = handleMondayErrorCode(error.errorCode);
    showGeneralAlert('Error', errorMessage);
  } else if (error.statusCode) {
    const errorMessage = handleMondayErrorStatusCode(error.statusCode);
    showGeneralAlert('Error', errorMessage);
  } else {
    showGeneralAlert('Error', 'An unknown error Monday occurred.');
  }
};
