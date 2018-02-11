const twilio = require('twilio');
const DB = require('../models');
const MessagingResponse = twilio.twiml.MessagingResponse;

module.exports = function(message, res) {
  const twiml = new MessagingResponse();
  const messageString = message.split(' ');
  const fishName = messageString[1];

  DB.Buy
    .find({fishName: fishName})
    .sort('-dateEntered')
    .limit(10)
    .exec((err, fishes) => {
      let messageString = [];
      messageString.push(`Past ${fishName} records...`);

      fishes.forEach((fish) => {
        messageString.push(`${fish.amount} from ${fish.location.city}, ${fish.location.state || ''} ${fish.location.country}`);
      });

      twiml.message(messageString.join("\n"));
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
}
