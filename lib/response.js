Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Header information on Walmart Marketplace API responses.
 */
class List {
    constructor(list) {
        this.meta = list.meta;
        this.elements = list.elements;
    }
}
exports.List = List;
/**
 * API response meta information.
 */
class Meta {
    constructor(meta) {
        this.totalCount = meta.totalCount;
        this.limit = meta.limit;
    }
}
exports.Meta = Meta;
//# sourceMappingURL=response.js.map