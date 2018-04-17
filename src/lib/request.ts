import { Authenticate } from 'wmt-marketplace-auth';
import * as Config from './config';
import * as Promise from 'bluebird';
import * as rp from 'request-promise';
import * as qs from 'querystring';
import { StatusCodeError } from 'request-promise/errors';

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
export function execute(request: RequestParams): PromiseLike<any> {
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
    body: request.Body
  })
    .catch(UnauthorizedError, (error) => {
      throw new Error('Unauthorized. Check that Request.Credentials is set correctly.');
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Checks if the response includes a `statusCode` of `401`.
 *
 * @param error Caught error from the request.
 *
 * @returns True if a `401` status code was received.
 */
export function UnauthorizedError(error: any): boolean {
  return error.statusCode === 401;
}
