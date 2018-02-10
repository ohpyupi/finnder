require('dotenv').load();

const _sharable = {
	PORT: process.env.PORT || 3000,
  TWILIO: {
    ACCOUNT_SID: 'AC015e98a7ea4bf6fad5406e6b58cfee97',
    AUTH_TOKEN: '1baaa6b39a24ba103d4bb219d9470d9a'
  },
  MONGO_DB_USER: 'root',
  MONGO_DB_PASSWORD: '3yugrClaWa65KNu6Bx89',
  MONGO_DB_URI: `mongodb://root:3yugrClaWa65KNu6Bx89@ds231658.mlab.com:31658/heroku_5m03dtnw`,
};

const dev = Object.assign({}, _sharable);
const prod = Object.assign({}, _sharable);

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;
