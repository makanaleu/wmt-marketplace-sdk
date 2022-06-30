import { OrderLineTrackingInfo, LineQuantities } from "./purchase";

/**
 * Semantic wrapper for the OrderShipment.
 */
export class OrderShipmentRequest {
  /**
   * Information about a shipment.
   */
  orderShipment: OrderShipment;

  constructor(orderShipmentRequest: OrderShipmentRequest) {
    this.orderShipment = orderShipmentRequest.orderShipment;
  }
}

/**
 * Information about a shipment.
 */
export class OrderShipment {
  /**
   * List of OrderLines in the shipment
   */
  orderLines: OrderLines;

  constructor(ordershipment: OrderShipment) {
    this.orderLines = ordershipment.orderLines;
  }
}

/**
 * A wrapper for the list of OrderLine items on the order.
 */
export class OrderLines {
  /**
   * Information about an OrderLine in the shipment.
   */
  orderLine: OrderLine[];

  constructor(orderlines: OrderLines) {
    this.orderLine = orderlines.orderLine;
  }
}

/**
 * Information about an OrderLine in the shipment.
 */
export class OrderLine {
  /**
   * The line number associated with the details for each individual item in the
   * purchase order.
   */
  lineNumber: number;
  /**
   * The 2-character country code where the item is shipped from, and
   * needs to be provided for each individual item in a purchase order
   * effective July 1, 2022.
   */
  shipFromCountry: string;
  /**
   * A semantic wrapper for the list of OrderLine statuses.
   */
  orderLineStatuses: OrderLineStatuses;

  constructor(orderline: OrderLine) {
    this.lineNumber = orderline.lineNumber;
    this.shipFromCountry = orderline.shipFromCountry
    this.orderLineStatuses = orderline.orderLineStatuses;
  }
}

/**
 * A semantic wrapper for the list of OrderLine statuses.
 */
export class OrderLineStatuses {
  /**
   * A list of status updates for the OrderLine, including shipping status updates.
   */
  orderLineStatus: OrderLineStatus[];

  constructor(ols: OrderLineStatuses) {
    this.orderLineStatus = ols.orderLineStatus;
  }
}

/**
 * Details about the OrderLine status.
 */
export class OrderLineStatus {
  /**
   * Use 'Shipped'.
   */
  status: string;
  /**
   * Details about the status update
   */
  statusQuantity: LineQuantities;
  /**
   * Information about the package shipment and tracking updates.
   */
  trackingInfo: OrderLineTrackingInfo;

  constructor(ols: OrderLineStatus) {
    this.status = ols.status;
    this.statusQuantity = ols.statusQuantity;
    this.trackingInfo = ols.trackingInfo;
  }
}
