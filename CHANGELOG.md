# CHANGELOG

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
