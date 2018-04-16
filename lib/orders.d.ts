import * as Request from './request';
import * as PurchaseOrder from './orders/purchase';
export { PurchaseOrder };
/**
 * The request for getting All Released Orders.
 *
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#getAllReleasedOrders}
 */
export interface GetAllReleasedRequest extends Request.RequestHeaders {
    /**
     * Start Date for querying all purchase orders after that date in UTC.
     */
    CreatedStartDate: Date;
    /**
     * End date for querying all purchase order prior to the date in UTC. Leave unset
     * to default to current time.
     */
    CreatedEndDate?: Date;
    /**
     * The number of orders to be returned. Cannot be larger than 200.
     */
    Limit?: number;
}
/**
 * Retrieves all the orders with line items that are in the "created" status, that is,
 * these orders have been released from the Walmart Order Management System to the
 * seller for processing. The released orders are the orders that are ready for a
 * seller to fulfill.
 *
 * @param params The GetAllReleaseRequest.
 *
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#getAllReleasedOrders}
 *
 * @throws {Error} If `Request.Credentials` are not set.
 */
export declare function getAllReleased(params: GetAllReleasedRequest): PromiseLike<any>;
