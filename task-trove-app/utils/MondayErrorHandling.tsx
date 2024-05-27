export function handleMondayErrorCode(code: string): string {
  console.log('monday has responded with the following error code: ', code);
  if (code === 'InvalidBoardIdException') {
    return 'The board you chose is invalid';
  } else if (code === 'InvalidColumnIdException') {
    return 'The column you chose is invalid';
  } else if (code === 'InvalidItemIdException') {
    return 'The item you chose is invalid';
  } else if (code === 'missingRequiredPermissions') {
    return 'The required permissions for the TaskTrove app are not met';
  } else if (code === 'InvalidArgumentException') {
    return 'The arguments you provided are invalid';
  } else if (code === 'ResourceNotFoundException') {
    return 'The resource you are trying to access does not exist';
  } else if (code === 'UserUnauthorizedException') {
    return 'You are not authorized to access the Monday server';
  } else {
    return 'An Internal Server Error occurred';
  }
}

export function handleMondayErrorStatusCode(code: number): string {
  console.log('monday has responded with the following status code: ', code);
  if (code === 500) {
    return 'The Monday server is having issues at the moment, please try again in a few minutes';
  } else if (code === 401) {
    return 'An admin on the Monday server has restricted your account or you are trying to access data that you are not allowed to';
  } else if (code === 400) {
    return 'The request to the Monday server was not done correctly';
  } else if (code === 403) {
    return 'You are not allowed to access the Monday server';
  } else if (code === 404) {
    return 'The Monday server could not find the resource you are looking for';
  } else {
    return 'An Internal Server Error occurred';
  }
}
