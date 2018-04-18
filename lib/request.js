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
    let headers = new wmt_marketplace_auth_1.Authenticate.Custom;
    if (request.CorrelationId) {
        headers.setCorrelationId(request.CorrelationId);
    }
    if (request.Timestamp) {
        headers.setTimestamp(request.Timestamp);
    }
    if (request.Accept) {
        headers.Accept = request.Accept;
    }
    if (request.ContentType) {
        headers.ContentType = request.ContentType;
    }
    headers.setConsumer({
        Channel: { Type: exports.Credentials.Consumer.ChannelType },
        ConsumerId: exports.Credentials.Consumer.ConsumerId
    });
    /**
     * The complete request URL including the query parameters. The URI is not encoded
     * due to the non-encoded format required of date query params.
     */
    let requestUrl = request.BaseUrl
        + ((request.Query) ? '?' : '')
        + qs.stringify(request.Query, null, null, { encodeURIComponent: (uri) => uri });
    /**
     * The authentication headers including the digital signature.
     */
    let signedHeaders = wmt_marketplace_auth_1.Authenticate.sign(headers, {
        RequestUrl: requestUrl,
        PrivateKey: exports.Credentials.PrivateKey,
        RequestMethod: request.Method.toUpperCase()
    });
    return rp({
        method: request.Method.toUpperCase(),
        uri: requestUrl,
        headers: signedHeaders,
        body: request.Body,
        timeout: 120000
    })
        .catch(UnauthorizedError, (error) => {
        throw new Error('Unauthorized. Check that Request.Credentials is set correctly.');
    })
        .catch((error) => {
        throw error;
    });
}
exports.execute = execute;
/**
 * Checks if the response includes a `statusCode` of `401`.
 *
 * @param error Caught error from the request.
 *
 * @returns True if a `401` status code was received.
 */
function UnauthorizedError(error) {
    return error.statusCode === 401;
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=request.js.map