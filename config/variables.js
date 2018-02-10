require('dotenv').load();

const _sharable = {
	PORT: process.env.PORT || 3000,
  TWILIO: {
    ACCOUNT_SID: 'AC015e98a7ea4bf6fad5406e6b58cfee97',
    AUTH_TOKEN: '1baaa6b39a24ba103d4bb219d9470d9a'
  }
};

const dev = Object.assign({}, _sharable);
const prod = Object.assign({}, _sharable);

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;
