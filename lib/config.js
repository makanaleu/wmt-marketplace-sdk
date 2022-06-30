Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The credentials required for authenticating with the Walmart Marketplace API.
 *
 * @see {@link https://developer.walmart.com/#/generateKey}
 */
class Credentials {
    /**
     * Add the credentials provided by Walmart to authenticate with the Marketplace
     * API. You only need to set WMT.Request.Credentials once at the beginnging of the
     * process.
     *
     * @param clientId     The `ClientID` string provided by Walmart.
     * @param clientSecret The `ClientSecret` provided by Walmart.
     *
     * @example WMT.Request.Credentials = new WMT.Config.Credentials(channelType, consumerId, privateKey);
     */
    constructor(clientId, clientSecret) {
        this.ClientID = clientId;
        this.ClientSecret = clientSecret;
    }
}
exports.Credentials = Credentials;
//# sourceMappingURL=config.js.map