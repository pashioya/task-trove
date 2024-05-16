export function handleMondayErrorCode(code: string): void {
  console.log('code', code);
  if (code === 'InvalidBoardIdException') {
    throw new Error('The board you chose is invalid');
  } else if (code === 'InvalidColumnIdException') {
    throw new Error('The column you chose is invalid');
  } else if (code === 'InvalidItemIdException') {
    throw new Error('The item you chose is invalid');
  } else if (code === 'missingRequiredPermissions') {
    throw new Error('The required OAuth permissions for the TaskTrove app are not met');
  } else if (code === 'InvalidArgumentException') {
    throw new Error('The arguments you provided are invalid');
  } else if (code === 'ResourceNotFoundException') {
    throw new Error('The resource you are trying to access does not exist');
  } else if (code === 'UserUnauthorizedException') {
    throw new Error('You are not authorized to access the Monday server');
  }
}

export function handleMondayErrorStatusCode(code: number): void {
  console.log('code', code);
  if (code === 500) {
    throw new Error(
      'The Monday server is having issues at the moment, please try again in a few minutes',
    );
  } else if (code === 429) {
    throw new Error(
      'The rate of requests to the Monday server has been exceeded, please try again in a few moments',
    );
  } else if (code === 401) {
    throw new Error(
      'An admin on the Monday server has restricted your account or you are trying to access data that you are not allowed to',
    );
  } else if (code === 400) {
    throw new Error('The request to the Monday server was not done correctly');
  } else if (code === 403) {
    throw new Error('You are not allowed to access the Monday server');
  } else if (code === 404) {
    throw new Error('The Monday server could not find the resource you are looking for');
  }
}
