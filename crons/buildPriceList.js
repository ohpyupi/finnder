const db = require('../config/db.js');

const Sell = db.models.Sell;

Sell.find({}, function (err, docs) {
	let fishNameArr = [];
	for (let doc of docs) {
		if (fishNameArr.indexOf(doc.fishName));
	}
});
