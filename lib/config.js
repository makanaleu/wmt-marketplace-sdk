Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The credentials required for authenticating with the Walmart Marketplace API.
 */
class Credentials {
    /**
     * Add the credentials provided by Walmart to authenticate with the Marketplace
     * API. You only need to set WMT.Request.Credentials once at the beginnging of the
     * process.
     *
     * @param channelType The `CHANNEL.TYPE` string provided by Walmart.
     * @param consumerId  The The `Consumer ID` string provided by Walmart.
     * @param privateKey  The API private key provided by Walmart.
     *
     * @example WMT.Request.Credentials = new WMT.Config.Credentials(channelType, consumerId, privateKey);
     */
    constructor(channelType, consumerId, privateKey) {
        this.Consumer = {
            ChannelType: channelType,
            ConsumerId: consumerId
        };
        this.PrivateKey = privateKey;
    }
}
exports.Credentials = Credentials;
//# sourceMappingURL=config.js.map