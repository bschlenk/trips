const expect = require('expect');
const locations = require('../locations');

const home = {
  latitude: 47.6134369,
  longitude: -122.3159147,
};

const work = {
  latitude: 47.6241794,
  longitude: -122.3389026,
};

describe('locations', () => {
  describe('#find()', () => {
    it('should return the location of an address', () => {
      return locations.find('1222 E Madison St').then(res => {
        console.log(res);
      });
    });

    it('should find a short location', () => {
      return locations.find('arbys').then(res => {
        console.log(res);
      });
    });
  });

  describe('#findAll()', () => {
    it('should find the locations of multiple addresses', () => {
      return locations.findAll('1222 E Madison St', '515 Westlake Ave N').then(res => {
        console.log(res);
      });
    });

    it('should find a short location', () => {
      return locations.findAll('arbys').then(res => {
        console.log(res);
      });
    });
  });
});
