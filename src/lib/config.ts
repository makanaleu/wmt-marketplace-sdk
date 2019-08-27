/**
 * The credentials required for authenticating with the Walmart Marketplace API.
 *
 * @see {@link https://developer.walmart.com/#/generateKey}
 */
export class Credentials {
  /**
   * The API ClientID, provided by Walmart.
   */
  ClientID: string;
  /**
   * The API ClientSecret, provided by Walmart.
   */
  ClientSecret: string;

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
  constructor(clientId: string, clientSecret: string) {
    this.ClientID = clientId;
    this.ClientSecret = clientSecret;
  }
}
