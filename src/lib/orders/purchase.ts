import * as Response from '../response';

/**
 * Semantic wrapper for the PurchaseOrderList.
 */
export class PurchaseOrderResponse {
  /**
   * The response for All Released Orders.
   */
  list: PurchaseOrderList;

  constructor(response: PurchaseOrderResponse) {
    this.list = response.list;
  }
}

/**
 * The response for All Released Orders.
 */
export class PurchaseOrderList implements Response.List {
  meta: Response.Meta;
  elements: PurchaseOrderElements;

  constructor(list: PurchaseOrderList){
    this.meta = list.meta;
    this.elements = list.elements;
  }
}

/**
 * The `elements` container when receiving purchase orders.
 */
export class PurchaseOrderElements {
  /**
   * Iterable collection of orders.
   */
  order: Order[];

  constructor(elements: PurchaseOrderElements) {
    this.order = elements.order;
  }
}

/**
 * An object containing a single order. Typically received in API responses such as
 * when acknowleding orders.
 */
export class SingleOrderResponse {
  /**
   * Semantic wrapper of a single Order.
   */
  order: Order;

  constructor(response: SingleOrderResponse) {
    this.order = response.order;
  }
}

/**
 * Information about the purchase order.
 */
export class Order {
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

  constructor(order: Order) {
    this.purchaseOrderId = order.purchaseOrderId;
    this.customerOrderId = order.customerOrderId;
    this.customerEmailId = order.customerEmailId;
    this.orderDate = order.orderDate;
    this.shippingInfo = order.shippingInfo;
    this.orderLines = order.orderLines;
  }
}

/**
 * The shipping information provided by the customer to the seller
 */
export class ShippingInfo {
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

  constructor(shippingInfo: ShippingInfo) {
    this.phone = shippingInfo.phone;
    this.estimatedDeliveryDate = shippingInfo.estimatedDeliveryDate;
    this.estimatedShipDate = shippingInfo.estimatedShipDate;
    this.methodCode = shippingInfo.methodCode;
    this.postalAddress = shippingInfo.postalAddress;
  }
}

/**
 * Elements of the customer's postal address.
 */
export class PostalAddress {
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

  constructor(postalAdress: PostalAddress) {
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

/**
 * A wrapper for the list of OrderLine items on the order.
 */
export class OrderLines {
  /**
   * Purchase OrderLine information for each item.
   */
  orderLine: OrderLine[];

  constructor(orderlines: OrderLines) {
    this.orderLine = orderlines.orderLine;
  }
}

/**
 * Purchase OrderLine information for each item.
 */
export class OrderLine {
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
  fulfillment?: OrderLineFulfillment

  constructor(orderline: OrderLine) {
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

/**
 * The information for the item on the OrderLine.
 */
export class LineItem {
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

  constructor(lineitem: LineItem) {
    this.productName = lineitem.productName;
    this.sku = lineitem.sku;
  }
}

/**
 * Container for the line charges.
 */
export class LineCharges {
  /**
   * Collection of line charges.
   */
  charge: LineCharge[];

  constructor(linecharges: LineCharges) {
    this.charge = linecharges.charge;
  }
}

/**
 * Information relating to the charge for the OrderLine.
 */
export class LineCharge {
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

  constructor(linecharge: LineCharge) {
    this.chargeType = linecharge.chargeType;
    this.chargeName = linecharge.chargeName;
    this.chargeAmount = linecharge.chargeAmount;
    this.tax = linecharge.tax;
  }
}

/**
 * The details about the charges for the line item.
 */
export class LineChargeAmount {
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
  amount: number

  constructor(linechargeamount: LineChargeAmount) {
    this.currency = linechargeamount.currency;
    this.amount = linechargeamount.amount;
  }
}

/**
 * Tax information for the charge, including taxName and taxAmount.
 */
export class LineChargeTax {
  /**
   * The name associated with the tax.
   * @example 'Sales Tax'
   */
  taxName: string;
  /**
   * The details for the amount of the tax charge.
   */
  taxAmount: LineChargeTaxAmount;

  constructor(linechargetax: LineChargeTax) {
    this.taxName = linechargetax.taxName;
    this.taxAmount =linechargetax.taxAmount;
  }
}

/**
 * The details for the amount of the tax charge.
 */
export class LineChargeTaxAmount {
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
  amount: number

  constructor(linechargetaxamount: LineChargeTaxAmount) {
    this.currency = linechargetaxamount.currency;
    this.amount = linechargetaxamount.amount;
  }
}

/**
 * Quantities for the OrderLine.
 */
export class LineQuantities {
  /**
   * Always use 'EACH'
   */
  unitOfMeasurement: string;
  /**
   * Always use '1'
   */
  amount: number;

  constructor(linequantities: LineQuantities) {
    this.unitOfMeasurement = linequantities.unitOfMeasurement;
    this.amount = linequantities.amount;
  }
}

/**
 * A list of statuses for the OrderLine.
 */
export class LineStatuses {
  /**
   * Details about the OrderLine status.
   */
  orderLineStatus: OrderLineStatus[];

  constructor(linestatuses: LineStatuses) {
    this.orderLineStatus = linestatuses.orderLineStatus;
  }
}

/**
 * Details about the OrderLine status.
 */
export class OrderLineStatus {
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

  constructor(orderlinestatus: OrderLineStatus) {
    this.status = orderlinestatus.status;
    this.statusQuantity = orderlinestatus.statusQuantity;
    this.cancellationReason = orderlinestatus.cancellationReason;
    this.trackingInfo = orderlinestatus.trackingInfo;
  }
}

/**
 * This seems to be an undocumentend object in the Purchase Order object, however
 * we discovered during live testing with the API.
 *
 * @todo get documentation from Walmart.
 */
export class OrderLineFulfillment {
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

  constructor(olf: OrderLineFulfillment) {
    this.fulfillmentOption = olf.fulfillmentOption;
    this.shipMethod = olf.shipMethod;
    this.storeId = olf.storeId;
    this.offerId = olf.offerId;
    this.pickUpDateTime = olf.pickUpDateTime;
    this.pickupBy = olf.pickupBy;
  }
}

/**
 * List of information about the package shipment and tracking updates.
 */
export class OrderLineTrackingInfo {
  /**
   * The Epoch timestamp when the package was shipped.
   */
  shipDateTime: number
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

  constructor(orderlinetrackinginfo: OrderLineTrackingInfo) {
    this.shipDateTime = orderlinetrackinginfo.shipDateTime;
    this.carrierName = orderlinetrackinginfo.carrierName;
    this.methodCode = orderlinetrackinginfo.methodCode;
    this.trackingNumber = orderlinetrackinginfo.trackingNumber;
    this.trackingUrl = orderlinetrackinginfo.trackingUrl;
  }
}

/**
 * Information about the package carrier(s).
 */
export class OrderLinePackageCarrier {
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

  constructor(orderlinepackagecarrier: OrderLinePackageCarrier) {
    this.otherCarrier = orderlinepackagecarrier.otherCarrier;
    this.carrier = orderlinepackagecarrier.carrier;
  }
}
