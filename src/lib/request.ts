import { Authenticate } from 'wmt-marketplace-auth';
import * as Config from './config';
import * as WMTError from './error';
import * as Promise from 'bluebird';
import * as rp from 'request-promise';
import * as qs from 'querystring';

export { Promise };

/**
 * The credentials required for authenticating with the Walmart Marketplace API.
 */
export var Credentials: Config.Credentials;

/**
 * Commonly API authentication and request headers.
 */
export interface RequestHeaders {
  /**
   * A unique ID to correlate a vendor's calls with the Walmart system.
   */
  CorrelationId?: string;
  /**
   * The desired returned data format of the response. May override the default to
   * 'application/xml' if an XML response is preferred instead of JSON.
   */
  Accept?: string;
  /**
   * The data format used in the request. May override the default to
   * 'application/xml' if an XML response is preferred instead of JSON.
   */
  ContentType?: string;
  /**
   * The Epoch timestamp for the request.
   */
  Timestamp?: number;
}

/**
 * Essential properties of every API request.
 */
export interface RequestParams extends RequestHeaders {
  /**
   * The full URL of the Walmart API resource. Do not include query paramaters.
   *
   * @example 'https://api-gateway.walmart.com/v3/orders/released'
   */
  BaseUrl: string;
  /**
   * Query parameters for the request.
   */
  Query?: RequestQuery;
  /**
   * HTTP method used for the request (i.e. 'GET', 'POST').
   */
  Method?: string;
  /**
   * Request body.
   */
  Body?: string;
}

/**
 * Query parameters for the request. The interface includes all possible properties
 * accpeted by the API across all resources. The properties for a specifc request
 * exist as an interface in their respective module. For example, see the
 * `GetAllReleasedRequest` interface in the Orders module (./orders).
 */
export interface RequestQuery {
  /**
   * Start Date for querying after that date in UTC.
   */
  createdStartDate?: string;
  /**
   * End date for querying prior to the date in UTC.
   */
  createdEndDate?: string;
  /**
   * The number of elements to be returned.
   */
  limit?: number;
}

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
export function execute(request: RequestParams): Promise<any> {
  if (!Credentials) {
    throw new Error('Must set Request.Credentials before making a request.');
  }

  /**
   * Walmart authentication headers.
   */
  let headers: Authenticate.Custom = new Authenticate.Custom;
  if (request.CorrelationId) { headers.setCorrelationId(request.CorrelationId); }
  if (request.Timestamp) { headers.setTimestamp(request.Timestamp); }
  if (request.Accept) { headers.Accept = request.Accept; }
  if (request.ContentType) { headers.ContentType = request.ContentType; }

  headers.setConsumer({
    Channel: { Type: Credentials.Consumer.ChannelType },
    ConsumerId: Credentials.Consumer.ConsumerId
  });

  /**
   * The complete request URL including the query parameters. The URI is not encoded
   * due to the non-encoded format required of date query params.
   */
  let requestUrl: string = request.BaseUrl
    + ((request.Query) ? '?' : '')
    + qs.stringify(request.Query, null, null, { encodeURIComponent: (uri: string) => uri });

  /**
   * The authentication headers including the digital signature.
   */
  let signedHeaders: Authenticate.Signed = Authenticate.sign(headers, {
    RequestUrl: requestUrl,
    PrivateKey: Credentials.PrivateKey,
    RequestMethod: request.Method.toUpperCase()
  });

  return rp({
    method: request.Method.toUpperCase(),
    uri: requestUrl,
    headers: signedHeaders,
    body: request.Body,
    timeout: 120000
  })
    .catch(UnauthorizedError, (error: any) => {
      throw new Error('Unauthorized. Check that Request.Credentials is set correctly.');
    })
    .catch(ContentNotFoundError, (error: any) => {
      if (error.error) {
        /**
         * Walmart error response.
         */
        let wmtErrorResponse: WMTError.WMTErrorResponse = JSON.parse(error.error);
        /**
         * Collection of error messages contained in the response.
         */
        let errorMessages: {}[] = [];
        /**
         * Collection of info message contained in the response.
         */
        let infoMessages: {}[] = [];

        /**
         * Separate info messages from error messages.
         */
        wmtErrorResponse.errors.error.forEach((err: WMTError.WMTError) => {
          if (err.severity === "INFO") {
            infoMessages.push({code: err.code, description: err.description.trim()});
          } else {
            errorMessages.push({code: err.code, description: err.description.trim()});
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
      throw error;
    })
    .catch((error: any) => {
      throw error;
    });
}

/**
 * Checks if the response includes a `statusCode` of `401`.
 *
 * @param error Caught error from the request.
 *
 * @return True if a `401` status code was received.
 */
export function UnauthorizedError(error: any): boolean {
  return error.statusCode === 401;
}

/**
 * Checks if the response includes a `statusCode` of `404`.
 *
 * @param error Caught error from the request.
 *
 * @return True if a `404` status code was received.
 */
export function ContentNotFoundError(error: any): boolean {
  return error.statusCode === 404;
}
