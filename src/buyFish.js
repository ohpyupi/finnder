const twilio = require('twilio');
const DB = require('../models');
const MessagingResponse = twilio.twiml.MessagingResponse;

module.exports = function(meta, message, res) {
  const twiml = new MessagingResponse();
  const fishYouWant = /buy (.*)/.exec(message)[1];

  DB.Buy.create({
    amount: '',
    location: {
      city: meta.FromCity,
      state: meta.FromState,
      zip: meta.ToZip,
      country: meta.FromCountry
    },
    phoneNumber: meta.From,
    fishName: fishYouWant,
  }, (err, res) => {
    if(err) return console.error(err);
    twiml.message(`Your record for ${fishYouWant} has been made!`);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });
}