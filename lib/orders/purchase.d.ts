import * as Response from '../response';
/**
 * Semantic wrapper for the PurchaseOrderList.
 */
export declare class PurchaseOrderResponse {
    /**
     * The response for All Released Orders.
     */
    list: PurchaseOrderList;
    constructor(response: PurchaseOrderResponse);
}
/**
 * The response for All Released Orders.
 */
export declare class PurchaseOrderList implements Response.List {
    meta: Response.Meta;
    elements: PurchaseOrderElements;
    constructor(list: PurchaseOrderList);
}
/**
 * The `elements` container when receiving purchase orders.
 */
export declare class PurchaseOrderElements {
    /**
     * Iterable collection of orders.
     */
    order: Order[];
    constructor(elements: PurchaseOrderElements);
}
/**
 * An object containing a single order. Typically received in API responses such as
 * when acknowleding orders.
 */
export declare class SingleOrderResponse {
    /**
     * Semantic wrapper of a single Order.
     */
    order: Order;
    constructor(response: SingleOrderResponse);
}
/**
 * Information about the purchase order.
 */
export declare class Order {
    /**
     * A unique ID associated with the seller's purchase order.
     */
    purchaseOrderId: number;
    /**
     * A unique ID associated with the sales order for specified customer.
     */
    customerOrderId: number;
    /**
     * The email address of the customer for the sales order.
     */
    customerEmailId: string;
    /**
     * The Epoch timestamp when the customer submitted the sales order.
     */
    orderDate: number;
    /**
     * The shipping information provided by the customer to the seller.
     */
    shippingInfo: ShippingInfo;
    /**
     * A wrapper for the list of OrderLine items on the order.
     */
    orderLines: OrderLines;
    constructor(order: Order);
}
/**
 * The shipping information provided by the customer to the seller
 */
export declare class ShippingInfo {
    /**
     * The customer's phone number.
     */
    phone: number;
    /**
     * The estimated Epoch timestamp for the delivery of the item.
     */
    estimatedDeliveryDate: number;
    /**
     * The estimated Epoch timestamp when the item will be shipped.
     */
    estimatedShipDate: number;
    /**
     * The shipping method. Can be one of the following:
     * - Standard
     * - Express
     * - OneDay
     * - Freight
     */
    methodCode: string;
    /**
     * Elements of the customer's postal address.
     */
    postalAddress: PostalAddress;
    constructor(shippingInfo: ShippingInfo);
}
/**
 * Elements of the customer's postal address.
 */
export declare class PostalAddress {
    /**
     * The recipient's name for the shipment.
     */
    name: string;
    /**
     * The first line of the shipping address.
     */
    address1: string;
    /**
     * The second line of the shipping address.
     */
    address2?: string;
    /**
     * The city of the shipping address.
     */
    city: string;
    /**
     * The state of the shipping address.
     */
    state: string;
    /**
     * The ZIP code of the shipping address.
     */
    postalCode: string;
    /**
     * The country of the shipping address.
     */
    country: string;
    /**
     * The address type.
     *
     * @example 'RESIDENTIAL'
     */
    addressType: string;
    constructor(postalAdress: PostalAddress);
}
/**
 * A wrapper for the list of OrderLine items on the order.
 */
export declare class OrderLines {
    /**
     * Purchase OrderLine information for each item.
     */
    orderLine: OrderLine[];
    constructor(orderlines: OrderLines);
}
/**
 * Purchase OrderLine information for each item.
 */
export declare class OrderLine {
    /**
     * The line number associated with the details for each individual item in the
     * purchase order. (i.e. 1, 2, 3...)
     */
    lineNumber: number;
    /**
     * The information for the item on the OrderLine.
     */
    item: LineItem;
    /**
     * Information relating to the charge for the OrderLine.
     */
    charges: LineCharges;
    /**
     * Quantities for the OrderLine.
     */
    orderLineQuantity: LineQuantities;
    /**
     * The Epoch timestamp of the latest status update.
     */
    statusDate: number;
    /**
     * A list of statuses for the OrderLine.
     */
    orderLineStatuses: LineStatuses;
    /**
     * Details about any refund on the order. This property is not yet documented.
     *
     * @see {@link https://developer.walmart.com/#/apicenter/marketPlace/latest#getAllReleasedOrders}
     */
    refund?: any;
    /**
     * This seems to be an undocumentend object in the Purchase Order object, however
     * we discovered during live testing with the API.
     */
    fulfillment?: OrderLineFulfillment;
    constructor(orderline: OrderLine);
}
/**
 * The information for the item on the OrderLine.
 */
export declare class LineItem {
    /**
     * The name of the product associated with the line item.
     *
     * @example '2086883 Canister Secondary Filter Generic 2 Pack'
     */
    productName: string;
    /**
     * An arbitrary alphanumeric unique ID, assigned to each item in the XSD file. This ID is used to filter or retrieve an item. Cannot be more than 50 characters. Special characters hyphen (-), space ( ), and period (.) are not allowed.
     */
    sku: string;
    constructor(lineitem: LineItem);
}
/**
 * Container for the line charges.
 */
export declare class LineCharges {
    /**
     * Collection of line charges.
     */
    charge: LineCharge[];
    constructor(linecharges: LineCharges);
}
/**
 * Information relating to the charge for the OrderLine.
 */
export declare class LineCharge {
    /**
     * The charge type for line items can be one of the following:
     * - PRODUCT
     * - SHIPPING
     */
    chargeType: string;
    /**
     * If chargeType is PRODUCT, chargeName is Item Price.
     * If chargeType is SHIPPING, chargeName is Shipping
     */
    chargeName: string;
    /**
     * The details about the charges for the line item.
     */
    chargeAmount: LineChargeAmount;
    /**
     * Tax information for the charge, including taxName and taxAmount.
     */
    tax?: LineChargeTax;
    constructor(linecharge: LineCharge);
}
/**
 * The details about the charges for the line item.
 */
export declare class LineChargeAmount {
    /**
     * The type of currency for the charge.
     *
     * @example 'USD' // US Dollars
     */
    currency: string;
    /**
     * The numerical amount for that charge.
     *
     * @example 9.99
     */
    amount: number;
    constructor(linechargeamount: LineChargeAmount);
}
/**
 * Tax information for the charge, including taxName and taxAmount.
 */
export declare class LineChargeTax {
    /**
     * The name associated with the tax.
     * @example 'Sales Tax'
     */
    taxName: string;
    /**
     * The details for the amount of the tax charge.
     */
    taxAmount: LineChargeTaxAmount;
    constructor(linechargetax: LineChargeTax);
}
/**
 * The details for the amount of the tax charge.
 */
export declare class LineChargeTaxAmount {
    /**
     * The type of currency for the charge.
     *
     * @example 'USD' // US Dollars
     */
    currency: string;
    /**
     * The numerical amount for that charge.
     *
     * @example 9.99
     */
    amount: number;
    constructor(linechargetaxamount: LineChargeTaxAmount);
}
/**
 * Quantities for the OrderLine.
 */
export declare class LineQuantities {
    /**
     * Always use 'EACH'
     */
    unitOfMeasurement: string;
    /**
     * Always use '1'
     */
    amount: number;
    constructor(linequantities: LineQuantities);
}
/**
 * A list of statuses for the OrderLine.
 */
export declare class LineStatuses {
    /**
     * Details about the OrderLine status.
     */
    orderLineStatus: OrderLineStatus[];
    constructor(linestatuses: LineStatuses);
}
/**
 * Details about the OrderLine status.
 */
export declare class OrderLineStatus {
    /**
     * Should be 'Created'.
     */
    status: string;
    /**
     * Details about the status update.
     */
    statusQuantity: LineQuantities;
    /**
     * If order is canceled, cancellationReason will explain the reason.
     */
    cancellationReason?: string;
    /**
     * List of information about the package shipment and tracking updates.
     */
    trackingInfo?: OrderLineTrackingInfo;
    constructor(orderlinestatus: OrderLineStatus);
}
/**
 * This seems to be an undocumentend object in the Purchase Order object, however
 * we discovered during live testing with the API.
 *
 * @todo get documentation from Walmart.
 */
export declare class OrderLineFulfillment {
    /**
     * @example 'S2H'
     */
    fulfillmentOption: string;
    /**
     * @example 'VALUE'
     */
    shipMethod: string;
    /**
     * @example null
     */
    storeId?: string;
    /**
     * @example 'B7EE666941CC4284B67289A7D3D2DDBA'
     */
    offerId: string;
    /**
     * @example 1524106800000
     */
    pickUpDateTime: number;
    /**
     * @example null
     */
    pickupBy?: string;
    constructor(olf: OrderLineFulfillment);
}
/**
 * List of information about the package shipment and tracking updates.
 */
export declare class OrderLineTrackingInfo {
    /**
     * The Epoch timestamp when the package was shipped.
     */
    shipDateTime: number;
    /**
     * Information about the package carrier(s).
     */
    carrierName: OrderLinePackageCarrier;
    /**
     * The shipping method. Can be one of the following:
     * - Standard
     * - Express
     * - OneDay
     * - Freight
     */
    methodCode: string;
    /**
     * The shipment tracking number.
     */
    trackingNumber: string;
    /**
     * The URL for tracking the shipment.
     */
    trackingUrl?: string;
    constructor(orderlinetrackinginfo: OrderLineTrackingInfo);
}
/**
 * Information about the package carrier(s).
 */
export declare class OrderLinePackageCarrier {
    /**
     * Other carrier name - if one carrier, use 'null'. If otherCarrier is provided,
     * trackingUrl must also be provided.
     */
    otherCarrier: string;
    /**
     * The package shipment carrier. Valid entries are: UPS, USPS, FedEx, Airborne,
     * OnTrac, DHL, NG, LS, UDS, UPSMI, FDX
     */
    carrier: string;
    constructor(orderlinepackagecarrier: OrderLinePackageCarrier);
}
