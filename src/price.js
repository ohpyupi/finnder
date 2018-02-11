const twilio = require('twilio');
const DB = require('../models');
const MessagingResponse = twilio.twiml.MessagingResponse;

module.exports = function(message, res) {
  const string = message.split(' ');
  const fishName = string[1];

  DB.Price.findOne({ fishName: fishName })
    .exec((err, fish) => {
      if(err) return console.error(err);
      let message = [];

      twiml.message(messageString.join("\n"));
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
}