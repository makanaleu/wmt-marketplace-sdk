
import * as Request from '../../lib/request';
import * as Config from '../../lib/config';
import * as Orders from '../../lib/orders';
import { expect } from 'chai';
import * as fs from 'fs';

var nock = require('nock');

var WMT = {
  Request: Request,
  Config: Config,
  Orders: Orders
}

/**
 * Credentials are test safe. Not real.
 */
WMT.Request.Credentials = new WMT.Config.Credentials(
  '38b7eb6c-3672-4022-93a2-f47794f36338',
  'f091ae58-774c-45ff-9d8a-e30a83344e42',
  'MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAq7BFUpkGp3+LQmlQYx2eqzDV+xeG8kx/sQFV18S5JhzGeIJNA72wSeukEPojtqUyX2J0CciPBh7eqclQ2zpAswIDAQABAkAgisq4+zRdrzkwH1ITV1vpytnkO/NiHcnePQiOW0VUybPyHoGM/jf75C5xET7ZQpBe5kx5VHsPZj0CBb3b+wSRAiEA2mPWCBytosIU/ODRfq6EiV04lt6waE7I2uSPqIC20LcCIQDJQYIHQII+3YaPqyhGgqMexuuuGx+lDKD6/Fu/JwPb5QIhAKthiYcYKlL9h8bjDsQhZDUACPasjzdsDEdq8inDyLOFAiEAmCr/tZwA3qeAZoBzI10DGPIuoKXBd3nk/eBxPkaxlEECIQCNymjsoI7GldtujVnr1qT+3yedLfHKsrDVjIT3LsvTqw=='
);

var releasedResponse = fs.readFileSync(__dirname + '/../data/sample-getallreleased.json', 'utf8');
var ackResponse = fs.readFileSync(__dirname + '/../data/sample-ackresponse.json', 'utf8');
var shipmentResponse = fs.readFileSync(__dirname + '/../data/sample-shipmentresponse.json', 'utf8');

// Mock Get All Released Orders response.
nock('https://marketplace.walmartapis.com')
  .get('/v3/orders/released')
  .query({
    createdStartDate: '2018-04-01T00:00:00.000Z',
    createdEndDate: '2018-04-02T00:00:00.000Z',
    limit: '200'
  })
  .reply(200, releasedResponse.trim());

// Mock Acknowledge Order response.
nock('https://marketplace.walmartapis.com')
  .post('/v3/orders/2380639477120/acknowledge')
  .reply(200, ackResponse.trim());

// Mock Shipment Update response.
nock('https://marketplace.walmartapis.com')
  .post('/v3/orders/2380639477120/shipping')
  .reply(200, shipmentResponse.trim());

describe('Get All Released Orders', () => {
  it('Response is a valid PurchaseOrderResponse.', () => {
    WMT.Orders.getAllReleased({
      CreatedStartDate: new Date('01 April 2018 00:00 UTC'),
      CreatedEndDate: new Date('02 April 2018 00:00 UTC'),
      Limit: 200
    }).then((response) => {
      let parsedResponse = new Orders.PurchaseOrder.PurchaseOrderResponse(JSON.parse(response));
      expect(parsedResponse).instanceof(Orders.PurchaseOrder.PurchaseOrderResponse);

      let list = new Orders.PurchaseOrder.PurchaseOrderList(parsedResponse.list);
      expect(list).instanceof(Orders.PurchaseOrder.PurchaseOrderList);

      let elements = new Orders.PurchaseOrder.PurchaseOrderElements(list.elements);
      expect(elements).instanceof(Orders.PurchaseOrder.PurchaseOrderElements);

      elements.order.forEach((order) => {
        let po = new Orders.PurchaseOrder.Order(order);
        expect(po).instanceof(Orders.PurchaseOrder.Order);

        let shippingInfo = new Orders.PurchaseOrder.ShippingInfo(po.shippingInfo);
        expect(shippingInfo).instanceof(Orders.PurchaseOrder.ShippingInfo);

        let postalAddress = new Orders.PurchaseOrder.PostalAddress(po.shippingInfo.postalAddress);
        expect(postalAddress).instanceof(Orders.PurchaseOrder.PostalAddress);

        let orderLines = new Orders.PurchaseOrder.OrderLines(order.orderLines);
        expect(orderLines).instanceof(Orders.PurchaseOrder.OrderLines);

        orderLines.orderLine.forEach((orderLine) => {
          let ol = new Orders.PurchaseOrder.OrderLine(orderLine);
          expect(ol).instanceof(Orders.PurchaseOrder.OrderLine);

          let item = new Orders.PurchaseOrder.LineItem(ol.item);
          expect(item).instanceof(Orders.PurchaseOrder.LineItem);

          let charges = new Orders.PurchaseOrder.LineCharges(ol.charges);
          expect(charges).instanceof(Orders.PurchaseOrder.LineCharges);

          charges.charge.forEach((charge) => {
            let ch = new Orders.PurchaseOrder.LineCharge(charge);
            expect(ch).instanceof(Orders.PurchaseOrder.LineCharge);

            let chargeAmount = new Orders.PurchaseOrder.LineChargeAmount(ch.chargeAmount);
            expect(chargeAmount).instanceof(Orders.PurchaseOrder.LineChargeAmount);

          });

          let lineQty = new Orders.PurchaseOrder.LineQuantities(ol.orderLineQuantity);
          expect(lineQty).instanceof(Orders.PurchaseOrder.LineQuantities);

          let lineStatuses = new Orders.PurchaseOrder.LineStatuses(ol.orderLineStatuses);
          expect(lineStatuses).instanceof(Orders.PurchaseOrder.LineStatuses);

          lineStatuses.orderLineStatus.forEach((orderLineStatus) => {
            let status = new Orders.PurchaseOrder.OrderLineStatus(orderLineStatus);
            expect(status).instanceof(Orders.PurchaseOrder.OrderLineStatus);

            let uom = new Orders.PurchaseOrder.LineQuantities(status.statusQuantity);
            expect(uom).instanceof(Orders.PurchaseOrder.LineQuantities);
          });

          let fulfillment = new Orders.PurchaseOrder.OrderLineFulfillment(ol.fulfillment);
          expect(fulfillment).instanceof(Orders.PurchaseOrder.OrderLineFulfillment);
        });
      });
    })
  });
});

describe('Acknowledge Order', () => {
  it('Response is the PurchaseOrderResponse for the PurchaseOrderId.', () => {
    WMT.Orders.ackOrder({
      PurchaseOrderId: 2380639477120
    }).then((response) => {
      let parsedResponse = new Orders.PurchaseOrder.PurchaseOrderResponse(JSON.parse(response));
      expect(parsedResponse).instanceof(Orders.PurchaseOrder.PurchaseOrderResponse);
      expect(parsedResponse.list.elements.order[0].purchaseOrderId).to.equal('2380639477120');
    });
  });
});

describe('Shipment Update', () => {
  it('Response is the PurchaseOrderResponse for the PurchaseOrderId.', () => {
    var shipment = new Orders.Shipment.OrderShipmentRequest({
      orderShipment: {
        orderLines: {
          orderLine: [
            {
              lineNumber: 1,
              orderLineStatuses: {
                orderLineStatus: [
                  {
                    status: "Shipped",
                    statusQuantity: {
                      unitOfMeasurement: "EA",
                      amount: 1
                    },
                    trackingInfo: {
                      shipDateTime: 1488480443000,
                      carrierName: {
                        otherCarrier: null,
                        carrier: "FedEx"
                      },
                      methodCode: "Express",
                      trackingNumber: "21345"
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    });
    WMT.Orders.postShippingUpdate({
      PurchaseOrderId: 2380639477120,
      PurchaseOrderShipment: shipment
    }).then((response) => {
      let parsedResponse = new Orders.PurchaseOrder.PurchaseOrderResponse(JSON.parse(response));
      expect(parsedResponse).instanceof(Orders.PurchaseOrder.PurchaseOrderResponse);
      expect(parsedResponse.list.elements.order[0].purchaseOrderId).to.equal('2380639477120');
    });
  });
});
