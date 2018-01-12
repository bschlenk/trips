const expect = require('expect');
const lyft = require('../lyft');

const home = {
  latitude: 47.6134369,
  longitude: -122.3159147,
};

const work = {
  latitude: 47.6241794,
  longitude: -122.3389026,
};

describe('lyft', () => {
  describe('getPriceEstimates', () => {
    it('should return estimates for all lyft services', () => {
      return lyft.getPriceEstimates(home, work).then(res => {
        expect(res.length).toEqual(3);
        console.log(res);
        res.forEach(a => {
          console.log(a.cost_estimates[0]);
        });
      });
    });
  });
});
