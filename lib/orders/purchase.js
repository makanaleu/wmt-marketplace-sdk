Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Semantic wrapper for the PurchaseOrderList.
 */
class PurchaseOrderResponse {
    constructor(response) {
        this.list = response.list;
    }
}
exports.PurchaseOrderResponse = PurchaseOrderResponse;
/**
 * The response for All Released Orders.
 */
class PurchaseOrderList {
    constructor(list) {
        this.meta = list.meta;
        this.elements = list.elements;
    }
}
exports.PurchaseOrderList = PurchaseOrderList;
/**
 * The `elements` container when receiving purchase orders.
 */
class PurchaseOrderElements {
    constructor(elements) {
        this.order = elements.order;
    }
}
exports.PurchaseOrderElements = PurchaseOrderElements;
/**
 * An object containing a single order. Typically received in API responses such as
 * when acknowleding orders.
 */
class SingleOrderResponse {
    constructor(response) {
        this.order = response.order;
    }
}
exports.SingleOrderResponse = SingleOrderResponse;
/**
 * Information about the purchase order.
 */
class Order {
    constructor(order) {
        this.purchaseOrderId = order.purchaseOrderId;
        this.customerOrderId = order.customerOrderId;
        this.customerEmailId = order.customerEmailId;
        this.orderDate = order.orderDate;
        this.shippingInfo = order.shippingInfo;
        this.orderLines = order.orderLines;
    }
}
exports.Order = Order;
/**
 * The shipping information provided by the customer to the seller
 */
class ShippingInfo {
    constructor(shippingInfo) {
        this.phone = shippingInfo.phone;
        this.estimatedDeliveryDate = shippingInfo.estimatedDeliveryDate;
        this.estimatedShipDate = shippingInfo.estimatedShipDate;
        this.methodCode = shippingInfo.methodCode;
        this.postalAddress = shippingInfo.postalAddress;
    }
}
exports.ShippingInfo = ShippingInfo;
/**
 * Elements of the customer's postal address.
 */
class PostalAddress {
    constructor(postalAdress) {
        this.name = postalAdress.name;
        this.address1 = postalAdress.address1;
        this.address2 = postalAdress.address2;
        this.city = postalAdress.city;
        this.state = postalAdress.state;
        this.postalCode = postalAdress.postalCode;
        this.country = postalAdress.country;
        this.addressType = postalAdress.addressType;
    }
}
exports.PostalAddress = PostalAddress;
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
 * Purchase OrderLine information for each item.
 */
class OrderLine {
    constructor(orderline) {
        this.lineNumber = orderline.lineNumber;
        this.item = orderline.item;
        this.charges = orderline.charges;
        this.orderLineQuantity = orderline.orderLineQuantity;
        this.statusDate = orderline.statusDate;
        this.orderLineQuantity = orderline.orderLineQuantity;
        this.statusDate = orderline.statusDate;
        this.orderLineStatuses = orderline.orderLineStatuses;
        this.refund = orderline.refund;
        this.fulfillment = orderline.fulfillment;
    }
}
exports.OrderLine = OrderLine;
/**
 * The information for the item on the OrderLine.
 */
class LineItem {
    constructor(lineitem) {
        this.productName = lineitem.productName;
        this.sku = lineitem.sku;
    }
}
exports.LineItem = LineItem;
/**
 * Container for the line charges.
 */
class LineCharges {
    constructor(linecharges) {
        this.charge = linecharges.charge;
    }
}
exports.LineCharges = LineCharges;
/**
 * Information relating to the charge for the OrderLine.
 */
class LineCharge {
    constructor(linecharge) {
        this.chargeType = linecharge.chargeType;
        this.chargeName = linecharge.chargeName;
        this.chargeAmount = linecharge.chargeAmount;
        this.tax = linecharge.tax;
    }
}
exports.LineCharge = LineCharge;
/**
 * The details about the charges for the line item.
 */
class LineChargeAmount {
    constructor(linechargeamount) {
        this.currency = linechargeamount.currency;
        this.amount = linechargeamount.amount;
    }
}
exports.LineChargeAmount = LineChargeAmount;
/**
 * Tax information for the charge, including taxName and taxAmount.
 */
class LineChargeTax {
    constructor(linechargetax) {
        this.taxName = linechargetax.taxName;
        this.taxAmount = linechargetax.taxAmount;
    }
}
exports.LineChargeTax = LineChargeTax;
/**
 * The details for the amount of the tax charge.
 */
class LineChargeTaxAmount {
    constructor(linechargetaxamount) {
        this.currency = linechargetaxamount.currency;
        this.amount = linechargetaxamount.amount;
    }
}
exports.LineChargeTaxAmount = LineChargeTaxAmount;
/**
 * Quantities for the OrderLine.
 */
class LineQuantities {
    constructor(linequantities) {
        this.unitOfMeasurement = linequantities.unitOfMeasurement;
        this.amount = linequantities.amount;
    }
}
exports.LineQuantities = LineQuantities;
/**
 * A list of statuses for the OrderLine.
 */
class LineStatuses {
    constructor(linestatuses) {
        this.orderLineStatus = linestatuses.orderLineStatus;
    }
}
exports.LineStatuses = LineStatuses;
/**
 * Details about the OrderLine status.
 */
class OrderLineStatus {
    constructor(orderlinestatus) {
        this.status = orderlinestatus.status;
        this.statusQuantity = orderlinestatus.statusQuantity;
        this.cancellationReason = orderlinestatus.cancellationReason;
        this.trackingInfo = orderlinestatus.trackingInfo;
    }
}
exports.OrderLineStatus = OrderLineStatus;
/**
 * This seems to be an undocumentend object in the Purchase Order object, however
 * we discovered during live testing with the API.
 *
 * @todo get documentation from Walmart.
 */
class OrderLineFulfillment {
    constructor(olf) {
        this.fulfillmentOption = olf.fulfillmentOption;
        this.shipMethod = olf.shipMethod;
        this.storeId = olf.storeId;
        this.offerId = olf.offerId;
        this.pickUpDateTime = olf.pickUpDateTime;
        this.pickupBy = olf.pickupBy;
    }
}
exports.OrderLineFulfillment = OrderLineFulfillment;
/**
 * List of information about the package shipment and tracking updates.
 */
class OrderLineTrackingInfo {
    constructor(orderlinetrackinginfo) {
        this.shipDateTime = orderlinetrackinginfo.shipDateTime;
        this.carrierName = orderlinetrackinginfo.carrierName;
        this.methodCode = orderlinetrackinginfo.methodCode;
        this.trackingNumber = orderlinetrackinginfo.trackingNumber;
        this.trackingUrl = orderlinetrackinginfo.trackingUrl;
    }
}
exports.OrderLineTrackingInfo = OrderLineTrackingInfo;
/**
 * Information about the package carrier(s).
 */
class OrderLinePackageCarrier {
    constructor(orderlinepackagecarrier) {
        this.otherCarrier = orderlinepackagecarrier.otherCarrier;
        this.carrier = orderlinepackagecarrier.carrier;
    }
}
exports.OrderLinePackageCarrier = OrderLinePackageCarrier;
//# sourceMappingURL=purchase.js.map