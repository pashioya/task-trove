/** SDK */
export enum LogTags {
  AUTHORIZATION_MIDDLEWARE = 'AuthorizationMiddleware',
  COUNT_OPERATIONS_MIDDLEWARE = 'CountOperationsMiddleware',
  LOCATION_EXTRACTOR_CONTROLLER = 'LocationExtractorController',
  REMOTE_LOCATION_PARAMETERS_CONTROLLER = 'RemoteLocationParametersController',
  DISTANCE_TIME_CALCULATION_CONTROLLER = 'DistanceTimeCalculationController',
  REMOTE_MEASURING_UNITS_CONTROLLER = 'RemoteMeasuringUnitsController',
  WEBHOOKS_CONTROLLER = 'WebhooksController',
  CHECK_SUBSCRIPTION_MIDDLEWARE = 'CheckSubscriptionMiddleware',
}

/** Middleware */
export enum OperationCounts {
  NONE = 0,
  TRIAL = 500,
  FREE = 50,
  SMALL = 1000,
  MEDIUM = 2500,
  LARGE = 5000,
}

export enum OperationsCountStatus {
  OUT_OF_OPERATIONS = 'OUT OF OPERATIONS',
  MORE_RETRIES_NEEDED = 'MORE RETRIES NEEDED',
  MISSING_SUBSCRIPTION = 'MISSING SUBSCRIPTION',
}

/** Webhooks */
export enum EventTypes {
  /**
   * The install webhook containing subscription data will be sent to the user
   * once they install an app. The data may be for a trial subscription if a user
   * installed an app for the first time that offers a trial plan. It can also be
   * for a paid subscription if the user reinstalls an app that they previously
   * paid for but then uninstalled.
   */
  INSTALL = 'install',

  /**
   * The uninstall webhook containing subscription data will be sent to the app
   * as soon as a user uninstalls an app.
   */
  UNINSTALL = 'uninstall',

  /**
   * The app_subscription_created webhook containing subscription data will be sent
   * to the developer when a user purchases a plan.
   */
  SUBSCRIPTION_CREATED = 'app_subscription_created',

  /**
   * The app_subscription_changed webhook containing subscription data will be sent
   * to the developer once a user upgrades or downgrades their subscription.
   */
  SUBSCRIPTION_CHANGED = 'app_subscription_changed',

  /**
   * The app_subscription_renewed webhook containing the renewed subscription
   * information will be sent to the developer when a user's subscription renews
   * on the renewal date.
   */
  SUBSCRIPTION_RENEWED = 'app_subscription_renewed',

  /**
   * The app_subscription_cancelled webhook containing subscription data will be
   * sent to the developer when the subscription actually ends due to a cancellation.
   * When a user churns from monday.com, the webhook will contain a reason field
   * indicating monday_subscription_cancel_on_renewal.
   */
  SUBSCRIPTION_CANCELLED = 'app_subscription_cancelled',

  /**
   * The app_subscription_cancelled_by_user webhook containing subscription data
   * will be sent to the developer when a user cancels their subscription. Please
   * note that the subscription will remain active until the paid period ends. Once
   * the renewal date passes, their subscription will not renew and the developer
   * will receive the app_subscription_cancelled webhook.
   */
  SUBSCRIPTION_CANCELLED_BY_USER = 'app_subscription_cancelled_by_user',

  /**
   * The app_subscription_cancellation_revoked_by_user webhook containing
   * subscription data will be sent to the developer when a user undoes their
   * subscription cancellation before the renewal date. This event signifies that
   * the subscription will automatically renew on the renewal date.
   */
  SUBSCRIPTION_CANCELLATION_REVOKED_BY_USER = 'app_subscription_cancellation_revoked_by_user',

  /**
   * The app_trial_subscription_started webhook containing subscription data will
   * be sent to the developer when a user starts a new app trial.
   */
  SUBSCRIPTION_TRIAL_STARTED = 'app_trial_subscription_started',

  /**
   * The app_trial_subscription_ended webhook containing subscription data will
   * be sent to the developer when a user ends an app trial.
   */
  SUBSCRIPTION_TRIAL_ENDED = 'app_trial_subscription_ended',

  /**
   * The app_subscription_renewal_failed webhook containing subscription data will
   * be sent to the developer when the final subscription renewal fails.
   */
  SUBSCRIPTION_RENEWAL_FAILED = 'app_subscription_renewal_failed',
}

export enum SubscriptionStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum InstallStatus {
  INSTALLED = 'Installed',
  UNINSTALLED = 'Uninstalled',
}

export enum TryveBoardIds {
  ACCOUNTS = 5494221844,
  INSTALLS = 5522183181,
  SUBSCRIPTIONS = 5522177485,
}

/** Notifications */
export enum MissingSubscriptionNotification {
  TITLE = 'Missing subscription',
  DESCRIPTION = "There's no active subscription for Location Toolkit",
  RUNTIME_ERROR_DESCRIPTION = "There's no active subscription for Location Toolkit",
}

export enum OutOfOperationsNotification {
  TITLE = 'Out of Operations',
  DESCRIPTION = "You've run out of operations, please upgrade your subscription for Location Toolkit",
  RUNTIME_ERROR_DESCRIPTION = "You've run out of operations, please upgrade your subscription for Location Toolkit",
}

export enum IncorrectSubscriptionPlanNotification {
  TITLE = 'Subscription Limitation',
}

export enum InternalServerErrorNotification {
  TITLE = 'Internal Server Error',
  DESCRIPTION = 'Something went wrong, please try again later',
  RUNTIME_ERROR_DESCRIPTION = 'Something went wrong, please try again later',
}

export enum MissingLocationWarningNotification {
  TITLE = 'Missing a required Location value',
  DESCRIPTION = 'A given Location value is missing, please make sure to fill in all required Location columns',
  RUNTIME_ERROR_DESCRIPTION = 'A given Location value is missing, please make sure to fill in all required Location columns',
}

export enum MissingLocationColumnErrorNotification {
  TITLE = 'Missing a required Location column',
  DESCRIPTION = 'Your integration has been disabled, please make sure to fill all required location columns.',
  RUNTIME_ERROR_DESCRIPTION = 'Origin and/or Destination column(s) are missing, please make sure to fill in all required Location columns',
}

export enum MissingDestinationColumnNotification {
  TITLE = 'Missing destination column',
  DESCRIPTION = 'Your Location Columnizer Integration has been disabled as the destination column in your integration is missing/deleted, please correct your integration',
  RUNTIME_ERROR_DESCRIPTION = 'The destination column in your integration is missing/deleted, please correct your integration',
}

export enum MissingDistanceColumnNotification {
  TITLE = 'Missing distance column',
  DESCRIPTION = 'Your integration has been disabled as the distance column in your integration is missing/deleted, please correct your integration',
  RUNTIME_ERROR_DESCRIPTION = 'The distance column in your integration is missing/deleted, please correct your integration',
}

export enum MissingTimeColumnNotification {
  TITLE = 'Missing time column',
  DESCRIPTION = 'Your integration has been disabled as the time column in your integration is missing/deleted, please correct your integration',
  RUNTIME_ERROR_DESCRIPTION = 'The time column in your integration is missing/deleted, please correct your integration',
}

export enum MissingLocationColumnNotification {
  TITLE = 'Missing location column',
  DESCRIPTION = 'Your Location Columnizer Integration has been disabled as the location column in your integration is missing/deleted, please correct your integration',
  RUNTIME_ERROR_DESCRIPTION = 'The location column in your integration is missing/deleted, please correct your integration',
}

export enum MissingItemIdNotification {
  TITLE = 'Missing item ID',
  DESCRIPTION = 'Unable to retrieve the item from the board, please make sure the item is still available',
  RUNTIME_ERROR_DESCRIPTION = 'Unable to retrieve the item from the board, please make sure the item is still available',
}

export enum MondayAPIErrorMessages {
  MISSING_LAT_LONG_VALUES = 'Expected both location columns to have lat and lng',
  COLUMN_ID_DOESNT_EXIST = "This column ID doesn't exist for the board",
  ITEM_ID_DOESNT_EXIST = "This item ID doesn't exist for the board",
  MISSING_LOCATION_COLUMN = 'Missing at least one Location Column',
  NO_ACTIVE_SUBSCRIPTION = 'No active subscription of this app found on this account.',
  COMPLEXITY_BUDGET_EXHAUSTED = 'Complexity budget exhausted',
}

/** HTTP Status Codes */
export enum SeverityCodes {
  /**
   * 4000: indicates an error of medium severity and will result in a failed automation run.
   */
  MEDIUM = 4000,

  /**
   * 6000: indicates an error of high severity and will result in a disabled automation.
   */
  HIGH = 6000,
}

export enum AppErrorCodes {
  /**
   * UNAUTHORIZED (401): Indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
   */
  UNAUTHORIZED = 401,

  /**
   * PAYMENT_REQUIRED (402): This status code indicates that the request cannot be processed due to payment requirements. In the context of the Monday API, it is used to signify that the requested action or resource is not available under the current subscription plan or payment status.
   */
  PAYMENT_REQUIRED = 402,

  /**
   * FORBIDDEN (403): Indicates that the server understood the request but refuses to authorize it. This status is similar to 401, but in this case, re-authenticating will make no difference.
   */
  FORBIDDEN = 403,

  /**
   * NOT_FOUND (404): Indicates that the server can't find the requested resource. Links which lead to a 404 page are often called broken or dead links.
   */
  NOT_FOUND = 404,

  /**
   * GONE (410): Indicates that the target resource is no longer available at the origin server and that this condition is likely to be permanent.
   */
  GONE = 410,

  /**
   * UNPROCESSABLE_ENTITY (422): Means the server understands the content type of the request entity, and the syntax of the request entity is correct but it was unable to process the contained instructions.
   */
  UNPROCESSABLE_ENTITY = 422,

  /**
   * INTERNAL_SERVER_ERROR (500): Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
   */
  INTERNAL_SERVER_ERROR = 500,
}

export enum ApiErrorCodes {
  /**
   * A 500 (Internal Server Error) error is a general error that indicates something went wrong.
   * Common causes of this error are:
   * - Invalid arguments, such as board or item IDs that don't exist
   * - Malformatted JSON column values when using the create_item or change_multiple_column_values mutations
   * If these don't fix the issue, reach out to our team!
   */
  InternalServerError = 500,

  /**
   * A 429 (Rate Limit Exceeded) error indicates that you made more than 5,000 requests in one minute.
   * Ensure that you do not send more than 5,000 requests in one minute.
   */
  RateLimitExceeded = 429,

  /**
   * A 401 (Your IP is restricted) error indicates that an account admin has restricted access to the system from specific IP addresses.
   * Confirm that your IP address is not restricted by your account admin.
   */
  YourIpIsRestricted = 401,

  /**
   * A 401 (Not authenticated) error indicates that you don't have permission to access the data you're attempting to access.
   * Ensure your API key is valid and passed in the “Authorization” header.
   */
  Unauthorized = 401,

  /**
   * A 400 (No query string was present) error indicates that the structure of your query string was passed incorrectly.
   * Ensure your query string is passed with the “query” key, your request is sent as a POST request with a JSON body,
   * and that your query does not contain unterminated strings.
   */
  BadRequest = 400,

  /**
   * A 200 Parse error indicates that some formatting in your query string is incorrect.
   * Ensure your query is a valid string, and all parenthesis, brackets, and curly brackets are closed.
   */
  ParseError = 200,

  /**
   * A 200 ComplexityException error indicates that you have reached the complexity limit.
   * You can avoid hitting the limit by using nested queries and adding limits to your queries.
   * Check out our rate limit documentation to learn more about complexity limits.
   */
  ComplexityException = 200,

  /**
   * A 403 UserUnauthorizedException error indicates that the user in question does not have the permission to perform the action in question.
   * Check if the user has permission to access or edit the given resource.
   */
  UserUnauthorizedException = 403,

  /**
   * A 200 InvalidUserIdException error indicates that the user ID being passed in the query is not a valid user ID.
   * Ensure the user ID exists and this user is assigned to your board.
   */
  InvalidUserIdException = 200,

  /**
   * A 200 InvalidVersionException error indicates that the requested API version is invalid.
   * Ensure that your request follows the proper format.
   */
  InvalidVersionException = 200,

  /**
   * A 200 InvalidColumnIdException error indicates that the column ID being passed in the query is not a valid column ID.
   * Ensure the column ID exists and you have access to the column.
   */
  InvalidColumnIdException = 200,

  /**
   * A 200 InvalidBoardIdException error indicates that the board ID being passed in the query is not a valid board ID.
   * Ensure the board ID exists and you have access to the board.
   */
  InvalidBoardIdException = 200,

  /**
   * A 200 InvalidArgumentException error indicates that the argument being passed in the query is not a valid argument or that you've hit a pagination limit.
   * Ensure you do not have a typo, that the argument exists for the object you are querying, or make your result window smaller.
   */
  InvalidArgumentException = 200,

  /**
   * A 200 CreateBoardException error indicates that there was an error in your query to create a board.
   * If you’re creating a board from a template, ensure the template ID is a valid monday template or a board that has template status.
   * If you’re duplicating a board, ensure the board ID exists.
   */
  CreateBoardException = 200,

  /**
   * A 200 ResourceNotFoundException error indicates that the ID you are attempting to pass in your query is invalid.
   * Ensure the ID of the item, group, or board you’re querying exists.
   */
  ResourceNotFoundException200 = 200,

  /**
   * A 404 ResourceNotFoundException error indicates that the ID you are attempting to pass in your query is invalid.
   * Ensure the ID of the user you are querying exists and is assigned to your board.
   */
  ResourceNotFoundException404 = 404,

  /**
   * A 200 ItemsLimitationException error indicates that you have exceeded the limit of items allowed for a board.
   * To prevent abuse, each board has a limit of 10,000 items created via the API. This error is thrown when you have reached the limit.
   */
  ItemsLimitationException = 200,

  /**
   * A 200 ItemNameTooLongException error indicates that the item name you have chosen has exceeded the amount of characters allowed.
   * Ensure your item name is between 1 and 255 characters long.
   */
  ItemNameTooLongException = 200,

  /**
   * A 200 ColumnValueException error indicates that the column value you are attempting to send in your query is of the incorrect formatting.
   * If you are updating a column value, ensure the value conforms with each column’s data structure.
   * If you’re retrieving a column value, ensure the column is supported by our API and not calculated in the client (e.g., formula column).
   * If you get the error "The column has no connected boards," ensure the Connect column you're referencing is connected to a board via the monday.com UI.
   */
  ColumnValueException = 200,

  /**
   * A 200 CorrectedValueException error indicates that the value you are attempting to send in your query is of the wrong type.
   * If you try to update a column with simple values (String values), ensure the column supports this type of value format.
   * To learn more about columns that support simple values, check out the change_simple_column_values() method here.
   */
  CorrectedValueException = 200,
}
