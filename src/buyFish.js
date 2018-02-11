const twilio = require('twilio');
const DB = require('../models');
const MessagingResponse = twilio.twiml.MessagingResponse;

module.exports = function(meta, message, res) {
  const twiml = new MessagingResponse();
  const textString = message.split(' ');
  const fishYouWant = textString[1] || null;
  const fishAmount = textString[2] || null;

  console.log(textString);

  DB.Buy.create({
    amount: fishAmount,
    location: {
      city: meta.FromCity,
      state: meta.FromState,
      zip: meta.ToZip,
      country: meta.FromCountry
    },
    phoneNumber: meta.From,
    fishName: fishYouWant,
    dateEntered: new Date()
  }, (err, result) => {
    if(err) return console.error(err);
    twiml.message(`Your record for ${fishYouWant} has been made!`);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });
}