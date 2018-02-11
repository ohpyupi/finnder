const {expect} = require('chai');
const updateFishPriceDocuments = require('./updateFishPriceDocuments.js');

describe('Update Fish Price Documents', function () {
	it('Should return an array of updated documents', function (done) {
			this.timeout(10000);
			updateFishPriceDocuments()
				.then((docs) => {
					expect(Array.isArray(docs)).to.be.equal(true);
					done();
				})
				.catch(done);
	});
});
