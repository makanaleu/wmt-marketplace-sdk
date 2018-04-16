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
 * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#getAllReleasedOrders}
 *
 * @throws {Error} If `Request.Credentials` are not set.
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
//# sourceMappingURL=orders.js.map