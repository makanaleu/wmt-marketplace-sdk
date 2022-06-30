Object.defineProperty(exports, "__esModule", { value: true });
const wmt_marketplace_auth_1 = require("wmt-marketplace-auth");
const Promise = require("bluebird");
exports.Promise = Promise;
const rp = require("request-promise");
const qs = require("querystring");
/**
 * Execute the request. Authentication headers are compiled using
 * `wmt-marketplace-auth` and added to the request. Before calling `execute()`, be
 * sure to set `WMT.Request.Credentials` and prepare a `RequestParams` object.
 *
 * @param request The prepared RequestParams object.
 *
 * @throws {Error} If credentials aren't set before calling the `execute()` method.
 *
 * @return {Promise} Returns the response received from the Walmart Marketplace API.
 */
function execute(request) {
    if (!exports.Credentials) {
        throw new Error('Must set Request.Credentials before making a request.');
    }
    /**
     * Walmart authentication headers.
     */
    let customHeaders = new wmt_marketplace_auth_1.Authenticate.Custom;
    if (request.CorrelationId) {
        customHeaders.setCorrelationId(request.CorrelationId);
    }
    if (request.Accept) {
        customHeaders.Accept = request.Accept;
    }
    let tokenReqHeaders = wmt_marketplace_auth_1.Authenticate.getTokenRequestHeaders(customHeaders, {
        ClientID: exports.Credentials.ClientID,
        ClientSecret: exports.Credentials.ClientSecret
    });
    return rp({
        method: 'POST',
        uri: 'https://marketplace.walmartapis.com/v3/token',
        headers: tokenReqHeaders,
        body: 'grant_type=client_credentials',
        timeout: 120000
    }).then((resp) => {
        let tokenResponse = JSON.parse(resp);
        let reqHeaders = {
            'WM_SVC.NAME': tokenReqHeaders["WM_SVC.NAME"],
            'WM_QOS.CORRELATION_ID': tokenReqHeaders["WM_QOS.CORRELATION_ID"],
            'Authorization': tokenReqHeaders.Authorization,
            'Accept': tokenReqHeaders.Accept,
            'Content-Type': request.ContentType || 'application/json',
            'WM_SEC.ACCESS_TOKEN': tokenResponse.access_token
        };
        /**
         * The complete request URL including the query parameters. The URI is not encoded
         * due to the non-encoded format required of date query params.
         */
        let requestUrl = request.BaseUrl
            + ((request.Query) ? '?' : '')
            + qs.stringify(request.Query, null, null, { encodeURIComponent: (uri) => uri });
        return rp({
            method: request.Method.toUpperCase(),
            uri: requestUrl,
            headers: reqHeaders,
            body: request.Body,
            timeout: 120000
        })
            .catch(UnauthorizedError, (error) => {
            throw new Error('Unauthorized. Failed to authorize with the access token.');
        })
            .catch(ContentNotFoundError, (error) => {
            if (error.error) {
                /**
                 * Walmart error response.
                 */
                let wmtErrorResponse = JSON.parse(error.error);
                /**
                 * Collection of error messages contained in the response.
                 */
                let errorMessages = [];
                /**
                 * Collection of info message contained in the response.
                 */
                let infoMessages = [];
                /**
                 * Separate info messages from error messages.
                 */
                wmtErrorResponse.errors.error.forEach((err) => {
                    if (err.severity === "INFO") {
                        infoMessages.push({ code: err.code, description: err.description.trim() });
                    }
                    else {
                        errorMessages.push({ code: err.code, description: err.description.trim() });
                    }
                });
                /**
                 * If error messages exists, throw new Error containing the error codes and
                 * messages.
                 */
                if (errorMessages.length > 0) {
                    throw new Error(JSON.stringify(errorMessages));
                }
                /**
                 * If the error response only contains info messages, resolve and return the
                 * info codes and messages. This occurs, for example, when calling
                 * `getAllReleased` and no new released orders exist.
                 */
                return Promise.resolve(JSON.stringify(infoMessages));
            }
            /**
             * Rethrow the error for all other 404 errors not otherwise handled.
             */
            throw new Error(error);
        })
            .catch((error) => {
            throw new Error(error);
        });
    })
        .catch(UnauthorizedError, (error) => {
        throw new Error('Unauthorized. Failed to authorize the Token API request.');
    })
        .catch((error) => {
        throw new Error(error);
    });
}
exports.execute = execute;
/**
 * Checks if the response includes a `statusCode` of `401`.
 *
 * @param error Caught error from the request.
 *
 * @return True if a `401` status code was received.
 */
function UnauthorizedError(error) {
    return error.statusCode === 401;
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Checks if the response includes a `statusCode` of `404`.
 *
 * @param error Caught error from the request.
 *
 * @return True if a `404` status code was received.
 */
function ContentNotFoundError(error) {
    return error.statusCode === 404;
}
exports.ContentNotFoundError = ContentNotFoundError;
//# sourceMappingURL=request.js.map