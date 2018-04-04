import { expect } from 'chai';
import { WMT } from '../index';

describe('Sample test.', () => {
  it('Prints the WMT object with default values.', () => {

    let W: WMT.Authentication.Headers = new WMT.Authentication.Headers;
    console.log(W);
  });
});
