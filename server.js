const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const VAR = require('./config/variables');
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;
const client = twilio(VAR.TWILIO_ACCOUNT_SID, VAR.TWILIO_AUTH_TOKEN);

const buyFish = require('./src/buyFish');
const buyList = require('./src/buyList');
const deployCron = require('./crons');

const db = require('./config/db.js');
const shcedules = deployCron();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));


app.get('*', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/sms', (req, res) => {
  client.messages(req.body.SmsMessageSid)
    .fetch()
    .then((result) => {
      const message = result.body.toLowerCase();
      const buyRegx = /\bbuy\b/;
      const buyListRegx = /\bbuylist\b/;
      console.log(message);

      if(buyRegx.test(message)) {
        console.log('in buyFish');
        buyFish(req.body, message, res);
      } else if(buyListRegx) {
        buyList(message, res);
      }
    });
});

app.use((err, req, res, next)=>{
	console.error(err);
	res.status(err.status || 500);
	res.json({
		message: `${err.message}`
	});
});

app.listen(VAR.PORT);
console.log(`Server running on ${VAR.PORT}`);
