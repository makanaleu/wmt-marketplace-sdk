"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Semantic wrapper for the OrderShipment.
 */
class OrderShipmentRequest {
    constructor(orderShipmentRequest) {
        this.orderShipment = orderShipmentRequest.orderShipment;
    }
}
exports.OrderShipmentRequest = OrderShipmentRequest;
/**
 * Information about a shipment.
 */
class OrderShipment {
    constructor(ordershipment) {
        this.orderLines = ordershipment.orderLines;
    }
}
exports.OrderShipment = OrderShipment;
/**
 * A wrapper for the list of OrderLine items on the order.
 */
class OrderLines {
    constructor(orderlines) {
        this.orderLine = orderlines.orderLine;
    }
}
exports.OrderLines = OrderLines;
/**
 * Information about an OrderLine in the shipment.
 */
class OrderLine {
    constructor(orderline) {
        this.lineNumber = orderline.lineNumber;
        this.shipFromCountry = orderline.shipFromCountry;
        this.orderLineStatuses = orderline.orderLineStatuses;
    }
}
exports.OrderLine = OrderLine;
/**
 * A semantic wrapper for the list of OrderLine statuses.
 */
class OrderLineStatuses {
    constructor(ols) {
        this.orderLineStatus = ols.orderLineStatus;
    }
}
exports.OrderLineStatuses = OrderLineStatuses;
/**
 * Once the shipment is done, to update tracking details in the PO,
 * you must pass the tracking number to be updated under the new
 * currentTrackingInfo field.
 */
class CurrentTrackingInfo {
}
exports.CurrentTrackingInfo = CurrentTrackingInfo;
/**
 * Details about the OrderLine status.
 */
class OrderLineStatus {
    constructor(ols) {
        this.status = ols.status;
        this.statusQuantity = ols.statusQuantity;
        this.trackingInfo = ols.trackingInfo;
        this.currentTrackingInfo = ols.currentTrackingInfo;
    }
}
exports.OrderLineStatus = OrderLineStatus;
//# sourceMappingURL=shipment.js.map