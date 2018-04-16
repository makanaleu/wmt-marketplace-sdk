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
  - All Release Orders: Retrieves all the orders with line items that are in the "created" status, that is, these orders have been released from the Walmart Order Management System to the seller for processing. The released orders are the orders that are ready for a seller to fulfill.

## Roadmap

- **Orders**
  - We are working on completing the Orders methods.

## Usage

You only need to set your API credentials once in the process. They don't need to be
set for each call within the same process.

```javascript
import * WMT from './lib/wmt';

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
[ts-node](https://www.npmjs.com/package/ts-node) | latest | ✔
[typescript](https://www.npmjs.com/package/typescript) | latest | ✔
[tslint](https://www.npmjs.com/package/tslint) | latest | ✔
[mocha](https://www.npmjs.com/package/mocha) | latest | ✔
[nock](https://www.npmjs.com/package/nock) | latest | ✔
[chai](https://www.npmjs.com/package/chai) | latest | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | latest | ✔
[nyc](https://www.npmjs.com/package/nyc) | latest | ✔
[rimraf](https://www.npmjs.com/package/rimraf) | latest | ✔
[@types/mocha](https://www.npmjs.com/package/@types/mocha) | latest | ✔
[@types/nock](https://www.npmjs.com/package/@types/nock) | latest | ✔
[@types/chai](https://www.npmjs.com/package/@types/chai) | latest | ✔
[@types/node](https://www.npmjs.com/package/@types/node) | latest | ✔
[@types/request-promise](https://www.npmjs.com/package/@types/request-promise) | 4.1.41 | ✔
[@types/bluebird](https://www.npmjs.com/package/@types/bluebird) | 3.5.20 | ✔


## Contributing

We are always excited when we can make our projects open source and allow contributors to build and work on these components. To make this possible, there are a few things we kindly ask all contributors to understand and follow. Please review the [Contributing Guide](https://www.makanal.eu/contributors/).

## Author

Kane McConnell <kane@makanal.eu>

## License

 - **MIT** : http://opensource.org/licenses/MIT
