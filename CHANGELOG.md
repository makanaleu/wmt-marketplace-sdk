# CHANGELOG

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
