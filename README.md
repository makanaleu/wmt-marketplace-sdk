# wmt-marketplace-sdk-canada

![npm](https://img.shields.io/npm/v/wmt-marketplace-sdk-canada.svg) ![license](https://img.shields.io/npm/l/wmt-marketplace-sdk-canada.svg) ![github-issues](https://img.shields.io/github/issues/makanaleu/wmt-marketplace-sdk-canada.svg)

Walmart Marketplace API SDK (Canada Marketplace)

![nodei.co](https://nodei.co/npm/wmt-marketplace-sdk-canada.png?downloads=true&downloadRank=true&stars=true)

![stars](https://img.shields.io/github/stars/makanaleu/wmt-marketplace-sdk-canada.svg)
![forks](https://img.shields.io/github/forks/makanaleu/wmt-marketplace-sdk-canada.svg)

![](https://david-dm.org/makanaleu/wmt-marketplace-sdk-canada/status.svg)
![](https://david-dm.org/makanaleu/wmt-marketplace-sdk-canada/dev-status.svg)

## Canada Marketplace

This version of the Warlmart Marketplace API SDK is intended for use with the Walmart Canada Marketplace which still uses the legacy authentication method. For the U.S. Marketplace, see https://github.com/makanaleu/wmt-marketplace-sdk. 

## Features

- **Orders**
  - **All Release Orders:** Retrieves all the orders with line items that are in the "created" status, that is, these orders have been released from the Walmart Order Management System to the seller for processing. The released orders are the orders that are ready for a seller to fulfill.
  - **Acknowledge Orders:** You can use this API to acknowledge an entire order, including all of its order lines. Walmart requires a seller to acknowledge orders within four hours of receipt of the order, except in extenuating circumstances.
  - **Shipping Updates:** Updates the status of order lines to "Shipped" and triggers the charge to the customer.
- **Requests**
  - **Timeout:** All requests are set with a 2-minute timeout to avoid overuse of resources when the API is slow to respond.

## Roadmap

- **Orders**
  - We are working on completing the Orders methods.

## Usage

You only need to set your API credentials once in the process. They don't need to be
set for each call within the same process.

```javascript
import { WMT } from 'wmt-marketplace-sdk-canada';

WMT.Request.Credentials = new WMT.Config.Credentials(
  '38b7eb6c-3672-4022-93a2-f47794f36338', // CHANNEL.TYPE
  'f091ae58-774c-45ff-9d8a-e30a83344e42', // Consumer ID
  'MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAq7BFUpkGp3...' // Private Key
);
```

### Get All Released Orders

```javascript
WMT.Orders.getAllReleased({
  CreatedStartDate: new Date('01 April 2018 00:00 UTC'), // required
  CreatedEndDate: new Date('02 April 2018 00:00 UTC'), // optional, defaults to current time
  Limit: 10 // optional, defaults to 200 (max)
}).then((response: string) => {
  let purchaseOrders: WMT.Orders.PurchaseOrder.PurchaseOrderResponse = JSON.parse(response);

  // do something with the orders
});
```

### Acknowledge Orders

```javascript
WMT.Orders.ackOrder({
  PurchaseOrderId: 2380639477120
}).then((response: string) => {
  let orderResponse: WMT.Orders.PurchaseOrder.SingleOrderResponse = JSON.parse(response);
  // The response to a successful call contains the acknowledged order. Although the
  // API documentation claims the order will bear an "Acknowledged" status, we have
  // not found this to be true in production. It's simply a copy of the order that
  // was acknowledged, still bearing a "Created" status.
});
```

### Shipping Updates

```javascript
var shipment = new WMT.Orders.Shipment.OrderShipmentRequest(
  // See sample in /test/lib/orders.spec.ts ('Shipment Update').
);

WMT.Orders.postShipingUpdate({
  PurchaseOrderId: 2380639477120,
  PurchaseOrderShipment: shipment
}).then((response: string) => {
  let orderResponse: WMT.Orders.PurchaseOrder.SingleOrderResponse = JSON.parse(response)
  // The response to a successful call contains the purchase order.
});
```

## Install

`npm install --save wmt-marketplace-sdk-canada`

## Scripts

 - **npm run build** : `rimraf ./lib/ && tsc -p .`
 - **npm run readme** : `rm ./README.md && node ./node_modules/.bin/node-readme`
 - **npm run package** : `npm run build && npm run readme`
 - **npm run test** : `mocha --require ts-node/register $(find ./test/ -name "*.spec.ts")`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[wmt-marketplace-auth](https://www.npmjs.com/package/wmt-marketplace-auth) | 1.1.0 | ✖
[request](https://www.npmjs.com/package/request) | 2.85.0 | ✖
[request-promise](https://www.npmjs.com/package/request-promise) | 4.2.2 | ✖
[ts-node](https://www.npmjs.com/package/ts-node) | 5.0.1 | ✔
[typescript](https://www.npmjs.com/package/typescript) | 2.8.1 | ✔
[tslint](https://www.npmjs.com/package/tslint) | 5.9.1 | ✔
[mocha](https://www.npmjs.com/package/mocha) | 5.1.0 | ✔
[nock](https://www.npmjs.com/package/nock) | 9.2.5 | ✔
[chai](https://www.npmjs.com/package/chai) | 4.1.2 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | 0.1.9 | ✔
[nyc](https://www.npmjs.com/package/nyc) | 11.6.0 | ✔
[rimraf](https://www.npmjs.com/package/rimraf) | 2.6.2 | ✔
[@types/mocha](https://www.npmjs.com/package/@types/mocha) | 5.0.0 | ✔
[@types/nock](https://www.npmjs.com/package/@types/nock) | 9.1.3 | ✔
[@types/chai](https://www.npmjs.com/package/@types/chai) | 4.1.2 | ✔
[@types/node](https://www.npmjs.com/package/@types/node) | 9.6.5 | ✔
[@types/request-promise](https://www.npmjs.com/package/@types/request-promise) | 4.1.41 | ✔
[@types/bluebird](https://www.npmjs.com/package/@types/bluebird) | 3.5.20 | ✔


## Contributing

We are always excited when we can make our projects open source and allow contributors to build and work on these components. To make this possible, there are a few things we kindly ask all contributors to understand and follow. Please review the [Contributing Guide](https://www.makanal.eu/contributors/).

## Author

Kane McConnell <kane@makanal.eu>

## License

 - **MIT** : http://opensource.org/licenses/MIT
