export enum ResponseStatus {
    /**
     * OK (200): Indicates that the request has succeeded.
     */
    OK = 200,
    /**
     * UNAUTHORIZED (401): Indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
     */
    UNAUTHORIZED = 401,

    /**
     * FORBIDDEN (403): Indicates that the server understood the request but refuses to authorize it. This status is similar to 401, but in this case, re-authenticating will make no difference.
     */
    FORBIDDEN = 403,

    /**
     * NOT_FOUND (404): Indicates that the server can't find the requested resource. Links which lead to a 404 page are often called broken or dead links.
     */
    NOT_FOUND = 404,

    /**
     * INTERNAL_SERVER_ERROR (500): Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
     */
    INTERNAL_SERVER_ERROR = 500,
}
