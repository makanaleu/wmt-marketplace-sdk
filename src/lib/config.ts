/**
 * The API Consumer authentication details, provided by Walmart.
 */
export interface Consumer {
  /**
   * The `CHANNEL.TYPE` string provided by Walmart.
   */
  ChannelType: string;
  /**
   * The `Consumer ID` string provided by Walmart.
   */
  ConsumerId: string;
}

/**
 * The credentials required for authenticating with the Walmart Marketplace API.
 */
export class Credentials {
  /**
   * The API Consumer authentication details, provided by Walmart.
   */
  Consumer: Consumer;
  /**
   * The API private key provided by Walmart.
   */
  PrivateKey: string;

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
  constructor(channelType: string, consumerId: string, privateKey: string) {
    this.Consumer = {
      ChannelType: channelType,
      ConsumerId: consumerId
    }
    this.PrivateKey = privateKey;
  }
}
