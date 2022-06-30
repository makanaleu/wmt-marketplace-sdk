import { OrderLineTrackingInfo, LineQuantities } from "./purchase";
/**
 * Semantic wrapper for the OrderShipment.
 */
export declare class OrderShipmentRequest {
    /**
     * Information about a shipment.
     */
    orderShipment: OrderShipment;
    constructor(orderShipmentRequest: OrderShipmentRequest);
}
/**
 * Information about a shipment.
 */
export declare class OrderShipment {
    /**
     * List of OrderLines in the shipment
     */
    orderLines: OrderLines;
    constructor(ordershipment: OrderShipment);
}
/**
 * A wrapper for the list of OrderLine items on the order.
 */
export declare class OrderLines {
    /**
     * Information about an OrderLine in the shipment.
     */
    orderLine: OrderLine[];
    constructor(orderlines: OrderLines);
}
/**
 * Information about an OrderLine in the shipment.
 */
export declare class OrderLine {
    /**
     * The line number associated with the details for each individual item in the
     * purchase order.
     */
    lineNumber: number;
    /**
     * A semantic wrapper for the list of OrderLine statuses.
     */
    orderLineStatuses: OrderLineStatuses;
    constructor(orderline: OrderLine);
}
/**
 * A semantic wrapper for the list of OrderLine statuses.
 */
export declare class OrderLineStatuses {
    /**
     * A list of status updates for the OrderLine, including shipping status updates.
     */
    orderLineStatus: OrderLineStatus[];
    constructor(ols: OrderLineStatuses);
}
/**
 * Details about the OrderLine status.
 */
export declare class OrderLineStatus {
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
    constructor(ols: OrderLineStatus);
}
