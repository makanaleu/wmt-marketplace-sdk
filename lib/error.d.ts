/**
 * Walmart error response, typically contained in the response `error` property.
 */
export declare class WMTErrorResponse {
    /**
     * Collection of Walmart errors.
     */
    errors: WMTErrorCollection;
}
/**
 * Collection of Walmart errors.
 */
export declare class WMTErrorCollection {
    /**
     * Single error object reported by Walmart.
     */
    error: WMTError[];
}
/**
 * Single error object reported by Walmart.
 */
export declare class WMTError {
    /**
     * @example "CONTENT_NOT_FOUND.GMP_ORDER_API"
     */
    code: string;
    /**
     * @example "Failed when called getAllOrders. Orders not found for given search parameters "
     */
    description: string;
    /**
     * @example "Requested content could not be found."
     */
    info: string;
    /**
     * @example "INFO"
     */
    severity: string;
    /**
     * @example "APPLICATION"
     */
    category: string;
    /**
     * @todo We have not yet seen an error that populates this property.
     */
    causes: string[];
    /**
     * Walmart error identifiers.
     */
    errorIdentifiers: WMTErrorIdentifier;
}
/**
 * Walmart error identifiers.
 */
export declare class WMTErrorIdentifier {
    /**
     * @todo We have not yet seen an error that populates this property.
     */
    entry: string[];
}
