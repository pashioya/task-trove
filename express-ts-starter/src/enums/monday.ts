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
