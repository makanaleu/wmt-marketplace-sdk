/**
 * Header information on Walmart Marketplace API responses.
 */
export declare class List {
    /**
     * API response meta information.
     */
    meta: Meta;
    /**
     * Container for response elements (i.e. orders, items, etc.).
     */
    elements: any;
    constructor(list: List);
}
/**
 * API response meta information.
 */
export declare class Meta {
    /**
     * The totalCount returns the total number of available elements. Therefore,
     * analysis of the totalCount provides the number of pages to be retrieved to get
     * the whole list of elements.
     */
    totalCount: number;
    /**
     * Limit, which was set in the request.
     */
    limit: number;
    /**
     * If a call to an API results in a large number of elements being returned, the
     * results are sent back in pages. The nextCursor element contains the string that
     * should be appended to the basic GET call to get the next page of results.
     *
     * A missing or empty nextCursor element means that there are no more elements left
     * to retrieve.
     */
    nextCursor?: string;
    constructor(meta: Meta);
}
