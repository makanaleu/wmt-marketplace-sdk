# CHANGELOG

## 2022-06-30, Version 2.2.1, @kmcconnell

### Notable Changes

- shipment:
  - Fixed typo in shipFromCountry declaration.

## 2022-06-30, Version 2.2.0, @kmcconnell

### Notable Changes

Eff. 2022-07-01, Walmart requires a ShipFromCountry for each line item submitted
via Shipping Updates.

## 2019-08-26, Version 2.1.0, @kmcconnell

### Notable Changes

Eff. 2019-08-28, Walmart is deprecating the signature based request and requiring
an update to use the Token API instead. Requests have been updated to use the
new authentication method.

## 2018-04-22, Version 1.3.4, @kmcconnell

### Notable Changes

Walmart returns a 404 error when no results exist for API method. For example, if
calling `getAllReleased()`, Walmart returns a 404 if no new released orders exist.
However, when using this method with a time-based trigger, it's expected that some
calls will return no results. Therefore, the 404 `INFO` response is now caught and
returned as a `Promise.resolve()` rather than a thrown error.

```javascript
[{"code":"CONTENT_NOT_FOUND.GMP_ORDER_API","description":"Failed when called getAllOrders. Orders not found for given search parameters"}]
```

- error:
  - Added `WMTErrorResponse` classes to help with handling Walmart errors.
    (Kane McConnell) #15
- request:
  - Improved `ContentNotFoundError` handler to separate info messages
    from actual error messages. (Kane McConnell) #15

## 2018-04-22, Version 1.3.3, @kmcconnell

### Notable Changes

- request:
  - Added `ContentNotFoundError` filter to catch chain to handle parsing of Walmart
    error response when no results are returned for the requested parameters. The
    error description(s) are stringified as a JSON array and thrown as a new `Error`.
    (Kane McConnell) #15

## 2018-04-21, Version 1.3.2, @kmcconnell

### Notable Changes

The return type of requests was updated to `Request.Promise` rather than `PromiseLike`.
The `PromiseLike` type does not carry a `catch()` method, which meant parent modules
could not chain catches onto the methods.

Now when using the Orders methods, developers can add custom `.catch()`:

```javascript
WMT.Orders.getAllReleased({
  // params
})
  .then((response: string) => {
    // do something with the response
  })
  .catch((error: Error) => {
    // handle the error.
  });
```

- request:
  - Changed return type of `execute` to `Promise` rather than `PromiseLike`,
    which did not have the `.catch()` method available when imported into parent
    modules. (Kane McConnell) #13
- orders:
  - Changed return type of all Orders methods to `Request.Promise` to pass through
    the `.catch()` method to parent modules. (Kane McConnell) #13

## 2018-04-17, Version 1.3.1, @kmcconnell

### Notable Changes

- README:
  - Added documentation regarding the inaccuracies between Walmart Marketplace API
    documentation and production responses received. (Kane McConnell) #11
- request:
  - Added timeout of `120000` ms (2 minutes) to request promise to avoid overuse of
    resources when the API is down or slow to return response headers.
    (Kane McConnell) #11
- purchase:
  - Added `SingleOrderResponse` to `WMT.Orders.PurchaseOrder` to match object
    strutcture received when using the `WMT.Orders.ackOrder()` method.
    (Kane McConnell) #11

## 2018-04-17, Version 1.3.0, @kmcconnell

### Notable Changes

- README:
  - Added example call for `WMT.Orders.postShippingUpdate()`. (Kane McConnell) #9
- orders:
  - Added `postShipingUpdate()` method to `WMT.Orders` module. (Kane McConnell) #9
  - Added `Shipment` to the `WMT.Orders` exports. (Kane McConnell) #9
- shipment:
  - Added `Shipment` classes. (Kane McConnell) #9
- purchase:
  - Changed the `OrderLineTrackingInfo.trackingUrl` property to optional. It is only
    required when `CarrierName.otherCarrier` is set. (Kane McConnell) #9
  - Changed the documentation for `OrderLinePackageCarrier` with more detail and
    acceptable carrier names. (Kane McConnell) #9
- request:
  - Added optional `Body` property to the request, used when the API expects a
    body in the request (i.e. shipping updates). (Kane McConnell) #9

## 2018-04-16, Version 1.2.0, @kmcconnell

### Notable Changes

- README:
  - Added example call for `WMT.Orders.ackOrder()`. (Kane McConnell) #7
- orders:
  - Added `ackOrder()` method to `WMT.Orders` module. (Kane McConnell) #7
- request:
  - Changed `Method` in in the `Request.RequestParams` interface to an optional
    property to support calls that do not require query parameters.
    (Kane McConnell) #7
  - Added `method` property to the request promise. Previously, all calls were using
    the `GET` method. (Kane McConnell) #7
- package.json:
  - Changed versions of dependencies rather than relying on `latest`.
    (Kane McConnell) #7

## 2018-04-16, Version 1.1.0, @kmcconnell

Created new module, which includes the first Orders method: `getAllReleased()`.
