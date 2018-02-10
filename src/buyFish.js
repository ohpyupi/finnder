const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;

module.exports = function(message, res) {
  const twiml = new MessagingResponse();
  const fishYouWant = /buy (.*)/.exec(message)[1];

  twiml.message(`You wanna buy ${fishYouWant}`);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}