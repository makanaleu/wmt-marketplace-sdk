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
 * The request for acknowledging an order.
 */
export interface AcknowledgeOrderRequest extends Request.RequestHeaders {
    /**
     * A unique ID associated with the seller's purchase order.
     */
    PurchaseOrderId: number;
}
/**
 * Retrieves all the orders with line items that are in the "created" status, that is,
 * these orders have been released from the Walmart Order Management System to the
 * seller for processing. The released orders are the orders that are ready for a
 * seller to fulfill.
 *
 * @param params The GetAllReleaseRequest.
 *
 * @returns Result of the Promise is an Orders.PurchaseOrder.PurchaseOrderResponse if
 *          `Accept` is `application/json`.
 *
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#getAllReleasedOrders}
 */
export declare function getAllReleased(params: GetAllReleasedRequest): PromiseLike<any>;
/**
 * Acknowledge an entire order, including all of its order lines. Walmart requires a
 * seller to acknowledge orders within four hours of receipt of the order, except in
 * extenuating circumstances.
 *
 * The response to a successful call contains the  acknowledged order. In general,
 * only orders that are in a “Created” state should be acknowledged. As a good
 * practice, acknowledge your orders to avoid underselling. Orders that are in an
 * “Acknowledged” state can be re-acknowledged, possibly in response to an error
 * response from an earlier call to acknowledge order. Orders with line items that
 * are shipped or canceled should not be re-acknowledged.
 *
 * @param params The AcknowledgeOrderRequest.
 *
 * @returns Result of the Promise is an Orders.PurchaseOrder.PurchaseOrderResponse if
 *          `Accept` is `application/json`.
 *
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#acknowledgingOrders}
 */
export declare function ackOrder(params: AcknowledgeOrderRequest): PromiseLike<any>;
