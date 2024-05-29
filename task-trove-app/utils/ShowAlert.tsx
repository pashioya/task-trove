const showAlert = (error: MondayAPIError) => {
  if (error.errors) {
    Alert.alert('Error', error.errorMessage, [{ text: 'Dismiss' }]);
  } else if (error.errorCode) {
    const errorMessage = handleMondayErrorCode(error.errorCode);
    Alert.alert('Error', errorMessage, [{ text: 'Dismiss' }]);
  } else if (error.statusCode) {
    const errorMessage = handleMondayErrorStatusCode(error.statusCode);
    Alert.alert('Error', errorMessage, [{ text: 'Dismiss' }]);
  }
};
