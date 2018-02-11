const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;
const DB = require('../models');

module.exports = function(message, res) {
  const twiml = new MessagingResponse();
  const string = message.split(' ');
  const fishName = string[1];
  console.log(fishName);

  DB.Price.findOne({ fishName })
    .exec((err, fish) => {
      if(err) return console.error(err);
      let messageString = [];

      messageString.push(`Your ${fishName} statistics...`);
      messageString.push(`The average price for ${fishName} is ${(fish.mean).toFixed(2)}`);
      messageString.push(`You should sell for no less than ${(fish.mean - fish.standardDeviation).toFixed(2)}`);

      twiml.message(messageString.join("\n"));
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
}