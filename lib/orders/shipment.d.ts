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
     * The 2-character country code where the item is shipped from, and
     * needs to be provided for each individual item in a purchase order
     * effective July 1, 2022.
     */
    shipFromCountry: string;
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
 * Once the shipment is done, to update tracking details in the PO,
 * you must pass the tracking number to be updated under the new
 * currentTrackingInfo field.
 */
export declare class CurrentTrackingInfo {
    /**
     * The shipment tracking number
     */
    trackingNumber: string;
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
    /**
     * Once the shipment is done, to update tracking details in the PO,
     * you must pass the tracking number to be updated under the new
     * currentTrackingInfo field.
     */
    currentTrackingInfo: CurrentTrackingInfo;
    constructor(ols: OrderLineStatus);
}
