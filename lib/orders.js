Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("./request");
const PurchaseOrder = require("./orders/purchase");
exports.PurchaseOrder = PurchaseOrder;
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
function getAllReleased(params) {
    let requestParams = {
        BaseUrl: 'https://marketplace.walmartapis.com/v3/orders/released',
        Query: {
            createdStartDate: params.CreatedStartDate.toISOString(),
            createdEndDate: (params.CreatedEndDate || new Date()).toISOString(),
            limit: (params.Limit > 0 && params.Limit <= 200) ? params.Limit : 200
        },
        Method: 'GET',
        Accept: params.Accept,
        ContentType: params.ContentType,
        Timestamp: params.Timestamp
    };
    return Request.execute(requestParams);
}
exports.getAllReleased = getAllReleased;
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
function ackOrder(params) {
    let requestParams = {
        BaseUrl: `https://marketplace.walmartapis.com/v3/orders/${params.PurchaseOrderId}/acknowledge`,
        Method: 'POST',
        Accept: params.Accept,
        ContentType: params.ContentType,
        Timestamp: params.Timestamp
    };
    return Request.execute(requestParams);
}
exports.ackOrder = ackOrder;
//# sourceMappingURL=orders.js.map