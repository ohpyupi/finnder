const db = require('../config/db.js');
const ss = require('simple-statistics');
const numeral = require('numeral');

const Sell = db.models.Sell;
const Price = db.models.Price;

module.exports = updateFishPriceDocuments;

function updateFishPriceDocuments() {
	return new Promise((resolve, reject) => {
		// Collect all document in "Sell" collection.
	Sell.find({})
		.then((docs) => {
		// Collect all available values for "fishName" in an array.
		let fishNameArr = docs.reduce((sum, doc) => {
			if (sum.indexOf(doc.fishName) > -1) {
        return sum;
      }
			return [...sum, doc.fishName];
		}, []);

		// Create an array containing promise instances to query "Sell" collection.
		let promiseArr = fishNameArr.map(fishName => {
			return Sell.find({fishName});
		});

		return Promise.all(promiseArr);
		})
		.then(docsArr => {

			// Create a query to make price documents.
			let queryArr = docsArr.map(docs => {
				let amountArr = docs.map(doc => numeral(doc.amount).value());
				return {
					fishName: docs[0].fishName,
					min: ss.min(amountArr),
					max: ss.max(amountArr),
					mean: (ss.sum(amountArr)) / docs.length,
					median: ss.median(amountArr),
          standardDeviation: ss.standardDeviation(amountArr),
				};
			});

			// Create an array containing promise instances to add docs to "Price" collection
			let promiseArr = queryArr.map(query => {
				return Price.findOneAndUpdate({
					fishName: query.fishName,
				}, query, {
					upsert: true,
				});
			});

			return Promise.all(promiseArr);
		})
		.then(docs => {
			console.log(`* Successfully updated fish price documents.`);
			resolve();
		})
		.catch(reject);
	});
}
