const fs = require('fs');
const path = require('path');

const db = require('../config/db');
const Buy = db.models.Buy;
const Sell = db.models.Sell;

const buyMockDataJson = fs.readFileSync(path.join(__dirname, '../config/buy-mock-data.json'), 'utf-8');
const buyMockDataArr = JSON.parse(buyMockDataJson);
Buy.insertMany(buyMockDataArr, function onInserted(err, docs) {
	if (err) return console.error(err);
	console.log(`Successfully inserted mock data to "Buy" Collection.`);
});

const sellMockDataJson = fs.readFileSync(path.join(__dirname, '../config/sell-mock-data.json'), 'utf-8');
const sellMockDataArr = JSON.parse(sellMockDataJson);
Sell.insertMany(sellMockDataArr, function onInserted(err, docs) {
	if (err) return console.error(err);
	console.log(`Successfully inserted mock data to "Sell" Collection.`);
});
