# wmt-marketplace-sdk

![npm](https://img.shields.io/npm/v/wmt-marketplace-sdk.svg) ![license](https://img.shields.io/npm/l/wmt-marketplace-sdk.svg) ![github-issues](https://img.shields.io/github/issues/makanaleu/wmt-marketplace-sdk.svg)

Walmart Marketplace API SDK

![nodei.co](https://nodei.co/npm/wmt-marketplace-sdk.png?downloads=true&downloadRank=true&stars=true)

![stars](https://img.shields.io/github/stars/makanaleu/wmt-marketplace-sdk.svg)
![forks](https://img.shields.io/github/forks/makanaleu/wmt-marketplace-sdk.svg)

![](https://david-dm.org/makanaleu/wmt-marketplace-sdk/status.svg)
![](https://david-dm.org/makanaleu/wmt-marketplace-sdk/dev-status.svg)

## Features

- **Orders**
  - **All Release Orders:** Retrieves all the orders with line items that are in the "created" status, that is, these orders have been released from the Walmart Order Management System to the seller for processing. The released orders are the orders that are ready for a seller to fulfill.
  - **Acknowledge Orders:** You can use this API to acknowledge an entire order, including all of its order lines. Walmart requires a seller to acknowledge orders within four hours of receipt of the order, except in extenuating circumstances.
  - **Shipping Updates:** Updates the status of order lines to "Shipped" and triggers the charge to the customer.

## Roadmap

- **Orders**
  - We are working on completing the Orders methods.

## Usage

You only need to set your API credentials once in the process. They don't need to be
set for each call within the same process.

```javascript
import { WMT } from 'wmt-marketplace-sdk';

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
}).then((purchaseOrders: WMT.Orders.PurchaseOrder.PurchaseOrderResponse) => {
  // do something with the orders
});
```

### Acknowledge Orders

```javascript
WMT.Orders.ackOrder({
  PurchaseOrderId: 2380639477120
}).then((purchaseOrders: WMT.Orders.PurchaseOrder.PurchaseOrderResponse) => {
  // The response to a successful call contains the acknowledged order, which should
  // now reflect an "Acknowledged" status.
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
}).then((purchaseOrders: WMT.Orders.PurchaseOrder.PurchaseOrderResponse) => {
  // The response to a successful call contains the purchase order, which should
  // now reflect an "Shipped" status.
});
```

## Install

`npm install --save wmt-marketplace-sdk`

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
